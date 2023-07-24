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

import useCreateRepair from "../../../hooks/services/useCreateRepair";

const ManageRepair = ({ setOpen, open }) => {
  const classes = styles();
  const [date, setDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createEmployee } = useCreateRepair();
  const formik = useFormik({
    initialValues: {
      category: "",
      description: "",
      status: "",
      date: "",
    },

    onSubmit: async (values) => {
      try {
        const repair = {
          category: values.category,
          description: values.description,
          status: values.status,
          phone: values.phone,
          date: formatDate(date),
        };
        await createEmployee(repair);
        formik.resetForm();
        setEnqueueSnackbar("Repair Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Repair Submission", "error");
      }
    },
  });
  const closeDialog = () => {
    setOpen(false);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Create Repair"}
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
                          id="description"
                          name="description"
                          label="description"
                          placeholder="Enter Description"
                          onChange={(value) =>
                            formik.setFieldValue("description", value)
                          }
                          value={formik.values.description}
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
                          id="status"
                          name="status"
                          label="Status"
                          placeholder="Enter Status"
                          onChange={(value) =>
                            formik.setFieldValue("status", value)
                          }
                          value={formik.values.status}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <Grid className={classes.label}>SELECT Date</Grid>
                      <CustomDatePicker
                        handleDateSelect={handleDateSelect}
                        date={date}
                      />
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
export default ManageRepair;
