import React, { useState } from "react";
import { Link } from "react-router-dom";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Grid, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomSelectDateRange from "../../../components/CustomSelectDateRange";
import SearchBar from "../../../components/EventSearch";
import CustomGroupSelect from "../../../components/CustomGroupSelect";
import useRequest from "../../../hooks/services/useRequest";

const ListPurchaseOrder = () => {
  const classes = styles();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [requestNumber, setRequestNumber] = useState();

  const { data: requestData } = useRequest({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
  });
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Item Name",
      accessor: "itemName",
    },
    {
      Header: "Item Color",
      accessor: "itemColor",
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
    },
    {
      Header: "Balance",
      accessor: "quantity",
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
        return <OptionPanel />;
      },
    },
  ];

  const handleCreatePurchaseOrder = () => {};

  return (
    <>
      <Grid container>
        <Grid container sx={classes.gridContainer}>
          <PageLayout
            pageHeading={"Purchase Order"}
            pageActions={
              <Grid>
                <Link to="/PurchaseOrder/Create" className={classes.link}>
                  <Button
                    id="btn-create-purchase-order"
                    variant="contained"
                    onClick={handleCreatePurchaseOrder}
                  >
                    <AddCircleOutlineIcon className={classes.plusIcon} />
                    {"Create Purchase Order"}
                  </Button>
                </Link>
              </Grid>
            }
          >
            {/* <Grid container spacing={2} className={classes.topCards}>
              <Grid item xs={2}>
                <LabelledEditableSelect
                  label="Item Name"
                  id="itemName"
                  name="itemName"
                  placeholder="Select ItemName"
                  // selectItems={eventcategories}
                  // value={
                  //   selectedCategories.length !== 0
                  //     ? selectedCategories
                  //     : ["allCategories"]
                  // }
                  // onChange={(e) => {
                  //   handleChangeCategory(e.target.value);
                  // }}
                />
              </Grid>
              <Grid item xs={2}>
                <span className={classes.label}>{"audit.type"}</span>
                <LabelledEditableSelect
                // selectItems={eventTypes}
                // onChange={handleClick}
                // setItems={setItems}
                // handleCheck={handleCheck}
                // selectedItems={items}
                />
              </Grid>
              <Grid item xs={2}>
                <LabelledEditableSelect
                  label="audit.users"
                  id="users"
                  name="users"
                  placeholder="Select User"
                  // selectItems={auditUsers}
                  // value={
                  //   selectedUsers.length !== 0 ? selectedUsers : ["allUsers"]
                  // }
                  // onChange={(e) => {
                  //   handleChangeUser(e.target.value);
                  // }}
                  // register={register}
                />
              </Grid>
              <Grid item className={classes.searchBar}>
                <SearchBar
                  id="search"
                  name="search"
                  placeholder="Search"
                  // value={searchText}
                  // handleChange={handleChangeSearch}
                />
              </Grid>
            </Grid> */}
            <>
              <Grid item sx={classes.section} xs={12}>
                {requestData && (
                  <LazyLoadingTable
                    columns={columns}
                    data={requestData}
                    hiddenColumns={["id"]}
                    maxHeightInRows={10}
                    onClickTableRow={(index, row) => {
                      console.log(index, row);
                    }}
                  />
                )}
              </Grid>
            </>
          </PageLayout>
        </Grid>
      </Grid>
    </>
  );
};
export default ListPurchaseOrder;
