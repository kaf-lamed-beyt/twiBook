import { useToastContext } from "@hooks/toast";
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import React from "react";
import { supabase } from "@utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { authCookieOptions } from "@utils/misc";
import * as forge from "node-forge";
import { useRouter } from "next/router";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export type AuthContextValues = {
  isAuthenticated: boolean;
  user?: User | null | undefined;
  authenticator: (
    isAuth: boolean,
    user?: User | undefined | null,
    hasCookieExpired?: boolean
  ) => void;
  logout: () => void;
};

const createAuthContext = () =>
  React.createContext<AuthContextValues | null>(null);
export const AuthContext = createAuthContext();

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { openToast } = useToastContext();

  const [authState, setAuthState] = React.useState<Partial<AuthContextValues>>({
    isAuthenticated: false,
    user: undefined,
  });

  const authenticateUser = async (
    isLoggedIn: boolean,
    user: AuthContextValues["user"]
  ) => {
    const { data } = await supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setAuthState({
          user: session?.user || user,
          isAuthenticated: isLoggedIn,
        });

        const generateAndStoreKeyPair = async () => {
          const keyPair = forge.pki.rsa.generateKeyPair({
            bits: 2048,
          });

          const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
          const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

          const { data: userData } = await supabase.auth.getUser();

          const { data: rsaData } = await supabase
            .from("rk")
            .select("*")
            .single();

          if (rsaData) return null;

          await supabase.from("rk").insert({
            id: userData?.user?.id,
            public_key_pem: publicKeyPem,
            private_key_pem: privateKeyPem,
          });
        };

        generateAndStoreKeyPair();

        setCookie(
          "_as",
          { user: session?.user || user, isAuthenticated: isLoggedIn },
          {
            ...authCookieOptions,
          }
        );
      } else if (event === "SIGNED_OUT") {
        setAuthState({
          user: null,
          isAuthenticated: false,
        });

        deleteCookie("_at", {
          ...authCookieOptions,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    deleteCookie("_at", {
      ...authCookieOptions,
    });

    deleteCookie("_as", {
      ...authCookieOptions,
    });

    deleteCookie("_gat", {
      ...authCookieOptions,
    });

    deleteCookie("_prov", {
      ...authCookieOptions,
    });

    authenticateUser(false, undefined);
    localStorage.clear();

    if (!error) {
      openToast("Logged out successfully!", "success");
      router.push("/signin");
    }
  };

  React.useEffect(() => {
    const storedAuthState = getCookie("_as")
    if (storedAuthState) {
      const parsedAuthState = JSON.parse(storedAuthState);
      setAuthState(parsedAuthState);
    }


    if (pathname.startsWith("/dashboard")) {
      if (authState.isAuthenticated === false) {
        if (!hasCookie("_gat")) {
          openToast("You need to log in.", "error");
          router.push("/signin");
        }
      } else {
        router.push("/dashboard");
      }
    } else if (pathname === "/signin" && authState.isAuthenticated === true) {
      router.push("/dashboard");
    }
  }, []);

  const values: AuthContextValues = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated ?? false,
    authenticator: authenticateUser,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
