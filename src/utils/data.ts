import { BookmarkCardProps } from "@pages/dashboard/components/bookmark-card";

export const Bookmarks: BookmarkCardProps[] = [
  {
    id: crypto.randomUUID(),
    title: "Weird musings around Vite",
    type: "simple",
    createdAt: "1 month",
  },
  {
    id: crypto.randomUUID(),
    title: "Dan Abramov - HMR Stuff",
    type: "detailed",
    createdAt: "30 mins",
  },
  {
    id: crypto.randomUUID(),
    title: "Gitsecure's launch",
    type: "detailed",
    createdAt: "5 months",
  },
  {
    id: crypto.randomUUID(),
    title: "twiBook version 2.0",
    type: "simple",
    createdAt: "4 hours",
  },
  {
    id: crypto.randomUUID(),
    title: "OSCAFest 2024",
    type: "detailed",
    createdAt: "15 mins",
  },

  {
    id: crypto.randomUUID(),
    title: "Kent C. Dodds - When to memo",
    type: "detailed",
    createdAt: "50 mins",
  },
  {
    id: crypto.randomUUID(),
    title:
      "Misconceptions about re-renders - Nadia Makarevich oolao ataha yyta agaata atar wtw ta atwwewr avaja sha ahshshsha ahahay ehay",
    type: "simple",
    createdAt: "4 days",
  },
  {
    id: crypto.randomUUID(),
    title: "Unveiling madein9ja - @acekyd",
    type: "simple",
    createdAt: "1 year",
  },
  {
    id: crypto.randomUUID(),
    title: "Startup funding round completed",
    type: "detailed",
    createdAt: "1 month",
  },
  {
    id: crypto.randomUUID(),
    title: "Logs - A subtle idea behind binary search",
    type: "detailed",
    createdAt: "1 month",
  },
];
