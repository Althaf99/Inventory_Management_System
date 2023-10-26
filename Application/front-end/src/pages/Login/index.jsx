import React, { useState } from "react";

import { useSnackbar } from "notistack";

import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";

import { AccountCircle } from "@material-ui/icons";

import { useStyles } from "./styles";

import Registration from "../Registration/index.jsx";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [openRegistration, setOpenRegistration] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const setEnqueueSnackbar = (msg, snackerVariant) => {
    enqueueSnackbar(msg, {
      variant: snackerVariant,
      autoHideDuration: 3000,
    });
  };
  const handleSubmit = async (values, actions) => {
    if (values.email === "Dunu@gmail.com" && values.password === "dunu") {
      navigate("/employee");
    }
  };

  const handleRegistration = () => {
    setOpenRegistration(true);
  };

  return (
    <Grid className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        Fujicraft Inventory Management System
      </Typography>
      <AccountCircle className={classes.icon} />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, action) => {
          handleSubmit(values, action);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email is required";
          }
          if (!values.password) {
            errors.password = "Password is required";
          }
          return errors;
        }}
      >
        {({ isValid = false }) => (
          <Form className={classes.form}>
            <Field
              as={TextField}
              type="email"
              name="email"
              label="Email"
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
              disabled={!isValid} // Disable the button when the form is invalid
            >
              Login
            </Button>
            <Button onClick={handleRegistration}>Registration</Button>
          </Form>
        )}
      </Formik>
      <Registration
        openRegistration={openRegistration}
        setOpenRegistration={setOpenRegistration}
      />
    </Grid>
  );
};

export default Login;
