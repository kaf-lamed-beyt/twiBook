import React from "react";
import { AuthContextValues, AuthContext } from "@context/auth-provider";

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "Auth context is missing. You probabaly forgot to wrap the component depending on auth in <AuthProvider />"
    );
  }

  return context as AuthContextValues;
};
