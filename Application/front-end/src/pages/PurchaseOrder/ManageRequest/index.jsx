import React, { useState, useEffect } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";
import LoupeRoundedIcon from "@mui/icons-material/LoupeRounded";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";

import { styles } from "./styles";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import CustomDatePicker from "../../../components/CustomDatePicker";

import Items from "./items";
import Item from "./item";

import { formatDate } from "./helper.js";

import useCreateRequest from "../../../hooks/services/useCreateRequest";

const ManageRequest = ({
  setOpenPurchaseOrder,
  openPurchaseOrder,
  itemColorsArray,
  itemNamesArray,
  requestNumbersArray,
}) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Item Name",
      accessor: "itemName",
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
      width: "15%",
    },
    {
      Header: "Actions",
      accessor: "actions",
      headerStyles: { textAlign: "center" },
      width: "13%",
      Cell: ({
        cell: {
          row: { id, values },
        },
      }) => {
        return (
          <IconButton onClick={() => reduceArray(id, values)}>
            <Delete />
          </IconButton>
        );
      },
    },
  ];

  const classes = styles();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [openItems, setOpenItems] = useState(false);
  const [request, setRequest] = useState([]);
  const [date, setDate] = useState(new Date());

  const { mutateAsync: createRequest } = useCreateRequest();
  const formik = useFormik({
    initialValues: {
      po: "",
      poDate: "",
      itemName: "",
      itemColor: "",
      quantity: "",
      unitPrice: "",
    },

    onSubmit: async (values) => {
      const Request = {
        po: values.po,
        date: formatDate(date),
        items: request,
      };
      await createRequest(Request);
      formik.resetForm();
      setItem([]);
      setItems([]);
      setRequest([]);
    },
  });
  let no = -1;

  const handleSaveItem = () => {
    no = no + 1;
    const id = no;
    const values = formik.values;
    const itemObj = {
      itemColor: values.itemColor,
      quantity: values.quantity,
      id: id,
    };
    setItem([...item, itemObj]);
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
  };

  const handleSaveItems = () => {
    const values = formik.values;

    const itemObjArray = {
      itemName: values.itemName,
      unitPrice: values.unitPrice,
      item: item,
    };
    setRequest([...request, itemObjArray]);
    setItems([...items, itemObjArray]);

    formik.setFieldValue("itemName", "");
    formik.setFieldValue("unitPrice", "");
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");

    setItem([]);
    setItems([]);
  };

  const handleOpenItemColorDialogBox = () => {
    setOpenItem(true);
  };

  const handleOpenItemNameAndUnitPrice = () => {
    setOpenItems(true);
  };
  const closeDialog = () => {
    setOpenPurchaseOrder(false);
  };
  const selectedItems = [];
  if (request) {
    request.forEach((handle) => {
      const itemName = handle.itemName;
      const unitPrice = handle.unitPrice;

      handle.item.forEach((item) => {
        const itemColor = item.itemColor;
        const quantity = item.quantity;
        const id = item.id;

        selectedItems.push({ id, itemName, itemColor, quantity, unitPrice });
      });
    });
  }

  const reduceArray = (id, values) => {
    console.log("selectedItems", selectedItems);
    console.log("id", id);

    selectedItems.forEach((element) => {
      if (element.id == id) {
        selectedItems.splice(element, 1);
      }
    });
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Create PO"}
        open={openPurchaseOrder}
        setOpen={closeDialog}
        maxWidth="lg"
        height="900px"
        children={
          <Grid
            container
            classes={{ container: classes.container }}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <Grid className={classes.label}>SELECT DATE</Grid>
                        <CustomDatePicker
                          handleDateSelect={handleDateSelect}
                          date={date}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="po"
                          name="po"
                          label="PO Number"
                          placeholder="Enter PO Number"
                          onChange={(value) =>
                            formik.setFieldValue("po", value)
                          }
                          value={formik.values.po}
                          items={requestNumbersArray}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  className={classes.buttonSection}
                  spacing={5}
                >
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Button
                          id="btn-create-purchase-order"
                          variant="contained"
                          onClick={handleOpenItemColorDialogBox}
                          className={classes.itemNameButton}
                        >
                          <LoupeRoundedIcon className={classes.plusIcon} />
                          {"Select Item Color and Item Quantity"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  className={classes.buttonSection}
                  spacing={5}
                >
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <Grid>
                        <Button
                          id="btn-create-purchase-order"
                          variant="contained"
                          onClick={handleOpenItemNameAndUnitPrice}
                          className={classes.itemNameButton}
                        >
                          <LoupeRoundedIcon className={classes.plusIcon} />
                          {"Select Item Name and Unit Price"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {request && (
                  <Grid item className={classes.listTable} xs={12}>
                    <LazyLoadingTable
                      columns={columns}
                      InfiniteScroll={false}
                      data={selectedItems}
                      hiddenColumns={["id"]}
                      maxHeightInRows={15}
                      customProps={{ height: 390 }}
                      onClickTableRow={(index, row) => {}}
                    />
                  </Grid>
                )}
                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    disbaled={formik.isSubmitting}
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Item
              formik={formik}
              openItem={openItem}
              setOpenItem={setOpenItem}
              classes={classes}
              handleSaveItem={handleSaveItem}
              itemColorsArray={itemColorsArray}
              item={item}
            />
            <Items
              formik={formik}
              classes={classes}
              itemNamesArray={itemNamesArray}
              setOpenItems={setOpenItems}
              openItems={openItems}
              handleSaveItems={handleSaveItems}
            />
          </Grid>
        }
      />
    </>
  );
};
export default ManageRequest;
