import React from "react";

const EditIcon = (props) => (
  <svg
    className={props.className}
    width="16px"
    height="16px"
    viewBox="0 0 13 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.125 2.4375L10.5625 4.875"
      stroke={props.color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.625 8.9375L4.0625 11.375"
      stroke={props.color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.75 0.8125L12.1875 3.25L4.0625 11.375L0.8125 12.1875L1.625 8.9375L9.75 0.8125Z"
      stroke={props.color}
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default EditIcon;
