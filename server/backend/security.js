const crypto = require('crypto');

// Encryption function
function encrypt(text, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Decryption function
function decrypt(encryptedText, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Example usage
const key = crypto.randomBytes(32); // 256 bits key
const iv = crypto.randomBytes(16); // 128 bits IV

const originalText = 'Hello, this is a secret message!';

// Encrypt
const encryptedText = encrypt(originalText, key, iv);
console.log('Encrypted:', encryptedText);

// Decrypt
const decryptedText = decrypt(encryptedText, key, iv);
console.log('Decrypted:', decryptedText);
