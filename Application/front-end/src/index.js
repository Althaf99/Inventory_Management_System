import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PurchaseOrder from "./pages/PO";

import NavigationBar from "./components/NavigationBar";

import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "PurchaseOrder",
        element: <PurchaseOrder />,
      },
    ],
  },
]);
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
);
