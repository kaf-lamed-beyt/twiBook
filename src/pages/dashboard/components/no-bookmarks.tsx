import { Box, Text, Tooltip, Center, Link, Flex } from "@chakra-ui/react";
import { Library, LibraryBig } from "lucide-react";
import { CustomButton } from "@components/button";
import { Hint } from "@components/hint";

export type NoBookmarksProps = {
  openModal: () => void;
};

export const NoBookmarks = ({ openModal }: NoBookmarksProps) => {
  return (
    <Center height="80vh">
      <Box maxW="700px" textAlign="center">
        <Center mb=".5em">
          <LibraryBig size="80" color="var(--alt-text)" />
        </Center>

        <Text
          color="var(--alt-text)"
          fontSize={{ lg: "22px", md: "18px", base: "16px" }}
        >
          You don't have any bookmarks yet.
        </Text>

        <Text
          color="var(--alt-text)"
          py=".3em"
          fontSize={{ lg: "22px", md: "18px", base: "16px" }}
        >
          Use our{" "}
          <Link
            isExternal
            href="#"
            target="_blank"
            color="#fff"
            textDecoration="underline"
          >
            chrome extension
          </Link>{" "}
          to create a{" "}
          <Box as="span" _hover={{ cursor: "pointer" }}>
            <Tooltip
              placement="top"
              border="1px solid var(--matte-black)"
              background="var(--eerie-black)"
              borderRadius="6px"
              color="var(--alt-text)"
              label="includes tweet content such as: tweet author, date etc."
            >
              <Box as="span">
                detailed <Hint />
              </Box>
            </Tooltip>
          </Box>{" "}
          bookmark or use the button below to create a{" "}
          <Box as="span" _hover={{ cursor: "pointer" }}>
            <Tooltip
              placement="right"
              width="280px"
              color="var(--alt-text)"
              label="A simple bookmark won't include the tweet content"
              py=".4em"
              px=".4em"
              borderRadius="6px"
              background="var(--eerie-black)"
              border="1px solid var(--matte-black)"
            >
              <Box as="span">
                simple <Hint />
              </Box>
            </Tooltip>
          </Box>{" "}
          one.
        </Text>

        <Box mt="1.2em">
          <CustomButton
            type="button"
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
            fontWeight="500"
            fontSize={{ lg: "22px", md: "18px", base: "16px" }}
            onClick={openModal}
          >
            <Flex gap={{ lg: "1.5em", md: "1.2em", base: "0em" }}>
              <Text my="auto">Create bookmark</Text>
              <Box display={{ lg: "block", md: "block", base: "none" }}>
                <Library size="25" />
              </Box>
            </Flex>
          </CustomButton>
        </Box>
      </Box>
    </Center>
  );
};
