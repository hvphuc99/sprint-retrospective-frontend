import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetBoard, setCurrentBoardId, setCurrentBoardName } from "features/Board/boardSlice";

const useStyles = makeStyles({
  root: {
		width: "100%",
		height: "100%",
    cursor: "pointer",
  },
  header: {
		marginBottom: 20,
		height: 32,
		"& h6": {
			textOverflow: "ellipsis",
			overflow: "hidden",
			whiteSpace: "nowrap",
		},
  },
  columnContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    "& h6": {
      color: "#777",
    },
  },
  wellWentColumn: {
    backgroundColor: "#009688",
    borderRadius: 10,
    padding: "3px 10px",
    "& h6": {
      color: "white",
    },
  },
  toImproveColumn: {
    backgroundColor: "#e91e63",
    borderRadius: 10,
    padding: "3px 10px",
    "& h6": {
      color: "white",
    },
  },
  actionItemsColumn: {
    backgroundColor: "#9c27b0",
    borderRadius: 10,
    padding: "3px 10px",
    "& h6": {
      color: "white",
    },
  },
});

function CardBoard(props) {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

	const { id, name } = props;

  const handleCardClick = () => {
		dispatch(resetBoard());
    dispatch(setCurrentBoardId(id));
		dispatch(setCurrentBoardName(name));
    history.push(`/boards/${id}`);
  };

  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardContent>
        <Box className={classes.header}>
          <Typography variant="h6">{name}</Typography>
        </Box>
        <Box>
          <Box className={classes.columnContainer}>
            <div className={classes.wellWentColumn}>
              <Typography variant="subtitle2">Well Went</Typography>
            </div>
            <Typography variant="subtitle2">2 cards</Typography>
          </Box>
          <Box className={classes.columnContainer}>
            <div className={classes.toImproveColumn}>
              <Typography variant="subtitle2">To Improve</Typography>
            </div>
            <Typography variant="subtitle2">2 cards</Typography>
          </Box>
          <Box className={classes.columnContainer}>
            <div className={classes.actionItemsColumn}>
              <Typography variant="subtitle2">Action Items</Typography>
            </div>
            <Typography variant="subtitle2">2 cards</Typography>
          </Box>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share URL</Button>
      </CardActions> */}
    </Card>
  );
}

export default CardBoard;
