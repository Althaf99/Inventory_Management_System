import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

const useStyles = makeStyles((theme) => ({
  select: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    color: "#808CA3",
    padding: "8px",
    borderRadius: "4px",
    borderColor: "rgba(181, 189, 233, 1)",
    borderWidth: "1px",
    boxShadow: "none",
    borderStyle: "solid",
    backgroundColor: "white",
    fontSize: "16px",
    textAlign: "left",
    overflow: "auto",
    height: 40,
  },
  menu: {
    width: "273px",
    "& .rc-menu__item": {
      paddingLeft: "33px",
    },
  },
  subMenu: {
    maxHeight: "425px",
    overflow: "auto",
  },
  label: {
    paddingLeft: "33px",
  },
}));

const CustomGroupSelect = ({
  selectItems,
  onChange,
  setItems,
  handleCheck,
  selectedItems,
}) => {
  const classes = useStyles();

  const displayVal = () => {
    if (selectedItems.includes("allTypes")) {
      return "All";
    }
    if (selectedItems.length === 1) {
      var str = "";
      selectItems.map((group, index) =>
        group.items.filter((item, index) =>
          selectedItems.includes(item.value) ? (str = str + item.name) : null
        )
      );
      return str;
    } else if (selectedItems.length >= 2) {
      return "Multiple values selected";
    }
  };

  return (
    <Menu
      menuButton={
        <MenuButton className={classes.select}>{displayVal()}</MenuButton>
      }
      className={classes.menu}
      onItemClick={(e) => (e.keepOpen = true)}
    >
      <MenuItem
        type="checkbox"
        checked={handleCheck("allTypes")}
        onClick={(e) => setItems(["allTypes"])}
      >
        All
      </MenuItem>
      {selectItems.map((group, index) => (
        <SubMenu label={group.label} key={index} className={classes.subMenu}>
          {group.items.map((item, index) => (
            <MenuItem
              type="checkbox"
              key={index}
              value={item.value}
              checked={handleCheck(item.value)}
              onClick={(e) => onChange(e)}
            >
              {item.name}
            </MenuItem>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default CustomGroupSelect;
