import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groups/groupsSlice";
import subjectsReducer from "./features/subjects/subjectsSlice";

const store = configureStore({
  reducer: {
    groups: groupsReducer,
    subjects: subjectsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
