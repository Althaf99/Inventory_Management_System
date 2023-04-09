import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import LoadingButton from "../LoadingButton";
import useCreatePost from "../../hooks/services/useCreatePost";
const useStyles = makeStyles((theme) => ({
  dialogContent: {
    paddingBottom: "2em",
  },
  gridContainer: {
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  section: {
    padding: "20px 47px 0px 57px",
  },
  headingTitle: {
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "30px",
    lineHeight: "41px",
  },
  space: {
    paddingTop: "30px",
  },
  button: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: "36px",
  },
}));
const TablePopUp = ({ open, handleClose }) => {
  const classes = useStyles();
  const closeAndClearData = () => {
    handleClose();
  };
  const [projectData, setProjectData] = useState();

  const { register, handleSubmit, getValues } = useForm({
    mode: "onBlur",
  });
  const { mutateAsync: dataCreater } = useCreatePost();
  const handleChangeProject = (e, name) => {
    setProjectData({ ...projectData, [name]: e.target.value });
  };
  const onSubmit = async () => {
    const values = getValues();
    const item = values?.item;
    const color = values?.color;
    const quantity = values?.qty;

    try {
      const newColoumn = {
        item,
        color,
        quantity,
      };
      await dataCreater(newColoumn);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        maxWidth="xl"
        onClose={() => {
          closeAndClearData();
        }}
      >
        <DialogTitle>
          <span className={classes.headingTitle}>
            {"projects.create.title"}
          </span>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <Grid container classes={{ container: classes.gridContainer }}>
            <Grid item container direction="column" className={classes.section}>
              <Grid item className={classes.space}>
                <div className={classes.label}>
                  {"Item"}
                  <span className={classes.required}> *</span>
                </div>
                <FormControl fullWidth>
                  <TextField
                    {...register("item", { required: true })}
                    placeholder={"Item"}
                    variant="outlined"
                    value={projectData?.item || ""}
                    onChange={(e) => {
                      handleChangeProject(e, "item");
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.space}>
                <div className={classes.label}>
                  {"Color"}
                  <span className={classes.required}> *</span>
                </div>
                <FormControl fullWidth>
                  <TextField
                    {...register("color", { required: true })}
                    placeholder={"Color"}
                    variant="outlined"
                    value={projectData?.color || ""}
                    onChange={(e) => {
                      handleChangeProject(e, "color");
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item className={classes.space}>
                <div className={classes.label}>
                  {"Quantity"}
                  <span className={classes.required}> *</span>
                </div>
                <FormControl fullWidth>
                  <TextField
                    {...register("qty", { required: true })}
                    placeholder={"Quantity"}
                    variant="outlined"
                    value={projectData?.qty || ""}
                    onChange={(e) => {
                      handleChangeProject(e, "qty");
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item container className={classes.button}>
              <LoadingButton
                id="btn-add-project"
                onClickHandler={handleSubmit(onSubmit)}
              >
                <>Save Data</>
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TablePopUp;
