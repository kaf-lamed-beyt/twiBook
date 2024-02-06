import {
  Box,
  Text,
  Flex,
  Avatar,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  MenuDivider,
} from "@chakra-ui/react";
import { supabase } from "@utils/supabase";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToastContext } from "@context/toast";

export const DashboardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();
  const { openToast } = useToastContext();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      openToast("Logged out successfully!", "success");
      navigate("/signin");
    }
  };

  return (
    <Box className="dashboard" width="85%" py=".8em" px="1.6em">
      <Flex justifyContent="space-between">
        <Text my="auto" fontSize="20px" fontWeight="700">
          Hello, Seven
        </Text>
        <Menu isLazy>
          <MenuButton>
            <Avatar
              name="Beven"
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Beven&backgroundColor=ffdfbf"
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
              <Text color="var(--alt-text)">Beven</Text>
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

      {children}
    </Box>
  );
};
