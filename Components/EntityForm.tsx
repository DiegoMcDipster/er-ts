import { useState } from "react";
import { GROUP, MODULE, SUBJECT } from "../types/stateTypes";

type EntityFormProps = {
  label: string;
  handler: (value: string, index?: number) => void;
  entityType: string;
  index?: number;
};

const EntityForm = ({ label, handler, entityType, index }: EntityFormProps) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (value.length > 0) {
      switch (true) {
        case entityType === SUBJECT || entityType === GROUP:
          handler(value);
          break;

        case entityType === MODULE:
          handler(value, index);

        default:
          break;
      }
      setValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>{label}</button>
    </div>
  );
};

export default EntityForm;
