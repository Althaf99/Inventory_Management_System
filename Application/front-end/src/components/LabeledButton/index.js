import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    color: "#0F5EF7",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
    minWidth: "0px",
  },
}));

const CreateButton = ({ icon, classes, handleClick, children }) => {
  const labelStyles = useStyles();

  return (
    <Button
      onClick={handleClick}
      disableRipple
      variant="text"
      endIcon={icon}
      classes={{
        root: clsx(labelStyles.root, classes && classes.root),
        text: clsx(classes && classes.text),
      }}
    >
      {children}
    </Button>
  );
};

export default CreateButton;
