import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  datePickerBox: {
    height: "54px",
    color: "Black",
    fontStyle: "bold",
    fontFamily: "Nunito",
    fontWeight: "bold",
    borderRadius: "4px",
    borderColor: "rgba(181, 189, 233, 1)",
    borderWidth: "1px",
    boxShadow: "none",
    padding: "0 12px",
    borderStyle: "solid",
    fontSize: "18px",
    width: "100%",
  },
  calender: {
    fontSize: "20px",
    width: "100%",
  },
  wrapper: {
    width: "100%",
  },
  popper: {
    position: "relative",
    zIndex: "99999",
  },
}));

const CustomDatePicker = ({ handleDateSelect, date }) => {
  const classes = useStyles();

  return (
    <>
      <DatePicker
        showIcon
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={(date) => handleDateSelect(date)}
        isClearable
        placeholderText="Select Delivery Date"
        className={classes.datePickerBox}
        monthsShown={1}
        calendarClassName={classes.calender}
        wrapperClassName={classes.wrapper}
        popperClassName={classes.popper}
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: { enabled: true, offset: "5px, 10px" },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport",
          },
        }}
      />
    </>
  );
};

export default CustomDatePicker;
