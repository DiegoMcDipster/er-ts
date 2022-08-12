/**
 * Props used by redux & for update to dynamodb
 */
export type Subject = {
  name: string;
  modules: string[];
};

export type Subjects = Subject[];

export type Group = string;

export type Groups = Group[];

export type UpdateEntityProps = {
  value: string;
  uid: string;
};

export type UpdateSubjectModuleProps = {
  entity: UpdateEntityProps;
  subjectIndex: number;
  subjectName: string;
};

export type ModuleUpdateProps = {
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
