import { useToastContext } from "@hooks/toast";
import { deleteCookie, hasCookie, setCookie, getCookie } from "cookies-next";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@utils/supabase";
import { User } from "@supabase/supabase-js";
import { authCookieOptions } from "@utils/misc";

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
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { openToast } = useToastContext();

  const [authState, setAuthState] = React.useState<Partial<AuthContextValues>>({
    isAuthenticated: false,
    user: undefined,
  });

  const authenticateUser = (
    isLoggedIn: boolean,
    user: AuthContextValues["user"]
  ) => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("auth state change data", session);

      if (event === "SIGNED_IN") {
        setAuthState({
          user: session?.user || user,
          isAuthenticated: isLoggedIn,
        });

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

    authenticateUser(false, undefined);
    localStorage.clear();

    if (!error) {
      openToast("Logged out successfully!", "success");
      navigate("/signin");
    }
  };

  React.useEffect(() => {
    const storedAuthState = getCookie("_as");
    if (storedAuthState) {
      const parsedAuthState = JSON.parse(storedAuthState);
      setAuthState(parsedAuthState);
    }

    if (
      authState.isAuthenticated === true ||
      authState.user?.role === "authenticated"
    ) {
      navigate("/dashboard");
    } else if (
      (pathname.startsWith("/dashboard") && hasCookie("_as") === false) ||
      (pathname.startsWith("/dashboard") && hasCookie("_gat") === false)
    ) {
      openToast("You need to log in.", "error");
      navigate("/signin");
    } else if (
      (pathname === "/signin" && hasCookie("_as") === true) ||
      (pathname === "/signin" && hasCookie("_gat") === true)
    ) {
      navigate("/dashboard");
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
