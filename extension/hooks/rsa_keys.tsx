import { useQuery } from "@tanstack/react-query";
import { supabase } from "core/supabase";
import * as forge from "node-forge";

const getKeysFromDB = async () => {
  const { data } = await supabase.auth.getSession();

  const { data: keys, error } = await supabase
    .from("rk")
    .select("*")
    .eq("id", data?.session?.user.id)
    .single(); // return as a single object

  if (error || !keys) return null;

  const publicKey = forge.pki.publicKeyFromPem(keys.public_key_pem);
  const privateKey = forge.pki.privateKeyFromPem(keys.private_key_pem);

  return {
    publicKey,
    privateKey,
  };
};

export const useKeys = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["rsa_keys"],
    queryFn: getKeysFromDB,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    error,
    loading: isPending,
    privateKey: data?.privateKey,
    publicKey: data?.publicKey,
  };
};
