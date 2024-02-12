import React from "react";
import { setCookie } from "cookies-next";
import { Center, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToastContext } from "@hooks/toast";
import { authCookieOptions } from "@utils/misc";
import { useAuthContext } from "@hooks/auth";

export const Oauth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openToast } = useToastContext();
  const { authenticator } = useAuthContext();

  React.useEffect(() => {
    const params = new URLSearchParams(location.hash.slice(1));
    const accessToken = params.get("access_token");

    try {
      if (accessToken) {
        setCookie("_gat", accessToken, {
          ...authCookieOptions,
        });

        openToast("Logged in successfully!", "success");
        navigate("/dashboard");
      } else {
        navigate("/signin");
        openToast("something went wrong! Try again.", "error");
      }
    } catch (error) {
      openToast(`${error}`, "error");
    }
  }, [authenticator, location, navigate, openToast]);

  return (
    <Center height="100vh">
      <Text>Please wait, while we take you to your dashboard...</Text>
    </Center>
  );
};
