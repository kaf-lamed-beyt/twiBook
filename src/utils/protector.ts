import * as forge from "node-forge";

export const protector = async (
  text: string,
  // userId: string,
  publicKey: forge.pki.rsa.PublicKey | undefined
) => {
  // const data = await getKeysFromDB(userId);
  // const publicKey = data?.publicKey;

  const encrypted = publicKey?.encrypt(text);
  // @ts-ignore
  return forge.util.encode64(encrypted);
};

export const antagonist = async (
  value: string,
  privateKey: forge.pki.rsa.PrivateKey | undefined
) => {
  // const data = await getKeysFromDB(userId);
  // const privateKey = data?.privateKey;

  const decrypted = privateKey?.decrypt(forge.util.decode64(value));
  return decrypted;
};
