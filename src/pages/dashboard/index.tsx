import { Box, Text } from "@chakra-ui/react";
import { DashboardLayout } from "./components/layout";

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box py=".8em">
        <Text>Minding my own business</Text>
      </Box>
    </DashboardLayout>
  );
};
