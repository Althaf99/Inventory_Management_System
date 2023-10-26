import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import NavigationBar from "../NavigationBar";
import Home from "../../pages/Home";
import { InvoicePrinter } from "../../pages/InvoicePrinter";
import ListPurchaseOrder from "../../pages/PurchaseOrder/ListPurchaseOrder";
import ManageRequest from "../../pages/PurchaseOrder/ManageRequest";
import ListInvoice from "../../pages/Invoice/List-Invoice";
import ManageInvoice from "../../pages/Invoice/Manage-Invoice";
import ListDeliveryNote from "../../pages/DeliveryNote/List-DeliveryNote";
import { DeliveryNotePrinter } from "../../pages/DeliveryNotePrinter";
import ListEmployee from "../../pages/Employee/list-employee";
import ListRepair from "../../pages/Repair/list-repair";
import Login from "../../pages/Login";
import ListStock from "../../pages/Stock/list-Stock";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/" element={<NavigationBar />}>
          <Route path="home" element={<Home />} />
          <Route path="purchaseOrder" element={<ListPurchaseOrder />} />
          <Route path="stock" element={<ListStock />} />
          <Route path="invoice" element={<ListInvoice />} />
          <Route path="employee" element={<ListEmployee />} />
          <Route path="repair" element={<ListRepair />} />
          {/* <Route path="invoicePrinter/:id" element={<InvoicePrinter />} /> */}
          <Route path="deliveryNote" element={<ListDeliveryNote />} />
          <Route path="deliveryNotePrinter" element={<DeliveryNotePrinter />} />
        </Route>
      </>
    )
  );
  return { router };
};

export { AppRouter };
