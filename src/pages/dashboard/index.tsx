import {
  Flex,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Avatar,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/button";
import { Book } from "lucide-react";

export const Dashboard = () => {
  return (
    <Flex>
      <Flex
        className="sidebar"
        borderRight="1px solid #333"
        height="100vh"
        width="15%"
        py="1em"
        px=".8em"
        flexFlow="column"
        justifyContent="space-between"
      >
        <Box>
          <Text as="h3" fontSize="28px" fontWeight="600">
            twi
            <Text
              as="span"
              color="var(--true-purple)"
              textDecoration="underline"
            >
              Book
            </Text>
          </Text>

          <Box as="nav" mt="4em">
            <UnorderedList>
              <ListItem listStyleType="none">
                <Flex
                  width="100%"
                  py=".6em"
                  gap=".6em"
                  pl=".2em"
                  borderRadius="6px"
                  _hover={{
                    cursor: "pointer",
                    background: "var(--true-purple-400)",
                  }}
                  transition="all .3s ease-in"
                >
                  <Book size="25" />
                  <Text>Books</Text>
                </Flex>
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>

        <CustomButton
          background="var(--success)"
          hoverBg="var(--success)"
          height="50px"
          fontSize="20px"
        >
          upgrade
        </CustomButton>
      </Flex>

      <Box className="dashboard-content" py=".8em" px="1.6em" width="85%">
        <Flex justifyContent="space-between">
          <Text my="auto" fontSize="20px" fontWeight="700">
            Hello, Seven
          </Text>
          <Avatar name="Beven" />
        </Flex>
      </Box>
    </Flex>
  );
};
