import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestFromRedux: null,
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

    fetchUserQuestSuccess(state, action) {
      state.currentQuestFromRedux = action.payload.currentQuest;
      state.allTheQuest = action.payload.allTheQuest;
      state.loading = false;
    },
    fetchAllQuestSuccess(state, action) {
      state.allTheQuest = action.payload;
      state.loading = false;
    },

    chooseCurrentQuest(state, action) {
      state.currentQuestFromRedux = action.payload;
    },
    fetchFail(state) {
      state.loading = false;
      state.error = true;
    },
  },
});

export default questSlice;
export const questActions = questSlice.actions;
