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
  border: "1px solid #cac6c6",
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
  margin: "18px 0",
  height: "45px",
  borderRadius: "6px",
  padding: ".6em 1em",
  background: "#1b1b1b",
};

export interface EmailData {
  userName: string;
  data: BookmarkCardProps[];
}

export default function BooksReminder({ userName, data }: EmailData) {
  // const truncated =
  // books.title.length > 38 ? `${books.title.split("").slice(0, 38).join("")}...` : books.title;

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
            gap: ".6em",
            marginTop: "1em",
            paddingBottom: "1em",
            borderBottom: "1px solid #cac6c6",
          }}
        >
          <Img src="https://res.cloudinary.com/meje/image/upload/v1713089657/twb-logo-36x36_o2rhya.png" />{" "}
          <span
            style={{
              fontSize: "18px",
              color: "#000",
              fontWeight: "bold",
              marginTop: "7px",
            }}
          >
            twiBook
          </span>
        </div>
        <Heading style={headingStyle}>Hello Caleb</Heading>
        <Text style={textStyle}>
          You created 4 bookmarks this week. See them below
        </Text>

        <div style={bookmark}>
          <p style={bookmarkTitle}>Looku lookuuu</p>
          <div
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
          </div>
        </div>

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
