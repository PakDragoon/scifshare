const crypto = require('crypto');

exports.encrypt = ( async (val, encKey, ivKey) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', encKey, ivKey);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

exports.decrypt = ( async (encrypted, encKey, ivKey) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', encKey, ivKey);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});