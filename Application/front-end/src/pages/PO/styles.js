import { css } from "@emotion/react";

const styles = (theme) => {
  const gridContainer = css`
  flex-direction: "column",
  flex-wrap: "nowrap",
  `;
  const heading = css`
    paddingtop: "29px";
  `;
  const section = css`
  paddingTop: "40px",
  height: "80%",
  paddingBottom: "40px",  
  `;

  const actionContainer = css`
  display: "flex",
  alignItems: "center",
  direction: "rtl",
  `;
  const menuIconRoot = css`
  width: "16px",
  height: "16px",
  color: "#808CA3",
  marginRight: "15px",
  `;
  const editIconRoot = css`
    marginright: "15px";
  `;
  const btnRoot = css`
  "&:hover" {
    backgroundColor: "transparent !important",
  },
  textTransform: "none",
  color: "#808CA3",
  padding: 0,
  fontFamily: "Nunito",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  minWidth: "50px",
  height: "26px",
  `;
  const deleteBtn = css`
  "&:hover"  {
    backgroundColor: "transparent !important",
  },
  textTransform: "none",
  color: "#FF7C7C",
  padding: 0,
  fontFamily: "Nunito",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: "14px",
  minWidth: "50px",
  height: "26px",
  `;

  const divider = css`
  margin: "0px 30px",
  "@media (max-width: 1330px)": {
    margin: "0px 0px",
  },
  textAlign: "right",
  `;
  const spinner = css`
 
 width: "100%",
 height: "100%",
 marginTop: "10%",
 `;
  const btnText = css`
  "@media (max-width: 1330px)": {
    display: "none",
  },
  `;
  const btn = css`
    minwidth: "8.3125em";
  `;
  return {
    gridContainer,
    heading,
    section,
    actionContainer,
    menuIconRoot,
    editIconRoot,
    btnRoot,
    deleteBtn,
    divider,
    spinner,
    btnText,
    btn,
  };
};

export default styles;
