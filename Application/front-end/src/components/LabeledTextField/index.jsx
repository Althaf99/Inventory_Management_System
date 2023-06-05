import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  label: theme.appDirector.label,
  required: {
    color: "red",
  },
  invalid: {
    color: "red",
    fontSize: "12px",
  },
  errorTextField: {
    borderColor: "red !important",
  },
  textBox: {
    height: "100px",
  },
}));

const LabeledTextField = ({
  label,
  required,
  errors,
  name,
  onChange,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.label}>
        {label}
        {required ? <span className={classes.required}> *</span> : ""}
      </span>
      <FormControl
        variant="outlined"
        fullWidth
        size="medium"
        className={classes.textBox}
      >
        <TextField
          variant="outlined"
          inputProps={
            errors &&
            errors[name] && {
              classes: {
                notchedOutline: classes.errorTextField,
              },
            }
          }
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...rest}
        />
        {errors && errors[name] && (
          <p className={classes.invalid}>{errors[name]}</p>
        )}
      </FormControl>
    </div>
  );
};

export default LabeledTextField;
