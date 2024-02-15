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
  useDisclosure
} from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { ModalLayout } from "@components/modal-layout";
import { ExternalLink, Flame, ShieldAlert, Trash2 } from "lucide-react";

export interface BookmarkCardProps {
  id: string;
  createdAt: string;
  type: "detailed" | "simple";
  title: string;
  bookLink: string;
  bookId: string;
  content?: {
    authorAvatar: string;
    displayName: string;
    handle: string;
    tweet: string;
    date: string;
  }[];
  onDelete: (bookId: string) => void;
}

export const BookmarkCard = ({
  id,
  type,
  title,
  createdAt,
  bookLink,
  bookId,
  onDelete
}: BookmarkCardProps) => {
  const truncated =
    title.length > 38 ? `${title.split("").slice(0, 38).join("")}...` : title;

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <>
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
            Added {createdAt}
          </Text>
          <Badge
            height="18px"
            borderRadius="4px"
            color={type === "detailed" ? "var(--success)" : "var(--warn)"}
            background={
              type === "detailed" ? "var(--success-400)" : "var(--warn-400)"
            }
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
                  <Link href={bookLink} isExternal>
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
        title={`Delete ${truncated}?`}
      >
        <Box>
          <Text color="var(--alt-text)">
            Are you sure you want to delete{" "}
            <Text as="span" color="#fff" fontWeight="bold">
              {title}
            </Text>
            ?
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
              onClick={()  => onDelete(bookId)}
            >
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalLayout>
    </>
  );
};
