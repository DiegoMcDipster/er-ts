import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupService } from "../../../lib/groupService";
import { isGroupResults } from "../../../types/helpers";
import {
  Group,
  GroupGetResponseType,
  Groups,
  UpdateEntityProps,
} from "../../../types/stateTypes";

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
    const service = new GroupService(uid);

    return await service.fetchData();

    // if (isGroupResults(result)) return result.groups;
  }
);

export const addGroup = createAsyncThunk(
  "entities/group/add",
  async ({ value, uid }: UpdateEntityProps): Promise<Group> => {
    const service = new GroupService(uid);

    await service.putData("add", value);

    return value.toUpperCase();
  }
);

export const removeGroup = createAsyncThunk(
  "entities/group/remove",
  async ({ value, uid }: UpdateEntityProps): Promise<Group> => {
    const service = new GroupService(uid);

    await service.putData("remove", value);

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
      (state, action: PayloadAction<Group>) => {
        state.groupsList.push(action.payload);
      }
    );

    builder.addCase(
      removeGroup.fulfilled,
      (state, action: PayloadAction<Group>) => {
        state.groupsList.splice(state.groupsList.indexOf(action.payload), 1);
      }
    );

    builder.addCase(
      fetchGroups.fulfilled,
      (state, action: PayloadAction<Groups>) => {
        state.loading = false;
        state.groupsList = action.payload;
        state.error = "";
      }
    );
  },
});

export default groupsSlice.reducer;
