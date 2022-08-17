import { EntityFormProps, SubjectModule } from "./stateTypes";

export const isSubjectModule = (
  subjectModule: EntityFormProps
): subjectModule is SubjectModule => {
  return (subjectModule as SubjectModule).subjectIndex !== undefined;
};
