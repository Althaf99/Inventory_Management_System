import React, { forwardRef, useRef } from "react";
import ReactToPrint from "react-to-print";
import { useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";

import PrintableTable from "../../components/PrintableTable";

import Fuji from "../../Fuji.png";

import { styles } from "./styles";

import useDeliveryNote from "../../hooks/services/useDeliveryNote";

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
    Header: "Description",
    accessor: "description",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

export const DeliveryNotePrinter = forwardRef(() => {
  const classes = styles();

  const location = useLocation();

  const { deliveryNoteDate } = location.state;

  const componentRef = useRef();

  const { data: deliveryNoteData } = useDeliveryNote({
    deliveryDate: deliveryNoteDate,
  });

  deliveryNoteData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
  });

  const printButton = () => {
    return <Button variant="contained">Print This</Button>;
  };
  return (
    <>
      <div ref={componentRef} className={classes.body}>
        <Grid container classes={{ container: classes.gridContainer }}>
          <Grid item container spacing={2} justifyContent="space-between">
            <Grid item xs={12}>
              <img src={Fuji} alt="react logo" className={classes.image} />
              <div>
                Panagamuwa, Postal Code : 60052, Kurunegala, Telephone :0777 132
                121, Mail: fujicraft12@gmail.com
              </div>
            </Grid>
            <Grid item>
              <Grid>
                Customer Name : <u>M/S Rainco Pvt.Ltd</u>
              </Grid>
            </Grid>
            <Grid item>
              <Grid>Date : {deliveryNoteDate}</Grid>
            </Grid>
          </Grid>
          <Grid className={classes.heading}>
            <u>DelivertNote</u>
          </Grid>
          <Grid item xs={12}>
            {deliveryNoteData && columns && (
              <PrintableTable
                columns={columns}
                data={deliveryNoteData}
                customProps={{ height: "600px" }}
                hiddenColumns={["id"]}
                fontSize="24px"
                color="#FFFFFF"
              />
            )}
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
