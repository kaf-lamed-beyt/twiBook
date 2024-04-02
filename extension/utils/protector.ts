import * as forge from "node-forge"
import { supabase } from "~core/supabase"

export const protector = async (
  text: string,
  publicKey: forge.pki.rsa.PublicKey | undefined
) => {
  const encrypted = publicKey?.encrypt(text)
  // @ts-ignore
  return forge.util.encode64(encrypted)
}

export const antagonist = async (
  value: string,
  privateKey: forge.pki.rsa.PrivateKey | undefined
) => {
  const decrypted = privateKey?.decrypt(forge.util.decode64(value))
  return decrypted
}

export const getKeysFromDB = async () => {
  const { data } = await supabase.auth.getSession()

  const { data: keys, error } = await supabase
    .from("rk")
    .select("*")
    .eq("id", data?.session?.user.id)
    .single() // return as a single object

  if (error || !keys) return null

  const publicKey = forge.pki.publicKeyFromPem(keys.public_key_pem)
  const privateKey = forge.pki.privateKeyFromPem(keys.private_key_pem)

  return {
    publicKey,
    privateKey
  }
}
