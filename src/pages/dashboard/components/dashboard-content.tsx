import { Box } from "@chakra-ui/react";
import React from "react";

export const DashboardContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box mt="5em" width="85%" px={{ lg: "1.6em", md: "1em", base: ".6em" }}>
      {children}
    </Box>
  );
};
