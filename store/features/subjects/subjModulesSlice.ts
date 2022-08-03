import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Module, Subject } from "../../../types/stateTypes";

type InitialState = {
  subjectsList: Subject[];
};

const initialState: InitialState = { subjectsList: [] };

const subjectExists = (array: Subject[], entityType: string, value: string) => {
  return array.findIndex((item) => item[entityType as keyof Subject] === value);
};

const addSubjectItem = (array: Subject[], subject: string) => {
  if (subjectExists(array, "subject", subject) === -1) {
    const newSubject: Subject = { subject, modules: [] };
    array.push(newSubject);
  }
};

const removeSubjectItem = (array: Subject[], value: string) => {
  array.splice(subjectExists(array, "subject", value), 1);
};

const addModuleItem = (array: Subject[], { subjectId, module }: Module) => {
  if (array[subjectId].modules.indexOf(module) === -1)
    array[subjectId].modules.push(module);
};

const removeModuleItem = (array: Subject[], { subjectId, module }: Module) => {
  const idx = array[subjectId].modules.indexOf(module);

  if (idx !== -1) array[subjectId].modules.splice(idx, 1);
};

const subjModulesSlice = createSlice({
  name: "subjmodules",
  initialState,
  reducers: {
    addSubject: (state, action: PayloadAction<string>) => {
      addSubjectItem(state.subjectsList, action.payload);
    },
    removeSubject: (state, action: PayloadAction<string>) => {
      removeSubjectItem(state.subjectsList, action.payload);
    },
    addModule: (state, action: PayloadAction<Module>) => {
      addModuleItem(state.subjectsList, action.payload);
    },
    removeModule: (state, action: PayloadAction<Module>) => {
      removeModuleItem(state.subjectsList, action.payload);
    },
  },
});

export default subjModulesSlice.reducer;
export const { addSubject, removeSubject, addModule, removeModule } =
  subjModulesSlice.actions;
