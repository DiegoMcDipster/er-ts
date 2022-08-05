import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEntity, handleUpdate } from "../../../lib/entities";
import {
  ModuleUpdateProps,
  Subject,
  UpdateEntityProps,
} from "../../../types/stateTypes";

type InitialState = {
  subjectList: Subject[];
};

const initialState: InitialState = {
  subjectList: [],
};

export const fetchSubjects = createAsyncThunk(
  "entities/subjects",
  async (uid: string) => {
    return await getEntity("subject", uid);
  }
);

export const addSubject = createAsyncThunk(
  "entities/subject/add",
  async ({ value, uid }: UpdateEntityProps) =>
    await handleUpdate({ value, uid }, "add", "subject")
);

export const removeSubject = createAsyncThunk(
  "entities/subject/remove",
  async ({ value, uid }: UpdateEntityProps) =>
    await handleUpdate({ value, uid }, "remove", "subject")
);

export const addModule = createAsyncThunk(
  "entities/module/add",
  async ({ value, uid, subjectIndex, subjectName }: UpdateEntityProps) => {
    await handleUpdate({ value, uid }, "add", "module", subjectName);

    const updateModule: ModuleUpdateProps = {
      subjectId: subjectIndex as number,
      module: value.toUpperCase(),
    };

    return updateModule;
  }
);

export const removeModule = createAsyncThunk(
  "entities/module/remove",
  async ({ value, uid, subjectIndex, subjectName }: UpdateEntityProps) => {
    await handleUpdate({ value, uid }, "remove", "module", subjectName);

    const deletedModule: ModuleUpdateProps = {
      subjectId: subjectIndex as number,
      module: value.toUpperCase(),
    };

    return deletedModule;
  }
);

const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSubjects.fulfilled,
      (state, action: PayloadAction<Subject[]>) => {
        state.subjectList = action.payload;
      }
    );
    builder.addCase(
      addSubject.fulfilled,
      (state, action: PayloadAction<string>) => {
        const newSubject = { name: action.payload, modules: [] };
        state.subjectList.push(newSubject);
      }
    );
    builder.addCase(
      removeSubject.fulfilled,
      (state, action: PayloadAction<string>) => {
        const idx = state.subjectList.findIndex(
          (item) => item.name === action.payload
        );

        state.subjectList.splice(idx, 1);
      }
    );
    builder.addCase(
      addModule.fulfilled,
      (state, action: PayloadAction<ModuleUpdateProps>) => {
        const array = state.subjectList;
        const { subjectId, module } = action.payload;

        if (array[subjectId].modules.indexOf(module) === -1)
          array[subjectId].modules.push(module);
      }
    );
    builder.addCase(removeModule.fulfilled, (state, action) => {
      const { subjectId, module } = action.payload;
      const array = state.subjectList[subjectId].modules;

      const idx = array.indexOf(module);

      if (idx !== -1) array.splice(idx, 1);
    });
  },
});

export default subjectsSlice.reducer;
