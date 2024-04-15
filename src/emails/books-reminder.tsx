import {
  Html,
  Container,
  Img,
  Head,
  Font,
  Heading,
  Text,
  Link,
} from "@react-email/components";

const containerStyle = {
  padding: ".6em .8em",
  color: "#fff",
  borderRadius: "4px",
};

const headingStyle = {
  fontSize: "22px",
  color: "#000",
};

const textStyle = {
  fontSize: "16px",
  color: "#000",
  marginTop: "-10px",
};

const bookmarkTitle = {
  color: "#a09d9d",
  marginTop: "10px",
  fontSize: "16px",
};

const bookmark = {
  display: "flex",
  justifyContent: "space-between",
  gap: "4em",
  margin: "14px 0",
  height: "fit-content",
  borderRadius: "6px",
  padding: ".4em 1em",
  background: "#1b1b1b",
};

export interface EmailData {
  userName: string;
  data: { book_type: string; title: string; book_link: string }[];
}

export default function BooksReminder({ userName, data }: EmailData) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Livvic"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
          webFont={{
            url: "https://fonts.gstatic.com/s/livvic/v14/rnCt-x1S2hzjrlfXbdtaonXmTMuk.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Container style={containerStyle}>
        <div
          style={{
            display: "flex",
            gap: "1.2em",
            marginTop: "1em",
            paddingBottom: "1em",
          }}
        >
          <Img src="https://res.cloudinary.com/meje/image/upload/v1713089657/twb-logo-36x36_o2rhya.png" />{" "}
          <span
            style={{
              fontSize: "18px",
              color: "#000",
              fontWeight: "bold",
              marginTop: "9px",
            }}
          >
            twiBook
          </span>
        </div>

        <Heading style={headingStyle}>Hello {userName}</Heading>

        {data.length === 0 ? (
          <Text style={textStyle}>
            You did not create any bookmarks this week
          </Text>
        ) : (
          <Text style={textStyle}>
            You created {data.length} bookmark{data.length === 1 ? "" : "s"}{" "}
            this week. See them below
          </Text>
        )}

        {data.map((book, index: React.Key) => {
          const truncated =
            book.title.length > 38
              ? `${book.title.split("").slice(0, 38).join("")}...`
              : book.title;

          return (
            <Link
              key={index}
              style={{
                color:
                  book.book_type === "detailed"
                    ? "rgba(22, 219, 101, 1)"
                    : book.book_type === "external"
                    ? "#3772ff"
                    : book.book_type === "direct"
                    ? "#8e3dff"
                    : "rgba(255, 214, 10, 1)",
                display: "block",
                fontSize: "18px",
                margin: "10px 0",
                textDecoration: "underline",
              }}
              href={book.book_link}
            >
              {truncated}
            </Link>
          );
        })}

        <div
          style={{
            textAlign: "center",
            color: "#a09d9d",
            borderTop: "1px solid #cac6c6",
          }}
        >
          <Text>
            You are receiving this email because you enabled the email reminder
            in your <Link href="https://twibook.app">twiBook</Link> account
          </Text>
        </div>
      </Container>
    </Html>
  );
}
