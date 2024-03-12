import React from "react";
import { Box, Tooltip, HStack, Text } from "@chakra-ui/react";
import { Hint } from "@components/hint";

export interface BookDeets {
  icon: React.ReactElement;
  name: string;
  toolTip?: boolean;
  toolTipLabel?: string;

  info: string | number | undefined;
}

export const BookDetails = ({ name, icon, toolTip, info }: BookDeets) => {
  return (
    <Box
      px="1.2em"
      py=".5em"
      width={{ lg: "100%", md: "50%", base: "100%" }}
      borderRadius="8px"
      background="var(--eerie-black)"
      border="1px solid var(--matte-black)"
    >
      <HStack justifyContent="space-between" color="var(--alt-text)">
        <Text fontSize="90px" fontWeight="700">
          {info}
          {toolTip ? (
            <Box
              as="span"
              fontSize="25px"
              ml="-12px"
              _hover={{ cursor: "pointer" }}
            >
              <Tooltip
                width="276px"
                borderRadius="8px"
                background="var(--eerie-black)"
                border="1px solid var(--matte-black)"
                color="var(--alt-text)"
                label={`On the free plan, you can only create Quotas.FREE bookmarks per month`}
              >
                <Box as="span" marginLeft="10px">
                  /
                  <Hint />
                </Box>
              </Tooltip>
            </Box>
          ) : null}
        </Text>
        <Box mt="-4em">{icon}</Box>
      </HStack>
      <Text
        py=".6em"
        float="right"
        fontSize={{ base: "18px", lg: "25px", md: "18px" }}
        color="var(--alt-text)"
      >
        {name}
      </Text>
    </Box>
  );
};
