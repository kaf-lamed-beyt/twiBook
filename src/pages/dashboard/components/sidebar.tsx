import { UnorderedList, ListItem, Text, Box, Flex } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomButton } from "@components/button";
import { LibraryBig, User } from "lucide-react";

const SIDEBAR_NAV = [
  { name: "books", icon: <LibraryBig size="25" />, path: "/dashboard" },
  { name: "profile", icon: <User size="25" />, path: "/dashboard/account" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  return (
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
          <Text as="span" color="var(--true-purple)" textDecoration="underline">
            Book
          </Text>
        </Text>

        <Box as="nav" mt="4em">
          <UnorderedList pl=".6em">
            {SIDEBAR_NAV?.map(({ name, path, icon }, index) => {
              return (
                <ListItem listStyleType="none" key={index} py=".6em">
                  <Flex
                    py=".6em"
                    gap=".4em"
                    pl=".6em"
                    width="100%"
                    borderRadius="6px"
                    onClick={() => navigate(path)}
                    className={pathname === path ? "sidebar-item" : ""}
                    color={pathname === path ? "#fff" : "var(--alt-text)"}
                    _hover={{
                      cursor: "pointer",
                      color: "#fff",
                      background: "var(--matte-black)",
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
        background="var(--true-purple)"
        hoverBg="var(--true-purple)"
        height="50px"
        fontSize="20px"
      >
        upgrade
      </CustomButton>
    </Flex>
  );
};
