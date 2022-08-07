import { useEffect } from "react";
import EntityForm from "../../../Components/EntityForm";
import { DeleteIcon } from "../../../Components/Icons";
import { GROUP } from "../../../types/stateTypes";
import { useAppDispatch, useAppSelector } from "../../hook";
import { addGroup, fetchGroups, removeGroup } from "./groupsSlice";

// This constant is only here for demo purposes!
import { UID } from "../../../demo-const";

export const GroupsView = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.groupsList);

  useEffect(() => {
    dispatch(fetchGroups(UID));
  }, [dispatch]);

  const handleAddGroup = (value: string) => {
    dispatch(addGroup({ value, uid: UID }));
  };

  const handleRemoveGroup = (value: string) => {
    dispatch(removeGroup({ value, uid: UID }));
  };

  return (
    <div>
      <div>
        <ol>
          {groups.map((item, index) => (
            <li key={index} data-cy={`group-${index}`}>
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
