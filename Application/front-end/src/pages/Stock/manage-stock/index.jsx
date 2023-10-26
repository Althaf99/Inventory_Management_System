import React, { useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import { Button, FormControl } from "@mui/material";

import { useSnackbar } from "notistack";

import { styles } from "./styles";

import DialogBox from "../../../components/DialogBox";
import CustomDatePicker from "../../../components/CustomDatePicker";
import LabeledTextField from "../../../components/LabeledTextField";

import { formatDate } from "./helper.js";

import useCreateStock from "../../../hooks/services/useCreateStock";

const ManageStock = ({ setOpen, open }) => {
  const classes = styles();
  const [purchaseData, setDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createStock } = useCreateStock();
  const formik = useFormik({
    initialValues: {
      itemName: "",
      quantity: "",
      unitCost: "",
      purchaseData: "",
      category: "",
      supplier: "",
    },

    onSubmit: async (values) => {
      try {
        const repair = {
          itemName: values.itemName,
          quantity: values.quantity,
          unitCost: values.unitCost,
          phone: values.phone,
          purchaseData: formatDate(purchaseData),
          category: values.category,
          supplier: values.supplier,
        };
        await createStock(repair);
        formik.resetForm();
        setEnqueueSnackbar("Stock Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Stock Submission", "error");
      }
    },
  });
  const closeDialog = () => {
    setOpen(false);
  };

  const handleDateSelect = (purchaseData) => {
    setDate(purchaseData);
  };

  return (
    <>
      <DialogBox
        title={"Create Stock"}
        open={open}
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
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="itemName"
                          name="itemName"
                          label="Item Name"
                          placeholder="Enter Item Name"
                          onChange={(value) =>
                            formik.setFieldValue("itemName", value)
                          }
                          value={formik.values.itemName}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="quantity"
                          name="quantity"
                          label="quantity"
                          placeholder="Enter Quantity"
                          onChange={(value) =>
                            formik.setFieldValue("quantity", value)
                          }
                          value={formik.values.quantity}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="unitCost"
                          name="unitCost"
                          label="Unit Cost"
                          placeholder="Enter Unit Cost"
                          onChange={(value) =>
                            formik.setFieldValue("unitCost", value)
                          }
                          value={formik.values.unitCost}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <Grid className={classes.label}>
                        SELECT PURCHASE DATE
                      </Grid>
                      <CustomDatePicker
                        handleDateSelect={handleDateSelect}
                        purchaseData={purchaseData}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="category"
                          name="category"
                          label="Category"
                          placeholder="Enter Category"
                          onChange={(value) =>
                            formik.setFieldValue("category", value)
                          }
                          value={formik.values.category}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <FormControl fullWidth>
                        <LabeledTextField
                          id="supplier"
                          name="supplier"
                          label="Supplier"
                          placeholder="Enter Supplier"
                          onChange={(value) =>
                            formik.setFieldValue("supplier", value)
                          }
                          value={formik.values.supplier}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
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
          </Grid>
        }
      />
    </>
  );
};
export default ManageStock;
