import React from "react";

import { Grid, Button, Box } from "@mui/material";

import DeleteIcon from "../../../../components/DeleteIcon";

import { styles } from "../styles";

const OptionPanel = ({
  values,
  deliveryNote,
  setDeliveryNote,
  setSelectedItems,
  selectedItems,
}) => {
  const handleDeleteElement = (values) => {
    for (let i = 0; i < deliveryNote.length; i++) {
      const item = deliveryNote[i];

      if (item.itemName === values.itemName) {
        const index = item.item.findIndex(
          (element) =>
            element.itemColor === values.itemColor &&
            element.quantity === values.quantity
        );

        if (index !== -1) {
          item.item.splice(index, 1);

          if (item.item.length === 0) {
            deliveryNote.splice(i, 1);
          }

          break;
        }
      }
    }

    selectedItems.forEach((element) => {
      console.log(
        element.itemName === values.itemName &&
          element.itemColor === values.itemColor &&
          element.quantity === values.quantity
      );
      if (
        element.itemName === values.itemName &&
        element.itemColor === values.itemColor &&
        element.quantity === values.quantity
      ) {
        const index = selectedItems.findIndex(
          (obj) =>
            obj.itemName === values.itemName &&
            obj.itemColor === values.itemColor &&
            obj.quantity === values.quantity
        );
        selectedItems.splice(index, 1);
      }
    });

    console.log("selectedItem --------> ", selectedItems);

    setSelectedItems(selectedItems);

    setDeliveryNote(deliveryNote);
  };

  const classes = styles();
  return (
    <Button
      id="btn-delete-credential"
      variant="text"
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteElement(values);
      }}
      classes={classes.deleteBtn}
      startIcon={<DeleteIcon className={classes.menuIconRoot} />}
    ></Button>
  );
};

export default OptionPanel;
