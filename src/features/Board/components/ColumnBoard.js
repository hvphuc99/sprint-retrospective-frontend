import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import AddCardItem from "./AddCardItem";
import CardItem from "./CardItem";
import * as columnType from "constants/columnType";

const useStyles = makeStyles({
  cardItem: {
    margin: "10px 0px 0px 0px",
  },
});

function ColumnBoard({
  id = "",
  title = "",
  list = [],
  type = columnType.WELL_WENT,
  onSubmitAddCard = () => {},
  onSubmitUpdateCard = () => {},
  onSubmitDeleteCard = () => {},
}) {
  const classes = useStyles();

  const colorCard = () => {
    //Well went
    let color = "#009688";

    if (type === columnType.TO_IMPROVE) {
      color = "#e91e63";
    }

    if (type === columnType.ACTION_ITEMS) {
      color = "#9c27b0";
    }

    return color;
  };

  return (
    <>
      <Typography variant="subtitle1">{title}</Typography>
      <AddCardItem onSubmit={onSubmitAddCard} />
      {list.map((card) => {
        const { id, content } = card;

        return (
          <div className={classes.cardItem}>
            <CardItem
              content={content}
              themeColor={colorCard}
              id={id}
              columnId={id}
              onSubmitUpdate={onSubmitUpdateCard}
              onSubmitDelete={onSubmitDeleteCard}
            />
          </div>
        );
      })}
    </>
  );
}

export default ColumnBoard;
