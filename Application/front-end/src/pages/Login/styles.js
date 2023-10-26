import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center the content vertically
    height: "100vh", // Adjust the height to center the content in the viewport
    padding: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  icon: {
    fontSize: "64px",
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "& .MuiButton-root": {
      margin: theme.spacing(2),
    },
  },
  infoBox: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    width: "400px",
    textAlign: "center",
  },
}));
