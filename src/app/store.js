import { configureStore } from "@reduxjs/toolkit";
import userReducer from "app/userSlice";
import boardReducer from "features/Board/boardSlice";
import loadingReducer from "app/loadingSlice";

const rootReducer = {
	user: userReducer,
	board: boardReducer,
	loading: loadingReducer,
};

const store = configureStore({
  reducer: rootReducer
});

export default store;