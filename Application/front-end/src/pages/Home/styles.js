import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  section: {
    backgroundColor: "#FFFFFF",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "32px",
    lineHeight: "48px",
    /* identical to box height */
    color: "#1E88E5",
  },
  btn: {
    padding: "10px 15px",
    gap: "10px",
    background: "linear-gradient(180deg, #1E88E5 0%, #1E88E5 100%)",
    borderRadius: "5px",
    color: "#FFFFFF",
  },
  table: {
    paddingTop: "40px",
    height: "100%",
    paddingBottom: "40px",
  },
}));
