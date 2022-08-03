import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  groupsList: string[];
};

const initialState: InitialState = { groupsList: [] };

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<string>) => {
      state.groupsList.push(action.payload);
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groupsList.splice(state.groupsList.indexOf(action.payload), 1);
    },
  },
});

export default groupsSlice.reducer;
export const { addGroup, removeGroup } = groupsSlice.actions;
