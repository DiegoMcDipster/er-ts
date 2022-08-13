import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupService } from "../../../lib/groupService";
import { Groups, UpdateEntityProps } from "../../../types/stateTypes";

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
  async (uid: string): Promise<Groups> => {
    const handler = new GroupService(uid);

    return await handler.fetchData();
  }
);

export const addGroup = createAsyncThunk(
  "entities/group/add",
  async ({ value, uid }: UpdateEntityProps) => {
    const handler = new GroupService(uid);

    await handler.putData("add", value);

    return value.toUpperCase();
  }
);

export const removeGroup = createAsyncThunk(
  "entities/group/remove",
  async ({ value, uid }: UpdateEntityProps) => {
    const handler = new GroupService(uid);

    await handler.putData("remove", value);

    return value.toUpperCase();
  }
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
