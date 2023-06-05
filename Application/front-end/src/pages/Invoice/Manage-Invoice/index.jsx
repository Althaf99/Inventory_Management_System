import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";

import Items from "./items";
import Item from "./item";

// import useCreateRequest from "../../../hooks/services/useCreateRequest";
import useCreateInvoice from "../../../hooks/services/useCreateInvoice";
// import useColors from "../../../hooks/services/useColors";
// import useItemNames from "../../../hooks/services/useItemNames";
// import useRequestNumbers from "../../../hooks/services/useRequestNumbers";

const columns = [
  {
    Header: "ID",
    accessor: "id",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
  },
  {
    Header: "Item Name",
    accessor: "itemName",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "33%",
  },
  {
    Header: "Item Color",
    accessor: "itemColor",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "33%",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    headerStyles: { textAlign: "center" },
    cellStyles: { textAlign: "center" },
    width: "0%",
  },
];

const ManageInvoice = ({
  setOpenPurchaseOrder,
  openPurchaseOrder,
  itemColorsArray,
  itemNamesArray,
  setInvoiceResponseData,
}) => {
  const classes = styles();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [openItems, setOpenItems] = useState(false);
  const [invoiceReq, setInvoiceReq] = useState([]);

  const { mutateAsync: createInvoice } = useCreateInvoice();

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
      const Invoice = {
        items: invoiceReq,
      };
      const InvoiceResponseData = await createInvoice(Invoice);
      setInvoiceResponseData(InvoiceResponseData?.data);
      formik.resetForm();
      setItem([]);
      setItems([]);
    },
  });
  const handleSaveItem = () => {
    const values = formik.values;
    const itemObj = {
      itemColor: values.itemColor,
      quantity: values.quantity,
    };
    setItem([...item, itemObj]);
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
  };

  const handleSaveItems = () => {
    const values = formik.values;

    const itemObjArray = {
      itemName: values.itemName,
      item: item,
    };
    setItems([...items, itemObjArray]);
    setInvoiceReq([...invoiceReq, itemObjArray]);
    formik.setFieldValue("itemName", "");
    formik.setFieldValue("itemColor", "");
    formik.setFieldValue("quantity", "");
    setItem([]);
    setItems([]);
  };

  const handleOpenItemColorDialogBox = () => {
    setOpenItem(true);
  };

  const handleOpenItemName = () => {
    setOpenItems(true);
  };
  const closeDialog = () => {
    setOpenPurchaseOrder(false);
  };

  const selectedItems = [];

  invoiceReq &&
    invoiceReq.forEach((handle) => {
      const itemName = handle.itemName;

      handle.item.forEach((item) => {
        const itemColor = item.itemColor;
        const quantity = item.quantity;

        selectedItems.push({ itemName, itemColor, quantity });
      });
    });

  return (
    <>
      <DialogBox
        title={"Create Invoice"}
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
                          <AddCircleOutlineIcon className={classes.plusIcon} />
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
                          onClick={handleOpenItemName}
                          className={classes.itemNameButton}
                        >
                          <AddCircleOutlineIcon className={classes.plusIcon} />
                          {"Select Item Name"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.section} xs={12}>
                  {selectedItems && (
                    <LazyLoadingTable
                      columns={columns}
                      InfiniteScroll={false}
                      data={selectedItems}
                      hiddenColumns={["id"]}
                      maxHeightInRows={15}
                      customProps={{ height: 390 }}
                      onClickTableRow={(index, row) => {
                        console.log(index, row);
                      }}
                    />
                  )}
                </Grid>
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
export default ManageInvoice;
