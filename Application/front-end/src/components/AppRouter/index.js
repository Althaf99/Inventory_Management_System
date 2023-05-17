import React from "react";
import { createBrowserRouter } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import Home from "../../pages/Home";
import Dashboard from "../../pages/Dashboard";
import ListPurchaseOrder from "../../pages/PurchaseOrder/ListPurchaseOrder";
import ManageRequest from "../../pages/PurchaseOrder/ManageRequest";
import ListInvoice from "../../pages/Invoice/List-Invoice";
import ManageInvoice from "../../pages/Invoice/Manage-Invoice";

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
          element: <ListPurchaseOrder />,
        },
        {
          path: "PurchaseOrder/Create",
          element: <ManageRequest />,
        },
        {
          path: "Invoice",
          element: <ListInvoice />,
        },
        {
          path: "Invoice/Create",
          element: <ManageInvoice />,
        },
      ],
    },
  ]);
  return { router };
};

export { AppRouter };
