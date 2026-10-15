import crypto from 'node:crypto';

// 32-byte key for AES-256-GCM (read from environment)
function getEncryptionKey(): Buffer {
  const hex = process.env.FIELD_ENCRYPTION_KEY;
  if (!hex || hex.length !== 64) {
    // 64 hex chars = 32 bytes
    if (process.env.NODE_ENV === 'production') {
      // DPDP Act 2023 §8: encryption is a statutory obligation.
      // Hard-fail rather than silently encrypt live PII with a known dev key.
      throw new Error(
        '[DPDP CRITICAL] FIELD_ENCRYPTION_KEY is missing or invalid. ' +
        'Set a 64-character hex key (32 bytes) before deploying. ' +
        'Generate with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"'
      );
    }
    // Dev-only fallback — never reached in production
    return crypto.scryptSync('bangalore-dpdp-dev-secret-key', 'salt', 32);
  }
  return Buffer.from(hex, 'hex');
}

/**
 * AES-256-GCM field encryption at rest (DPDP Act 2023 Sec 8)
 * Format: iv:authTag:ciphertext (all hex)
 */
export function encryptField(plainText: string): string {
  if (!plainText) return '';
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(12); // 96-bit IV recommended for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * AES-256-GCM field decryption
 */
export function decryptField(encryptedText: string): string {
  if (!encryptedText) return '';
  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) return ''; // malformed ciphertext should not leak raw blob
    const [ivHex, authTagHex, cipherHex] = parts;
    const key = getEncryptionKey();
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'));
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
    
    let decrypted = decipher.update(cipherHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err);
    return '[ENCRYPTED_DATA]';
  }
}

/**
 * Salted SHA-256 IP Hash (Never store raw IP in DB/logs)
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'dpdp_bangalore_default_salt';
  const cleanIp = (ip || '127.0.0.1').split(',')[0].trim();
  return crypto.createHmac('sha256', salt).update(cleanIp).digest('hex');
}

/**
 * Deterministic HMAC blind index for looking up leads without decrypting table
 */
export function hashForLookup(value: string): string {
  if (!value) return '';
  const clean = value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const salt = process.env.FIELD_LOOKUP_SALT || process.env.FIELD_ENCRYPTION_KEY || 'lookup_salt';
  return crypto.createHmac('sha256', salt).update(clean).digest('hex');
}

/**
 * Mask Phone Number (e.g., "+91 98765 43210" -> "+91 98*** **210")
 */
export function maskPhone(phone: string): string {
  if (!phone) return '';
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length < 6) return '****';
  const last3 = digits.slice(-3);
  const first2 = digits.slice(-10, -8);
  return `+91 ${first2}*** **${last3}`;
}

/**
 * Mask Email (e.g., "vikram.sharma@example.com" -> "v***a@example.com")
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `*@${domain}`;
  const first = user[0];
  const last = user[user.length - 1];
  return `${first}***${last}@${domain}`;
}

/**
 * Generate DSR Tracking ID (e.g., "DSR-KA-2026-AB72")
 */
export function generateDsrTrackingId(): string {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  const year = new Date().getFullYear();
  return `DSR-KA-${year}-${random}`;
}

