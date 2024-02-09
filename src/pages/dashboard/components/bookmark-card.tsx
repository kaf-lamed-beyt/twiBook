import {
  Accordion,
  AccordionIcon,
  AccordionButton,
  AccordionItem,
  Badge,
  Box,
  HStack,
  Image,
  Text,
  AccordionPanel,
  VStack,
  Link,
} from "@chakra-ui/react";
import { ExternalLink, Flame, ShieldAlert, Trash2 } from "lucide-react";

export interface BookmarkCardProps {
  id: string;
  createdAt: string;
  type: "detailed" | "simple";
  title: string;
  content?: {
    authorAvatar: string;
    displayName: string;
    handle: string;
    tweet: string;
    date: string;
  }[];
}

export const BookmarkCard = ({
  id,
  type,
  title,
  createdAt,
}: BookmarkCardProps) => {
  const truncated =
    title.length > 38 ? `${title.split("").slice(0, 38).join("")}...` : title;

  return (
    <Box
      id={id}
      background="var(--eerie-black)"
      border="1px solid var(--matte-black)"
      height="fit-content"
      width={{ lg: "380px", md: "48%", xl: "24.1%", base: "100%" }}
      borderRadius="8px"
      py=".8em"
      px=".6em"
      transition="all .3s ease-in"
      _hover={{
        cursor: "pointer",
        transition: "all .3s ease-in",
      }}
    >
      <HStack justifyContent="space-between">
        <Text color="var(--alt-text)" fontSize="14px">
          Added {createdAt} ago
        </Text>
        <Badge
          height="18px"
          borderRadius="4px"
          color={type === "detailed" ? "var(--success)" : "var(--warn)"}
          background={
            type === "detailed" ? "var(--success-400)" : "var(--warn-400)"
          }
          // border={`1px solid ${
          //   type === "detailed" ? "var(--success)" : "var(--warn)"
          // }`}
        >
          <HStack spacing={1}>
            {type === "detailed" ? (
              <Flame size="14" color="var(--success)" />
            ) : (
              <ShieldAlert size="14" color="var(--warn)" />
            )}
            <Text my="auto" fontSize="12px" fontWeight="bold">
              {type}
            </Text>
          </HStack>
        </Badge>
      </HStack>

      {type === "detailed" ? (
        <Accordion allowToggle mt="1.2em">
          <AccordionItem border="none">
            <Text>
              <AccordionButton
                px="0"
                py="0"
                _expanded={{ color: "var(--alt-text)" }}
              >
                <Box as="span" flex="1" textAlign="left" py=".2em">
                  {truncated}
                </Box>
                <AccordionIcon color="var(--alt-text)" />
              </AccordionButton>
            </Text>

            <AccordionPanel
              pb={0.5}
              px="0"
              pt=".4em"
              borderTop="1px solid var(--matte-black)"
            >
              <Box>
                <HStack>
                  <Box boxSize="50px">
                    <Image
                      alt="dan's photo"
                      borderRadius="full"
                      src="https://pbs.twimg.com/profile_images/1735469911843983360/sZ-i1kYG_400x400.jpg"
                    />
                  </Box>
                  <VStack spacing=".3">
                    <Text fontWeight="bold" ml="-2.3em">
                      dan's alt
                    </Text>
                    <Text color="var(--alt-text)" fontSize="15px">
                      @dan_abramov
                    </Text>
                  </VStack>
                </HStack>

                <Text className="tweet" color="#fff" mt=".8em">
                  However to answer your question — no I wouldn’t expect this
                  issue to affect HMR later.
                </Text>
              </Box>

              <HStack
                justifyContent="space-between"
                mt=".5em"
                color="var(--alt-text)"
              >
                <Text flex="1" pt=".4em" fontSize="15px">
                  Jun 29, 2019
                </Text>
                <Link href="https://twitter.com/kafLamed" isExternal>
                  <ExternalLink size="20" color="var(--alt-text)" />
                </Link>
                <Trash2 size="20" />
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ) : (
        <HStack justifyContent="space-between" mt="1.2em">
          <Text py=".2em" flex="1">
            {truncated}
          </Text>
          <Link href="https://twitter.com/kafLamed" isExternal>
            <ExternalLink size="20" color="var(--alt-text)" />
          </Link>
          <Trash2 size="20" color="var(--alt-text)" />
        </HStack>
      )}
    </Box>
  );
};
