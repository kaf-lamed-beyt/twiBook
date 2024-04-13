import { Resend } from "resend";
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import BooksReminder from "src/emails/books-reminder";

const resend = new Resend(process.env.NEXT_PUBLIC_BMRKS_REMINDER);

export default async function sendBookmarksReminder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SERVICE_KEY!
  );
  const thisWeek = dayjs().week();

  const {data: user} = await supabase.auth.getSession()

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select();

  if (!booksError) {
    const booksThisWeek = books.filter(
      (book) => dayjs(book.book_created_at).week() === thisWeek
    );

    const { data, error } = await resend.emails.send({
      from: "caleb@twibook.app",
      to: "belac335@gmail.com",
      subject: `You created ${booksThisWeek?.length} bookmarks this week`,
      react: BooksReminder({userName: "Seven", data: booksThisWeek }),
    });

    if (error) {
      return res.status(400).json(error);
    }

    return res.status(200).json(data);
  }

  return res.status(500).json({ error: "Error fetching bookmarks" });
}
