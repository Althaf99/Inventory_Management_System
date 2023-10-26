import React from "react";

import { Grid, Button, Divider, Box } from "@mui/material";

import EditIcon from "../../../components/EditIcon";
import DeleteIcon from "../../../components/DeleteIcon";

import { styles } from "../list-employee/styles";

import useDeleteEmployee from "../../../hooks/services/useDeleteEmployee";

const OptionPanel = ({
  values,
  setIsUpdate,
  isUpdate,
  setOpenCreateEmployee,
  openCreateEmploye,
}) => {
  const { mutateAsync: templateDeleter } = useDeleteEmployee({
    id: values.id,
  });

  const handleDeleteEmployee = async () => {
    setIsUpdate(!isUpdate);
    await templateDeleter();
  };
  const classes = styles();
  return (
    <Grid>
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
            setOpenCreateEmployee(true);
          }}
          variant="text"
          classes={classes.btnRoot}
          startIcon={
            <EditIcon color="#808CA3" className={classes.editIconRoot} />
          }
        >
          <span className={classes.btnText}>Edit</span>
        </Button>
        <Divider orientation="vertical" flexItem className={classes.divider} />
        <Button
          id="btn-delete-credential"
          variant="text"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEmployee(values);
          }}
          classes={classes.deleteBtn}
          startIcon={<DeleteIcon className={classes.menuIconRoot} />}
        >
          <span className={classes.btnText}>Delete</span>
        </Button>
      </Box>
    </Grid>
  );
};

export default OptionPanel;
