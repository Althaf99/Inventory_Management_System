import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  head: (props) => ({
    borderBottom: "0px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: props.fontSize ? props.fontSize : "16px",
    lineHeight: "22px",
    color: props.color ? props.color : "#808CA3",
  }),
  row: {
    boxShadow: "0px 1px 8px rgba(20, 46, 110, 0.1)",
    borderRadius: "10px",
    height: "50px !important",
  },
  cell: (props) => ({
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    color: props.cellColor ? props.cellColor : "#001847",
  }),
  cellDeleted: {
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "18px",
    color: "#878787",
  },
  textTruncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:last-child": {
      textAlign: "right",
    },
  },
  textTruncateTextWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&:last-child": {
      textAlign: "right",
    },
  },
});
