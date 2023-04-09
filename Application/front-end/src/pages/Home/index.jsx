import React, { useMemo, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import DataTable from "../../components/ReactTable";
import TablePopUp from "../../components/TablePopUp";

import styles from "./styles";

const Home = () => {
  const classes = styles();
  const [open, setOpen] = useState(false);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "item",
        accessor: "item",
        width: "15%",
      },
      {
        Header: "color",
        accessor: "color",
        width: "15%",
      },
      {
        Header: "qty",
        accessor: "qty",
        width: "15%",
      },
      {
        Header: "rate",
        accessor: "rate",
        width: "15",
      },
      {
        Header: "amount",
        accessor: "amount",
        width: "15",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classes.iconRoot]
  );

  const namedUser = [
    {
      id: 1,
      item: "1040 Handle",
      color: "Black",
      qty: 5000,
      rate: 27.3,
      amount: "Total Amount",
    },
    {
      id: 1,
      item: "1040 Handle",
      color: "Black",
      qty: 5000,
      rate: 27.3,
      amount: "Total Amount",
    },
    {
      id: 1,
      item: "1040 Handle",
      color: "Black",
      qty: 5000,
      rate: 27.3,
      amount: "Total Amount",
    },
    {
      id: 1,
      item: "1040 Handle",
      color: "Black",
      qty: 5000,
      rate: 27.3,
      amount: "Total Amount",
    },
  ];
  const onClickTableRow = () => {};
  const openTablePopUp = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container alignContent="flex-start">
        <Grid
          item
          container
          justify="space-between"
          style={{ paddingBottom: "20px" }}
        >
          <div className={classes.headingTitle}>{"P/O Request"}</div>
          <Button
            id="btn-create-app"
            endIcon={<AddCircleOutlineIcon />}
            classes={{ root: classes.btn }}
            onClick={() => {
              openTablePopUp();
            }}
          >
            {"Add Data"}
          </Button>
        </Grid>

        <Grid item className={classes.tableContainer}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={8}>
              <Grid item className={classes.tableContainer}>
                <DataTable
                  data={namedUser}
                  columns={columns}
                  hiddenColumns={["id"]}
                  onClickTableRow={onClickTableRow}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TablePopUp open={open} handleClose={handleClose} />
      </Grid>
    </>
  );
};
export default Home;
