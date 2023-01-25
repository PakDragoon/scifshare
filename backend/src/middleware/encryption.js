const crypto = require('crypto');
const ENC_KEY = crypto.randomBytes(16).toString('hex')
const IV = crypto.randomBytes(8).toString('hex')
const phrase = "who let the dogs out";

const encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

const decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

const encrypted_key = encrypt(phrase);
const original_phrase = decrypt(encrypted_key);

console.log("encrypt: ", encrypted_key)
console.log("original: ", original_phrase)