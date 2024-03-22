import React from "react";
import { setCookie } from "cookies-next";
import { Center, Text } from "@chakra-ui/react";
import { useToastContext } from "@hooks/toast";
import { authCookieOptions } from "@utils/misc";
import { useAuthContext } from "@hooks/auth";
import { exchange } from "@utils/oauth-helpers";
import { useRouter } from "next/router";

export default function Oauth() {
  const router = useRouter();
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();

  React.useEffect(() => {
    const exchangeTokenForUser = async () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = params.get("access_token");

      try {
        if (accessToken) {
          setCookie("_gat", accessToken, {
            ...authCookieOptions,
          });

          const user = await exchange(accessToken);

          authenticator(true, user);
          router.prefetch("/dashboard")
          router.push("/dashboard");
          openToast("Logged in successfully!", "success");
        } else {
          router.push("/signin");
          openToast("something went wrong! Try again.", "error");
        }
      } catch (error) {
        openToast(`${error}`, "error");
      }
    };

    exchangeTokenForUser();
  }, [authenticator, router, openToast]);

  return (
    <Center height="100vh">
      <Text>Please wait, while we take you to your dashboard...</Text>
    </Center>
  );
}
