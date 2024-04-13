import { BookmarkCardProps } from "@pages/dashboard/components/bookmark-card";
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
  border: "1px solid #28282b",
  padding: ".6em .8em",
  color: "#fff",
  borderRadius: "6px",
};

const headingStyle = {
  fontSize: "22px",
};

const textStyle = {
  fontSize: "16px",
  color: "#a09d9d",
};

const bookmarkTitle = {
  color: "#a09d9d",
  marginTop: "10px",
  fontSize: "16px",
};

const bookmark = {
  display: "flex",
  justifyContent: "space-between",
  margin: "18px 0",
  height: "45px",
  border: "1px solid #28282b",
  borderRadius: "6px",
  padding: ".6em 1em",
};

export interface EmailData {
  userName: string;
  data: BookmarkCardProps[];
}

export default function BooksReminder({ userName, data }: EmailData) {
  // const truncated =
  // books.title.length > 38 ? `${books.title.split("").slice(0, 38).join("")}...` : books.title;

  return (
    <Html
      style={{
        background: "#1b1b1b",
      }}
    >
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
            marginTop: "1.2em",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingBottom: "1em",
            borderBottom: "1px solid #28282b",
          }}
        >
          <Img src="https://res.cloudinary.com/meje/image/upload/v1713007034/twb-logo-64x64_hj52xh.png" />
        </div>
        <Heading style={headingStyle}>Hello {userName}</Heading>
        <Text style={textStyle}>
          You created {data.length} bookmarks this week. See them below
        </Text>

        {data.map((book: BookmarkCardProps, index: React.Key) => {
          return (
            <div style={bookmark} key={index}>
              <p style={bookmarkTitle}>Looku lookuuu</p>
              {/* <div
          style={{
            margin: "auto 0",
            height: "18px",
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "bold",
            padding: ".1em .2em",
            borderRadius: "4px",
            color: "#8e3dff",
            background: "rgba(106, 13, 173, 0.4)",
          }}
        >
          direct
        </div> */}
              <div
                style={{
                  margin: "auto 0",
                  height: "18px",
                  textTransform: "uppercase",
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: ".1em .2em",
                  borderRadius: "4px",
                  color:
                    book.type === "detailed"
                      ? "rgba(22, 219, 101, 1)"
                      : book.type === "external"
                      ? "#3772ff"
                      : book.type === "direct"
                      ? "#8e3dff"
                      : "rgba(255, 214, 10, 1)",
                  background:
                    book.type === "detailed"
                      ? "rgba(22, 219, 101, 0.4)"
                      : book.type === "external"
                      ? "rgba(55, 114, 255, 0.4)"
                      : book.type === "direct"
                      ? "rgba(106, 13, 173, 0.4)"
                      : "rgba(255, 214, 10, 0.4)",
                }}
              >
                {book.type}
              </div>
            </div>
          );
        })}

        <div
          style={{
            textAlign: "center",
            color: "#a09d9d",
            borderTop: "1px solid #28282b",
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
