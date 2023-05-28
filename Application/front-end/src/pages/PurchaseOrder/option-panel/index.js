import React from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import LabeledChip from "../../../components/LabeledChip";
import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "../ListPurchaseOrder/styles";

const OptionPanel = ({ values }) => {
  const classes = styles();
  return (
    <Grid>
      {values?.quantity <= 0 ? (
        <LabeledChip label={"Excess"} backgroundColor={"#B5B5B5"} />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <Button
            id="btn-edit-credential"
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="text"
            classes={classes.btnRoot}
            startIcon={
              <EditIcon color="#808CA3" className={classes.editIconRoot} />
            }
          >
            <span className={classes.btnText}>Edit</span>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.divider}
          />
          <Button
            id="btn-delete-credential"
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
            }}
            classes={classes.deleteBtn}
            startIcon={<DeleteIcon className={classes.menuIconRoot} />}
          >
            <span className={classes.btnText}>Delete</span>
          </Button>
        </Box>
      )}
    </Grid>
  );
};

export default OptionPanel;
