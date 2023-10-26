import React from "react";
import { TextField, Button, Typography, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";

import DialogBox from "../../components/DialogBox";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

import useCreateUser from "../../hooks/services/useCreateUser";

const Registration = ({ openRegistration, setOpenRegistration }) => {
  const classes = useStyles();

  const { mutateAsync: createUser } = useCreateUser();

  const closeDialog = () => {
    setOpenRegistration(false);
  };

  // const { mutateAsync: registerStudent } = useRegisterStudent();

  const handleSubmit = (values) => {
    // registerStudent(values);
    // setOpenRegistration(false);
    createUser(values);
  };

  return (
    <DialogBox
      title={"Register Student"}
      open={openRegistration}
      setOpen={closeDialog}
      maxWidth="lg"
      height="1200px"
      children={
        <Grid className={classes.container}>
          <Typography variant="h4" className={classes.heading}>
            Fujicraft Inventory Management System
          </Typography>
          <AccountCircle className={classes.icon} />
          <Formik
            initialValues={{
              userName: "",
              lastName: "",
              firstName: "",
              password: "",
            }}
            onSubmit={(values) => {
              console.log("values", values);
              handleSubmit(values);
            }}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.userName) {
            //     errors.userName = "Student Name is required";
            //   }
            //   if (!values.lastName) {
            //     errors.lastName = "Student Id is required";
            //   }
            //   if (!values.firstName) {
            //     errors.firstName = "Email is required";
            //   }
            //   if (!values.password) {
            //     errors.password = "Password is required";
            //   }
            //   return errors;
            // }}
          >
            {({ isValid = false }) => (
              <Form className={classes.form}>
                <Field
                  as={TextField}
                  name="userName"
                  label="User Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                >
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <Box className={classes.infoBox}>
            <Typography variant="body1">
              Information Box - Display some information here.
            </Typography>
          </Box>
        </Grid>
      }
    ></DialogBox>
  );
};

export default Registration;
