import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { PLANS } from "@utils/data";
import { Sparkle } from "lucide-react";

export const PricingSection = () => {
  return (
    <Box id="pricing">
      <Text
        pb="1em"
        textAlign="center"
        fontWeight="500"
        fontSize={{ base: "18px", md: "22px", lg: "36px" }}
      >
        twiBook Plans
      </Text>

      <SimpleGrid
        py="1.8em"
        spacing={4}
        px={{ lg: "4.6em", base: ".6em" }}
        columns={{ lg: 3, base: 1, md: 2 }}
      >
        {PLANS.map(({ id, name, price, benefits }, index) => {
          return (
            <Box
              key={`twb-plan-${index}-${id}`}
              id={id}
              py=".8em"
              px="2em"
              width={{ lg: "420px", md: "100%", base: "100%" }}
              height="495px"
              borderRadius="8px"
              background="var(--eerie-black)"
              border={
                index === 1
                  ? "1px solid var(--true-purple)"
                  : "1px solid var(--matte-black)"
              }
            >
              <Box
                borderBottom="1px solid var(--matte-black)"
                pt="1em"
                pb="1.2em"
              >
                <Text className="plan_type" fontSize="28px">
                  {name}
                </Text>
                <Text fontSize="28px">
                  {price}{" "}
                  <Box as="span" color="var(--alt-text)" fontSize="16px">
                    /month
                  </Box>
                </Text>
              </Box>

              <Box my=".8em" height="250px">
                {benefits.map((item, index) => {
                  return (
                    <HStack spacing={2} py=".6em" key={index}>
                      <Sparkle
                        fill="var(--true-purple)"
                        color="var(--true-purple)"
                        size="20px"
                      />
                      <Text>{item}</Text>
                    </HStack>
                  );
                })}
              </Box>

              <Box>
                <CustomButton
                  fontWeight="normal"
                  fontSize="20px"
                  type="button"
                  width="100%"
                  height="55px"
                  hoverBg="var(--matte-black)"
                  background="var(--matte-black)"
                >
                  Get Started
                </CustomButton>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
