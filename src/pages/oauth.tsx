import React from "react";
import { setCookie } from "cookies-next";
import { Center, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastContext } from "@hooks/toast";
import { authCookieOptions } from "@utils/misc";
import { useAuthContext } from "@hooks/auth";
import { supabase } from "@utils/supabase";

export const Oauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();

  const exchange = async (token: string) => {
    const { data } = await supabase.auth.getUser(token);

    return data?.user;
  };

  React.useEffect(() => {
    const exchangeTokenForUser = async () => {
      const params = new URLSearchParams(location.hash.slice(1));
      const accessToken = params.get("access_token");

      try {
        if (accessToken) {
          setCookie("_gat", accessToken, {
            ...authCookieOptions,
          });

          const user = await exchange(accessToken);
          console.log("user from oauth: ", user);

          authenticator(true, user);
          navigate("/dashboard");
          openToast("Logged in successfully!", "success");
        } else {
          navigate("/signin");
          openToast("something went wrong! Try again.", "error");
        }
      } catch (error) {
        openToast(`${error}`, "error");
      }
    };

    exchangeTokenForUser();
  }, [authenticator, location.hash, navigate]);

  return (
    <Center height="100vh">
      <Text>Please wait, while we take you to your dashboard...</Text>
    </Center>
  );
};
