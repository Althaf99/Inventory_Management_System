import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CloseRounded from "@material-ui/icons/CloseRounded";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "40px",
    width: "40px",
    boxShadow: "0px 4px 22px 0px rgba(0, 0, 0, 0.17)",
  },
  icon: {
    color: "rgba(255, 119, 119, 1)",
  },
}));

const CloseButton = ({ id, onClick }) => {
  const classes = useStyles();

  return (
    <IconButton id={id} classes={{ root: classes.root }} onClick={onClick}>
      <CloseRounded classes={{ root: classes.icon }} />
    </IconButton>
  );
};

export default CloseButton;
