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
      py="1em"
      top="0"
      height="100vh"
      flexFlow="column"
      position="sticky"
      className="sidebar-nav"
      justifyContent="space-between"
      borderRight="1px solid var(--matte-black)"
      width={{ lg: "15%", md: "15%", base: "15%" }}
    >
      <Box>
        <Text
          as="h3"
          px=".8em"
          fontSize={{ lg: "27px", md: "25px" }}
          fontWeight="600"
          display={{ lg: "block", md: "none", base: "none" }}
        >
          twi
          <Text as="span" color="var(--true-purple)" textDecoration="underline">
            Book
          </Text>
        </Text>

        <Box
          height="40px"
          width="40px"
          ml={{ base: "-.2em", lg: "4em", md: "" }}
          borderRadius="4px"
          background="var(--true-purple)"
          display={{ lg: "none", md: "flex", base: "flex" }}
          justifyContent="center"
          alignItems="center"
          mx="auto"
        >
          <LibraryBig size="28" />
        </Box>

        <Box as="nav" mt="4em" mx={{ md: "auto" }}>
          <UnorderedList pl="1.4em">
            {SIDEBAR_NAV?.map(({ name, path, icon }, index) => {
              return (
                <ListItem
                  py=".6em"
                  key={index}
                  listStyleType="none"
                  className={pathname === path ? "sidebar-item" : ""}
                  marginLeft={{ md: "-28px", lg: "0px", base: "3px" }}
                >
                  <Flex
                    py=".6em"
                    gap=".4em"
                    ml={{ base: "-2em", md: "-2em", lg: "-.8em" }}
                    pl={{ lg: ".6em", md: ".7em", base: ".5em" }}
                    width={{ base: "42px", lg: "100%", md: "48px" }}
                    mx={{ md: "auto" }}
                    borderRadius="6px"
                    background={pathname == path ? "var(--matte-black)" : ""}
                    onClick={() => navigate(path)}
                    color={pathname === path ? "#fff" : "var(--alt-text)"}
                    _hover={{
                      cursor: "pointer",
                      color: "#fff",
                      background: "var(--matte-black)",
                    }}
                    transition="all .3s ease-in"
                  >
                    {icon}
                    <Text
                      my="auto"
                      textTransform="capitalize"
                      display={{ lg: "block", md: "none", base: "none" }}
                    >
                      {name}
                    </Text>
                  </Flex>
                </ListItem>
              );
            })}
          </UnorderedList>
        </Box>
      </Box>

      <Box display={{ lg: "block", md: "block", base: "none" }} px=".8em">
        <CustomButton
          type="button"
          background="var(--true-purple)"
          hoverBg="var(--true-purple)"
          height="50px"
          fontSize={{ md: "18px", lg: "20px" }}
          fontWeight="500"
          width="100%"
        >
          upgrade
        </CustomButton>
      </Box>
    </Flex>
  );
};
