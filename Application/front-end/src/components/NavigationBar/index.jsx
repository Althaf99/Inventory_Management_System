import * as React from "react";
import { Outlet, Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core";

import { styles } from "./styles";

const NavigationBar = () => {
  const classes = styles();

  return (
    <>
      <AppBar position="sticky">
        <CssBaseline />
        <Toolbar>
          <Typography className={classes.logo}>
            Fujicraft Inventory Management System
          </Typography>
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            <Link to="/printer" className={classes.link}>
              Printer
            </Link>
            <Link to="/deliveryNote" className={classes.link}>
              Delivery Note
            </Link>
            <Link to="/invoice" className={classes.link}>
              Invoice
            </Link>
            <Link to="/purchaseOrder" className={classes.link}>
              PO
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Grid className={classes.children}>
        <Outlet />
      </Grid>
    </>
  );
};
export default NavigationBar;
