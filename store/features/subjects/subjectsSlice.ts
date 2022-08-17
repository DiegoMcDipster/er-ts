import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModuleService } from "../../../lib/moduleService";
import { SubjectService } from "../../../lib/subjectService";
import {
  EntityAction,
  ModuleStoreProps,
  PutResponseType,
  Subject,
  Subjects,
  Uid,
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
  async (uid: Uid): Promise<Subjects> => {
    const service = new SubjectService<Uid, Subjects>(uid);

    return await service.fetchData();
  }
);

const handleSubjectUpdate = async (
  uid: Uid,
  action: EntityAction,
  value: string
): Promise<string> => {
  const service = new SubjectService<Uid, Subjects>(uid);

  await service.putData<PutResponseType>(action, value);

  return value.toUpperCase();
};

const handleModuleUpdate = async (
  uid: Uid,
  action: EntityAction,
  value: string,
  parentSubject: string,
  subjectIndex: number
): Promise<ModuleStoreProps> => {
  const service = new ModuleService<Uid, Subjects>(uid, parentSubject);

  await service.putData<PutResponseType>(action, value);

  const updateModule: ModuleStoreProps = {
    subjectIndex,
    value: value.toUpperCase(),
  };

  return updateModule;
};

export const addSubject = createAsyncThunk(
  "entities/subject/add",
  ({ value, uid }: UpdateEntityProps): Promise<string> => {
    return handleSubjectUpdate(uid, "add", value);
  }
);

export const removeSubject = createAsyncThunk(
  "entities/subject/remove",
  ({ value, uid }: UpdateEntityProps): Promise<string> => {
    return handleSubjectUpdate(uid, "remove", value);
  }
);

export const addModule = createAsyncThunk(
  "entities/module/add",
  ({ entity, subjectIndex, subjectName }: UpdateSubjectModuleProps) => {
    return handleModuleUpdate(
      entity.uid,
      "add",
      entity.value,
      subjectName,
      subjectIndex
    );
  }
);

export const removeModule = createAsyncThunk(
  "entities/module/remove",
  ({ entity, subjectIndex, subjectName }: UpdateSubjectModuleProps) => {
    return handleModuleUpdate(
      entity.uid,
      "remove",
      entity.value,
      subjectName,
      subjectIndex
    );
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
      (state, action: PayloadAction<ModuleStoreProps>) => {
        const array = state.subjectList;
        const { subjectIndex, value } = action.payload;

        if (array[subjectIndex].modules.indexOf(value) === -1)
          array[subjectIndex].modules.push(value);
      }
    );
    builder.addCase(removeModule.fulfilled, (state, action) => {
      const { subjectIndex, value } = action.payload;
      const array = state.subjectList[subjectIndex].modules;
      const idx = array.indexOf(value);

      if (idx !== -1) array.splice(idx, 1);
    });
  },
});

export default subjectsSlice.reducer;
