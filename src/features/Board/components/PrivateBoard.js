import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AddCardBoard from "./AddCardBoard";
import CardBoard from "./CardBoard";

const useStyles = makeStyles({
  root: {
    margin: "30px 0px",
  },
  header: {
    "& h6": {
      color: "#283593",
    },
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  cardBoard: {
    width: 250,
    height: 200,
    margin: 10,
  },
});

function PrivateBoard({ boards = [], onSubmitAddCard = () => {} }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h6">Private boards</Typography>
      </Box>
      <Box className={classes.cardContainer}>
        <Box className={classes.cardBoard}>
          <AddCardBoard onSubmit={onSubmitAddCard} />
        </Box>
        {boards.map((board) => {
          const { id, name } = board;

          return (
            <Box className={classes.cardBoard}>
              <CardBoard id={id} name={name} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PrivateBoard;
