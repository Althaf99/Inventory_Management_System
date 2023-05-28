import * as React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Grid } from "@material-ui/core";

import { styles } from "./styles";

const DisplayCard = ({ itemText }) => {
  const classes = styles();
  return (
    <Grid className={classes.displayCard}>
      <Grid>
        <List>
          <Grid>
            <ListItem>
              <ListItemText className={classes.text}>{itemText}</ListItemText>
            </ListItem>
          </Grid>
        </List>
      </Grid>
    </Grid>
  );
};

export default DisplayCard;
