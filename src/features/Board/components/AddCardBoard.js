import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useState } from "react";
import boardApi from "api/boardApi";
import { useDispatch } from "react-redux";
import { addPrivateBoardList } from "features/Board/boardSlice";
import ModalAddCardBoard from "./Modal/ModalAddCardBoard";

const useStyles = makeStyles({
  root: {
    height: "calc(100% - 2px)",
    width: "100%",
    cursor: "pointer",
    backgroundColor: "transparent",
		border: "2px dashed #ccc",
		boxShadow: "none",
    "&:hover": {
      borderColor: "#4056b5",
    },
    "& .MuiCardContent-root": {
      padding: 0,
      height: "100%",
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& h6": {
      color: "#4056b5",
    },
  },
});

function AddCardBoard({ onSubmit = () => {}}) {
  const classes = useStyles();

  const [openModalAddBoard, setOpenModalAddBoard] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModalAddBoard = () => {
    setOpenModalAddBoard(true);
  };

  const handleCloseModalAddCardBoard = () => {
    setOpenModalAddBoard(false);
  };

  const handleSubmit = (event) => {
		onSubmit(event);
    setOpenModalAddBoard(false);
  };

  return (
    <>
      <Card className={classes.root} onClick={handleOpenModalAddBoard}>
        <CardContent>
          <div className={classes.content}>
            <AddCircleOutlineIcon style={{ fontSize: 70, color: "#4056b5" }} />
            <Typography variant="subtitle1">Add board</Typography>
          </div>
        </CardContent>
      </Card>

      <ModalAddCardBoard
        open={openModalAddBoard}
        onSubmit={handleSubmit}
        onClose={handleCloseModalAddCardBoard}
      />
    </>
  );
}

export default AddCardBoard;
