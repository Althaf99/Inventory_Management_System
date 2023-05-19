import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Typography from "@material-ui/core/Typography";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import useRequest from "../../../hooks/services/useRequest";
import useItemNames from "../../../hooks/services/useItemNames";
import useRequestNumbers from "../../../hooks/services/useRequestNumbers";
import useColors from "../../../hooks/services/useColors";

const ListPurchaseOrder = () => {
  const classes = styles();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [requestNumber, setRequestNumber] = useState();
  const [list, setList] = useState(0);

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
      Header: "PO Number",
      accessor: "po",
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
        return <OptionPanel values={values} />;
      },
    },
  ];

  const handleCreatePurchaseOrder = () => {};

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
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
          <Grid container spacing={2} className={classes.topCards}>
            <Grid item xs={2} className={classes.section}>
              <LabelledEditableSelect
                label="PO Number"
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
                label="Item Name"
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
                label="Item Color"
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

          <>
            <Grid item className={classes.section} xs={12}>
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
    </>
  );
};
export default ListPurchaseOrder;
