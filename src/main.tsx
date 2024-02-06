import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { SignIn } from "./pages/signin.tsx";
import "../style/global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/index.tsx";
import { DashboardLayout } from "./pages/dashboard/components/layout.tsx";
import { Profile } from "@pages/dashboard/profile.tsx";
import { RouteErrorComponent } from "./error.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorComponent />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/account",
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
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
