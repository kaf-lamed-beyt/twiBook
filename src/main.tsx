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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { TermsOfUsePage } from "@pages/legal/terms-of-use.tsx";
import { PrivacyPolicyPage } from "@pages/legal/privacy-policy.tsx";
import { ConfirmEmail } from "@pages/confirm.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "@components/error-boundary.tsx";
import { NetworkStatusProvider } from "@context/network-provider.tsx";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorComponent />,
  },
  {
    path: "/legal/terms-of-use",
    element: <TermsOfUsePage />,
    errorElement: <RouteErrorComponent />,
  },
  {
    path: "/legal/privacy-policy",
    element: <PrivacyPolicyPage />,
    errorElement: <RouteErrorComponent />,
  },
  {
    path: "signin",
    element: (
      <ErrorBoundary FallbackComponent={FallbackUI}>
        <ToastProvider>
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ErrorBoundary FallbackComponent={FallbackUI}>
        <ToastProvider>
          <AuthProvider>
            <NetworkStatusProvider>
              <Dashboard />
            </NetworkStatusProvider>
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: "/dashboard/account",
    element: (
      <ErrorBoundary FallbackComponent={FallbackUI}>
        <ToastProvider>
          <AuthProvider>
            <Profile />
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
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
  {
    path: "/confirm",
    element: (
      <ToastProvider>
        <AuthProvider>
          <ConfirmEmail />
        </AuthProvider>
      </ToastProvider>
    ),
    errorElement: <RouteErrorComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
