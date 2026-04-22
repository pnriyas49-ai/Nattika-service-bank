import crypto from 'crypto';

const key = crypto.randomBytes(64).toString('base64url');
console.log('\n=== YOUR KEYSTATIC_SECRET ===\n');
console.log(key);
console.log('\n=== Copy the string above and paste it as the KEYSTATIC_SECRET in Cloudflare ===\n');
