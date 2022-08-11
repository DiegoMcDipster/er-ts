export type EntityType = "GROUP" | "SUBJECT" | "MODULE";

/**
 * Props used by redux & for update to dynamodb
 */
export type Subject = {
  name: string;
  modules: string[];
};

export type UpdateEntityProps = {
  value: string;
  uid: string;
};

export type UpdateSubjectModuleProps = {
  entity: UpdateEntityProps;
  subjectIndex: number;
  subjectName: string;
};

export type ModuleUpdateProps = Pick<
  UpdateSubjectModuleProps,
  "subjectIndex" | "entity"
>;

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
