import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AmplifyService } from "../../../lib/AmplifyService";
import { ApiHandler } from "../../../lib/ApiHandler";
import { getProperty } from "../../../types/helpers";
import {
  GetResponseType,
  Group,
  Groups,
  PutResponseType,
  Uid,
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

const handler = new ApiHandler(new AmplifyService());

export const fetchGroups = createAsyncThunk(
  "entities/groups",
  async (uid: Uid): Promise<Groups> => {
    try {
      const pathname = "/entities/group";
      const params = {
        uid,
      };
      const response = await handler.get<GetResponseType>(pathname, params);

      return getProperty(response, "groups") as Groups;
    } catch (error) {
      console.log("fetchGroups: error: ", error);
      throw error;
    }
  }
);

export const addGroup = createAsyncThunk(
  "entities/group/add",
  async ({ value, uid }: UpdateEntityProps): Promise<Group> => {
    try {
      const pathname = `/entities/entity/add/${value}`;
      const params = {
        uid: uid,
        entityType: "group",
      };

      const response = await handler.put<PutResponseType>(pathname, params);

      if (response.message.includes("already exists")) throw response.message;
      return value.toUpperCase();
    } catch (error) {
      console.log("addGroup: error - ", error);
      throw error;
    }
  }
);

export const removeGroup = createAsyncThunk(
  "entities/group/remove",
  async ({ value, uid }: UpdateEntityProps): Promise<Group> => {
    try {
      const pathname = `/entities/entity/remove/${value}`;
      const params = {
        uid: uid,
        entityType: "group",
      };

      await handler.put<PutResponseType>(pathname, params);

      return value.toUpperCase();
    } catch (error) {
      console.log("removeGroup: error - ", error);
      throw error;
    }
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
