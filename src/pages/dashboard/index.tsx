import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { DashboardLayout } from "./components/layout";
import { BookmarkCard } from "./components/bookmark-card";
import { Bookmarks } from "@utils/data";
import { CustomButton } from "@components/button";
import { Plus, Search } from "lucide-react";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box py=".8em">
        <InputGroup my="1.4em">
          <InputLeftElement mt=".3em">
            <Search size="25" color="var(--alt-text)" />
          </InputLeftElement>
          <Input
            py="1.2em"
            px="1.8em"
            background="var(--eerie-black)"
            height="50px"
            width="100%"
            border="none"
            placeholder="Search bookmarks..."
            _placeholder={{ color: "var(--alt-text)" }}
            _focusVisible={{ border: "2px solid var(--true-purple)" }}
          />
        </InputGroup>

        <Flex gap="1em" flexWrap="wrap" my="2em">
          {Bookmarks.map(({ id, type, title, createdAt }, index) => {
            return (
              <BookmarkCard
                key={`book-${index}-${id}`}
                id={id}
                type={type}
                title={title}
                createdAt={createdAt}
              />
            );
          })}
        </Flex>
        {/* <NoBookmarks /> */}

        <Flex
          justifyContent="flex-end"
          mb="1.4em"
          position="fixed"
          bottom="10px"
          right="20px"
        >
          <CustomButton
            rounded
            type="button"
            width="50px"
            height="50px"
            hoverBg="var(--true-purple)"
            background="var(--true-purple)"
          >
            <Plus size="55" />
          </CustomButton>
        </Flex>
      </Box>
    </DashboardLayout>
  );
};
