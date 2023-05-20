import React from "react";

import { Button } from "@mui/material";

import LoaderSpinner from "../../LoaderSpinner";

const NavigationButton = ({
  id,
  children,
  onClickHandler,
  disableStatus,
  updatingStatus,
  sx,
  type,
}) => {
  return (
    <Button
      variant="contained"
      data-cy={`${sx}-${id}`}
      sx={sx}
      startIcon={
        updatingStatus ? (
          <LoaderSpinner color="#808CA3" height={20} width={20} />
        ) : (
          ""
        )
      }
      disabled={disableStatus === true ? true : false}
      onClick={onClickHandler}
      type={type}
    >
      {children}
    </Button>
  );
};

export default NavigationButton;
