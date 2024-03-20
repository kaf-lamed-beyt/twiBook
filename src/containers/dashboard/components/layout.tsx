import { Flex, useDisclosure } from "@chakra-ui/react";
import { Sidebar } from "./sidebar";
import { DashboardContent } from "./dashboard-content";
import { DashboardHeader } from "./header";
import { useRouter } from "next/router";
import { Upgrade } from "./upgrade";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const openBillingDrawer = () => {
    onOpen();

    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          tab: "billing",
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const closeBillingDrawer = () => {
    onClose();

    router.replace(router.pathname, undefined, { shallow: true });
  };

  return (
    <>
      <Flex>
        <Sidebar openDrawer={openBillingDrawer} />
        <>
          <DashboardHeader openDrawer={openBillingDrawer} />
          <DashboardContent>{children}</DashboardContent>
        </>
      </Flex>

      <Upgrade isOpen={isOpen} onClose={closeBillingDrawer} />
    </>
  );
};
