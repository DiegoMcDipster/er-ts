/**
 * Props used by redux & for update to dynamodb
 */
export type Uid = string;

export type Subject = {
  name: string;
  modules: string[];
};

export type Subjects = Subject[];

export type Group = string;

export type Groups = Group[];

export type EntityAction = "add" | "remove";

export type EntityType = "group" | "subject" | "module";

export type GetResponseType = {
  uid: Uid;
  groups: Groups | undefined;
  subjects: Subjects | undefined;
};

export type PutResponseType = {
  message: string;
  data: Groups | Subjects;
};

export type UpdateEntityProps = {
  value: string;
  uid: Uid;
};

export type UpdateSubjectModuleProps = {
  entity: UpdateEntityProps;
  subjectIndex: number;
  subjectName: string;
};

export type ModuleStoreProps = {
  subjectIndex: number;
  value: string;
};

/**
 * Props used by the Entity form
 */
export type EntityProps = {
  label: string;
  handler: (value: string) => void;
};

export type SubjectModule = {
  label: string;
  handler: (value: string, subjectIndex: number, subjectName: string) => void;
  subjectIndex: number;
  subjectName: string;
};

export type EntityFormProps = EntityProps | SubjectModule;
