import { useState } from "react";
import { GROUP, MODULE, SUBJECT } from "../types/stateTypes";

type EntityFormProps = {
  label: string;
  handler: (value: string, subjectIndex?: number, subjectName?: string) => void;
  entityType: string;
  subjectIndex?: number;
  subjectName?: string;
};

const EntityForm = ({
  label,
  handler,
  entityType,
  subjectIndex,
  subjectName,
}: EntityFormProps) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    if (value.length > 0) {
      switch (true) {
        case entityType === SUBJECT || entityType === GROUP:
          handler(value);
          break;

        case entityType === MODULE:
          handler(value, subjectIndex, subjectName);

          break;
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
        data-cy="input-field"
      />
      <button onClick={handleClick} data-cy="submit-btn">
        {label}
      </button>
    </div>
  );
};

export default EntityForm;
