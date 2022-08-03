import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEntity, updateEntity } from "../../../lib/groups";

type InitialState = {
  loading: boolean;
  groupsList: string[];
  error: string;
};

type UpdateGroupProps = {
  value: string;
  uid: string;
};

const initialState: InitialState = {
  loading: false,
  groupsList: [],
  error: "",
};

export const fetchGroups = createAsyncThunk("entities/groups", async () => {
  return await getEntity("group", "DEMO-APP-RANDOM-UID");
});

const handleUpdate = async (
  { value, uid }: UpdateGroupProps,
  updateType: string
) => {
  await updateEntity(uid, value, "group", updateType);
  return value;
};

export const addGroup = createAsyncThunk(
  "entities/addgroup",
  ({ value, uid }: UpdateGroupProps) => handleUpdate({ value, uid }, "add")
);

export const removeGroup = createAsyncThunk(
  "entities/removegroup",
  ({ value, uid }: UpdateGroupProps) => handleUpdate({ value, uid }, "remove")
);

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addGroup.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.groupsList.push(action.payload.toUpperCase());
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
