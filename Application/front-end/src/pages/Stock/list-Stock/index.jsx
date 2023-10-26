import React, { useState } from "react";

import { Grid, Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";

import ManageStock from "../manage-stock";

import OptionPanel from "../option-panel";

import { styles } from "./styles";

import useGetStock from "../../../hooks/services/useGetStock";

const ListStock = () => {
  const classes = styles();

  const [openCreateRepair, setOpenCreateRepair] = useState(false);
  const [isUpdated, setIsUpdated] = useState();

  const { data: stockData } = useGetStock(isUpdated);

  const handleCreateRepair = () => {
    setOpenCreateRepair(true);
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "ItemName",
      accessor: "itemName",
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
      Header: "Unit Cost",
      accessor: "unitCost",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Supplier",
      accessor: "supplier",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return (
          <OptionPanel
            values={values}
            setIsUpdated={setIsUpdated}
            isUpdated={isUpdated}
          />
        );
      },
    },
  ];

  return (
    <Grid item container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Stock"}
        pageActions={
          <Grid>
            <Button
              id="btn-create-employee"
              variant="contained"
              onClick={handleCreateRepair}
            >
              <NoteAddTwoToneIcon className={classes.plusIcon} />
              {"Create Stock"}
            </Button>
          </Grid>
        }
      >
        <Grid item className={classes.section} xs={12}>
          {stockData && (
            <LazyLoadingTable
              columns={columns}
              data={stockData}
              hiddenColumns={["id"]}
              maxHeightInRows={10}
              onClickTableRow={(index, row) => {
                console.log(index, row);
              }}
              customProps={{ height: "1200px" }}
            />
          )}
        </Grid>
      </PageLayout>
      <ManageStock setOpen={setOpenCreateRepair} open={openCreateRepair} />
    </Grid>
  );
};
export default ListStock;
