import * as forge from "node-forge";

// Generate RSA key pair
const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

// Get the public key and private key in PEM format
const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

// Convert PEM strings to key objects
const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

export const protector = (value: string) => {
  const encrypted = publicKey.encrypt(forge.util.encodeUtf8(value));
  return forge.util.encode64(encrypted);
};

export const antagonist = (value: string) => {
  const decrypted = privateKey.decrypt(forge.util.decode64(value));
  return forge.util.decodeUtf8(decrypted);
};
