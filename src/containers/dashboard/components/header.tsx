import {
  Flex,
  Box,
  MenuButton,
  Menu,
  Avatar,
  MenuItem,
  MenuList,
  Text,
  MenuDivider,
} from "@chakra-ui/react";
import { LogOut, User } from "lucide-react";
import { useGreeting } from "@hooks/greeting";
import { useAuthContext } from "@hooks/auth";
import { authProviderFromSignIn } from "@utils/misc";
import { useUser } from "@hooks/user";

export const DashboardHeader = () => {
  const { twib } = useUser();
  const message = useGreeting();
  const { user, logout } = useAuthContext();

  // use the first part of their email if they don't have a username
  let username;
  let avatarUrl;
  const identity = user?.identities?.find(
    (user) => user.provider === authProviderFromSignIn
  );

  const fallbackU = localStorage.getItem("twbu");

  if (!identity && twib?.username === "") {
    const usr = user?.email?.split("@")[0];
    username = usr ? usr : fallbackU?.split("@")[0];
  }

  if (identity?.provider !== "twitter" && identity?.provider !== "google") {
    username = twib?.username;
  }

  if (identity?.provider === "twitter") {
    username = identity?.identity_data?.name;
    avatarUrl = identity?.identity_data?.avatar_url;
  }

  if (identity?.provider === "github") {
    username = identity?.identity_data?.user_name;
    avatarUrl = identity?.identity_data?.avatar_url;
  }

  if (identity?.provider === "google") {
    username = identity?.identity_data?.full_name.split(" ")[0];
    avatarUrl = identity?.identity_data?.avatar_url;
  }

  return (
    <Flex
      pb=".8em"
      py=".8em"
      right="0"
      width="85%"
      position="fixed"
      className="header"
      zIndex="3"
      background="var(--vampire-black)"
      px={{ lg: "1.6em", md: "1em", base: ".6em" }}
      justifyContent="space-between"
      borderBottom={{
        base: "1px solid var(--matte-black)",
        md: "1px solid var(--matte-black)",
        lg: "1px solid var(--matte-black)",
      }}
    >
      <Box>
        <Text my="auto" fontSize="20px" fontWeight="700">
          Hello, {username !== "undefined" ? username : fallbackU}
        </Text>
        <Box>
          <Text color="var(--alt-text)" fontSize="16px">
            {message}
          </Text>
        </Box>
      </Box>
      <Menu isLazy>
        <MenuButton>
          <Avatar
            name={username}
            textTransform="uppercase"
            src={
              avatarUrl
                ? avatarUrl
                : `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=ffdfbf`
            }
          />
        </MenuButton>
        <MenuList
          background="var(--eerie-black)"
          border="1px solid var(--matte-black)"
          py=".8em"
        >
          <MenuItem
            px=".8em"
            background="none"
            icon={<User size="25" color="var(--alt-text)" />}
          >
            <Text color="var(--alt-text)">{username}</Text>
          </MenuItem>
          <MenuDivider color="var(--alt-text)" />

          <MenuItem
            px=".8em"
            command="⌘X"
            background="none"
            onClick={() => logout()}
            icon={<LogOut size="25" color="var(--alt-text)" />}
          >
            <Text my="auto" color="var(--alt-text)">
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
