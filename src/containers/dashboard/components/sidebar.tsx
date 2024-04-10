import { UnorderedList, Text, Box, Flex, Link } from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { LibraryBig, Puzzle, Rocket, User } from "lucide-react";
import { Animated } from "@externals/index";
import { useRouter } from "next/router";

const SIDEBAR_NAV = [
  { name: "books", icon: <LibraryBig size="25" />, path: "/dashboard" },
  { name: "profile", icon: <User size="25" />, path: "/dashboard/account" },
];

interface SidebarProps {
  openDrawer: () => void;
}

export const Sidebar = ({ openDrawer }: SidebarProps) => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Flex
        py="1em"
        top="0"
        height="100vh"
        flexFlow="column"
        position="sticky"
        className="sidebar-nav"
        justifyContent="space-between"
        borderRight="1px solid var(--matte-black)"
        width={{ lg: "15%", md: "10%", base: "12%" }}
      >
        <Box>
          <Text
            as="h3"
            px=".8em"
            fontSize={{ lg: "27px", md: "25px" }}
            fontWeight="600"
            display={{ lg: "block", md: "none", base: "none" }}
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            twi
            <Text
              as="span"
              color="var(--true-purple)"
              textDecoration="underline"
            >
              Book
            </Text>
          </Text>

          <Box
            onClick={() => router.push("/")}
            height="40px"
            cursor="pointer"
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
                  <Animated.ListItem
                    py=".6em"
                    key={index}
                    listStyleType="none"
                    className={pathname === path ? "sidebar-item" : ""}
                    marginLeft={{ md: "-28px", lg: "0px", base: "3px" }}
                  >
                    <Flex
                      py=".6em"
                      gap=".4em"
                      ml={{ base: "-2.4em", md: "-2.8em", lg: "-.8em" }}
                      pl={{ lg: ".6em", md: ".7em", base: ".5em" }}
                      width={{ base: "40px", lg: "100%", md: "43px" }}
                      mx={{ md: "auto" }}
                      borderRadius="6px"
                      background={pathname == path ? "var(--matte-black)" : ""}
                      color={pathname === path ? "#fff" : "var(--alt-text)"}
                      _hover={{
                        cursor: "pointer",
                        color: "#fff",
                        background: "var(--matte-black)",
                      }}
                      transition="all .3s ease-in"
                      onClick={() => router.push(path)}
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
                  </Animated.ListItem>
                );
              })}
              <Link
                isExternal
                _hover={{
                  textDecoration: "none",
                }}
                href="https://chromewebstore.google.com/detail/twibook/aldmohfochmepihfkhngifhopkmckpgo"
              >
                <Animated.ListItem
                  py=".6em"
                  listStyleType="none"
                  marginLeft={{ md: "-28px", lg: "0px", base: "3px" }}
                >
                  <Flex
                    py=".6em"
                    gap=".4em"
                    ml={{ base: "-2.4em", md: "-2.8em", lg: "-.8em" }}
                    pl={{ lg: ".6em", md: ".7em", base: ".5em" }}
                    width={{ base: "40px", lg: "100%", md: "43px" }}
                    mx={{ md: "auto" }}
                    borderRadius="6px"
                    color="var(--alt-text)"
                    _hover={{
                      cursor: "pointer",
                      color: "#fff",
                      background: "var(--matte-black)",
                    }}
                    transition="all .3s ease-in"
                  >
                    <Puzzle size="25" />
                    <Text
                      my="auto"
                      textTransform="capitalize"
                      display={{ lg: "block", md: "none", base: "none" }}
                    >
                      extension
                    </Text>
                  </Flex>
                </Animated.ListItem>
              </Link>
            </UnorderedList>
          </Box>
        </Box>

        <Box
          display={{ lg: "block", md: "none", base: "none" }}
          cursor="pointer"
          px=".8em"
        >
          <CustomButton
            type="button"
            background="var(--true-purple)"
            hoverBg="var(--true-purple)"
            height="50px"
            fontSize={{ md: "18px", lg: "20px" }}
            fontWeight="500"
            width="100%"
            onClick={openDrawer}
          >
            upgrade
          </CustomButton>
        </Box>

        <Box
          display={{ lg: "none", md: "block", base: "none" }}
          px={{ md: ".8em", base: ".3em" }}
        >
          <CustomButton
            type="button"
            background="var(--true-purple)"
            hoverBg="var(--true-purple)"
            height="40px"
            fontSize={{ md: "18px" }}
            fontWeight="500"
            width="100%"
          >
            <Rocket size="40" />
          </CustomButton>
        </Box>
      </Flex>
    </>
  );
};
