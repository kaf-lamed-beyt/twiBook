import { Text, Box } from "@chakra-ui/react";
import { DashboardLayout } from "./components/layout";

export const Profile = () => {
  return (
    <DashboardLayout>
      <Box py=".8em">
        <Text>Minding my own profile</Text>
      </Box>
    </DashboardLayout>
  );
};
