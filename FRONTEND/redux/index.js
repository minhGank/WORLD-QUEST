import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import questSlice from "./questSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  quest: questSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
