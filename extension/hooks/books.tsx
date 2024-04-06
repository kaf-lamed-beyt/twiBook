import { useQuery } from "@tanstack/react-query"
import { supabase } from "core/supabase"

export const getBooks = async () => {
  const { data, error } = await supabase
    .from("books")
    .select()
    // .neq("platform", "web")

  if (!error) {
    return data
  }
}

export const useBooks = () => {
  const { isPending, data, error, refetch } = useQuery({
    queryKey: ["twibooks"],
    queryFn: getBooks,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  const sortedBooks = data?.sort((a, b) => {
    return (
      Number(new Date(b.book_created_at)) - Number(new Date(a.book_created_at))
    )
  })

  return {
    error,
    books: sortedBooks,
    loading: isPending,
    refetchBooks: refetch
  }
}
