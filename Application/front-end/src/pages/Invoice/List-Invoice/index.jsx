import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { Grid } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import PageLayout from "../../../components/PageLayout";
import DialogBox from "../../../components/DialogBox";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import { styles } from "./styles";

const ListInvoice = () => {
  const classes = styles();

  const [open, setOpen] = useState(false);

  const handleSaveInvoie = () => {};

  const handleOpenDialogBox = () => {
    setOpen(true);
  };

  return (
    <Grid container classes={{ container: classes.gridContainer }}>
      <PageLayout
        pageHeading={"Invoice"}
        pageActions={
          <Grid>
            <Button
              id="btn-create-purchase-order"
              variant="contained"
              onClick={handleOpenDialogBox}
            >
              <AddCircleOutlineIcon className={classes.plusIcon} />
              {"Create Invoice"}
            </Button>
          </Grid>
        }
      >
        <DialogBox
          title={"Create Invoice"}
          saveButtonTitle="Save"
          open={open}
          setOpen={setOpen}
          maxWidth="lg"
          // updatingStatus={isUpdating}
          // disableStatus={isUpdating || !selectedList.length}
          handleSaveButton={handleSaveInvoie}
          children={
            <Grid>
              <Grid sx={classes.textField}>
                <LabelledEditableSelect
                  label={"Invoice No"}
                  // items={integrationTypes}
                  // value={integrationType?.name}
                  placeholder={"Invoice No"}
                  onChange={(selected) => {
                    // handleChangeDropDown(selected);
                  }}
                  customProps={{ height: 200 }}
                />
              </Grid>
            </Grid>
          }
        />
      </PageLayout>
    </Grid>
  );
};
export default ListInvoice;
