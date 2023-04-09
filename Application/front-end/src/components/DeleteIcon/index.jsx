import React from "react";

const DeleteIcon = (props) => (
  <svg
    className={props.className}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.0909 5.45459V15H2.90909V5.45459"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path
      d="M1 3.54541H15"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path
      d="M8 7.36353V12.1363"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path
      d="M5.45456 7.36353V12.1363"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path
      d="M10.5454 7.36353V12.1363"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
    <path
      d="M5.45456 3.54545V1H10.5455V3.54545"
      stroke={props.color ? props.color : "#FF7C7C"}
      strokeMiterlimit="10"
      strokeLinecap="square"
    />
  </svg>
);

export default DeleteIcon;
