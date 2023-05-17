import React from "react";

import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";

const PageLayout = ({ pageHeading, helperText, children, pageActions }) => {
  const theme = useTheme();
  const classes = styles(theme);

  return (
    <Grid container sx={classes.gridContainer}>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <Typography sx={classes.headingTitle}>{pageHeading}</Typography>
        </Grid>
        <Grid container item alignItems={"center"} width={"max-content"}>
          <Grid item>{pageActions}</Grid>
        </Grid>
      </Grid>
      <Grid item sx={classes.helperTextSection}>
        <Typography variant="body2">{helperText}</Typography>
      </Grid>
      <Grid item container sx={classes.section}>
        {children}
      </Grid>
    </Grid>
  );
};

export default PageLayout;
