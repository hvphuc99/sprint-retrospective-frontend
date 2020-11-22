import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModalShareBoard from "./Modal/ModalShareBoard";
import ShareIcon from '@material-ui/icons/Share';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
})

function SharePrivateDelete({
  onShare = () => {},
  onDelete = () => {},
  publish = false,
  onPrivate = () => {},
}) {
	const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
	const [sharing, setSharing] = useState(publish);

  const handleCloseModalShare = () => {
    setOpenModal(false);
  };

  const handleShare = () => {
    setOpenModal(true);
    setSharing(true);
    onShare();
  };

  const handlePrivate = () => {
    setSharing(false);
    onPrivate();
	};
	
	useEffect(() => {
		setSharing(publish);
	}, [publish])

  return (
    <>
      <div className={classes.root}>
        {sharing ? (
          <Button variant="contained" color="primary" onClick={handlePrivate} startIcon={<LockIcon />}>
            Set Private
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleShare} startIcon={<ShareIcon />}>
            Share
          </Button>
        )}

        <Button variant="contained" color="secondary" onClick={onDelete} startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </div>

      <ModalShareBoard open={openModal} onClose={handleCloseModalShare} />
    </>
  );
}

export default SharePrivateDelete;
