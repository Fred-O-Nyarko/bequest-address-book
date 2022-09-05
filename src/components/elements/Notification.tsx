import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import {
  useAppDispatch,
  useAppSelector,
  selectNotification,
  setNotification,
} from "src/redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(selectNotification);

  const handleClose = (
    event: React.SyntheticEvent<any> | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setNotification(null));
  };

  return (
    <Snackbar
      open={!!notification?.message}
      autoHideDuration={2000}
      onClose={handleClose}
      id="notification"
    >
      <Alert
        onClose={handleClose}
        severity={notification?.type}
        sx={{ width: "100%" }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
