import {
  EntityFormProps,
  GroupGetResponseType,
  SubjectGetResponseType,
  SubjectModule,
} from "./stateTypes";

export const isSubjectModule = (
  subjectModule: EntityFormProps
): subjectModule is SubjectModule => {
  return (subjectModule as SubjectModule).subjectIndex !== undefined;
};

export const isGroupResults = (
  groupResults: GroupGetResponseType | SubjectGetResponseType
): groupResults is GroupGetResponseType => {
  return (groupResults as GroupGetResponseType).groups !== undefined;
};

export const isSubjectResults = (
  subjectResults: GroupGetResponseType | SubjectGetResponseType
): subjectResults is SubjectGetResponseType => {
  return (subjectResults as SubjectGetResponseType).subjects !== undefined;
};
