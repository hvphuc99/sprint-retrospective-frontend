import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
	IconButton,
  makeStyles,
  TextField,
	Typography,
} from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
	title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
});

function ModalShareBoard({ open = false, onClose = () => {} }) {
  const classes = useStyles();
  const match = useRouteMatch();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle className={classes.title} disableTypography >
				<Typography variant="h5">Share board</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
			</DialogTitle>
      <DialogContent>
        <TextField
          label="URL"
          autoComplete="off"
          autoFocus={true}
					// value={process.env.REACT_APP_URL + match.url}
					value={"localhost:3000" + match.url}
					fullWidth
					multiline
        />
      </DialogContent>

      <DialogActions className={classes.dialogAction}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalShareBoard;
