import * as forge from "node-forge";

const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });

export const protector = (value: string) => {
  const publicKey = keyPair.publicKey;
  const encrypted = publicKey.encrypt(value);

  return forge.util.encode64(encrypted);
};

export const antagonist = (value: string) => {
  const privateKey = keyPair.privateKey;
  const encryptedValue = forge.util.decode(value);
  const decryptedValue = privateKey.decrypt(encryptedValue);

  return decryptedValue;
};
