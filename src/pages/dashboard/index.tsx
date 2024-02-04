import {
  Flex,
  Box,
  Text,
  UnorderedList,
  ListItem,
  Avatar,
} from "@chakra-ui/react";
import { CustomButton } from "../../components/button";
import { LibraryBig, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SIDEBAR_NAV = [
  { name: "books", icon: <LibraryBig size="25" />, path: "/dashboard" },
  { name: "profile", icon: <User size="25" />, path: "/account" },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Flex>
      <Flex
        className="sidebar-nav"
        borderRight="1px solid var(--matte-black)"
        height="100vh"
        width="15%"
        py="1em"
        px=".8em"
        flexFlow="column"
        justifyContent="space-between"
      >
        <Box>
          <Text as="h3" fontSize="30px" fontWeight="600">
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
            <UnorderedList pl=".6em">
              {SIDEBAR_NAV?.map(({ name, path, icon }, index) => {
                return (
                  <ListItem listStyleType="none" key={index} py=".6em">
                    <Flex
                      className={pathname === path ? "sidebar-item" : ""}
                      onClick={() => navigate(path)}
                      width="100%"
                      py=".6em"
                      gap=".4em"
                      pl=".6em"
                      borderRadius="6px"
                      color={pathname === path ? "#fff" : "#000"}
                      _hover={{
                        cursor: "pointer",
                        background: "var(--true-purple-400)",
                      }}
                      transition="all .3s ease-in"
                    >
                      {icon}
                      <Text my="auto" textTransform="capitalize">
                        {name}
                      </Text>
                    </Flex>
                  </ListItem>
                );
              })}
            </UnorderedList>
          </Box>
        </Box>

        <CustomButton
          type="button"
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
