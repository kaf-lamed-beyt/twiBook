import { Flex } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { DashboardContent } from "./header";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex>
      <Sidebar />
      <DashboardContent children={children} />
    </Flex>
  );
};
