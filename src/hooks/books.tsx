import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabase";

export const getBooks = async () => {
  const { data, error } = await supabase.from("books").select();

  if (!error) {
    return data;
  }
};

export const useBooks = () => {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["twibooks"],
    queryFn: getBooks,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const sortedBooks = data?.sort((a, b) => {
    return (
      Number(new Date(b.book_created_at)) - Number(new Date(a.book_created_at))
    );
  });

  return {
    error,
    books: sortedBooks,
    loading: isPending,
    refetchBooks: refetch,
  };
};

// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import * as forge from "node-forge";

// export const protector = async (
//   text: string,
//   // userId: string,
//   publicKey: forge.pki.rsa.PublicKey | undefined
// ) => {
//   // const data = await getKeysFromDB(userId);
//   // const publicKey = data?.publicKey;

//   const encrypted = publicKey?.encrypt(text);
//   // @ts-ignore
//   return forge.util.encode64(encrypted);
// };

// export const antagonist = async (
//   value: string,
//   // userId: string,
//   privateKey: forge.pki.rsa.PrivateKey | undefined
// ) => {
//   // const data = await getKeysFromDB(userId);
//   // const privateKey = data?.privateKey;

//   const decrypted = privateKey?.decrypt(forge.util.decode64(value));
//   return decrypted;
// };
