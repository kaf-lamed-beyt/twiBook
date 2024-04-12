import { CustomButton } from "../../components/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import {
  Text,
  Box,
  Flex,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  HStack,
  Link as ChakraLink,
  UnorderedList,
  ListItem,
  Center
} from "@chakra-ui/react";
import { FAQS, HOW_TO_USE } from "@utils/data";
import React from "react";
import { PricingSection } from "src/containers/components/pricing";
import { useInView } from "@react-spring/web";
import { Animated } from "../../externals";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();

  const [ref, heroImgStyle] = useInView(
    () => ({
      config: { duration: 300, delay: 2 },
      from: { transform: `scale(0.7)`, opacity: 0.5 },
      to: {
        transform: `scale(1)`,
        opacity: 1,
      },
    }),
    {
      rootMargin: "-40% 0%",
    }
  );

  return (
    <React.Fragment>
      <>
        <Text
          as="h1"
          pt={{ lg: "2em", md: "2em", base: "4em" }}
          textAlign="center"
          fontSize={{ base: "42px", md: "45px", lg: "100px" }}
          fontWeight="900"
          lineHeight={{ base: "42px", lg: "68px" }}
        >
          Twitter
          <Box as="span" mx=".2em" py=".1em" color="var(--true-purple)">
            bookmarks
          </Box>
          alternative.
        </Text>
        <Text
          textAlign="center"
          py=".8em"
          fontSize={{ base: "16px", md: "22px", lg: "36px" }}
        >
          Save tweets. Come back and quote them later.
        </Text>
        <Flex
          gap="1.2em"
          justifyContent="center"
          mt={{ base: "1em", md: "3em", lg: "1em" }}
        >
          <CustomButton
            type="button"
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
            onClick={() => router.push("/signin")}
            rightIcon={<MoveRight size="25px" />}
          >
            Get Started
          </CustomButton>

          <a href="#pricing">
            <CustomButton
              type="button"
              hoverBg="var(--matte-black)"
              background="var(--matte-black)"
            >
              Pricing
            </CustomButton>
          </a>
        </Flex>
        <Center mt="1.2em">
          <a
            href="https://www.producthunt.com/posts/twibook?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-twibook"
            target="_blank"
          >
            <Image
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=451355&theme=light"
              alt="twiBook - Twitter&#0032;bookmarks&#0032;alternative | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </Center>
        <Animated.Box
          ref={ref}
          my="2em"
          mt={{ lg: "8em", md: "6em", base: "2em" }}
          px={{ lg: "8em", base: "1em", md: "4em" }}
          style={heroImgStyle}
        >
          <Image
            src="/twb-dash-one.png"
            alt="twiBook dashboard"
            objectFit="contain"
          />
        </Animated.Box>
        <Box my="6em" px={{ lg: "12em", base: "1em", md: "4em" }}>
          <Text
            fontWeight="500"
            textAlign="center"
            textTransform="capitalize"
            fontSize={{ base: "28px", md: "22px", lg: "36px" }}
          >
            How to use twiBook?
          </Text>

          <UnorderedList my="2em">
            <ListItem
              pb=".8em"
              fontSize={{ lg: "22px", md: "18px", base: "16px" }}
              color="var(--alt-text)"
              listStyleType="none"
            >
              Upgrade your account to &quot;Basic&quot; to use our{" "}
              <ChakraLink
                isExternal
                href="https://chromewebstore.google.com/detail/twibook/aldmohfochmepihfkhngifhopkmckpgo"
                target="_blank"
                color="#fff"
                textDecoration="underline"
              >
                Chrome extension
              </ChakraLink>
              . With it, you can create bookmarks without leaving Twitter or
              follow the steps below
            </ListItem>
            {HOW_TO_USE?.map((item, index) => {
              return (
                <ListItem
                  key={index}
                  pb=".8em"
                  fontSize={{ lg: "22px", md: "18px", base: "16px" }}
                  color="var(--alt-text)"
                  listStyleType="none"
                >
                  {item}
                </ListItem>
              );
            })}
          </UnorderedList>
        </Box>
        {/* faqs */}
        <Box
          my="2em"
          mt="4em"
          className="faqs"
          px={{ lg: "12em", base: "1em", md: "4em" }}
        >
          <Text
            textTransform="capitalize"
            textAlign="center"
            fontWeight="500"
            fontSize={{ base: "28px", md: "22px", lg: "36px" }}
          >
            frequently asked questions
          </Text>

          <Accordion allowToggle my="1.4em">
            {FAQS.map(({ question, answers, id }, index) => {
              return (
                <AccordionItem
                  key={id}
                  borderTop={
                    index === 0 ? "none" : "1px solid var(--matte-black)"
                  }
                  borderBottom={
                    index === FAQS.length - 1
                      ? "none"
                      : "1px solid var(--matte-black)"
                  }
                >
                  <h2>
                    <AccordionButton>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        color="var(--alt-text)"
                        fontSize="18px"
                      >
                        {question}
                      </Box>
                      <AccordionIcon color="var(--alt-text)" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={2} fontSize="16px">
                    {answers.map((answer, index) => {
                      return (
                        <Text pb=".6em" key={index}>
                          {answer}
                        </Text>
                      );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}{" "}
          </Accordion>
        </Box>
        {/* pricing */}
        <Box
          mt={{ lg: "8em", md: "6em", base: "2em" }}
          px={{ lg: "14em", base: "1em", md: "2em" }}
        >
          <PricingSection />
        </Box>
        {/* footer */}
        <Box borderTop="1px solid var(--matte-black)" mt="5em">
          <Flex
            as="footer"
            justifyContent="space-between"
            py="1.8em"
            gap={["1em", "1em"]}
            flexWrap={{ base: "wrap", lg: "nowrap", md: "nowrap" }}
            px={{ lg: "8em", base: "1em", md: "4em" }}
          >
            <Text color="var(--alt-text)">
              twiBook &copy; {new Date().getFullYear()}
            </Text>

            <HStack spacing={6} color="var(--alt-text)">
              <ChakraLink
                isExternal
                href="https://twitter.com/usetwibook"
                _hover={{ cursor: "pointer", textDecoration: "none" }}
              >
                <Text cursor="pointer">Twitter</Text>
              </ChakraLink>
              <Link href="/legal/terms-of-use">
                <Text cursor="pointer">Terms of Use</Text>
              </Link>
              <Link href="/legal/privacy-policy">
                <Text cursor="pointer">Privacy Policy</Text>
              </Link>
            </HStack>
          </Flex>
        </Box>{" "}
      </>
    </React.Fragment>
  );
}

export default App;
