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
import { useToastContext } from "@hooks/toast";
import { supabase } from "@utils/supabase";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useGreeting } from "@hooks/greeting";

export const DashboardHeader = () => {
  const message = useGreeting();
  const navigate = useNavigate();
  const { openToast } = useToastContext();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    // deleteCookie("_at")

    if (!error) {
      openToast("Logged out successfully!", "success");
      navigate("/signin");
    }
  };

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
        lg: "none",
      }}
    >
      <Box>
        <Text my="auto" fontSize="20px" fontWeight="700">
          Hello, Seven
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
            name="Seven"
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=seven&backgroundColor=ffdfbf"
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
            <Text color="var(--alt-text)">Seven</Text>
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
