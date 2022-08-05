import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEntity, handleUpdate, updateEntity } from "../../../lib/entities";
import { UpdateEntityProps } from "../../../types/stateTypes";

type InitialState = {
  loading: boolean;
  groupsList: string[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  groupsList: [],
  error: "",
};

export const fetchGroups = createAsyncThunk(
  "entities/groups",
  async (uid: string) => {
    return await getEntity("group", uid);
  }
);

export const addGroup = createAsyncThunk(
  "entities/group/add",
  ({ value, uid }: UpdateEntityProps) =>
    handleUpdate({ value, uid }, "add", "group")
);

export const removeGroup = createAsyncThunk(
  "entities/group/remove",
  ({ value, uid }: UpdateEntityProps) =>
    handleUpdate({ value, uid }, "remove", "group")
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addGroup.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.groupsList.push(action.payload);
      }
    );

    builder.addCase(
      removeGroup.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.groupsList.splice(state.groupsList.indexOf(action.payload), 1);
      }
    );

    builder.addCase(
      fetchGroups.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.loading = false;
        state.groupsList = action.payload;
        state.error = "";
      }
    );
  },
});

export default groupsSlice.reducer;
