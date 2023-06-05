import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  datePickerBox: {
    height: "40px",
    color: "#808CA3",
    fontStyle: "normal",
    fontFamily: "Nunito",
    fontWeight: "normal",
    borderRadius: "4px",
    borderColor: "rgba(181, 189, 233, 1)",
    borderWidth: "1px",
    boxShadow: "none",
    padding: "0 12px",
    borderStyle: "solid",
    fontSize: "16px",
    width: "100%",
  },
  calender: {
    width: "max-content",
  },
  wrapper: {
    width: "80%",
  },
  popper: {
    position: "relative",
    zIndex: "99999",
  },
}));

const CustomSelectDateRange = ({ onChange, startDate, endDate }) => {
  const classes = useStyles();

  return (
    <div>
      <DatePicker
        placeholderText="Select Date Range"
        showIcon
        dateFormat="dd/MM/yyyy"
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        isClearable={true}
        calendarClassName={classes.calender}
        wrapperClassName={classes.wrapper}
        popperClassName={classes.popper}
        className={classes.datePickerBox}
        monthsShown={2}
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
    </div>
  );
};

export default CustomSelectDateRange;
