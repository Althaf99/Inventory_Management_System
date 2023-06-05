import React, { useRef } from "react";

import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Edit, Delete } from "@mui/icons-material";
import { useLocation } from "react-router-dom";

import { IconButton } from "@mui/material";

import LazyLoadingTable from "../../components/LazyLoadingTable";
import { Dashboard } from "../InvoicePrinter";

import { styles } from "./styles";

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
    width: "25",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Quantity",
    accessor: "Quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "25",
  },
  {
    Header: "Rate",
    accessor: "rate",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "25",
  },
  {
    Header: "Balance",
    accessor: "balance",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "25",
  },
  {
    Header: "ItemCode",
    accessor: "itemCode",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Status",
    accessor: "status",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Actions",
    Cell: ({ row }) => (
      <>
        <IconButton onClick={() => console.log("")}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => console.log("")}>
          <Delete />
        </IconButton>
      </>
    ),
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
];

const data = [
  {
    id: "1",
    item: "1040 Handle",
    rate: "100",
    Quantity: "250",
    status: "completed",
  },
  {
    id: "2",
    item: "1040 Handle",
    rate: "100",
    status: "completed",
    Quantity: "250",
  },
  {
    id: "3",
    item: "1040 Handle",
    rate: "100",
    status: "Incompleted",
    Quantity: "250",
  },
  {
    id: "4",
    item: "1040 Handle",
    rate: "100",
    status: "completed",
    Quantity: "250",
  },
  {
    id: "5",
    item: "1040 Handle",
    rate: "100",
    status: "Incompleted",
    Quantity: "250",
  },
];

const Home = () => {
  const classes = styles();
  const location = useLocation();
  console.log("location", location);

  return (
    <>
      <Grid
        item
        container
        alignContent="flex-start"
        className={classes.section}
      >
        <Grid container justifyContent="space-between" className={classes.top}>
          <Grid item className={classes.heading}>
            Purchase Order
          </Grid>
          <Grid item>
            <Button
              startIcon={<AddCircleOutlineIcon />}
              classes={{ root: classes.btn }}
              // onClick={}
            >
              New Stock
            </Button>
          </Grid>
        </Grid>
        <Grid item className={classes.table} xs={12}>
          <LazyLoadingTable
            columns={columns}
            data={data}
            hiddenColumns={["itemCode", "id"]}
            fontSize="24px"
            color="#FFFFFF"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
