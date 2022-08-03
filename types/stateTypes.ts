export const GROUP: string = "GROUP";
export const MODULE: string = "MODULE";
export const SUBJECT: string = "SUBJECT";

export type Subject = {
  subject: string;
  modules: string[];
};

export type Module = {
  subjectId: number;
  module: string;
};
