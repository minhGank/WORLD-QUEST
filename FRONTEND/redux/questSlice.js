import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuest: null,
  allTheQuest: null,
  loading: false,
  error: false,
};

const questSlice = createSlice({
  name: "quest",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
    },

    fetchSuccess(state, action) {
      state.currentQuest = action.payload.currentQuest;
      state.allTheQuest = action.payload.allTheQuest;
      state.loading = false;
    },

    fetchFail(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default questSlice;
export const questActions = questSlice.actions;
