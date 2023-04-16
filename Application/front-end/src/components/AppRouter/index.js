import React from "react";
import { createBrowserRouter } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import Home from "../../pages/Home";
import Dashboard from "../../pages/Dashboard";
import PurchaseOrder from "../../pages/PO";

const AppRouter = () => {
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
  return { router };
};

export { AppRouter };
