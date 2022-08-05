export const GROUP: string = "GROUP";
export const MODULE: string = "MODULE";
export const SUBJECT: string = "SUBJECT";

export type Subject = {
  name: string;
  modules: string[];
};

export type ModuleUpdateProps = {
  subjectId: number;
  module: string;
};

export type UpdateEntityProps = {
  value: string;
  uid: string;
  subjectIndex?: number;
  subjectName?: string;
};
