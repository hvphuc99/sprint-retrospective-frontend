import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = heightView => makeStyles({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#666",
		height: heightView,
		width: "100vw",
    opacity: "0.8",
    zIndex: "1000",
  },
});

function Loading() {
	const heightView = document.documentElement.scrollHeight;
  const classes = useStyles(heightView)();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
