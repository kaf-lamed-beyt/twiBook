import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabase/client";
import { useBooks } from "./books";
import dayjs from "dayjs";

const getUser = async () => {
  const { data, error } = await supabase.from("account").select();

  if (!error) {
    return data;
  }
};

const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (!error) {
    return data;
  }
};

export const useSession = () => {
  const { data, error } = useQuery({
    queryKey: ["session"],
    queryFn: getCurrentSession,
    refetchOnWindowFocus: false,
  });

  return {
    error,
    session: data,
  };
};

export const useUser = () => {
  const { books } = useBooks();

  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    // refetchOnWindowFocus: false,
  });


  const userData = data?.map((user) => {
    return {
      id: user.id,
      email: user.email,
      firstname: user.first_name,
      lastname: user.last_name,
      username: user.username,
      signup_date: user.created_at,
      has_license: user.has_license,
      license_type: user.license_type,
      books: books,
      license_expires_at: user.license_expires_at,
      license_price: user.amount_paid,
      license_purchase_date: user.order_created_at,
      sub_cancelled_date: user.sub_cancelled_date,
      preferences: user.preferences
    };
  });

  const month = new Date().getMonth();

  const matchBookmarksThisMonth = () => {
    const booksThisMonth = books?.filter(
      (books) => dayjs(books.book_created_at).month() === month
    );

    return booksThisMonth?.length;
  };

  const matchFreePreviewsThisMonth = () => {
    const detailedBookmarks = books?.filter((book) => {
      return book.book_type === "detailed";
    });

    const detailedBooksThisMonth = detailedBookmarks?.filter(
      (books) => dayjs(books.book_created_at).month() === month
    );

    return detailedBooksThisMonth?.length;
  };

  return {
    error,
    loading: isPending,
    twib: userData?.[0],
    refetchUser: refetch,
    freePreviews:
      userData?.[0]?.has_license !== false
        ? null
        : matchFreePreviewsThisMonth(),
    booksThisMonth: matchBookmarksThisMonth(),
  };
};
