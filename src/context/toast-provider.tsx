import { useToast, Box, Text, Flex } from "@chakra-ui/react";
import { AlertTriangle, Ban, Radio } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

export interface ToastProviderProps {
  children: React.ReactNode;
}

export type ToastContextValues = {
  openToast: (message: string, status: "success" | "error" | "warning") => void;
};

const createToastContext = () =>
  React.createContext<ToastContextValues | null>(null);
export const ToastContext = createToastContext();

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useToast();
  const router = useRouter();
  const pathname = router.pathname;
  const toastId = `twb-toast-${crypto.randomUUID()}`;

  const showToast = (
    message: string,
    status: "success" | "error" | "warning"
  ) => {
    if (!toast.isActive(toastId)) {
      toast({
        render: () => (
          <Box
            px=".8em"
            width="350px"
            height="fit-content"
            borderTop="1px solid var(--matte-black)"
            borderRight="1px solid var(--matte-black)"
            borderBottom="1px solid var(--matte-black)"
            borderLeft={`3px solid ${
              status === "success"
                ? "var(--success)"
                : status === "warning"
                ? "var(--warn)"
                : "var(--danger)"
            }`}
            borderRadius="4px 6px 6px 4px"
            background="var(--eerie-black)"
          >
            <Flex my=".6em" gap=".6em">
              {status === "error" ? (
                <Ban
                  size="20"
                  color="var(--danger)"
                  style={{ marginTop: "3px" }}
                />
              ) : status === "warning" ? (
                <AlertTriangle color="var(--warn)" />
              ) : (
                <Radio
                  size="20"
                  color="var(--success)"
                  style={{ marginTop: "3px" }}
                />
              )}
              <Text color="var(--alt-text)" fontSize="16px" mt=".16em">
                {message}
              </Text>
            </Flex>
          </Box>
        ),
        duration: 3000,
        isClosable: true,
        position: pathname === "/signin" ? "top-right" : "top",
      });
    }
  };

  const values: ToastContextValues = {
    openToast: showToast,
  };

  return (
    <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
  );
};
