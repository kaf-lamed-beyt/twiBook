import { Badge, Box, HStack, Link, Text, useDisclosure } from "@chakra-ui/react"
import { CustomButton } from "@components/button"
import { ModalLayout } from "@components/modal-layout"
import { ExternalLink, Flame, Globe2, ShieldAlert, Trash2 } from "lucide-react"

export interface BookmarkCardProps {
  id: string
  createdAt: string
  type?: string
  title: string
  bookLink: string | undefined
  bookId: string
  content?: {
    tweetBy: {
      userName: string
      fullName: string
      profileImage: string
    }
    quoted: string
    fullText: string
    createdAt: string
  }
  onDelete: (bookId: string) => void
  pendingDelete: boolean
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
  pendingDelete
}: BookmarkCardProps) => {
  const tweetBy = content?.tweetBy
  const fullText = content?.fullText
  const tweetDate = content?.createdAt
  const { isOpen, onOpen, onClose } = useDisclosure()

  const truncated =
    title.length > 38 ? `${title.split("").slice(0, 38).join("")}...` : title

  const isReply = fullText?.split(" ")[0].includes("@")
  const withLeftAngle = fullText?.includes("&lt;")
  const withRightAngle = fullText?.includes("&gt;")
  const isQuotedTweet = content?.quoted

  const formattedFullText = isReply
    ? fullText?.split(" ").slice(1).join(" ")
    : withLeftAngle && withRightAngle
      ? fullText?.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      : withLeftAngle
        ? fullText?.replace(/&lt;/g, "<")
        : withRightAngle
          ? fullText?.replace(/&gt;/g, ">")
          : fullText

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
          transition: "all .3s ease-in"
        }}>
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
                  : "var(--warn)"
            }
            background={
              type === "detailed"
                ? "var(--success-400)"
                : type === "external"
                  ? "var(--external-400)"
                  : "var(--warn-400)"
            }>
            <HStack spacing={1}>
              {type === "detailed" ? (
                <Flame size="14" color="var(--success)" />
              ) : type === "external" ? (
                <Globe2 size="14" color="var(--external)" />
              ) : (
                <ShieldAlert size="14" color="var(--warn)" />
              )}
              <Text my="auto" fontSize="12px" fontWeight="bold">
                {type}
              </Text>
            </HStack>
          </Badge>
        </HStack>

        <HStack justifyContent="space-between" mt="1.2em">
          <Text py=".2em" flex="1">
            {truncated}
          </Text>
          <Link href={bookLink} isExternal>
            <ExternalLink size="20" color="var(--alt-text)" />
          </Link>
          <Trash2 size="20" color="var(--alt-text)" onClick={onOpen} />
        </HStack>
      </Box>

      <ModalLayout
        size="md"
        isOpen={isOpen}
        onClose={onClose}
        title={`Delete bookmark?`}>
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
              hoverBg="rgba(215, 0, 64, 1)"
              fontWeight="normal"
              fontSize="20px"
              width="100%"
              background="rgba(215, 0, 64, 1)"
              loading={pendingDelete}
              loadingText="Deleting..."
              onClick={() => onDelete(bookId)}>
              Delete
            </CustomButton>
          </Box>
        </Box>
      </ModalLayout>
    </>
  )
}
