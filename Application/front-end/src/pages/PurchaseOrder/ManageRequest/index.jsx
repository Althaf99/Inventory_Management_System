import React, { useEffect, useState } from "react";

import { useFormik } from "formik";

import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@mui/material";

import { styles } from "./styles";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import useCreateRequest from "../../../hooks/services/useCreateRequest";
import useCommon from "../../../hooks/services/useCommon";
import useColors from "../../../hooks/services/useColors";
import useItemNames from "../../../hooks/services/useItemNames";
import useRequestNumbers from "../../../hooks/services/useRequestNumbers";

const ManageRequest = () => {
  const classes = styles();
  const [obj, setObj] = useState({});
  const [item, setItem] = useState();

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
      formik.setFieldValue("itemColor", "");
      formik.setFieldValue("quantity", "");
      await createRequest(obj);
    },
  });

  const handleAdd = () => {
    const values = formik.values;
    const Request = {
      po: values.po,
      date: values.poDate,
      items: [
        {
          itemName: values.itemName,
          unitPrice: values.unitPrice,
          item: [
            {
              itemColor: values.itemColor,
              quantity: values.quantity,
            },
          ],
        },
      ],
    };
    setObj(Request);
  };

  return (
    <>
      <Grid container classes={{ container: classes.container }}>
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
                    onChange={(value) => formik.setFieldValue("po", value)}
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
                    onChange={(value) => formik.setFieldValue("poDate", value)}
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
                    id="itemColor"
                    name="itemColor"
                    label="Item Color"
                    placeholder="Enter Item Color"
                    onChange={(value) =>
                      formik.setFieldValue("itemColor", value)
                    }
                    value={formik.values.itemColor}
                    items={itemColorsArray}
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
                    id="quantity"
                    name="quantity"
                    label="Quantity"
                    placeholder="Quantity"
                    onChange={(value) =>
                      formik.setFieldValue("quantity", value)
                    }
                    value={formik.values.quantity}
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
            >
              Save
            </Button>
            <Button
              id="btn-general-info-back"
              className={classes.backButton}
              onClick={() => handleAdd()}
              // disabled={props?.path === "edit"}
            >
              Add
            </Button>
          </Grid>
        </form>
      </Grid>
      {/* </PageLayout> */}
    </>
  );
};
export default ManageRequest;
