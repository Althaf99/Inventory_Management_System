import React from "react";

import { Grid } from "@material-ui/core";

import DialogBox from "../../../components/DialogBox";
import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

import { styles } from "./styles";

const ManageInvoice = ({ open, setOpen }) => {
  const classes = styles();

  const handleSaveInvoie = () => {};
  return (
    <>
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
    </>
  );
};
export default ManageInvoice;
