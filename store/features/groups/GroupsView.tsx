import { useEffect } from "react";
import { DeleteIcon } from "../../../Components/Icons";
import { useAppDispatch, useAppSelector } from "../../hook";
import { fetchGroups, removeGroup } from "./groupsSlice";

// This constant is only here for demo purposes!
import { UID } from "../../../demo-const";

export const GroupsView = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((state) => state.groups.groupsList);

  useEffect(() => {
    dispatch(fetchGroups(UID));
  }, [dispatch]);

  const handleRemoveGroup = (value: string) => {
    dispatch(removeGroup({ value, uid: UID }));
  };

  return (
    <div>
      <h3>Current Groups</h3>
      <div>
        <ul>
          {groups.map((item, index) => (
            <li className="entity group" key={index} data-cy={`group-${index}`}>
              {item}
              <DeleteIcon handler={() => handleRemoveGroup(item)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
