import { useToastContext } from "@hooks/toast";
import { User } from "@supabase/supabase-js";
import { hasCookie } from "cookies-next";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export type AuthContextValues = {
  isAuthenticated: boolean;
  hasCookieExpired?: boolean;
  user?: User | undefined;
  authenticator: (
    isAuth: boolean,
    user: User | undefined,
    hasCookieExpired?: boolean
  ) => void;
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
    hasCookieExpired: true,
    user: undefined,
  });

  const authenticateUser = (
    isLoggedIn: boolean,
    user: AuthContextValues["user"],
    hasCookieExpired?: boolean
  ) => {
    setAuthState({
      ...user,
      isAuthenticated: isLoggedIn,
      hasCookieExpired: hasCookieExpired,
    });
  };

  React.useEffect(() => {
    if (
      pathname.startsWith("/dashboard") &&
      authState.isAuthenticated === false &&
      hasCookie("_at") === false
    ) {
      openToast("You need to log in.", "error");
      navigate("/signin");
    } else if (
      (pathname === "/signin" && authState.isAuthenticated === true) ||
      hasCookie("_at") === true
    ) {
      openToast("You're already logged in.", "success");
      navigate("/dashboard");
    }
  }, []);

  const values: AuthContextValues = {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated ?? false,
    hasCookieExpired: authState.hasCookieExpired,
    authenticator: authenticateUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
