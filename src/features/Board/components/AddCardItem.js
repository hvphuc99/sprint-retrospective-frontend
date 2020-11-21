import {
  Button,
  makeStyles,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useState } from "react";
import ModalAddCardItem from "./Modal/ModalAddCardItem";

const useStyles = makeStyles({
  addCardButton: {
    width: "100%",
  },
  form: {
    padding: "0px 20px",
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
    width: "100%",
    "& button": {
      width: "48%",
    },
  },
});

function AddCardItem({ onSubmit = () => {} }) {
  const classes = useStyles();

  const [openModalAddCard, setOpenModalAddCard] = useState(false);

  const handleOpenModalAddCard = () => {
    setOpenModalAddCard(true);
  };

  const handleCloseModalAddCard = () => {
    setOpenModalAddCard(false);
  };

  const handleSubmit = (event) => {
		onSubmit(event);
		setOpenModalAddCard(false);
  };

  return (
    <>
      <Button
        variant="contained"
        className={classes.addCardButton}
        onClick={handleOpenModalAddCard}
      >
        <AddIcon />
      </Button>

      <ModalAddCardItem
        open={openModalAddCard}
        onClose={handleCloseModalAddCard}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default AddCardItem;
