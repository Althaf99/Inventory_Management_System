import React, { forwardRef, useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useLocation, useParams } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";

import PrintableTable from "../../components/PrintableTable";
import DialogBox from "../../components/DialogBox";

import Fuji from "../../Fuji.png";

import { styles } from "./Styles";

import useExcess from "../../hooks/services/useExcess";

import { formatDate } from "./helper.js";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "No",
    accessor: "no",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "10%",
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
    Cell: ({ value }) => <>{value.toLocaleString()}</>,
  },
];

export const ExcessSheetPrinter = forwardRef(
  ({ setOpenPrintPreview, openPrintPreview, date }) => {
    const classes = styles();

    const componentRef = useRef();

    const { data: excessData } = useExcess({
      excessDeliveredDate: date ? formatDate(date) : date,
    });

    let no = 0;
    excessData?.forEach((element) => {
      element.item = `${element.itemName} ${element.itemColor}`;
      no = no + 1;
      element.no = no;
    });

    const handlePrint = () => {
      return <Button variant="contained"> Print This</Button>;
    };

    return (
      <>
        <DialogBox
          title={"Print Invoice"}
          open={openPrintPreview}
          setOpen={setOpenPrintPreview}
          maxWidth="lg"
          height="1200px"
          children={
            <>
              <div ref={componentRef} className={classes.body}>
                <Grid container classes={{ container: classes.gridContainer }}>
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent="space-between"
                  >
                    <Grid item xs={12}>
                      <img
                        src={Fuji}
                        alt="react logo"
                        className={classes.image}
                      />
                    </Grid>
                    <Grid item>
                      <Grid>Panagamuwa</Grid>
                      <Grid>Postal Code: 60052 </Grid>
                      <Grid>Kurunegala</Grid>
                      <Grid>Telephone : 0372 251 231 </Grid>
                      <Grid>Mobile : 0777 132 121</Grid>
                    </Grid>
                    {date && excessData && (
                      <Grid item>
                        <Grid>To : M/S Rainco pvt Ltd </Grid>
                        <Grid>Date : {date}</Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid className={classes.heading}>Excess Date</Grid>
                  <Grid item xs={12}>
                    {excessData && columns && (
                      <PrintableTable
                        columns={columns}
                        data={excessData}
                        hiddenColumns={["itemCode", "id"]}
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
              <Grid item container className={classes.block}>
                <ReactToPrint
                  trigger={() => handlePrint()}
                  content={() => componentRef.current}
                />
              </Grid>
            </>
          }
        />
      </>
    );
  }
);
