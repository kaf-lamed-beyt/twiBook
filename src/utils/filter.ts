import dayjs from "dayjs";

export type Books = {
  author: string | null;
  author_avatar: string | null;
  author_handle: string | null;
  book_created_at: string;
  book_id: string;
  book_link: string | undefined;
  book_type: string;
  id: string; // user id
  title: string; // boomark title
  tweet_date: string;
}[];

export const bookTypes = {
  simple: "simple",
  detailed: "detailed",
  external: "external",
};

export const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export type Month = keyof typeof months;
export type BookType = keyof typeof bookTypes;

export const filterBooks = (books: Books) => {
  return {
    byType: (type: BookType) => {
      return books.filter((book) => book?.book_type === type);
    },

    byMonth: (month: Month) => {
      const targetMonth = months[month];
      return books.filter(
        (book) => dayjs(book?.book_created_at).month() === targetMonth
      );
    },
  };
};
