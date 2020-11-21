import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardBoard from "./CardBoard";

const useStyles = makeStyles({
  root: {
    margin: "30px 0px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      color: "#283593",
    },
    "& .MuiTypography-subtitle2": {
      marginLeft: 5,
      marginTop: 3,
      color: "#777",
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

function PublicBoard(props) {
  const classes = useStyles();

  const { boards } = props;

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Typography variant="h6">Public boards</Typography>
        <Typography variant="subtitle2">
          collaborate by sharing URL with people
        </Typography>
      </Box>
      <Box className={classes.cardContainer}>
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

export default PublicBoard;
