import * as React from "react";
import { Outlet, Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
    textDecoration: "none",
    height: "20px",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(15),
    "&:hover": {
      color: "black",
    },
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            Navbar
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
      <Outlet />
    </>
  );
};
export default NavigationBar;
