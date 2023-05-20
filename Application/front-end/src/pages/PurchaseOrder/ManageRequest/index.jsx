import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { DialogContent } from "@mui/material";

import { styles } from "./styles";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import DialogBox from "../../../components/DialogBox";

import Items from "./items";
import Item from "./item";

import useCreateRequest from "../../../hooks/services/useCreateRequest";
import useCommon from "../../../hooks/services/useCommon";
import useColors from "../../../hooks/services/useColors";
import useItemNames from "../../../hooks/services/useItemNames";
import useRequestNumbers from "../../../hooks/services/useRequestNumbers";

const ManageRequest = ({ setOpenPurchaseOrder, openPurchaseOrder }) => {
  const classes = styles();
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [openItem, setOpenItem] = useState(false);

  const { data: commonData } = useCommon();
  const { data: itemColors } = useColors();
  const { data: itemNames } = useItemNames();
  const { data: requestNumbers } = useRequestNumbers();

  const itemColorsArray =
    itemColors &&
    itemColors.length > 0 &&
    itemColors.map(({ id, itemColor }) => ({
      name: itemColor,
      value: itemColor,
    }));

  const itemNamesArray =
    itemNames &&
    itemNames.length > 0 &&
    itemNames.map(({ id, itemName }) => ({
      name: itemName,
      value: itemName,
    }));

  const requestNumbersArray =
    requestNumbers &&
    requestNumbers.length > 0 &&
    requestNumbers.map(({ id, requestNumber }) => ({
      name: requestNumber,
      value: requestNumber,
    }));

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
        date: values.poDate,
        items: [
          {
            itemName: values.itemName,
            unitPrice: values.unitPrice,
            item: item,
          },
        ],
      };
      await createRequest(Request);
    },
  });
  const handleSaveItem = () => {
    const values = formik.values;

    const itemObjArray = {
      itemColor: values.itemColor,
      quantity: values.quantity,
    };
    setItem([...item, itemObjArray]);
  };

  const handleOpenItemColorDialogBox = () => {
    setOpenItem(true);
  };

  return (
    <>
      <DialogBox
        title={"Create PO"}
        open={openPurchaseOrder}
        setOpen={setOpenPurchaseOrder}
        maxWidth="xl"
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
                <Grid item container className={classes.section} spacing={3}>
                  <Grid item className={classes.textField}>
                    <Grid item>
                      <FormControl fullWidth>
                        <LabelledEditableSelect
                          id="poDate"
                          name="poDate"
                          label="PO Date"
                          placeholder="Select PO Date"
                          onChange={(value) =>
                            formik.setFieldValue("poDate", value)
                          }
                          value={formik.values.poDate}
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
                          id="itemName"
                          name="itemName"
                          label="Item Name"
                          placeholder="Enter Item Name"
                          onChange={(value) =>
                            formik.setFieldValue("itemName", value)
                          }
                          value={formik.values.itemName}
                          items={itemNamesArray}
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
                          id="unitPrice"
                          name="unitPrice"
                          label="Unit Price"
                          placeholder="Enter Unit Price"
                          onChange={(value) =>
                            formik.setFieldValue("unitPrice", value)
                          }
                          value={formik.values.unitPrice}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container className={classes.section} spacing={3}>
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

                <Grid item container className={classes.block}>
                  <Button
                    id="btn-general-info-next"
                    className={classes.button}
                    type="submit"
                    variant="contained"
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
            />
          </Grid>
        }
      />
    </>
  );
};
export default ManageRequest;
