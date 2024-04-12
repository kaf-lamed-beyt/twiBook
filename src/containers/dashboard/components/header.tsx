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
import { LogOut, Rocket, User } from "lucide-react";
import { useGreeting } from "@hooks/greeting";
import { useAuthContext } from "@hooks/auth";
import { authProviderFromSignIn } from "@utils/misc";
import { useSession, useUser } from "@hooks/user";

interface HeaderProps {
  openDrawer: () => void;
}

export const DashboardHeader = ({ openDrawer }: HeaderProps) => {
  const { twib } = useUser();
  const { session: data } = useSession();
  const message = useGreeting();
  const { user, logout } = useAuthContext();

  const userMetadata = data?.session?.user?.user_metadata;

  // use the first part of their email if they don't have a username
  let username;
  let avatarUrl;
  const identity = user?.identities?.find(
    (user) => user.provider === authProviderFromSignIn
  );

  let fallbackU;

  if (typeof window !== "undefined") {
    fallbackU = localStorage.getItem("twbu");
  }

  if (!identity && twib?.username === "") {
    const usr = user?.email?.split("@")[0];
    username = usr ? usr : fallbackU?.split("@")[0];
  }

  if (authProviderFromSignIn === "twitter") {
    username = userMetadata?.name;
    avatarUrl = userMetadata?.avatar_url;
  }

  if (authProviderFromSignIn === "github") {
    username = userMetadata?.user_name;
    avatarUrl = userMetadata?.avatar_url;
  }

  if (authProviderFromSignIn === "google") {
    username = userMetadata?.full_name.split(" ")[0];
    avatarUrl = userMetadata?.avatar_url;
  }

  return (
    <Flex
      pb=".8em"
      py=".8em"
      right="0"
      width={{ lg: "85%", base: "88%", md: "90%" }}
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
            background="none"
            onClick={openDrawer}
            icon={<Rocket size="22" color="var(--alt-text)" />}
          >
            <Text my="auto" color="var(--alt-text)">
              Upgrade
            </Text>
          </MenuItem>

          <MenuItem
            px=".8em"
            command="⌘X"
            background="none"
            onClick={() => logout()}
            icon={<LogOut size="22" color="var(--alt-text)" />}
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
