import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import columnApi from "api/columnApi";
import cardApi from "api/cardApi";
import { useHistory, useRouteMatch } from "react-router-dom";
import boardApi from "api/boardApi";
import {
  addActionItemsCardList,
  addToImproveCardList,
  addWellWentCardList,
  removeActionItemsCardList,
  removeToImproveCardList,
  removeWellWentCardList,
  setActionItemsCardList,
  setCurrentBoardId,
  setToImproveCardList,
  setWellWentCardList,
  updateActionItemsCardList,
  updateToImproveCardList,
  updateWellWentCardList,
} from "features/Board/boardSlice";
import { setLoading } from "app/loadingSlice";
import BoardNameInput from "../components/BoardNameInput";
import ColumnBoard from "../components/ColumnBoard";
import * as columnType from "constants/columnType";
import SharePrivateDelete from "../components/SharePrivateDelete";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CardMembershipTwoTone } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    padding: "10px 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      marginLeft: 10,
    },
  },
  content: {
    padding: "30px 0px",
  },
  contentItem: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 10px",
  },
  cardItem: {
    margin: "10px 0px 0px 0px",
  },
});

const itemsFromBackend = [
  { cardId: 1, content: "First task" },
  { cardId: 2, content: "Second task" },
  { cardId: 3, content: "Third task" },
];

const columnsFromBackend = [
	{
		"id": 4,
		"name": "Well Went",
		"cards": itemsFromBackend,
},
{
		"id": 5,
		"name": "To Improve",
		"cards": [],
},
]


