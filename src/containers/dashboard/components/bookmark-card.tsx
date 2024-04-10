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
  Link,
  Flex,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { ModalLayout } from "@components/modal-layout";
import dayjs from "dayjs";
import {
  ExternalLink,
  Reply,
  Flame,
  Globe2,
  ShieldAlert,
  Trash2,
  Quote,
  Puzzle
} from "lucide-react";

export interface BookmarkCardProps {
  id: string;
  createdAt: string;
  type?: string;
  title: string;
  bookLink: string | undefined;
  bookId: string;
  content?: {
    tweetBy: {
      userName: string;
      fullName: string;
      profileImage: string;
    };
    quoted: string;
    fullText: string;
    createdAt: string;
  };
  onDelete: (bookId: string) => void;
  pendingDelete: boolean;
}

export const BookmarkCard = ({
  id,
  type,
  title,
  createdAt,
  bookLink,
  bookId,
  onDelete,
  content,
  pendingDelete,
}: BookmarkCardProps) => {
  const tweetBy = content?.tweetBy;
  const fullText = content?.fullText;
  const tweetDate = content?.createdAt;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const truncated =
    title.length > 38 ? `${title.split("").slice(0, 38).join("")}...` : title;

  const isReply = fullText?.split(" ")[0].includes("@");
  const withLeftAngle = fullText?.includes("&lt;");
  const withRightAngle = fullText?.includes("&gt;");
  const isQuotedTweet = content?.quoted;

  const formattedFullText = isReply
    ? fullText?.split(" ").slice(1).join(" ")
    : withLeftAngle && withRightAngle
    ? fullText?.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    : withLeftAngle
    ? fullText?.replace(/&lt;/g, "<")
    : withRightAngle
    ? fullText?.replace(/&gt;/g, ">")
    : fullText;

  return (
    <>
      <Box
        id={id}
        background="var(--eerie-black)"
        border="1px solid var(--matte-black)"
        height="fit-content"
        width="100%"
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
            Added {createdAt}
          </Text>
          <Badge
            height="18px"
            borderRadius="4px"
            color={
              type === "detailed"
                ? "var(--success)"
                : type === "external"
                  ? "var(--external)"
                  : type === "direct"
                    ? "var(--true-purple)"
                    : "var(--warn)"
            }
            background={
              type === "detailed"
                ? "var(--success-400)"
                : type === "external"
                  ? "var(--external-400)"
                  : type === "direct"
                    ? "var(--true-purple-400)"
                    : "var(--warn-400)"
            }>
            <HStack spacing={1}>
              {type === "detailed" ? (
                <Flame size="14" color="var(--success)" />
              ) : type === "external" ? (
                <Globe2 size="14" color="var(--external)" />
              ) : type === "direct" ? (
                <Puzzle size="14" color="var(--true-purple)" />
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
                  <HStack gap={160}>
                    <Flex gap=".5em">
                      <Box boxSize="50px">
                        <Image
                          alt={`${tweetBy?.fullName}'s profile picture`}
                          borderRadius="full"
                          src={tweetBy?.profileImage}
                        />
                      </Box>
                      <Box>
                        <Text fontWeight="bold">{tweetBy?.fullName}</Text>
                        <Text color="var(--alt-text)" fontSize="15px">
                          @{tweetBy?.userName}
                        </Text>
                      </Box>
                    </Flex>

                    {isReply ? (
                      <Tooltip
                        placement="auto"
                        label="This is a reply to a tweet."
                        background="var(--eerie-black)"
                        border="1px solid var(--matte-black)"
                      >
                        <Reply size="20" color="var(--alt-text)" />
                      </Tooltip>
                    ) : isQuotedTweet !== undefined ? (
                      <Tooltip
                        placement="auto"
                        label="This is a quoted tweet."
                        background="var(--eerie-black)"
                        border="1px solid var(--matte-black)"
                      >
                        <Quote size="20" color="var(--alt-text)" />
                      </Tooltip>
                    ) : null}
                  </HStack>

                  <Text
                    className="tweet"
                    color="#fff"
                    mt=".8em"
                    whiteSpace="pre-line"
                  >
                    {formattedFullText}
                  </Text>
                </Box>

                <HStack
                  justifyContent="space-between"
                  mt=".5em"
                  color="var(--alt-text)"
                >
                  <Text flex="1" pt=".4em" fontSize="15px">
                    {dayjs(tweetDate).format("MMM DD, YYYY")}
                  </Text>
                  <Link href={bookLink} isExternal>
                    <ExternalLink size="20" color="var(--alt-text)" />
                  </Link>
                  <Trash2 size="20" onClick={onOpen} />
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <HStack justifyContent="space-between" mt="1.2em">
            <Text py=".2em" flex="1">
              {truncated}
            </Text>
            <Link href={bookLink} isExternal>
              <ExternalLink size="20" color="var(--alt-text)" />
            </Link>
            <Trash2 size="20" color="var(--alt-text)" onClick={onOpen} />
          </HStack>
        )}
      </Box>

      <ModalLayout
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        title={`Delete bookmark?`}
      >
        <Box>
          <Text color="var(--alt-text)">
            Are you sure you want to delete{" "}
            <Text as="span" color="#fff" fontWeight="bold">
              {title}
            </Text>
            ?
          </Text>

          <Text py="1em" color="var(--alt-text)">
            Please be careful. This action is irreversible!
          </Text>

          <Box my="1em">
            <CustomButton
              type="button"
              height="50px"
              hoverBg="var(--danger)"
              fontWeight="normal"
              fontSize="20px"
              width="100%"
              background="var(--danger)"
              loading={pendingDelete}
              loadingText="Deleting..."
              onClick={() => onDelete(bookId)}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalLayout>
    </>
  );
};
