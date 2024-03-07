import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { useToastContext } from "@hooks/toast";
import { useAuthContext } from "@hooks/auth";
import { setCookie } from "cookies-next";
import { authCookieOptions } from "@utils/misc";
import { exchange } from "@utils/oauth-helpers";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export default function ConfirmEmail() {
  const router = useRouter();
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const exchangeTokenForUser = async () => {
      const token = searchParams.get("token_hash");

      try {
        if (token) {
          setCookie("token_hash", token, {
            ...authCookieOptions,
          });

          const user = await exchange(token);
          authenticator(true, user);
          router.push("/dashboard");
          openToast("Email verified!", "success");
        } else {
          router.push("/signin");
          openToast("Something went wrong. Please try again.", "error");
        }
      } catch (error) {
        openToast(`${error}`, "error");
      }
    };

    exchangeTokenForUser();
  }, [authenticator, openToast, router, searchParams]);

  return (
    <Center height="100vh">
      <Text>You&apos;re too awesome! Please, just a moment...</Text>
    </Center>
  );
}
