import { Resend } from "resend";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import BooksReminder from "@emails/books-reminder";
import { thisWeek } from "@utils/misc";

export type User = {
  email: string;
};

const resend = new Resend(process.env.NEXT_PUBLIC_BMRKS_REMINDER);

export default async function sendBookmarksReminder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SERVICE_KEY!
  );

  // Fetch all users who created bookmarks this week
  const { data: usersWithBookmarks, error: usersError } = await supabase
    .from("books")
    .select("id")
    .eq("week", thisWeek);

  if (usersError) {
    return res
      .status(500)
      .json({ error: "Error fetching users with bookmarks" });
  }

  const userIds = usersWithBookmarks.map((user) => user.id);

  const { data: users, error: usersFetchError } = await supabase
    .from("account")
    .select("")
    .in("id", userIds);

  if (usersFetchError) {
    return res.status(500).json({ error: "Error fetching user details" });
  }

  for (const user of users) {
    const { data: booksThisWeek, error: booksError } = await supabase
      .from("books")
      .select()
      // @ts-ignore
      .eq("id", user.id)
      .eq("week", thisWeek);

    let userPreference;
    // @ts-ignore
    if (user?.preferences !== null) {
      // @ts-ignore
      userPreference = JSON.parse(user?.preferences ?? "");
    }

    if (!booksError && userPreference?.weekly_reminders === true) {
      const { error } = await resend.emails.send({
        from: "caleb@twibook.app",
        // @ts-ignore
        to: user.email,
        subject: `You created ${booksThisWeek?.length} bookmark${
          booksThisWeek?.length > 1 ? "s" : ""
        } this week`,
        react: BooksReminder({
          // @ts-ignore
          userName: user.username,
          data: booksThisWeek,
        }),
      });

      if (error) {
        // @ts-ignore
        console.error(`Error sending email to ${user.email}:`, error);
      }
    } else {
      // @ts-ignore
      console.error(`Error fetching books for user ${user.email}:`, booksError);
    }
  }

  return res.status(200).json({ message: "Email reminders sent successfully" });
}
