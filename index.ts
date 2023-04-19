import crypto from 'crypto';
import CryptoJS from 'crypto-js';

function encryptData(toEncrypt: string): string {
  // In 1Password under "Danny Encrypt Help"
  const cipherKey = '';
  // In 1Password under "Danny Encrypt Help"
  const cipherSalt = '';

  const key = Buffer.from(cipherKey, 'hex');
  const iv = Buffer.from(cipherSalt, 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv, {});
  const encrypted = Buffer.concat([cipher.update(toEncrypt), cipher.final()]);

  return encrypted.toString('hex');
}

function encryptDataWithZeroPadding(toEncrypt: string): string {
  // In 1Password under "Danny Encrypt Help"
  const cipherKey = '';
  // In 1Password under "Danny Encrypt Help"
  const cipherSalt = '';

  const key = Buffer.from(cipherKey, 'hex');
  const iv = Buffer.from(cipherSalt, 'hex');

  const inputBuf = Buffer.from(toEncrypt, 'ascii');
  const inputBufPadded = zeroPadding(16, inputBuf);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv, {});
  cipher.setAutoPadding(false);
  const encrypted = Buffer.concat([cipher.update(inputBufPadded), cipher.final()]);

  return encrypted.toString('hex');
}

function encryptDataWithCryptoJS(toEncrypt: string) {
  // In 1Password under "Danny Encrypt Help"
  const cipherKey = '';
  // In 1Password under "Danny Encrypt Help"
  const cipherSalt = '';

  const key = CryptoJS.enc.Hex.parse(cipherKey);
  const iv = CryptoJS.enc.Hex.parse(cipherSalt);

  const encrypted = CryptoJS.AES.encrypt(toEncrypt, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

function zeroPadding(blockSize: number, buf: Buffer) {
  const padLength = blockSize - (buf.length % blockSize);
  const padding = Buffer.alloc(padLength, 0);
  return Buffer.concat([buf, padding]);
}

console.log('encryptData:', encryptData('666000752'));
console.log('encryptDataWithZeroPadding:', encryptDataWithZeroPadding('666000752'));
console.log('encryptDataWithCryptoJS:', encryptDataWithCryptoJS('666000752'));