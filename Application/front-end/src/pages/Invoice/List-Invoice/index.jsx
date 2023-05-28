import React, { useState, useEffect } from "react";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Grid, Button } from "@material-ui/core";
import { Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { css } from "@emotion/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControl from "@material-ui/core/FormControl";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomDatePicker from "../../../components/CustomDatePicker";
import AlertDialogBox from "../../../components/AlertDialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

import { formatDate } from "./helper.js";

import useItemNames from "../../../hooks/services/useItemNames";
import useColors from "../../../hooks/services/useColors";
import useInvoice from "../../../hooks/services/useInvoice";
import useExcess from "../../../hooks/services/useExcess";
import useAddInvoiceNo from "../../../hooks/services/useAddInvoiceNo";

const useStyles = (theme) => {
  const headingTitle = css`
    font-family: Nunito !important;
    font-weight: 600 !important;
    font-style: normal !important;
    line-height: 41px !important;
    font-weight: 500;
    font-size: 28px !important;
    line-height: 48px;
    color: #890517;
  `;

  return {
    headingTitle,
  };
};
const ListInvoice = () => {
  const classes = styles();
  const headingStyle = useStyles();

  const [itemName, setItemName] = useState();
  const [itemColor, setItemColor] = useState();
  const [requestNumber, setRequestNumber] = useState();
  const [list, setList] = useState(0);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [date, setDate] = useState(new Date());
  const [invoiceNo, setInvoiceNo] = useState(0);

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

  const { data: invoiceData } = useInvoice({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
    invoiceDate: formatDate(date),
  });

  const requestNumbersArray =
    invoiceData &&
    invoiceData.length > 0 &&
    invoiceData.map(({ id, po }) => ({
      name: po,
      value: po,
    }));

  const { data: excessData } = useExcess({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
    excessDeliveredDate: formatDate(date),
  });

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },
    {
      Header: "PO ",
      accessor: "po",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },

    {
      Header: "Item Name",
      accessor: "itemName",
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
      Header: "Unit Price",
      accessor: "unitPrice",
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
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "right" },
      width: "0%",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <OptionPanel values={values} />;
      },
    },
  ];
  const { mutateAsync: clusterUpdater } = useAddInvoiceNo({
    requestNo: requestNumber,
    invoiceDate: formatDate(date),
    invoiceNo: invoiceNo,
  });

  const handleAddInvoice = () => {
    setOpenInvoiceDialog(true);
  };
  const handleCloseDialogBox = () => {
    setOpenInvoiceDialog(false);
  };
  const handleSaveInvoiceNo = async () => {
    await clusterUpdater();
  };
  const handleDateSelect = (date) => {
    setDate(date);
  };

  useEffect(() => {
    let sum = 0;
    const test = invoiceData && invoiceData.map((item) => item.quantity);
    test ? test.forEach((element) => setList((sum += element))) : setList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

  useEffect(() => {
    const invoiceList =
      invoiceData && invoiceData.find((element) => element?.invoiceNo);
    setInvoiceNo(invoiceList ? invoiceList.invoiceNo : "-");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, requestNumber]);

  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Invioce"}
          pageActions={
            <>
              <Grid>
                <Button
                  id="btn-create-purchase-order"
                  variant="contained"
                  onClick={handleAddInvoice}
                >
                  <AddCircleOutlineIcon className={classes.plusIcon} />
                  {"Add Invoice No"}
                </Button>
              </Grid>
            </>
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
            <Grid item xs={0} className={classes.totalAmount}>
              {`Invoice NO : ${invoiceNo}`}
            </Grid>
          </Grid>
          <Typography sx={headingStyle.headingTitle}>Invoices</Typography>
          <Grid item className={classes.section} xs={12}>
            {invoiceData && (
              <LazyLoadingTable
                columns={columns}
                data={invoiceData}
                hiddenColumns={["id"]}
                maxHeightInRows={15}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
              />
            )}
          </Grid>

          <Typography sx={headingStyle.headingTitle}>Excess</Typography>
          <Grid item className={classes.section} xs={12}>
            {excessData && (
              <LazyLoadingTable
                columns={columns}
                data={excessData}
                hiddenColumns={["id", "po", "unitPrice"]}
                maxHeightInRows={15}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
                customProps={{ height: "400px" }}
              />
            )}
          </Grid>
        </PageLayout>
        {/* <ManageInvoice
          itemColorsArray={itemColorsArray}
          itemNamesArray={itemNamesArray}
          openInvoiceDialog={openInvoiceDialog}
          setOpenInvoiceDialog={setOpenInvoiceDialog}
        /> */}
      </Grid>
      <AlertDialogBox
        open={openInvoiceDialog}
        handleClose={handleCloseDialogBox}
        buttonCancelText="Cancel"
        title="ADD INVOICE NO"
        content={
          <>
            <Grid item className={classes.textField}>
              <Grid item>
                <FormControl fullWidth>
                  <LabeledTextField
                    id="invoiceNo"
                    name="invoiceNo"
                    placeholder="Invoice No"
                    onChange={(value) => setInvoiceNo(value)}
                    value={invoiceNo}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </>
        }
        handleOk={handleSaveInvoiceNo}
        buttonConfirmText={"OK"}
        icon={
          <CheckCircleOutlineIcon
            style={{
              alignSelf: "center",
              width: "42px",
              height: "42px",
              position: "absolute",
              marginTop: "25px",
              color: "#FF7C7C",
            }}
          />
        }
      />
    </>
  );
};
export default ListInvoice;
