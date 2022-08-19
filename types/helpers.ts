import { EntityFormProps, SubjectModule } from "./stateTypes";

export const isSubjectModule = (
  subjectModule: EntityFormProps
): subjectModule is SubjectModule => {
  return (subjectModule as SubjectModule).subjectIndex !== undefined;
};

export function getProperty<R, K extends keyof R>(obj: R, key: K): R[K] {
  return obj[key];
}
