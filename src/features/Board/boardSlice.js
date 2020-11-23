import { createSlice } from "@reduxjs/toolkit";
import * as columnType from "constants/columnType";

const initialState = {
	currentBoardId: null,
	currentBoardName: "",
	creatorBoard: false,
	privateBoardList: [],
	publicBoardList: [],
	wellWentCardList: [],
	toImproveCardList: [],
	actionItemsCardList: [],
};

const boardSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCurrentBoardId: (state, action) => {
      state.currentBoardId = action.payload;
    },
    removeCurrentBoardId: (state, action) => {
      state.currentBoardId = null;
		},
		setCurrentBoardName: (state, action) => {
      state.currentBoardName = action.payload;
		},
		setPrivateBoardList: (state, action) => {
      state.privateBoardList = action.payload;
		},
		setPublicBoardList: (state, action) => {
      state.publicBoardList = action.payload;
		},
		setWellWentCardList: (state, action) => {
      state.wellWentCardList = action.payload;
		},
		setToImproveCardList: (state, action) => {
      state.toImproveCardList = action.payload;
		},
		setActionItemsCardList: (state, action) => {
      state.actionItemsCardList = action.payload;
		},
		addPrivateBoardList: (state, action) => {
			state.privateBoardList.push(action.payload);
		},
		addWellWentCardList: (state, action) => {
      state.wellWentCardList.push(action.payload);
		},
		addToImproveCardList: (state, action) => {
      state.toImproveCardList.push(action.payload);
		},
		addActionItemsCardList: (state, action) => {
      state.actionItemsCardList.push(action.payload);
		},
		removeWellWentCardList: (state, action) => {
			state.wellWentCardList = state.wellWentCardList.filter(card => {
				const { id } = card;
				return id !== action.payload;
			});
		},
		removeToImproveCardList: (state, action) => {
      state.toImproveCardList = state.toImproveCardList.filter(card => {
				const { id } = card;
				return id !== action.payload;
			});
		},
		removeActionItemsCardList: (state, action) => {
      state.actionItemsCardList = state.actionItemsCardList.filter(card => {
				const { id } = card;
				return id !== action.payload;
			});
		},
		updateWellWentCardList: (state, action) => {
			const { optionAdd } = action.payload;
			if (!optionAdd) {
				state.wellWentCardList = state.wellWentCardList.map(card => {
					const { id } = card;
					const { cardId, newContent } = action.payload;
					if (id === cardId) {
						card.content = newContent; 
					}
					return card;
				});
			} else {
				const { id, column_id, created_at, updated_at } = action.payload;
				state.wellWentCardList[state.wellWentCardList.length - 1].id = id;
				state.wellWentCardList[state.wellWentCardList.length - 1].column_id = column_id;
				state.wellWentCardList[state.wellWentCardList.length - 1].created_at = created_at;
				state.wellWentCardList[state.wellWentCardList.length - 1].updated_at = updated_at;
			}
		},
		updateToImproveCardList: (state, action) => {
			const { optionAdd } = action.payload;
			if (!optionAdd) {
				state.toImproveCardList = state.toImproveCardList.map(card => {
					const { id } = card;
					const { cardId, newContent } = action.payload;
					if (id === cardId) {
						card.content = newContent; 
					}
					return card;
				});
			} else {
				const { id, column_id, created_at, updated_at } = action.payload;
				state.toImproveCardList[state.toImproveCardList.length - 1].id = id;
				state.toImproveCardList[state.toImproveCardList.length - 1].column_id = column_id;
				state.toImproveCardList[state.toImproveCardList.length - 1].created_at = created_at;
				state.toImproveCardList[state.toImproveCardList.length - 1].updated_at = updated_at;
			}
		},
		updateActionItemsCardList: (state, action) => {
			const { optionAdd } = action.payload;
			if (!optionAdd) {
				state.actionItemsCardList = state.actionItemsCardList.map(card => {
					const { id } = card;
					const { cardId, newContent } = action.payload;
					if (id === cardId) {
						card.content = newContent; 
					}
					return card;
				});
			} else {
				const { id, column_id, created_at, updated_at } = action.payload;
				state.actionItemsCardList[state.actionItemsCardList.length - 1].id = id;
				state.actionItemsCardList[state.actionItemsCardList.length - 1].column_id = column_id;
				state.actionItemsCardList[state.actionItemsCardList.length - 1].created_at = created_at;
				state.actionItemsCardList[state.actionItemsCardList.length - 1].updated_at = updated_at;
			}
		},
		setCreatorBoard: (state, action) => {
			state.creatorBoard = action.payload;
		},
		resetBoard: (state, action) => initialState,
  },
});

const { reducer, actions } = boardSlice;
export const {
  setCurrentBoardId,
	removeCurrentBoardId,
	setCurrentBoardName,
	setPrivateBoardList,
	setPublicBoardList,
	setWellWentCardList,
	setToImproveCardList,
	setActionItemsCardList,
	addPrivateBoardList,
	addWellWentCardList,
	addToImproveCardList,
	addActionItemsCardList,
	removeWellWentCardList,
	removeToImproveCardList,
	removeActionItemsCardList,
	updateWellWentCardList,
	updateToImproveCardList,
	updateActionItemsCardList,
	resetBoard,
	setCreatorBoard,
} = actions;
export default reducer;