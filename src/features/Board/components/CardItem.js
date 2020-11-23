import { IconButton, makeStyles, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useState } from "react";
import ModalEditCardItem from "./Modal/ModalEditCardItem";

const useStyles = (themeColor) =>
  makeStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderRadius: 4,
      backgroundColor: themeColor,
      "& h6": {
				color: "white",
				lineBreak: "anywhere",
      },
		},
		buttonContainer: {
			display: "flex",
		}
  });

function CardItem({
  id,
  themeColor,
  content,
  onSubmitUpdate = () => {},
  onSubmitDelete = () => {},
}) {
  const classes = useStyles(themeColor)();

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const handleOpenModalEdit = () => {
    setOpenModalEdit(true);
  };

  const handleCloseModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleUpdate = (event) => {
    onSubmitUpdate(event, id);
    setOpenModalEdit(false);
  };

  const handleDelete = () => {
    onSubmitDelete(id);
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">{content}</Typography>
      <div className={classes.buttonContainer}>
        <IconButton onClick={handleOpenModalEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </div>

      <ModalEditCardItem
        open={openModalEdit}
        onSubmit={handleUpdate}
        onClose={handleCloseModalEdit}
        value={content}
      />
    </div>
  );
}

export default CardItem;
