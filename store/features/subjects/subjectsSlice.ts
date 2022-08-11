import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEntity, handleUpdate } from "../../../lib/entities";
import {
  ModuleUpdateProps,
  Subject,
  UpdateEntityProps,
  UpdateSubjectModuleProps,
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
  async ({ entity, subjectIndex, subjectName }: UpdateSubjectModuleProps) => {
    await handleUpdate(entity, "add", "module", subjectName);

    const updateModule: ModuleUpdateProps = {
      subjectIndex,
      entity,
    };

    return updateModule;
  }
);

export const removeModule = createAsyncThunk(
  "entities/module/remove",
  async ({ entity, subjectIndex, subjectName }: UpdateSubjectModuleProps) => {
    await handleUpdate(entity, "remove", "module", subjectName);

    const deletedModule: ModuleUpdateProps = {
      subjectIndex,
      entity,
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
        const newSubject: Subject = { name: action.payload, modules: [] };
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
        const { subjectIndex, entity } = action.payload;
        const value = entity.value.toUpperCase();

        if (array[subjectIndex].modules.indexOf(value) === -1)
          array[subjectIndex].modules.push(value);
      }
    );
    builder.addCase(removeModule.fulfilled, (state, action) => {
      const { subjectIndex, entity } = action.payload;
      const value = entity.value.toUpperCase();
      const array = state.subjectList[subjectIndex].modules;
      const idx = array.indexOf(value);

      if (idx !== -1) array.splice(idx, 1);
    });
  },
});

export default subjectsSlice.reducer;