function BoardDetail() {
	const classes = useStyles();
	
  const { currentBoardId } = useSelector((state) => state.board);
  const [edit, setEdit] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [wellWentCardsId, setWellWentCardsId] = useState([]);
  const [toImproveCardsId, setToImproveCardsId] = useState([]);
  const [actionItemsCardsId, setActionItemsCardsId] = useState([]);
  const match = useRouteMatch();
  const {
    wellWentCardList,
    toImproveCardList,
    actionItemsCardList,
  } = useSelector((state) => state.board);
  const dispatch = useDispatch();
	const history = useHistory();
	const [creatorBoard, setCreatorBoard] = useState(false);
	const [publicBoard, setPublicBoard] = useState(true);

	const [columns, setColumns] = useState(columnsFromBackend);

  const handleEditName = (value) => () => {
    if (edit) {
      boardApi
        .updateBoard(currentBoardId, value)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setBoardName(value);
    }
    setEdit(!edit);
  };

  const handleDeleteBoard = () => {
    boardApi
      .deleteBoard(currentBoardId)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleShareBoard = () => {
    boardApi
      .shareBoard(currentBoardId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
	};
	
	const handlePrivateBoard = () => {
    boardApi
      .privateBoard(currentBoardId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const getBoardName = async (boardId) => {
		return new Promise((resolve, reject) => {
			boardApi.getBoard(boardId).then(response => {
				const { id, name, public: publish } = response.board;
				const { creator } = response;
				setCreatorBoard(creator);
				setBoardName(name);
				setPublicBoard(publish);
				dispatch(setCurrentBoardId(id));
				resolve();
			}).catch(err => {
				reject(err);
			})
		})
  };

  const getCardOfColumns = async (boardId) => {
    columnApi.getColumns(boardId).then((columnResponse) => {
      let count = 1;

      for (let column of columnResponse) {
        const { id } = column;

        if (count === 1) {
          setWellWentCardsId(id);
          cardApi.getCards(currentBoardId, id).then((cardResponse) => {
            dispatch(setWellWentCardList(cardResponse));
          });
        }

        if (count === 2) {
          setToImproveCardsId(id);
          cardApi.getCards(currentBoardId, id).then((cardResponse) => {
            dispatch(setToImproveCardList(cardResponse));
          });
        }

        if (count === 3) {
          setActionItemsCardsId(id);
          cardApi.getCards(currentBoardId, id).then((cardResponse) => {
            dispatch(setActionItemsCardList(cardResponse));
          });
        }

        count += 1;
      }
    });
  };

  const handleSubmitAddCard = (columnId, type) => (event) => {
    const { content } = event;

    cardApi.addCard(currentBoardId, columnId, content).then((res) => {
      const { card } = res;
      if (type === columnType.WELL_WENT) {
        dispatch(addWellWentCardList(card));
      }
      if (type === columnType.TO_IMPROVE) {
        dispatch(addToImproveCardList(card));
      }
      if (type === columnType.ACTION_ITEMS) {
        dispatch(addActionItemsCardList(card));
      }
    });
  };

  const handleSubmitUpdateCard = (columnId, type) => (event, cardId) => {
    const { content } = event;

    cardApi
      .updateCard(currentBoardId, columnId, cardId, content)
      .then((res) => {
        const params = {
          cardId,
          newContent: content,
        };
        if (type === columnType.WELL_WENT) {
          dispatch(updateWellWentCardList(params));
        }
        if (type === columnType.TO_IMPROVE) {
          dispatch(updateToImproveCardList(params));
        }
        if (type === columnType.ACTION_ITEMS) {
          dispatch(updateActionItemsCardList(params));
        }
      });
  };

  const handleSubmitDeleteCard = (columnId, type) => (cardId) => {
    cardApi.deleteCard(currentBoardId, columnId, cardId).then((res) => {
      if (type === columnType.WELL_WENT) {
        dispatch(removeWellWentCardList(cardId));
      }
      if (type === columnType.TO_IMPROVE) {
        dispatch(removeToImproveCardList(cardId));
      }
      if (type === columnType.ACTION_ITEMS) {
        dispatch(removeActionItemsCardList(cardId));
      }
    });
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const list = match.url.split("/");
    const boardId = list[list.length - 1];
    Promise.all([getBoardName(boardId), getCardOfColumns(boardId)]).then(() => {
      dispatch(setLoading(false));
    }).catch((err) => {
			history.push("/");
		})
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <BoardNameInput name={boardName} edit={creatorBoard && edit} toggle={handleEditName} />
				{creatorBoard && <SharePrivateDelete onShare={handleShareBoard} onPrivate={handlePrivateBoard} onDelete={handleDeleteBoard} publish={publicBoard} />}
      </div>

      <div className={classes.content}>
        {/* <Grid container>
          <Grid item xs={4}>
            <div className={classes.contentItem}>
              <ColumnBoard
                id={wellWentCardsId}
                title="Well went"
                type={columnType.WELL_WENT}
                list={wellWentCardList}
                onSubmitAddCard={handleSubmitAddCard(
                  wellWentCardsId,
                  columnType.WELL_WENT
                )}
                onSubmitUpdateCard={handleSubmitUpdateCard(
                  wellWentCardsId,
                  columnType.WELL_WENT
                )}
                onSubmitDeleteCard={handleSubmitDeleteCard(
                  wellWentCardsId,
                  columnType.WELL_WENT
                )}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.contentItem}>
              <ColumnBoard
                id={toImproveCardsId}
                title="To improve"
                type={columnType.TO_IMPROVE}
                list={toImproveCardList}
                onSubmitAddCard={handleSubmitAddCard(
                  toImproveCardsId,
                  columnType.TO_IMPROVE
                )}
                onSubmitUpdateCard={handleSubmitUpdateCard(
                  toImproveCardsId,
                  columnType.TO_IMPROVE
                )}
                onSubmitDeleteCard={handleSubmitDeleteCard(
                  toImproveCardsId,
                  columnType.TO_IMPROVE
                )}
              />
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.contentItem}>
              <ColumnBoard
                id={actionItemsCardsId}
                title="Action items"
                type={columnType.ACTION_ITEMS}
                list={actionItemsCardList}
                onSubmitAddCard={handleSubmitAddCard(
                  actionItemsCardsId,
                  columnType.ACTION_ITEMS
                )}
                onSubmitUpdateCard={handleSubmitUpdateCard(
                  actionItemsCardsId,
                  columnType.ACTION_ITEMS
                )}
                onSubmitDeleteCard={handleSubmitDeleteCard(
                  actionItemsCardsId,
                  columnType.ACTION_ITEMS
                )}
              />
            </div>
          </Grid>
        </Grid> */}
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        // onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {columns.map(({id, name, cards}, index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={id}
            >
              <h2>{name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {cards.map(({cardId, content}, index) => {
                          return (
                            <Draggable
                              key={cardId}
                              draggableId={cardId}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
			</div>
    </div>
  );
}

export default BoardDetail;
