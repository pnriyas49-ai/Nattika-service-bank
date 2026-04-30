import { NextRequest } from 'next/server';

// Note: Do NOT export const runtime = 'edge' here. 
// We want it to use the Node runtime in development so local 'fs' can work.
// When deploying to Cloudflare, the Cloudflare adapter handles routing it appropriately.

export async function POST(req: NextRequest) {
  try {
    if (process.env.NODE_ENV === 'development') {
      // Dynamically import local storage to prevent Edge compilation errors
      const { handleLocalAdminRequest } = await import('@/lib/storage-local');
      return await handleLocalAdminRequest(req);
    } else {
      // In production (Cloudflare), use the GitHub storage
      const { handleGithubAdminRequest } = await import('@/lib/storage-github');
      return await handleGithubAdminRequest(req);
    }
  } catch (err: any) {
    console.error('Admin API Error:', err);
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
