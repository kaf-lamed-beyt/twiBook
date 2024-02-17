import { Box, OrderedList, Text, ListItem, Link } from "@chakra-ui/react";
import { MetaData } from "@components/metadata";
import { lastUpdated } from "@utils/misc";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <MetaData
        url="twibook.netlify.app"
        pageTitle="Privacy Policy &mdash; twiBook"
        previewImage="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        description="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark twwets by copying the link to a tweet and save it in your twiBook dashboard."
      />

      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        height="550px"
        background="var(--eerie-black)"
      >
        <Text
          as="h1"
          textAlign="center"
          fontWeight="900"
          fontSize={{ lg: "80px", base: "50px", md: "60px" }}
        >
          Privacy Policy
        </Text>

        <Text
          position="absolute"
          right="20px"
          top="500px"
          fontWeight="300"
          color="var(--input-outline)"
        >
          Effective Date: {lastUpdated}
        </Text>
      </Box>

      <Box
        className="content"
        px={{ lg: "16em", base: "1.2em", md: "5em" }}
        py={{ lg: "4em", base: ".5em" }}
      >
        <Text py="1em">
          TwiBook respects your privacy and is committed to protecting your
          personal information. This Privacy Policy outlines how we collect,
          use, disclose, and safeguard your information when you use our mobile
          application and website.
        </Text>
        <OrderedList>
          <Box py=".5em">
            <ListItem>
              <strong>Information Collection and Use</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              We collect personal information you voluntarily provide when you
              use our app, such as when you create a bookmark or log in. This
              information may include your email address, and fullname when you
              choose to update your profile.
            </Text>
          </Box>

          <Box py=".5em">
            <ListItem>
              <strong>Information Sharing</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with trusted third parties
              who assist us in operating our app or conducting our business.
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Data security</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              Every bookmark you create is encrypted. We also implement security
              measures to protect your personal information from unauthorized
              access and disclosure. One of the tools we use for this purpose is{" "}
              <Link href="https://gitsecure.dev" isExternal>
                Gitsecure
              </Link>
              .
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Changes to this Policy</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              We reserve the right to update or change our Privacy Policy at any
              time. Your continued use of the app after we post any
              modifications to the Privacy Policy on this page will constitute
              your acknowledgment of the modifications and your consent to abide
              and be bound by the modified Privacy Policy.
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Contact Us</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              If you have any questions or concerns about our Privacy Policy,
              please contact us at{" "}
              <Link
                href="mailto:support@twibook.app"
                textDecoration="underline"
                color="#fff"
              >
                support@twibook.app
              </Link>
              .
            </Text>
          </Box>
        </OrderedList>
      </Box>
    </>
  );
};
