import {
  Box,
  Text,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";
import { CustomButton } from "@components/button";
import { useToastContext } from "@hooks/toast";
import { usePricing } from "@hooks/use-pricing";
import { useUser } from "@hooks/user";
import { BadgeCheck } from "lucide-react";
import axios from "axios";
import React from "react";

interface UpgradeProps {
  isOpen: boolean;
  onClose: () => void;
}

export type TwibookPlans = {
  planId: string | undefined;
  variantId: string | undefined;
  planName: string | undefined;
  planPrice: string | undefined;
};

export const Upgrade = ({ isOpen, onClose }: UpgradeProps) => {
  const { data: products } = usePricing();
  const { twib } = useUser();
  const { openToast } = useToastContext();

  const plans = products?.filter(
    (product: TwibookPlans) => product?.planName !== "Free"
  );

  const yearlyPlans = plans?.filter((plan: TwibookPlans) =>
    plan?.planPrice?.includes("year")
  );
  const monthlyPlans = plans?.filter((plan: TwibookPlans) =>
    plan?.planPrice?.includes("month")
  );

  const upgradePlan = async (id: string | undefined) => {
    openToast("Processing...", "success");
    try {
      const response = await axios.post("/api/get-license", {
        productId: id,
        userId: twib?.id,
      });

      if (response) {
        if (typeof window !== "undefined") {
          window.open(response?.data?.attributes?.url, "_blank");
        }
      }
    } catch (error) {
      openToast("An error occured. Please try again", "error");
      console.error(error);
    }
  };

  return (
    <Drawer size="md" isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <DrawerContent
        background="var(--alte-black)"
        border="1px solid var(--alte-grey)"
      >
        <DrawerCloseButton
          border="1px solid var(--matte-black)"
          color="var(--alt-text)"
        />
        <DrawerHeader
          px=".8em"
          py=".8em"
          fontWeight="normal"
          color="var(--alt-text)"
          borderBottom="1px solid var(--matte-black)"
        >
          Choose a plan that works for you.
        </DrawerHeader>

        <DrawerBody px=".8em" py="1em">
          <Box
            px=".8em"
            cursor="pointer"
            background="var(--eerie-black)"
            height="180px"
            borderRadius="6px"
            position="relative"
            border="1px solid var(--matte-black)"
          >
            <Box position="absolute" top="-10px" right="-8px">
              <BadgeCheck size="24px" color="#fff" fill="var(--true-purple)" />
            </Box>
            <Text fontSize="28px" textTransform="capitalize">
              {twib?.license_type}
            </Text>
            <Text fontSize="28px">
              {twib?.license_price === null ? "$0" : twib?.license_price}
              <Box color="var(--alt-text)" as="span" fontSize="16px">
                {twib?.license_price === "$3.99" || "$8.99"
                  ? "/month"
                  : "/year"}
              </Box>
            </Text>

            <Box mt="1.2em" float="right">
              <CustomButton
                fontWeight="normal"
                fontSize="20px"
                type="button"
                width="100%"
                height="55px"
                // @ts-ignore
                cursor="not-allowed"
                hoverBg="var(--matte-black)"
                background="var(--matte-black)"
              >
                Current plan
              </CustomButton>
            </Box>
          </Box>

          <Text
            textAlign="left"
            mt="1.6em"
            color="var(--alt-text)"
            fontSize="22px"
            pb=".2em"
          >
            Monthly
          </Text>
          <VStack
            spacing=".8em"
            pt="1.4em"
            borderTop="1px solid var(--matte-black)"
          >
            {monthlyPlans?.map(
              (
                { planId, variantId, planName, planPrice }: TwibookPlans,
                index: React.Key | null | undefined
              ) => {
                return (
                  <Box
                    key={index}
                    px=".8em"
                    cursor="pointer"
                    background="var(--eerie-black)"
                    height="180px"
                    width="100%"
                    borderRadius="6px"
                    position="relative"
                    border="1px solid var(--matte-black)"
                  >
                    <Text fontSize="28px">{planName}</Text>
                    <Text fontSize="28px">
                      {planPrice?.split("/")[0]}
                      <Box color="var(--alt-text)" as="span" fontSize="16px">
                        /{planPrice?.split("/")[1]}
                      </Box>
                    </Text>

                    <Box mt="1.2em" float="right">
                      <CustomButton
                        fontWeight="normal"
                        fontSize="20px"
                        type="button"
                        width="100%"
                        height="55px"
                        hoverBg="var(--matte-black)"
                        background="var(--matte-black)"
                        onClick={() => upgradePlan(variantId)}
                      >
                        Upgrade
                      </CustomButton>
                    </Box>
                  </Box>
                );
              }
            )}
          </VStack>

          <Text
            textAlign="left"
            mt="1.6em"
            color="var(--alt-text)"
            fontSize="22px"
            pb=".2em"
          >
            Yearly
          </Text>
          <VStack
            spacing=".8em"
            pt="1.4em"
            borderTop="1px solid var(--matte-black)"
          >
            {yearlyPlans?.map(
              ({ planId, planName, planPrice }: TwibookPlans) => {
                return (
                  <Box
                    key={planId}
                    px=".8em"
                    cursor="pointer"
                    background="var(--eerie-black)"
                    height="180px"
                    width="100%"
                    borderRadius="6px"
                    position="relative"
                    border="1px solid var(--matte-black)"
                  >
                    <Text fontSize="28px">{planName}</Text>
                    <Text fontSize="28px">
                      {planPrice?.split("/")[0]}
                      <Box color="var(--alt-text)" as="span" fontSize="16px">
                        /{planPrice?.split("/")[1]}
                      </Box>
                    </Text>

                    <Box mt="1.2em" float="right">
                      <CustomButton
                        fontWeight="normal"
                        fontSize="20px"
                        type="button"
                        width="100%"
                        height="55px"
                        hoverBg="var(--matte-black)"
                        background="var(--matte-black)"
                      >
                        Upgrade
                      </CustomButton>
                    </Box>
                  </Box>
                );
              }
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
