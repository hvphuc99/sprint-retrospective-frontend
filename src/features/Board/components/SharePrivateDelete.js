import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ModalShareBoard from "./Modal/ModalShareBoard";

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
          <Button variant="contained" color="primary" onClick={handlePrivate}>
            Set Private
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleShare}>
            Share
          </Button>
        )}

        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </div>

      <ModalShareBoard open={openModal} onClose={handleCloseModalShare} />
    </>
  );
}

export default SharePrivateDelete;
