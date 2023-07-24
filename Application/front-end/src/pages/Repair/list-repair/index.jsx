import React, { useState } from "react";

import { Grid, Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import PageLayout from "../../../components/PageLayout";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import ManageEmployee from "../manage-repair";

import OptionPanel from "../option-panel";

import { styles } from "./styles";

import useGetRepair from "../../../hooks/services/useGetRepair";

const ListRepair = () => {
  const classes = styles();

  const [openCreateRepair, setOpenCreateRepair] = useState(false);

  const { data: repairData } = useGetRepair();

  const handleCreateRepair = () => {
    setOpenCreateRepair(true);
  };

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Category",
      accessor: "category",
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
      Header: "Status",
      accessor: "status",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "Date",
      accessor: "date",
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
        return <OptionPanel values={values} />;
      },
    },
  ];

  return (
    <Grid item container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Repair"}
        pageActions={
          <Grid>
            <Button
              id="btn-create-employee"
              variant="contained"
              onClick={handleCreateRepair}
            >
              <NoteAddTwoToneIcon className={classes.plusIcon} />
              {"Create Repair"}
            </Button>
          </Grid>
        }
      >
        <Grid item className={classes.section} xs={12}>
          {repairData && (
            <LazyLoadingTable
              columns={columns}
              data={repairData}
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
      <ManageEmployee setOpen={setOpenCreateRepair} open={openCreateRepair} />
    </Grid>
  );
};
export default ListRepair;
