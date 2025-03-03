const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { reducer, actions } = loadingSlice;
export const { setLoading } = actions;
export default reducer;
