import { FormatListBulleted } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";

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
			state.wellWentCardList = state.wellWentCardList.map(card => {
				const { id } = card;
				const { cardId, newContent} = action.payload;
				if (id === cardId) {
					card.content = newContent; 
				}
				return card;
			});
		},
		updateToImproveCardList: (state, action) => {
      state.toImproveCardList = state.toImproveCardList.map(card => {
				const { id } = card;
				const { cardId, newContent} = action.payload;
				if (id === cardId) {
					card.content = newContent; 
				}
				return card;
			});
		},
		updateActionItemsCardList: (state, action) => {
      state.actionItemsCardList = state.actionItemsCardList.map(card => {
				const { id } = card;
				const { cardId, newContent} = action.payload;
				if (id === cardId) {
					card.content = newContent; 
				}
				return card;
			});
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