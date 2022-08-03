import EntityForm from "../../../Components/EntityForm";
import { DeleteIcon } from "../../../Components/Icons";
import { GROUP } from "../../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addGroup, removeGroup } from "./groupsSlice";

export const GroupsView = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.groupsList);

  const handleAddGroup = (value: string) => {
    dispatch(addGroup(value));
  };

  const handleRemoveGroup = (value: string) => {
    dispatch(removeGroup(value));
  };

  return (
    <div>
      <div>
        <h2>My Groups</h2>
        <ol>
          {groups.map((item, index) => (
            <li key={index}>
              {item}
              <DeleteIcon handler={() => handleRemoveGroup(item)} />
            </li>
          ))}
        </ol>
      </div>
      <EntityForm
        handler={handleAddGroup}
        label="Add Group New"
        entityType={GROUP}
      />
    </div>
  );
};
