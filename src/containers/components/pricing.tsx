import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { PLANS } from "@utils/data";
import { Sparkle } from "lucide-react";
import { Animated } from "@externals/index";
import React from "react";
import { useTrail } from "@react-spring/web";

export const PricingSection = () => {
  const [inView, setInView] = React.useState<boolean>(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      {
        rootMargin: "40%",
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const pricingSprings = useTrail(3, {
    config: { duration: 300, delay: 3 },
    from: {
      opacity: 0,
      transform: inView ? "translateY(0px)" : "translateY(200px)",
    },
    to: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(200px)",
    },
  });

  return (
    <Box id="pricing" ref={ref}>
      <Text
        pb="1em"
        textAlign="center"
        fontWeight="500"
        fontSize={{ base: "28px", md: "22px", lg: "36px" }}
      >
        Find the plan that&apos;s right for you.
      </Text>

      <SimpleGrid
        py="1.8em"
        spacing={4}
        px={{ lg: "4.6em", base: ".6em" }}
        columns={{ lg: 3, base: 1, md: 2 }}
      >
        {PLANS.map(({ id, name, price, benefits }, index) => {
          return (
            <Animated.Box
              key={`twb-plan-${index}-${id}`}
              id={id}
              py=".8em"
              px="2em"
              style={pricingSprings[index]}
              width={{ lg: "420px", md: "100%", base: "100%" }}
              height="560px"
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
                  {price}
                  <Box as="span" color="var(--alt-text)" fontSize="16px">
                    /month
                  </Box>
                </Text>
              </Box>

              <Box my=".8em" height="310px">
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
            </Animated.Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
