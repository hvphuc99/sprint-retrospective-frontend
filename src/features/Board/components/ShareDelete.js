import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import ModalShareBoard from "./Modal/ModalShareBoard";

function ShareDelete({ onShare = () => {}, onDelete = () => {} }) {
  const [openModalShare, setOpenModalShare] = useState(false);

  const handleCloseModalShare = () => {
    setOpenModalShare(false);
  };

  const handleShare = () => {
    setOpenModalShare(true);
    onShare();
  };

  return (
    <>
      <div>
        <Button variant="contained" color="primary" onClick={handleShare}>
          Share
        </Button>
        <Button variant="contained" color="secondary" onClick={onDelete}>
          Delete
        </Button>
      </div>

      <ModalShareBoard open={openModalShare} onClose={handleCloseModalShare} />
    </>
  );
}

export default ShareDelete;
