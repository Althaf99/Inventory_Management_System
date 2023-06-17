import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomDatePicker from "../../../components/CustomDatePicker";

import ManageDeliveryNote from "../ManageDeliveryNote";

import { formatDate } from "./helper.js";

import useItemNames from "../../../hooks/services/useItemNames";
import useColors from "../../../hooks/services/useColors";
import useDeliveryNote from "../../../hooks/services/useDeliveryNote";

const ListDeliveryNote = () => {
  const classes = styles();
  const navigate = useNavigate();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [date, setDate] = useState(new Date());
  const [openDeliveryNoteDialogBox, setOpenDeliveryNoteDialogBox] =
    useState(false);

  const { data: itemColors } = useColors();
  const { data: itemNames } = useItemNames();

  const itemNamesArray =
    itemNames &&
    itemNames.length > 0 &&
    itemNames.map(({ id, itemName }) => ({
      name: itemName,
      value: itemName,
    }));

  const itemColorsArray =
    itemColors &&
    itemColors.length > 0 &&
    itemColors.map(({ id, itemColor }) => ({
      name: itemColor,
      value: itemColor,
    }));

  const { data: deliverNoteData } = useDeliveryNote({
    itemName: itemName,
    itemColor: itemColor,
    deliveryDate: formatDate(date),
  });

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "No",
      accessor: "no",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      width: "5%",
    },
    {
      Header: "Delivery Date",
      accessor: "deliveryDate",
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
      Header: "Item Color",
      accessor: "itemColor",
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

  const handleCreateDeliveryNote = () => {
    setOpenDeliveryNoteDialogBox(true);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };
  const handlePrintDeliveryNote = () => {
    navigate(`/deliveryNotePrinter`, {
      state: { deliveryNoteDate: formatDate(date) },
    });
  };

  let no = 0;
  deliverNoteData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Delivery Note"}
          pageActions={
            <Grid>
              <Button
                id="btn-create-Delivery-Note"
                variant="contained"
                onClick={handleCreateDeliveryNote}
              >
                <AddCircleOutlineIcon className={classes.plusIcon} />
                {"Create Delivery Note"}
              </Button>
              <Grid className={classes.printButton}>
                <Button
                  id="btn-create-invoice"
                  variant="contained"
                  onClick={handlePrintDeliveryNote}
                >
                  <AddCircleOutlineIcon className={classes.plusIcon} />
                  {"Print Invoice"}
                </Button>
              </Grid>
            </Grid>
          }
        >
          <Grid container spacing={2} className={classes.topCards}>
            <Grid item xs={2} className={classes.section}>
              <Grid className={classes.label}>SELECT DATE</Grid>
              <CustomDatePicker
                handleDateSelect={handleDateSelect}
                date={date}
              />
            </Grid>
            <Grid item xs={2} className={classes.section}>
              <LabelledEditableSelect
                label="ITEM NAME"
                id="itemName"
                name="itemName"
                placeholder="Select Item Name"
                onChange={(value) => setItemName(value)}
                value={itemName}
                items={itemNamesArray}
              />
            </Grid>
            <Grid item xs={2} className={classes.section}>
              <LabelledEditableSelect
                label="ITEM COLOR"
                id="itemColor"
                name="itemColor"
                placeholder="Select Item Color"
                onChange={(value) => setItemColor(value)}
                value={itemColor}
                items={itemColorsArray}
              />
            </Grid>
          </Grid>

          <Grid item className={classes.section} xs={12}>
            {deliverNoteData && (
              <LazyLoadingTable
                columns={columns}
                hasNextPage={false}
                data={deliverNoteData}
                hiddenColumns={["id"]}
                maxHeightInRows={15}
                customProps={{ height: "750px" }}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
              />
            )}
          </Grid>
        </PageLayout>

        <ManageDeliveryNote
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          openDeliveryNoteDialogBox={openDeliveryNoteDialogBox}
          setOpenDeliveryNoteDialogBox={setOpenDeliveryNoteDialogBox}
        />
      </Grid>
    </>
  );
};
export default ListDeliveryNote;
