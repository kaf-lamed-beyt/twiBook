import { Flex } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { DashboardContent } from "./dashboard-content";
import { DashboardHeader } from "./header";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Flex>
      <Sidebar />
      <>
        <DashboardHeader />
        <DashboardContent>{children}</DashboardContent>
      </>
    </Flex>
  );
};
