import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import { Signup } from "./pages/signup.tsx";
import "../style/global.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dashboard/index.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={routes} />
    </ChakraProvider>
  </React.StrictMode>
);
