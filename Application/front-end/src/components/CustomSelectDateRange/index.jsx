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
}));

const CustomSelectDateRange = ({ onChange, startDate, endDate }) => {
  const classes = useStyles();

  return (
    <div>
      <DatePicker
        placeholderText="Select Date Range"
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        isClearable={true}
        className={classes.datePickerBox}
        monthsShown={2}
        calendarClassName={classes.calender}
        wrapperClassName={classes.wrapper}
      />
    </div>
  );
};

export default CustomSelectDateRange;
