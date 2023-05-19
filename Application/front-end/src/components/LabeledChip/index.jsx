import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    color: "#FFFFFF",
    borderRadius: "18px",
    height: "24px",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "19px",
    margin: "0px 3px",
  }),
}));

const LabeledChip = ({
  label,
  backgroundColor,
  infoIcon,
  title,
  disableHoverListenerAction,
  height,
}) => {
  const classes = useStyles();

  return (
    <Tooltip
      title={<h1 style={{ fontSize: "14px" }}>{title} </h1>}
      placement="top"
      disableHoverListener={disableHoverListenerAction === false ? false : true}
      arrow
    >
      <Chip
        label={label}
        classes={{ root: classes.root }}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : "#B5BDE9",
          height: height ? height : "",
          marginLeft: "30px",
        }}
        icon={
          infoIcon === true ? (
            <InfoIcon fontSize="small" style={{ color: "white" }} />
          ) : null
        }
      />
    </Tooltip>
  );
};

export default LabeledChip;
