export type EntityType = "GROUP" | "SUBJECT" | "MODULE";

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
