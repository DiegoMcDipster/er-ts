import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groups/groupsSlice";
import subjModulesReducer from "./features/subjects/subjModulesSlice";

const store = configureStore({
  reducer: {
    groups: groupsReducer,
    subjModules: subjModulesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
