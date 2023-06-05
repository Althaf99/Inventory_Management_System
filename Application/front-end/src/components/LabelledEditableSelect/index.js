import React from "react";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";

import styles from "./styles";

const LabelledEditableSelect = ({
  label,
  placeholder,
  items,
  value,
  onChange,
  required,
  errorMsg,
  disabled,
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  const getName = (value) => {
    let findName = items?.find((item) => item.value === value)?.name;
    return findName ? findName : value;
  };
  const getValue = (name) => {
    let findValue = items?.find((item) => item.name === name)?.value;
    return findValue ? findValue : name;
  };

  return (
    <Grid sx={classes.container}>
      {label && (
        <Grid container sx={classes.section}>
          <Grid item sx={classes.label}>
            {label}
          </Grid>
          <Grid item>{required ? <Grid sx={classes.error}> *</Grid> : ""}</Grid>
        </Grid>
      )}
      <FormControl variant="outlined" fullWidth error={errorMsg ? true : false}>
        <Autocomplete
          freeSolo
          clearable
          options={
            items
              ? items?.map((item) => (item.name ? item.name : item.value))
              : []
          }
          value={items && getName(value)}
          onChange={(e) => {
            onChange(items ? getValue(e.target.textContent) : e.target.value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant={disabled ? "filled" : "outlined"}
              placeholder={placeholder}
              onChange={(e) => {
                onChange(getValue(e.target.value));
              }}
              error={errorMsg ? true : false}
              hiddenLabel={disabled ? true : false}
              disabled={disabled ? true : false}
              id={disabled && "filled-hidden-label-normal"}
            />
          )}
        />
        <FormHelperText>{errorMsg}</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default LabelledEditableSelect;
