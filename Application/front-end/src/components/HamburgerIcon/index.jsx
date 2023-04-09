import React from "react";

const HamburgerIcon = (props) => {
  return (
    <svg
      className={props.className}
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="17.5" cy="17.5" r="17.5" fill="#141314" />
      <line
        x1="10"
        y1="11.25"
        x2="25.1667"
        y2="11.25"
        stroke="white"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="17.25"
        x2="25"
        y2="17.25"
        stroke="white"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="23.3828"
        x2="25.1667"
        y2="23.3828"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default HamburgerIcon;
