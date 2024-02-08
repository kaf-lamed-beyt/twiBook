import { Badge, Box, HStack, Text } from "@chakra-ui/react";
import { ChevronDown, Flame, ShieldAlert, Trash2 } from "lucide-react";

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
      _hover={{
        cursor: "pointer",
        transform: "scale(1.04)",
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
      <HStack justifyContent="space-between" mt=".8em">
        <Text>{title}</Text>
        {type === "detailed" ? (
          <ChevronDown size="20" color="var(--alt-text)" />
        ) : (
          <Trash2 size="20" color="var(--alt-text)" />
        )}
      </HStack>
      {/* <Flex justifyContent="flex-end">
        <Box _hover={{ cursor: "pointer", color: "#fff" }}>
          <Trash2 size="23" color="var(--alt-text)" />
        </Box>
      </Flex> */}
    </Box>
  );
};
