import { useEffect } from "react";
import EntityForm from "../../../Components/EntityForm";
import { DeleteIcon } from "../../../Components/Icons";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  addModule,
  addSubject,
  fetchSubjects,
  removeModule,
  removeSubject,
} from "./subjectsSlice";

// This constant is only here for demo pruposes
import { UID } from "../../../demo-const";

export const SubjectsView = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.subjects.subjectList);

  useEffect(() => {
    dispatch(fetchSubjects(UID));
  }, [dispatch]);

  const handleAddSubject = (value: string) => {
    dispatch(addSubject({ value, uid: UID }));
  };

  const handleRemoveSubject = (value: string) => {
    dispatch(removeSubject({ value, uid: UID }));
  };

  const handleAddModule = (
    value: string,
    subjectIndex: number = NaN,
    subjectName: string = ""
  ) => {
    if (subjectIndex === NaN)
      console.log("handleAddModule: The subjectIndex was not passed");
    else if (subjectName === "")
      console.log("handleAddModule: The subjectName was not passed");
    else dispatch(addModule({ value, uid: UID, subjectIndex, subjectName }));
  };

  const handleRemoveModule = (
    value: string,
    subjectIndex: number = NaN,
    subjectName: string = ""
  ) => {
    if (subjectIndex === NaN)
      console.log("handleAddModule: The subjectIndex was not passed");
    else if (subjectName === "")
      console.log("handleAddModule: The subjectName was not passed");
    else dispatch(removeModule({ value, uid: UID, subjectIndex, subjectName }));
  };

  return (
    <div>
      <div>
        <h2>Subjects</h2>
        <ol>
          {subjects.map((item, index) => (
            <li key={index} data-cy={`subject-${index}`}>
              {item.name}
              <DeleteIcon handler={() => handleRemoveSubject(item.name)} />
              <ul>
                {item.modules.map((mod, i) => (
                  <li key={i} data-cy={`module-${index}-${i}`}>
                    {mod}
                    <DeleteIcon
                      handler={() => handleRemoveModule(mod, index, item.name)}
                    />
                  </li>
                ))}
              </ul>
              <br />
              <EntityForm
                handler={handleAddModule}
                label="Add Module New"
                entityType={"MODULE"}
                subjectIndex={index}
                subjectName={item.name}
              />
            </li>
          ))}
        </ol>
      </div>
      <br />
      <EntityForm
        handler={handleAddSubject}
        label="Add Subject New"
        entityType={"SUBJECT"}
      />
    </div>
  );
};
