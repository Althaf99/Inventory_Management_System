import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    padding: "0em 3.5625em",
    display: "flex",
    margin: "0 auto",
    width: "50%",

    justifyContent: "space-between",
    "@media (max-width: 1330px)": {
      padding: "0em",
    },
  },
  heading: {
    paddingTop: "29px",
  },
  // headingTitle: theme.appDirector.pageHeading,
  section: {
    paddingTop: "20px",
    flex: 1,
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      // borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  textField: {
    flex: 1,
  },
  errorTextField: {
    borderColor: "red !important",
  },
  // label: theme.appDirector.label,
  block: {
    display: "flex",
    flexDirection: "row-reverse",
    paddingTop: "36px",
  },
  button: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
  },
  backButton: {
    width: "166px",
    height: "40px",
    marginBottom: "50px",
    marginRight: "20px",
  },
  invalid: {
    color: "red",
    fontSize: "0.75rem",
  },
  tags: {
    paddingTop: "10px",
  },
  required: {
    color: "red",
  },
}));
