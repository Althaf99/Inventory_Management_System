import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import OptionPanel from "../option-panel";
import { styles } from "./styles";

import { Grid } from "@material-ui/core";
import { Typography, Button } from "@mui/material";
import NoteAddTwoToneIcon from "@mui/icons-material/NoteAddTwoTone";
import LocalPrintshopTwoToneIcon from "@mui/icons-material/LocalPrintshopTwoTone";
import { css } from "@emotion/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FormControl from "@material-ui/core/FormControl";

import LazyLoadingTable from "../../../components/LazyLoadingTable";
import PageLayout from "../../../components/PageLayout";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import CustomDatePicker from "../../../components/CustomDatePicker";
import AlertDialogBox from "../../../components/AlertDialogBox";
import LabeledTextField from "../../../components/LabeledTextField";
import { InvoicePrinter } from "../../InvoicePrinter";
import { ExcessSheetPrinter } from "../../ExcessSheetPrinter";

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

  const [itemName, setItemName] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [requestNumber, setRequestNumber] = useState("");
  const [list, setList] = useState(0);
  const [openInvoiceDialog, setOpenInvoiceDialog] = useState(false);
  const [date, setDate] = useState();
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [searchInvoiceNo, setSearchInvoiceNo] = useState();
  const [printPreview, setPrintPreview] = useState(false);
  const [excessPreview, setExcessPreview] = useState(false);

  const { data: itemColors } = useColors();
  const { data: itemNames } = useItemNames();

  const navigate = useNavigate();

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
    invoiceDate: date ? formatDate(date) : date,
    invoiceNo: searchInvoiceNo,
  });

  const requestNumbersArray =
    invoiceData &&
    invoiceData.length > 0 &&
    invoiceData.map(({ id, po }) => ({
      name: po,
      value: po,
    }));

  const uniqueValues = new Set();

  // Create a new array without duplicate values
  const filteredPOList = [];
  requestNumbersArray &&
    requestNumbersArray.forEach((item) => {
      const value = item.value;
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        filteredPOList.push(item);
      }
    });

  const { data: excessData } = useExcess({
    itemName: itemName,
    itemColor: itemColor,
    requestNumber: requestNumber,
    excessDeliveredDate: date ? formatDate(date) : date,
  });

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
      width: "5%",
    },
    {
      Header: "PO Date",
      accessor: "poDate",
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
    {
      Header: "Unit Price",
      accessor: "unitPrice",
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
    },

    {
      Header: "Amount",
      accessor: "amount",
      cell: (value) => Number.parseFloat(value).toFixed(2),
      headerStyles: { textAlign: "center" },
      cellStyles: { textAlign: "center" },
      // Cell: ({ value }) => (
      //   <>
      //     {value.toLocaleString(undefined, {
      //       minimumFractionDigits: 2,
      //       maximumFractionDigits: 2,
      //     })}
      //   </>
      // ),
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
    const test = invoiceData?.map((item) => item.amount);
    test ? test.forEach((element) => setList((sum += element))) : setList(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

  useEffect(() => {
    const invoiceList =
      (requestNumber?.length > 0 || searchInvoiceNo?.length > 0) &&
      invoiceData &&
      invoiceData?.find((element) => element?.invoiceNo);

    setInvoiceNo(invoiceList ? invoiceList.invoiceNo : "-");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, requestNumber, invoiceData]);

  const handlePrintInvoice = () => {
    setPrintPreview(true);
  };

  const handlePrintExcess = () => {
    setExcessPreview(true);
  };

  let no = 0;
  invoiceData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    no = no + 1;
    element.no = no;
  });

  let itd = 0;
  excessData?.forEach((element) => {
    element.item = `${element.itemName} ${element.itemColor}`;
    itd = itd + 1;
    element.no = itd;
  });
  return (
    <>
      <Grid container classes={{ container: classes.gridContainer }}>
        <PageLayout
          pageHeading={"Invioce"}
          pageActions={
            <>
              <Grid>
                <Button
                  id="btn-create-invoice"
                  variant="contained"
                  onClick={handleAddInvoice}
                >
                  <NoteAddTwoToneIcon className={classes.plusIcon} />
                  {"Add Invoice No"}
                </Button>
              </Grid>
              <Grid className={classes.printButton}>
                <Button
                  id="btn-create-invoice"
                  variant="contained"
                  onClick={handlePrintInvoice}
                >
                  <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                  {"Print Invoice"}
                </Button>
              </Grid>
            </>
          }
        >
          <Grid>
            <Grid
              className={classes.totalAmount}
            >{`Total : ${list.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}</Grid>
            <Grid className={classes.totalAmount}>
              {`Invoice No : ${invoiceNo}`}
            </Grid>
          </Grid>
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
                items={filteredPOList}
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
            <Grid item xs={2} className={classes.section}>
              <FormControl fullWidth>
                <LabeledTextField
                  label="INVOICE NO"
                  id="invoiceNo"
                  name="invoice"
                  placeholder="Select Invoice No"
                  onChange={(value) => setSearchInvoiceNo(value)}
                  value={searchInvoiceNo}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Typography sx={headingStyle.headingTitle}>Invoices</Typography>
          <Grid item className={classes.section} xs={12}>
            {invoiceData && (
              <LazyLoadingTable
                columns={columns}
                data={invoiceData}
                InfiniteScroll={false}
                hiddenColumns={["id"]}
                maxHeightInRows={15}
                onClickTableRow={(index, row) => {
                  console.log(index, row);
                }}
              />
            )}
          </Grid>
          {excessData && (
            <>
              <Typography sx={headingStyle.headingTitle}>Excess</Typography>
              <Grid className={classes.printButton}>
                <Button
                  id="btn-create-excessSheet"
                  variant="contained"
                  onClick={handlePrintExcess}
                >
                  <LocalPrintshopTwoToneIcon className={classes.plusIcon} />
                  {"Print Excess"}
                </Button>
              </Grid>
              <Grid item className={classes.section} xs={12}>
                <LazyLoadingTable
                  columns={columns}
                  data={excessData}
                  InfiniteScroll={false}
                  hiddenColumns={["id", "po", "unitPrice", "amount", "poDate"]}
                  maxHeightInRows={15}
                  onClickTableRow={(index, row) => {
                    console.log(index, row);
                  }}
                  customProps={{ height: "400px" }}
                />
              </Grid>
            </>
          )}
        </PageLayout>
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
      <InvoicePrinter
        openPrintPreview={printPreview}
        setOpenPrintPreview={setPrintPreview}
        invoiceNo={invoiceNo}
        amount={list}
      ></InvoicePrinter>
      <ExcessSheetPrinter
        openPrintPreview={excessPreview}
        setOpenPrintPreview={setExcessPreview}
        date={date}
      ></ExcessSheetPrinter>
    </>
  );
};
export default ListInvoice;
