// import {
//   pgTable,
//   text,
//   serial,
//   boolean,
//   date,
//   uuid,
//   jsonb,
// } from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   email: text("email"),
//   fullName: text("full_name"),
//   hasLicense: boolean("Pro"),
//   userId: uuid("user_id"),
//   books: jsonb("books").default([]),
// });

// export const books = pgTable("books", {
//   id: serial("id").primaryKey(),
//   title: text("title"),
//   content: text("content"),
//   author: text("author"),
//   date: date("date"),
//   bookId: uuid("book_id"),
// });
