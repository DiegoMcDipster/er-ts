import EntityForm from "../../../Components/EntityForm";
import { DeleteIcon } from "../../../Components/Icons";
import { MODULE, Module, SUBJECT } from "../../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../hook";
import {
  addSubject,
  removeSubject,
  addModule,
  removeModule,
} from "./subjModulesSlice";

export const SubjectsModulesView = () => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector((state) => state.subjModules.subjectsList);

  const handleAddSubject = (value: string) => {
    dispatch(addSubject(value));
  };

  const handleRemoveSubject = (value: string) => {
    dispatch(removeSubject(value));
  };

  const handleAddModule = (value: string, index: number = 0) => {
    const newModule: Module = { subjectId: index, module: value };
    dispatch(addModule(newModule));
  };

  const handleRemoveModule = (value: string, index: number = 0) => {
    const moduleObj: Module = { subjectId: index, module: value };
    dispatch(removeModule(moduleObj));
  };

  return (
    <div>
      <div>
        <h2>Subjects</h2>
        <ol>
          {subjects.map((item, index) => (
            <li key={index}>
              {item.subject}
              <DeleteIcon handler={() => handleRemoveSubject(item.subject)} />
              <ul>
                {item.modules.map((mod, i) => (
                  <li key={i}>
                    {mod}
                    <DeleteIcon
                      handler={() => handleRemoveModule(mod, index)}
                    />
                  </li>
                ))}
              </ul>
              <br />
              <EntityForm
                handler={handleAddModule}
                label="Add Module New"
                entityType={MODULE}
                index={index}
              />
            </li>
          ))}
        </ol>
      </div>
      <br />
      <EntityForm
        handler={handleAddSubject}
        label="Add Subject New"
        entityType={SUBJECT}
      />
    </div>
  );
};
