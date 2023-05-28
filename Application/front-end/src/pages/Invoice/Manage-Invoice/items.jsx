import React from "react";

import { Grid } from "@mui/material";
import FormControl from "@material-ui/core/FormControl";

import LabelledEditableSelect from "../../../components/LabelledEditableSelect";
import DialogBox from "../../../components/DialogBox";
import LabeledTextField from "../../../components/LabeledTextField";

const Items = ({
  openItems,
  setOpenItems,
  handleSaveItems,
  classes,
  formik,
  itemNamesArray,
}) => {
  return (
    <DialogBox
      title={"Select Item and Unit Price"}
      saveButtonTitle="Add"
      open={openItems}
      setOpen={setOpenItems}
      maxWidth="sm"
      // updatingStatus={isUpdating}
      // disableStatus={isUpdating || !selectedList.length}
      handleSaveButton={handleSaveItems}
      children={
        <Grid>
          <Grid sx={classes.textField}>
            <Grid item container className={classes.section} spacing={3}>
              <Grid item className={classes.textField}>
                <Grid item>
                  <FormControl fullWidth>
                    <LabelledEditableSelect
                      id="itemName"
                      name="itemName"
                      label="Item Name"
                      placeholder="Enter Item Name"
                      onChange={(value) =>
                        formik.setFieldValue("itemName", value)
                      }
                      value={formik.values.itemName}
                      items={itemNamesArray}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
};

export default Items;
