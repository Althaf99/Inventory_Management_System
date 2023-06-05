import React, { forwardRef, useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";

import PrintableTable from "../../components/PrintableTable";

import Fuji from "../../Fuji.png";

import { styles } from "./Styles";

import useInvoiceByInvoiceNo from "../../hooks/services/useGetInvoiceByInvoiceNo";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Item",
    accessor: "item",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Rate",
    accessor: "unitPrice",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },

  {
    Header: "Amount",
    accessor: "amount",
    cell: (value) => Number.parseFloat(value).toFixed(2),
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

export const DeliveryNotePrinter = forwardRef(() => {
  const classes = styles();

  const location = useLocation();

  const [deliveryNoteDate, setDeliveryNoteDate] = useState();

  const componentRef = useRef();

  const { data: invoiceData } = useInvoiceByInvoiceNo({
    invoiceNo: invoiceNo,
  });

  invoiceData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
  });

  useEffect(() => {
    // Filter out the desired object
    const filteredObject = invoiceData?.filter(
      (obj) => obj.invoiceNo === invoiceNo
    )[0];

    // Extract information from the filtered object
    if (filteredObject) {
      const { invoiceDate, poDate, po } = filteredObject;
      setInvoiceDate(invoiceDate);
      setRequestDate(poDate);
      setRequestNo(po);
    } else {
      console.log("Object not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceData]);
  const printButton = () => {
    return <Button variant="contained">This Print</Button>;
  };
  return (
    <>
      <div ref={componentRef} className={classes.body}>
        <Grid container classes={{ container: classes.gridContainer }}>
          <Grid item container spacing={2} justifyContent="space-between">
            <Grid item xs={12}>
              <img src={Fuji} alt="react logo" className={classes.image} />
            </Grid>
            <Grid item>
              <Grid>Customer Name : ___________</Grid>
              <Grid>Address : ___________ </Grid>
              <Grid>Tel : _____________</Grid>
            </Grid>
            <Grid item>
              <Grid>Date : {deliveryNoteDate}</Grid>
            </Grid>
          </Grid>
          <Grid className={classes.heading}>Invoice ( Part Delivery )</Grid>
          <Grid item xs={12}>
            {invoiceData && columns && (
              <PrintableTable
                columns={columns}
                data={invoiceData}
                customProps={{ height: "400px" }}
                hiddenColumns={["itemCode", "id"]}
                fontSize="24px"
                color="#FFFFFF"
              />
            )}
          </Grid>
          <Grid item className={classes.totalAmount}>
            Total : {amount}
          </Grid>
          <Grid item xs={5} className={classes.signature}>
            <Grid>---------------------------------</Grid>
            <Grid>Manager,</Grid>
            <Grid>Fujicraft Electrical Accessories</Grid>
          </Grid>
        </Grid>
      </div>
      <ReactToPrint
        trigger={() => printButton()}
        content={() => componentRef.current}
      />
    </>
  );
});
