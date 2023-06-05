import React, { forwardRef, useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useLocation, useParams } from "react-router-dom";

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

export const InvoicePrinter = forwardRef(() => {
  const classes = styles();

  const location = useLocation();

  const { amount } = location.state;

  const [invoiceDate, setInvoiceDate] = useState();
  const [requestDate, setRequestDate] = useState();
  const [requestNo, setRequestNo] = useState();

  const componentRef = useRef();

  let { id: invoiceNo } = useParams();

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
              <Grid>Panagamuwa</Grid>
              <Grid>Postal Code: 60052 </Grid>
              <Grid>Kurunegala</Grid>
              <Grid>Telephone : 0372 251 231 </Grid>
              <Grid>Mobile : 0777 132 121</Grid>
            </Grid>
            <Grid item>
              <Grid>To : M/S Rainco pvt Ltd </Grid>
              <Grid>Date of Invoice : {invoiceDate}</Grid>
              <Grid>PO No : {requestNo}</Grid>
              <Grid>Invoice No : R / PO / {invoiceNo} </Grid>
              <Grid>PO Date : {requestDate}</Grid>
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
