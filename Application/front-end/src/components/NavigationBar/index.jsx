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
            <Link to="/Home" className={classes.link}>
              Home
            </Link>
            <Link to="/Dashboard" className={classes.link}>
              Dashboard
            </Link>
            <Link to="/PurchaseOrder" className={classes.link}>
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
