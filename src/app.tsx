import { CustomButton } from "./components/button";
import { BadgeDollarSign, MoveRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { FAQS } from "@utils/data";
import React from "react";

function App() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <>
        <Text
          as="h1"
          pt="1em"
          textAlign="center"
          fontSize={{ base: "26px", md: "45px", lg: "100px" }}
          fontWeight="900"
        >
          Twitter
          <Box as="span" mx=".2em" py=".1em" color="var(--true-purple)">
            bookmarks
          </Box>
          alternative.
        </Text>
        <Text
          textAlign="center"
          fontSize={{ base: "16px", md: "22px", lg: "36px" }}
        >
          Save tweets. Come back and quote them later.
        </Text>
        <Flex
          gap="1.4em"
          justifyContent="center"
          mt={{ base: "1em", md: "3em", lg: "3em" }}
        >
          <CustomButton
            type="button"
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
            onClick={() => navigate("/signin")}
            rightIcon={<MoveRight size="25px" />}
          >
            Get Started
          </CustomButton>

          <CustomButton
            type="button"
            hoverBg="var(--matte-black)"
            background="var(--matte-black)"
            onClick={() => navigate("/signin")}
            rightIcon={<BadgeDollarSign size="23px" />}
          >
            Pricing
          </CustomButton>
        </Flex>
        <Box
          my="2em"
          mt={{ lg: "8em", md: "6em", base: "2em" }}
          px={{ lg: "8em", base: "1em", md: "4em" }}
        >
          <Image
            src="/twb-dash-one.png"
            alt="twiBook dashboard"
            objectFit="contain"
          />
        </Box>
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
            fontSize={{ base: "18px", md: "22px", lg: "36px" }}
          >
            frequently asked questions
          </Text>

          <Accordion allowToggle my="1.4em">
            {FAQS.map(({ question, answer, id }, index) => {
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
                    {answer}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}{" "}
          </Accordion>
        </Box>
        <Box borderTop="1px solid var(--matte-black)" mt="5em">
          <Flex
            as="footer"
            justifyContent="space-between"
            py="1.8em"
            px={{ lg: "8em", base: "1em", md: "4em" }}
          >
            <Text color="var(--alt-text)">
              twiBook &copy; {new Date().getFullYear()}
            </Text>

            <HStack spacing={6} color="var(--alt-text)">
              <Link to="/legal/terms-of-use">
                <Text cursor="pointer">Terms of Use</Text>
              </Link>
              <Link to="/legal/privacy-policy">
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
