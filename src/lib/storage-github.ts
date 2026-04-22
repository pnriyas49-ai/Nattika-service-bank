const GH_API = 'https://api.github.com';
const OWNER = process.env.GITHUB_OWNER ?? 'pnriyas49-ai';
const REPO = process.env.GITHUB_REPO ?? 'Nattika-service-bank';
const BRANCH = process.env.GITHUB_BRANCH ?? 'main';
const TOKEN = process.env.GITHUB_TOKEN ?? '';

function buildContentsUrl(filePath: string, includeRef = false) {
    const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
    const url = new URL(`${GH_API}/repos/${OWNER}/${REPO}/contents/${encodedPath}`);
    if (includeRef) url.searchParams.set('ref', BRANCH);
    return url.toString();
}

async function ghFetch(filePath: string, init?: RequestInit, includeRef = false) {
    const res = await fetch(buildContentsUrl(filePath, includeRef), {
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
    return res;
}

async function parseGitHubError(res: Response) {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { message: text }; }
}

async function getSHA(filePath: string): Promise<string | null> {
    const res = await ghFetch(filePath, undefined, true);
    if (!res.ok) return null;
    const data = await res.json();
    return data.sha ?? null;
}

export async function writeJsonFile(filePath: string, data: any, message: string) {
    if (!TOKEN) throw new Error('Missing GITHUB_TOKEN');
    
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    const sha = await getSHA(filePath);
    
    const body: Record<string, unknown> = {
        message,
        content,
        branch: BRANCH,
    };
    if (sha) body.sha = sha;
    
    const res = await ghFetch(filePath, { method: 'PUT', body: JSON.stringify(body) });
    if (!res.ok) {
        const err = await parseGitHubError(res);
        throw new Error(`GitHub JSON write failed: ${JSON.stringify(err)}`);
    }
}

export async function uploadImage(buffer: Buffer, directory: string, filename: string): Promise<string> {
    if (!TOKEN) throw new Error('Missing GITHUB_TOKEN');
    
    const filePath = `public/${directory}/${filename}`;
    const content = buffer.toString('base64');
    const sha = await getSHA(filePath);
    
    const body: Record<string, unknown> = {
        message: `upload image to ${directory}`,
        content,
        branch: BRANCH,
    };
    if (sha) body.sha = sha;
    
    const uploadRes = await ghFetch(filePath, { method: 'PUT', body: JSON.stringify(body) });
    if (!uploadRes.ok) {
        const err = await parseGitHubError(uploadRes);
        throw new Error(`GitHub image upload failed: ${JSON.stringify(err)}`);
    }
    return `/${directory}/${filename}`;
}

export async function deleteFile(filePath: string, message: string) {
    if (!TOKEN) throw new Error('Missing GITHUB_TOKEN');
    
    const sha = await getSHA(filePath);
    if (!sha) return; // File already doesn't exist
    
    const res = await ghFetch(filePath, {
        method: 'DELETE',
        body: JSON.stringify({ message, sha, branch: BRANCH }),
    });
    
    if (!res.ok) {
        const err = await parseGitHubError(res);
        throw new Error(`GitHub delete failed: ${JSON.stringify(err)}`);
    }
}
