import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// ── GitHub API helpers (edge-compatible, no Node.js APIs) ─────────────
const GH_API  = 'https://api.github.com';
const OWNER   = process.env.GITHUB_OWNER  ?? 'pnriyas49-ai';
const REPO    = process.env.GITHUB_REPO   ?? 'Nattika-service-bank';
const BRANCH  = process.env.GITHUB_BRANCH ?? 'main';
const TOKEN   = process.env.GITHUB_TOKEN  ?? '';

function ghUrl(filePath: string, ref = false) {
  const encoded = filePath.split('/').map(encodeURIComponent).join('/');
  const url = new URL(`${GH_API}/repos/${OWNER}/${REPO}/contents/${encoded}`);
  if (ref) url.searchParams.set('ref', BRANCH);
  return url.toString();
}

async function ghFetch(filePath: string, init?: RequestInit, ref = false) {
  return fetch(ghUrl(filePath, ref), {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });
}

async function ghSha(filePath: string): Promise<string | null> {
  const res = await ghFetch(filePath, undefined, true);
  if (!res.ok) return null;
  return (await res.json()).sha ?? null;
}

async function ghRead(filePath: string): Promise<any | null> {
  const res = await ghFetch(filePath, undefined, true);
  if (!res.ok) return null;
  const data = await res.json();
  if (data.content && data.encoding === 'base64') {
     const decoded = atob(data.content);
     return JSON.parse(decoded);
  }
  return null;
}

async function ghWrite(filePath: string, content: string, message: string) {
  const sha = await ghSha(filePath);
  const body: Record<string, unknown> = { message, content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await ghFetch(filePath, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub write failed (${filePath}): ${err}`);
  }
}

async function ghDelete(filePath: string, message: string) {
  const sha = await ghSha(filePath);
  if (!sha) return;
  const res = await ghFetch(filePath, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`[GitHub Delete Error] Failed to delete ${filePath}:`, err);
  }
}

// ── Edge-compatible base64 helpers ────────────────────────────────────
function utf8ToBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// ── Media Extract Helpers ─────────────────────────────────────────────
function extractImageUrls(obj: any): string[] {
  let urls: string[] = [];
  if (!obj) return urls;
  if (typeof obj === 'string') {
    if (obj.startsWith('/images/')) urls.push(obj);
  } else if (Array.isArray(obj)) {
    for (const item of obj) {
      urls = urls.concat(extractImageUrls(item));
    }
  } else if (typeof obj === 'object') {
    for (const key in obj) {
      urls = urls.concat(extractImageUrls(obj[key]));
    }
  }
  return urls;
}

// ── Process uploaded base64 images ────────────────────────────────────
async function processBase64Field(
  value: string, key: string, model: string, slug: string, index?: number
): Promise<string> {
  const matches = value.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/);
  if (!matches || matches.length < 3) return value;

  const ext = matches[1];
  const rawBase64 = matches[2]; // Already base64 — send directly to GitHub

  const dirMap: Record<string, string> = {
    news: 'images/news',
    loanRates: 'images/loans',
    depositRates: 'images/deposits',
    photoGallery: 'images/gallery',
    about: 'images/about',
    homepage: 'images/hero',
  };
  const directory = dirMap[model] || 'images/uploads';
  const filename = `${slug || 'upload'}-${key}${index !== undefined ? `-${index}` : ''}-${Date.now()}.${ext}`;
  const ghPath = `public/${directory}/${filename}`;

  await ghWrite(ghPath, rawBase64, `upload image to ${directory}`);
  return `/${directory}/${filename}`;
}

// ── Route handler ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    if (!TOKEN) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not set. Add it to your .env file and Cloudflare environment variables.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { type, model, slug, data, action } = body;

    if (!model || !action) {
      return NextResponse.json({ error: 'Missing model or action' }, { status: 400 });
    }

    const filePath = type === 'collection' ? `src/content/${model}/${slug}.json` : `src/content/${model}.json`;

    // ── DELETE ─────────────────────────────────────────────────────────
    if (action === 'delete') {
      const oldData = await ghRead(filePath);
      if (oldData) {
         // Prune associated media
         const oldImages = extractImageUrls(oldData);
         for (const imgUrl of oldImages) {
            await ghDelete(`public${imgUrl}`, `Prune orphaned media from ${model} ${slug}`);
         }
      }
      
      // Delete the JSON entry
      await ghDelete(filePath, `Delete ${model} ${slug}`);
      return NextResponse.json({ success: true });
    }

    // ── SAVE ──────────────────────────────────────────────────────────
    const processedData = { ...data };

    // Upload any new base64 images
    for (const [key, value] of Object.entries(processedData)) {
      if (typeof value === 'string' && value.startsWith('data:image')) {
        processedData[key] = await processBase64Field(value, key, model, slug);
      } else if (Array.isArray(value)) {
        const arr: any[] = [];
        for (let i = 0; i < value.length; i++) {
          if (typeof value[i] === 'string' && value[i].startsWith('data:image')) {
            arr.push(await processBase64Field(value[i], key, model, slug, i));
          } else {
            arr.push(value[i]);
          }
        }
        processedData[key] = arr;
      }
    }

    // Prune orphaned media (images that were in old data but are not in the new data)
    const oldData = await ghRead(filePath);
    if (oldData) {
       const oldImages = extractImageUrls(oldData);
       const newImages = extractImageUrls(processedData);
       
       const orphanedImages = oldImages.filter(img => !newImages.includes(img));
       for (const imgUrl of orphanedImages) {
          await ghDelete(`public${imgUrl}`, `Prune orphaned media after update to ${model} ${slug || 'singleton'}`);
       }
    }

    // Write the new JSON to GitHub
    const content = utf8ToBase64(JSON.stringify(processedData, null, 2));
    await ghWrite(filePath, content, `Update ${model} ${slug || 'index'}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
