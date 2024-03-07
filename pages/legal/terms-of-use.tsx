import { Box, OrderedList, Text, ListItem, Link } from "@chakra-ui/react";
import { MetaData } from "@components/metadata";
import { lastUpdated } from "@utils/misc";

export default function TermsOfUsePage() {
  return (
    <>
      <MetaData
        url="twibook.netlify.app"
        pageTitle="Terms of Use &mdash; twiBook"
        previewImage="https://res.cloudinary.com/meje/image/upload/v1708159678/twb-prev_wklhoz.png"
        description="Twitter bookmarks alternative. Save, organize and sort tweets. Bookmark tweets by copying the link to a tweet and save it in your twiBook dashboard."
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
          Terms of Use.
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
          Welcome to twiBook! By accessing or using our app, you agree to comply
          with and be bound by these Terms of Service.
        </Text>
        <OrderedList>
          <Box py=".5em">
            <ListItem>
              <strong>Use of our App</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              You may use our app for lawful purposes only. You are solely
              responsible for your use of the app and any data, information, or
              content you upload, create, or transmit through the app.
            </Text>
          </Box>

          <Box py=".5em">
            <ListItem>
              <strong>User Accounts</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              To access certain features of our app, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Intellectual Property</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              Our app and its original content, features, and functionality are
              owned by TwiBook and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              or proprietary rights laws.
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Limitation of Liability: </strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              TwiBook shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              revenues, whether incurred directly or indirectly, or any loss of
              data, use, goodwill, or other intangible losses resulting from
              your access to or use of or inability to access or use our app.
            </Text>
          </Box>

          {/* <Box py=".5em">
							<ListItem>
								<strong>Governing Law</strong>
							</ListItem>
							<Text py=".5em" color="var(--alt-text)">
                            These Terms of Service shall be governed by and construed in accordance with the laws of [Your Country], without regard to its conflict of law provisions.
							</Text>
						</Box> */}

          <Box py=".5em">
            <ListItem>
              <strong>Changes to these terms</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              We reserve the right to modify or replace these Terms of Service
              at any time. If a revision is material, we will provide at least
              30 days&apos; notice prior to any new terms taking effect.
            </Text>
          </Box>
          <Box py=".5em">
            <ListItem>
              <strong>Contact Us</strong>
            </ListItem>
            <Text py=".5em" color="var(--alt-text)">
              If you have any questions about these Terms of Service, please
              contact us at{" "}
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
}
