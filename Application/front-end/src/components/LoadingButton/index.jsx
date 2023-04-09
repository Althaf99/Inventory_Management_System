import React from "react";
import Button from "@material-ui/core/Button";
import LoaderSpinner from "../LoaderSpinner";
const LoadingButton = ({
  id,
  children,
  onClickHandler,
  disableStatus,
  updatingStatus,
}) => {
  return (
    <Button
      variant="contained"
      id={id}
      startIcon={
        updatingStatus ? (
          <LoaderSpinner type="Oval" color="#808CA3" height={20} width={20} />
        ) : (
          ""
        )
      }
      disabled={disableStatus === true ? true : false}
      onClick={onClickHandler}
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
