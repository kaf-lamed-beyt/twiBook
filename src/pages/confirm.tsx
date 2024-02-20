import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToastContext } from "@hooks/toast";
import { useAuthContext } from "@hooks/auth";
import { setCookie } from "cookies-next";
import { authCookieOptions } from "@utils/misc";
import { exchange } from "@utils/oauth-helpers";

export const ConfirmEmail = () => {
  const navigate = useNavigate();
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();
  const [searchParams] = useSearchParams();

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
          navigate("/dashboard");
          openToast("Email verified!", "success");
        } else {
          navigate("/signin");
          openToast("Something went wrong. Please try again.", "error");
        }
      } catch (error) {
        openToast(`${error}`, "error");
      }
    };

    exchangeTokenForUser();
  }, [authenticator, navigate, openToast, searchParams]);

  return (
    <Center height="100vh">
      <Text>You're too awesome! Please, just a moment...</Text>
    </Center>
  );
};
