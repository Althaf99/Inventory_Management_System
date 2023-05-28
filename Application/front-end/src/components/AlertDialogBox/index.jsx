import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTheme } from "@mui/material/styles";

import styles from "./styles";

const AlertDialogBox = ({
  open,
  handleClose,
  handleOk,
  title,
  content,
  buttonConfirmText,
  buttonCancelText,
  icon,
  loading = false,
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  const handleClick = (e) => {
    // doesn't do anything except stop the event
    e.stopPropagation();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={classes.dialogBox}
      onClick={handleClick}
      PaperProps={{
        sx: classes.dialogPaper,
      }}
    >
      {icon}
      {title && <DialogTitle sx={classes.titleBox}>{title}</DialogTitle>}

      <DialogContentText sx={classes.contentText}>{content}</DialogContentText>
      <DialogActions sx={classes.dialogAction}>
        {buttonCancelText && buttonConfirmText ? (
          <>
            <Button
              data-cy="btn-cancel"
              onClick={handleClose}
              sx={classes.cancelButton}
              autoFocus
            >
              {buttonCancelText}
            </Button>
            <LoadingButton
              data-cy="btn-confirm"
              onClick={handleOk}
              sx={classes.confirmButton}
              loading={loading}
              variant="contained"
              loadingPosition="start"
              startIcon={<span />}
            >
              {buttonConfirmText}
            </LoadingButton>
          </>
        ) : (
          buttonConfirmText && (
            <div>
              <LoadingButton
                data-cy="btn-ok"
                onClick={handleOk}
                sx={classes.confirmButton}
                loading={loading}
                variant="contained"
                loadingPosition="start"
                startIcon={<span />}
              >
                {buttonConfirmText}
              </LoadingButton>
            </div>
          )
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialogBox;
