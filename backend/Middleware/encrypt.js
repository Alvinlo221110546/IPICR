import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const KEY_BASE64 = process.env.SECRET_KEY_BASE64;
if (!KEY_BASE64) {
  console.error("SECRET_KEY_BASE64 not set");
  process.exit(1);
}
const KEY = Buffer.from(KEY_BASE64, 'base64'); // 32 bytes

export function encryptText(plain) {
  if (plain === null || plain === undefined) return null;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', KEY, iv);
  let enc = cipher.update(String(plain), 'utf8', 'base64');
  enc += cipher.final('base64');
  return iv.toString('base64') + ':' + enc;
}

export function decryptText(stored) {
  if (!stored) return null;
  try {
    const [ivb64, ciphertext] = stored.split(':');
    const iv = Buffer.from(ivb64, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', KEY, iv);
    let dec = decipher.update(ciphertext, 'base64', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch (e) {
    return null;
  }
}
