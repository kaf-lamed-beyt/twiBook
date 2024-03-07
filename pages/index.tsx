import App from "@pages/home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>twiBook &mdash; Save and organize your twitter bookmarks.</title>

        <meta
          name="description"
          content="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
        />
        <meta
          itemProp="name"
          content="twiBook &mdash; Save and organize your twitter bookmarks."
        />
        <meta
          itemProp="description"
          content="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
        />
        <meta
          itemProp="image"
          content="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        />
        <meta property="og:url" content="twibook.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="twiBook &mdash; Save and organize your twitter bookmarks."
        />
        <meta
          property="og:description"
          content="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="twiBook &mdash; Save and organize your twitter bookmarks."
        />
        <meta
          name="twitter:description"
          content="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
        />
        <meta name="twitter:site" content="twibook.app" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        />

        <meta
          name="google-site-verification"
          content="Y4CGcT_Lgo6KHxg04aVyPVeoQPv0ZnRtsQ3Li7TJa1Y"
        />
      </Head>

      <App />
    </>
  );
}
