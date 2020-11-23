import { makeStyles } from "@material-ui/core";
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
import * as columnType from "constants/columnType";
import SharePrivateDelete from "../components/SharePrivateDelete";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CardItem from "../components/CardItem";
import AddCardItem from "../components/AddCardItem";

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
  columnContainer: {
    margin: 8,
  },
  addButton: {
    paddingLeft: 4,
    paddingRight: 4,
    marginBottom: 8,
  },
});

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

  const [columns, setColumns] = useState([]);

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
      boardApi
        .getBoard(boardId)
        .then((response) => {
          const { id, name, public: publish } = response.board;
          const { creator } = response;
          setCreatorBoard(creator);
          setBoardName(name);
          setPublicBoard(publish);
          dispatch(setCurrentBoardId(id));
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
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
			card.optionAdd = true;
      if (type === columnType.WELL_WENT) {
        dispatch(updateWellWentCardList(card));
      }
      if (type === columnType.TO_IMPROVE) {
        dispatch(updateToImproveCardList(card));
      }
      if (type === columnType.ACTION_ITEMS) {
        dispatch(updateActionItemsCardList(card));
      }
		});

		const newCard = {
			id: -1,
			content,
		}
		
		if (type === columnType.WELL_WENT) {
			dispatch(addWellWentCardList(newCard));
		}
		if (type === columnType.TO_IMPROVE) {
			dispatch(addToImproveCardList(newCard));
		}
		if (type === columnType.ACTION_ITEMS) {
			dispatch(addActionItemsCardList(newCard));
		}
  };

  const handleSubmitUpdateCard = (columnId, type) => (event, cardId) => {
    const { content } = event;

    cardApi
      .updateCard(currentBoardId, columnId, cardId, content)
      .then((res) => {});

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
  };

  const handleSubmitDeleteCard = (columnId, type) => (cardId) => {
    cardApi.deleteCard(currentBoardId, columnId, cardId).then((res) => {});
    if (type === columnType.WELL_WENT) {
      dispatch(removeWellWentCardList(cardId));
    }
    if (type === columnType.TO_IMPROVE) {
      dispatch(removeToImproveCardList(cardId));
    }
    if (type === columnType.ACTION_ITEMS) {
      dispatch(removeActionItemsCardList(cardId));
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find(
        (column) => column.id + "column" === source.droppableId
      );
      const destColumn = columns.find(
        (column) => column.id + "column" === destination.droppableId
      );
      const sourceItems = [...sourceColumn.cards];
      const destItems = [...destColumn.cards];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const newColumns = columns.map((column) => {
        if (column.id + "column" === source.droppableId) {
          column.cards = sourceItems;
        } else {
          if (column.id + "column" === destination.droppableId) {
            column.cards = destItems;
          }
        }
        return column;
      });
      setColumns(newColumns);

      columns.forEach((column, index) => {
        if (column.id === sourceColumn.id) {
          if (index === 0) {
            handleSubmitDeleteCard(
              sourceColumn.id,
              columnType.WELL_WENT
            )(removed.id);
          }
          if (index === 1) {
            handleSubmitDeleteCard(
              sourceColumn.id,
              columnType.TO_IMPROVE
            )(removed.id);
          }
          if (index === 2) {
            handleSubmitDeleteCard(
              sourceColumn.id,
              columnType.ACTION_ITEMS
            )(removed.id);
          }
        }

        if (column.id === destColumn.id) {
          if (index === 0) {
            handleSubmitAddCard(destColumn.id, columnType.WELL_WENT)(removed);
          }
          if (index === 1) {
            handleSubmitAddCard(destColumn.id, columnType.TO_IMPROVE)(removed);
          }
          if (index === 2) {
            handleSubmitAddCard(
              destColumn.id,
              columnType.ACTION_ITEMS
            )(removed);
          }
        }
      });
    }
    // else {
    //   const column = columns.find((column) => column.id + "column" === source.droppableId);
    //   const copiedItems = [...column.cards];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   const newColumns = columns.map((column) => {
    //     if (column.id + "column" === source.droppableId) {
    //       column.cards = copiedItems;
    //     }
    //     return column;
    //   });
    // 	setColumns(newColumns);

    // 	columns.forEach((columnTemp, index) => {
    // 		if (column.id === columnTemp.id) {
    // 			if (index === 0) {
    // 				handleSubmitAddCard(column.id, columnType.WELL_WENT, false)(removed)
    // 				handleSubmitDeleteCard(column.id, columnType.WELL_WENT, false)(removed.id)
    // 			}
    // 			if (index === 1) {
    // 				handleSubmitDeleteCard(column.id, columnType.TO_IMPROVE, false)(removed.id)
    // 				handleSubmitAddCard(column.id, columnType.TO_IMPROVE, false)(removed)
    // 			}
    // 			if (index === 2) {
    // 				handleSubmitDeleteCard(column.id, columnType.ACTION_ITEMS, false)(removed.id)
    // 				handleSubmitAddCard(column.id, columnType.ACTION_ITEMS, false)(removed)
    // 			}
    // 		}
    // 	});
    // }
  };

  const colorCard = (index) => () => {
    let color = "#009688";

    if (index === 1) {
      color = "#e91e63";
    }

    if (index === 2) {
      color = "#9c27b0";
    }

    return color;
  };

  const renderAddCard = (indexColumns) => {
    let addCardButton = (
      <AddCardItem
        onSubmit={handleSubmitAddCard(wellWentCardsId, columnType.WELL_WENT)}
      />
    );

    if (indexColumns === 1) {
      addCardButton = (
        <AddCardItem
          onSubmit={handleSubmitAddCard(
            toImproveCardsId,
            columnType.TO_IMPROVE
          )}
        />
      );
    }

    if (indexColumns === 2) {
      addCardButton = (
        <AddCardItem
          onSubmit={handleSubmitAddCard(
            actionItemsCardsId,
            columnType.ACTION_ITEMS
          )}
        />
      );
    }

    return addCardButton;
  };

  const passHandleSubmitUpdateCard = (indexColumns) => {
    let handleSubmit = handleSubmitUpdateCard(
      wellWentCardsId,
      columnType.WELL_WENT
    );

    if (indexColumns === 1) {
      handleSubmit = handleSubmitUpdateCard(
        toImproveCardsId,
        columnType.TO_IMPROVE
      );
    }

    if (indexColumns === 2) {
      handleSubmit = handleSubmitUpdateCard(
        actionItemsCardsId,
        columnType.ACTION_ITEMS
      );
    }

    return handleSubmit;
  };

  const passHandleSubmitDeleteCard = (indexColumns) => {
    let handleSubmit = handleSubmitDeleteCard(
      wellWentCardsId,
      columnType.WELL_WENT
    );

    if (indexColumns === 1) {
      handleSubmit = handleSubmitDeleteCard(
        toImproveCardsId,
        columnType.TO_IMPROVE
      );
    }

    if (indexColumns === 2) {
      handleSubmit = handleSubmitDeleteCard(
        actionItemsCardsId,
        columnType.ACTION_ITEMS
      );
    }

    return handleSubmit;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const list = match.url.split("/");
    const boardId = list[list.length - 1];
    Promise.all([getBoardName(boardId), getCardOfColumns(boardId)])
      .then(() => {
        dispatch(setLoading(false));
      })
      .catch((err) => {
        history.push("/");
      });
  }, []);

  useEffect(() => {
    setColumns([
      {
        id: wellWentCardsId,
        name: "Well went",
        cards: wellWentCardList,
      },
      {
        id: toImproveCardsId,
        name: "To improve",
        cards: toImproveCardList,
      },
      {
        id: actionItemsCardsId,
        name: "Action items",
        cards: actionItemsCardList,
      },
    ]);
  }, [wellWentCardList, toImproveCardList, actionItemsCardList]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <BoardNameInput
          name={boardName}
          edit={creatorBoard && edit}
          toggle={handleEditName}
        />
        {creatorBoard && (
          <SharePrivateDelete
            onShare={handleShareBoard}
            onPrivate={handlePrivateBoard}
            onDelete={handleDeleteBoard}
            publish={publicBoard}
          />
        )}
      </div>

      <div className={classes.content}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            height: "100%",
						overflow: "auto",
          }}
        >
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {columns.map(({ id, name, cards }, indexColumns) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
										alignItems: "center",
                  }}
                >
                  <h3>{name}</h3>
                  <div className={classes.columnContainer}>
                    <div className={classes.addButton}>
                      {renderAddCard(indexColumns)}
                    </div>

                    <Droppable droppableId={`${id}column`} key={id}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              padding: 4,
                              width: 600,
                            }}
                          >
                            {cards.map(({ id, content }, indexCard) => {
                              return (
                                <Draggable
                                  key={id}
                                  draggableId={`${id}card`}
                                  index={indexCard}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          margin: "0 0 8px 0",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        <CardItem
                                          content={content}
                                          themeColor={colorCard(indexColumns)}
                                          id={id}
                                          onSubmitUpdate={passHandleSubmitUpdateCard(
                                            indexColumns
                                          )}
                                          onSubmitDelete={passHandleSubmitDeleteCard(
                                            indexColumns
                                          )}
                                        />
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
