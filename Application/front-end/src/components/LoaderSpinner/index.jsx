import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const LoaderSpinner = ({ type, color, height, width, text }) => {
  return (
    <>
      <FidgetSpinner type={type} color={color} height={height} width={width} />
      {text && <h2>{text}</h2>}
    </>
  );
};

export default LoaderSpinner;
