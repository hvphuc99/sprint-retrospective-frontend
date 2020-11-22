import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = (heightView) =>
  makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

function Loading({ open = false }) {
  const heightView = document.documentElement.scrollHeight;
  const classes = useStyles(heightView)();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
