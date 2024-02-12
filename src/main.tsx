import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { SignIn } from "./pages/signin.tsx";
import "../style/global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/index.tsx";
import { Profile } from "@pages/dashboard/profile/index.tsx";
import { RouteErrorComponent } from "./error.tsx";
import { ToastProvider } from "./context/toast-provider.tsx";
import { AuthProvider } from "@context/auth-provider.tsx";
import { Oauth } from "@pages/oauth.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ToastProvider>
        <App />
      </ToastProvider>
    ),
    errorElement: <RouteErrorComponent />,
  },
  {
    path: "signin",
    element: (
      <ToastProvider>
        <AuthProvider>
          <SignIn />
        </AuthProvider>
      </ToastProvider>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ToastProvider>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </ToastProvider>
    ),
  },
  {
    path: "/dashboard/account",
    element: (
      <ToastProvider>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </ToastProvider>
    ),
  },
  {
    path: "/oauth",
    element: (
      <ToastProvider>
        <AuthProvider>
          <Oauth />
        </AuthProvider>
      </ToastProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  </React.StrictMode>
);
