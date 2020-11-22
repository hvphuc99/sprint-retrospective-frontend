import { Box, makeStyles, Typography } from "@material-ui/core";
import boardApi from "api/boardApi";
import { setLoading } from "app/loadingSlice";
import {
	addPrivateBoardList,
  setPrivateBoardList,
  setPublicBoardList,
} from "features/Board/boardSlice";
import PrivateBoard from "features/Board/components/PrivateBoard";
import PublicBoard from "features/Board/components/PublicBoard";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  board: {
    padding: 20,
    "& h4": {
      color: "#283593",
    },
  },
});

function Main() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { privateBoardList, publicBoardList } = useSelector(
    (state) => state.board
  );

  const getPrivateBoardList = async () => {
    const boards = await boardApi.getPrivateBoards();
    dispatch(setPrivateBoardList(boards));
  };

  const getPublicBoardList = async () => {
		const boards = await boardApi.getPublicBoards();
    dispatch(setPublicBoardList(boards));
	};
	
	const handleSubmitAddCard = (event) => {
    const {name} = event;
    boardApi
      .createBoard(name)
      .then((board) => {
        dispatch(addPrivateBoardList(board));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(setLoading(true));

    Promise.all([getPrivateBoardList(), getPublicBoardList()])
      .then((values) => {
        dispatch(setLoading(false));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box className={classes.board}>
      <Typography variant="h4">My boards</Typography>
      <PrivateBoard boards={privateBoardList} onSubmitAddCard={handleSubmitAddCard} />
      <PublicBoard boards={publicBoardList} />
    </Box>
  );
}

export default Main;
