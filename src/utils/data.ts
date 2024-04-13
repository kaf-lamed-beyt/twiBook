export const FAQS = [
  {
    id: crypto.randomUUID(),
    question: "What is this?",
    answers: [
      "twiBook is a tool you can use to save tweets you find interesting on Twitter.",
    ],
  },
  {
    id: crypto.randomUUID(),
    question: "How does it work?",
    answers: [
      "Find a tweet you from your TL (Timeline or whatever it called these days)",
      "Copy the tweet's link, give it a title you want to remember it by, and hit the 'Create bookmark' button.",
    ],
  },
  {
    id: crypto.randomUUID(),
    question: "What is the point? Twitter already has that covered.",
    answers: [
      "Yes. You are correct. But, with twiBook, you can carry out various actions on your saved bookmarks. From searching, to organizing and sorting them.",
    ],
  },
  {
    id: crypto.randomUUID(),
    question: "How can I use it?",
    answers: [
      "Click on the 'Get started' button above to create an account. Then proceed to grab/copy the link to any tweet and create a simple bookmark with our dashboard.",
    ],
  },
  {
    id: crypto.randomUUID(),
    question: "I can only create 15 bookmarks?",
    answers: [
      "Yes. On the free plan, you are entitled to only 15 bookmarks in a month. To increase your quota, consider upgrading to the basic Plan",
    ],
  },
  {
    id: crypto.randomUUID(),
    question: "Are my bookmarks safe?",
    answers: [
      "Yes they are.",
      "We ensure that your links, whether from twitter or external ones are encrypted when you create a bookmark, and they can only be accessed by you alone.",
    ],
  },
  // {
  //   id: crypto.randomUUID(),
  //   question: "Isn't this stressful?",
  //   answers:
  //     "Well, a liitle bit. ago But, that's what you get on the Free plan. Upgrade to the Pro plan to enjoy our chrome extension that takes care of the process without leaving twitter.",
  // },
];

export const HOW_TO_USE = [
  "First, find any tweet on Twitter. Copy the link of the tweet",
  "If you're on the Basic plan, you can bookmark any link on the internet.",
  "Now that you have copied the link of the tweet. Go into your dashboard",
  "You should see a 'Create bookmark' button, if you're new to twiBook, click on it.",
  "You should see a dialog with two input fields by now. Paste the link in the second input field.",
  "Then proceed to give it a name you want to remember bookmark by. And that's all.",
  "If you no longer need the bookmark, you can delete it at any time.",
];

export const PLANS = [
  {
    id: crypto.randomUUID(),
    name: "Free",
    price: "$0",
    benefits: [
      "Simple bookmarks",
      "8 Tweet Previews",
      "Search bookmarks",
      "15 bookmarks per month",
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Basic",
    price: "$3.99",
    benefits: [
      "Tweet Previews",
      "Simple bookmarks",
      "Chrome extension",
      "Filter by month",
      "Up to 50 bookmarks per month",
      "Bookmarks not limited to Twitter",
    ],
  },
  {
    id: crypto.randomUUID(),
    name: "Pro",
    price: "$7.99",
    benefits: [
      "Tweet previews",
      "Simple bookmarks",
      "Chrome extension",
      "All filters included",
      "Email reminders (coming soon)",
      "Export bookmarks from Twitter",
      "Up to 150 bookmarks per month",
      "Bookmarks not limited to Twitter",
    ],
  },
  // {
  //   id: crypto.randomUUID(),
  //   name: "Custom",
  //   price: "~$14.99",
  //   benefits: [
  //     "Your dashboard",
  //     "Chrome extension (coming soon)",
  //     "Tweet Previews",
  //     "All filters included",
  //     "Unlimited bookmarks",
  //     "Bookmarks not limited to Twitter",
  //   ],
  // },
];

export const YEARLY_PLAN = [
  {
    id: crypto.randomUUID(),
    name: "Basic",
    price: "$47.88",
  },
  {
    id: crypto.randomUUID(),
    name: "Pro",
    price: "$107.88",
  },
];
