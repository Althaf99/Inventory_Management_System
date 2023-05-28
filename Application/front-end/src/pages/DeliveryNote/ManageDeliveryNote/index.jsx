import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import LazyLoadingTable from "../../../components/LazyLoadingTable";
import CustomDatePicker from "../../../components/CustomDatePicker";

import Items from "./items";
import Item from "./item";

import { formatDate } from "./helper.js";

import useCreateDeliveryNote from "../../../hooks/services/useCreateDeliveryNote";

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
  },
];

const ManageDeliveryNote = ({
  setOpenDeliveryNoteDialogBox,
  openDeliveryNoteDialogBox,
  itemColorsArray,
  itemNamesArray,
}) => {
  const classes = styles();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState(false);
  const [openItems, setOpenItems] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState([]);
  const [date, setDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createDeliveryNote } = useCreateDeliveryNote();
  const formik = useFormik({
    initialValues: {
      deliveryDate: "",
      itemName: "",
      itemColor: "",
      quantity: "",
    },

    onSubmit: async (values) => {
      try {
        const DeliveryNote = {
          deliveryDate: formatDate(date),
          items: deliveryNote,
        };
        await createDeliveryNote(DeliveryNote);
        formik.resetForm();
        setItem([]);
        setItems([]);
        setDeliveryNote([]);
        setEnqueueSnackbar("Delivery Note Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar(
          "Error Occured during Delivery Note Submission",
          "error"
        );
      }
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
    setDeliveryNote([...deliveryNote, itemObjArray]);
    setItems([...items, itemObjArray]);

    formik.setFieldValue("itemName", "");
    formik.setFieldValue("deliveryDate", "");
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
    setOpenDeliveryNoteDialogBox(false);
  };
  const selectedItems = [];

  if (deliveryNote) {
    deliveryNote.forEach((handle) => {
      const itemName = handle.itemName;

      handle.item.forEach((item) => {
        const itemColor = item.itemColor;
        const quantity = item.quantity;

        selectedItems.push({ itemName, itemColor, quantity });
      });
    });
  }

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Create Delivery Note"}
        open={openDeliveryNoteDialogBox}
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
                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <Grid className={classes.label}>SELECT DATE</Grid>
                      <CustomDatePicker
                        handleDateSelect={handleDateSelect}
                        date={date}
                      />
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
                {deliveryNote && (
                  <Grid item className={classes.listTable} xs={12}>
                    <LazyLoadingTable
                      columns={columns}
                      data={selectedItems}
                      hiddenColumns={["id"]}
                      maxHeightInRows={15}
                      onClickTableRow={(index, row) => {
                        console.log(index, row);
                      }}
                      customProps={{ height: 390 }}
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
export default ManageDeliveryNote;
