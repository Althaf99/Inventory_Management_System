import React, { useEffect, useState } from "react";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import ManageRequest from "../ManageRequest";

import useRequest from "../../../hooks/services/useRequest";
import useItemNames from "../../../hooks/services/useItemNames";
import useRequestNumbers from "../../../hooks/services/useRequestNumbers";
import useColors from "../../../hooks/services/useColors";

import { FLOW } from "../../../constants";

const ListPurchaseOrder = () => {
  const classes = styles();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [requestNumber, setRequestNumber] = useState();
  const [list, setList] = useState(0);
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);

  const { data: itemColors } = useColors();
  const { data: itemNames } = useItemNames();
  const { data: requestNumbers } = useRequestNumbers();

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

  const requestNumbersArray =
    requestNumbers &&
    requestNumbers.length > 0 &&
    requestNumbers.map(({ id, requestNumber }) => ({
      name: requestNumber,
      value: requestNumber,
    }));

  const { data: requestData } = useRequest({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
  });

  useEffect(() => {
    let sum = 0;
    const test = requestData && requestData.map((item) => item.quantity);
    test && test.forEach((element) => setList((sum += element)));
  }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

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
      Header: "PO Number",
      accessor: "po",
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
      Header: "Balance",
      accessor: "quantity",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => (
        <>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      Cell: ({ value }) => (
        <>
          {value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),
    },
    {
      Header: "PO Date",
      accessor: "date",
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

  const handleCreatePurchaseOrder = () => {
    setOpenPurchaseOrder(true);
  };

  const filteredRequestArray = requestData?.filter(
    (element) => element.quantity > 0
  );

  let no = 0;
  filteredRequestArray?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Purchase Order"}
          pageActions={
            <Grid>
              <Button
                id="btn-create-purchase-order"
                variant="contained"
                onClick={handleCreatePurchaseOrder}
              >
                <NoteAddTwoToneIcon className={classes.plusIcon} />
                {"Create Purchase Order"}
              </Button>
            </Grid>
          }
        >
          <Grid container spacing={2} className={classes.topCards}>
            <Grid item xs={2} className={classes.section}>
              <LabelledEditableSelect
                label="PO NUMBER"
                id="requestNum"
                name="requestNum"
                placeholder="Select PO Number"
                onChange={(value) => setRequestNumber(value)}
                value={requestNumber}
                items={requestNumbersArray}
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
            <Grid item xs={0} className={classes.totalAmount}>
              {list}
            </Grid>
          </Grid>

          <Grid item className={classes.section} xs={12}>
            {filteredRequestArray && (
              <LazyLoadingTable
                columns={columns}
                data={filteredRequestArray}
                hiddenColumns={["id", "date"]}
                maxHeightInRows={10}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
                customProps={{ height: "1200px" }}
              />
            )}
          </Grid>
        </PageLayout>

        <ManageRequest
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          requestNumbersArray={requestNumbersArray}
          openPurchaseOrder={openPurchaseOrder}
          setOpenPurchaseOrder={setOpenPurchaseOrder}
        />
      </Grid>
    </>
  );
};
export default ListPurchaseOrder;
