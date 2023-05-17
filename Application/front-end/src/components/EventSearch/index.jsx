import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Input, IconButton } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";

import SearchIcon from "../SearchIcon";

const useStyles = makeStyles((theme) => ({
  select: {
    borderRadius: theme.shape.borderRadius,
    height: "35px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    color: "#001847 !important",
    marginRight: "10px",
  },
  selectSmall: {
    borderRadius: theme.shape.borderRadius,
    height: "35px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    color: "#001847 !important",
    padding: "0.5em 0.8em",
  },
  searchIcon: {
    backgroundColor: "#EFF3FA",
    marginRight: "8px",
  },
  underline: {
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.42) !important",
    },
    "&::after": {
      borderBottom: "1px solid rgba(0, 0, 0, 0.42) !important",
    },
  },
}));

const SearchBar = ({
  id,
  name,
  placeholder,
  defaultValue = "",
  value,
  register,
  handleChange,
}) => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1250px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isExpanded = true;

  const handlePopoverOpen = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <span>
      {matches ? (
        <>
          <IconButton
            onClick={handlePopoverOpen}
            className={classes.searchIcon}
          >
            <SearchIcon />
          </IconButton>
          <Popover
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
          >
            <Input
              id={id}
              name={name}
              className={classes.selectSmall}
              placeholder={placeholder}
              inputRef={register}
              disableUnderline={false}
              defaultValue={defaultValue}
              value={value}
              onChange={handleChange}
              classes={{ underline: classes.underline }}
            />
          </Popover>
        </>
      ) : (
        <>
          <IconButton className={classes.searchIcon}>
            <SearchIcon />
          </IconButton>
          {isExpanded ? (
            <Input
              id={id}
              name={name}
              className={classes.select}
              placeholder={placeholder}
              inputRef={register}
              disableUnderline={false}
              defaultValue={defaultValue}
              value={value}
              onChange={handleChange}
              classes={{ underline: classes.underline }}
            />
          ) : null}
        </>
      )}
    </span>
  );
};

export default SearchBar;
