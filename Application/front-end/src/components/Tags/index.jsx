import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles((theme) => ({
  tags: {
    paddingLeft: "8px",
    border: "1px solid #B5BDE9",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid black",
    },
  },
  chip: {
    borderRadius: "18px",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "19px",
    marginBottom: "1px",
  },
  underline: {
    "&::before": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '""',
      position: "absolute",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      borderBottom: "0px solid rgba(0, 0, 0, 0.42)",
      pointerEvents: "none",
      "&:hover": {
        borderBottom: "0 !important",
      },
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: "0px !important",
    },
    "&::after": {
      left: "0",
      right: "0",
      bottom: "0",
      content: '""',
      position: "absolute",
      transform: "scaleX(0)",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      borderBottom: "0px solid rgba(0, 0, 0, 0.42)",
      pointerEvents: "none",
    },
  },
  chipback: {
    background: "#B5BDE9",
    color: "#FFFFFF",
    borderRadius: "18px",
    "&:hover": {
      background: "#B5BDE9",
      color: "#FFFFFF",
      borderRadius: "18px",
    },
  },
}));

const Tags = ({ id, addValues, values, onChange, isEmpty }) => {
  const classes = useStyles();

  const [tags, setTags] = useState(values ? [...values] : []);

  // Add Chips
  const handleAddChip = (chip) => {
    isEmpty(false);
    setTags([...tags, chip]);
  };
  // Delete Chips
  const handleDeleteChip = (chip) => {
    isEmpty(false);
    setTags(tags.filter((tag, index) => tag !== chip));
  };

  useEffect(() => {
    addValues(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <ChipInput
      id={id}
      placeholder="Add new tag"
      value={tags}
      onChange={onChange}
      onAdd={(chip) => handleAddChip(chip)}
      onDelete={(chip) => handleDeleteChip(chip)}
      inputProps={{
        classes: {
          root: classes.tags,
        },
      }}
      classes={{
        chipContainer: classes.chip,
        underline: classes.underline,
        chip: classes.chipback,
      }}
      blurBehavior="add"
    />
  );
};

export default Tags;
