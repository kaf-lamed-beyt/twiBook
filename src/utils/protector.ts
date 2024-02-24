// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import * as forge from "node-forge";
// import { supabase } from "./supabase";

// export const getKeysFromDB = async (userId: string) => {
//   const { data: keys, error } = await supabase
//     .from("rk")
//     .select("*")
//     .eq("id", userId)
//     .single(); // return as a single object

//   if (error || !keys) return null;

//   const publicKey = forge.pki.publicKeyFromPem(keys.public_key_pem);
//   const privateKey = forge.pki.privateKeyFromPem(keys.private_key_pem);

//   return {
//     publicKey,
//     privateKey,
//   };
// };

// export const protector = async (text: string, userId: string) => {
//   const data = await getKeysFromDB(userId);
//   const publicKey = data?.publicKey;

//   const encrypted = publicKey?.encrypt(text);
//   // @ts-ignore
//   return forge.util.encode64(encrypted);
// };

// export const antagonist = async (value: string, userId: string) => {
//   const data = await getKeysFromDB(userId);
//   const privateKey = data?.privateKey;

//   const decrypted = privateKey?.decrypt(forge.util.decode64(value));
//   return decrypted;
// };

/* eslint-disable @typescript-eslint/ban-ts-comment */
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
