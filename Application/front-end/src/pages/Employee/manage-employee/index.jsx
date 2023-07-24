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

import useCreateEmployee from "../../../hooks/services/useCreateEmployee";

const ManageEmployee = ({
  setOpenEmployeeDialogBox,
  openEmployeeDialogBox,
}) => {
  const classes = styles();
  const [employee, setEmployee] = useState([]);
  const [date, setDate] = useState(new Date());

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };

  const { mutateAsync: createEmployee } = useCreateEmployee();
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      address: "",
      phone: "",
      dob: "",
    },

    onSubmit: async (values) => {
      try {
        const employee = {
          name: values.name,
          age: values.age,
          address: values.address,
          phone: values.phone,
          dob: formatDate(date),
        };
        await createEmployee(employee);
        formik.resetForm();
        setEmployee([]);
        setEnqueueSnackbar("Employee Added Succesfully", "success");
      } catch (e) {
        setEnqueueSnackbar("Error Occured during Employee Submission", "error");
      }
    },
  });
  const closeDialog = () => {
    setOpenEmployeeDialogBox(false);
  };

  const handleDateSelect = (date) => {
    setDate(date);
  };

  return (
    <>
      <DialogBox
        title={"Create Employee"}
        open={openEmployeeDialogBox}
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
                          id="name"
                          name="name"
                          label="Employee Name"
                          placeholder="Enter Employee Name"
                          onChange={(value) =>
                            formik.setFieldValue("name", value)
                          }
                          value={formik.values.name}
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
                          id="age"
                          name="age"
                          label="Age"
                          placeholder="Enter Age"
                          onChange={(value) =>
                            formik.setFieldValue("age", value)
                          }
                          value={formik.values.age}
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
                          id="address"
                          name="address"
                          label="Address"
                          placeholder="Enter Address"
                          onChange={(value) =>
                            formik.setFieldValue("address", value)
                          }
                          value={formik.values.address}
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
                          id="phone"
                          name="phone"
                          label="Phone No"
                          placeholder="Enter Phone No"
                          onChange={(value) =>
                            formik.setFieldValue("phone", value)
                          }
                          value={formik.values.phone}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid xs={12} item className={classes.textField}>
                  <Grid item>
                    <Grid>
                      <Grid className={classes.label}>SELECT DOB</Grid>
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
export default ManageEmployee;
