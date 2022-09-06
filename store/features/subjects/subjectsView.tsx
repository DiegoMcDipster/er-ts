import { useEffect, useState } from "react";
import EntityForm from "../../../Components/EntityForm";
import { AddIcon, CloseIcon, DeleteIcon } from "../../../Components/Icons";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  addModule,
  fetchSubjects,
  removeModule,
  removeSubject,
} from "./subjectsSlice";
import { UpdateEntityProps } from "../../../types/stateTypes";

// This constant is only here for demo pruposes
import { UID } from "../../../demo-const";

export const SubjectsView = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.subjects.subjectList);

  useEffect(() => {
    dispatch(fetchSubjects(UID));
  }, [dispatch]);

  const handleRemoveSubject = (value: string) => {
    dispatch(removeSubject({ value, uid: UID }));
  };

  const handleAddModule = (
    value: string,
    subjectIndex: number,
    subjectName: string
  ) => {
    const entity: UpdateEntityProps = { value, uid: UID };
    dispatch(addModule({ entity, subjectIndex, subjectName }));
  };

  const handleRemoveModule = (
    value: string,
    subjectIndex: number,
    subjectName: string
  ) => {
    const entity: UpdateEntityProps = { value, uid: UID };
    dispatch(removeModule({ entity, subjectIndex, subjectName }));
  };

  return (
    <div>
      <div>
        <h3>Current Subjects</h3>
        <ul>
          {subjects &&
            subjects.map((item, index) => (
              <li
                className="entity subject"
                key={index}
                data-cy={`subject-${index}`}
              >
                <div className="subject_header">
                  {item.name}
                  <DeleteIcon handler={() => handleRemoveSubject(item.name)} />
                </div>
                <div className="module_header">
                  Modules
                  {isActive ? (
                    <CloseIcon handler={() => setIsActive(!isActive)} />
                  ) : (
                    <AddIcon handler={() => setIsActive(!isActive)} />
                  )}
                </div>
                <EntityForm
                  handler={handleAddModule}
                  label="Add Module"
                  subjectIndex={index}
                  subjectName={item.name}
                  isActive={isActive}
                />
                <ul>
                  {item.modules.map((mod, i) => (
                    <li
                      className="group"
                      key={i}
                      data-cy={`module-${index}-${i}`}
                    >
                      {mod}
                      <DeleteIcon
                        handler={() =>
                          handleRemoveModule(mod, index, item.name)
                        }
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
