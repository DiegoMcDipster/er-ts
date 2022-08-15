import { ReactElement, useState } from "react";
import { isSubjectModule } from "../types/helpers";
import { EntityFormProps } from "../types/stateTypes";

const EntityForm = (props: EntityFormProps): ReactElement => {
  const [value, setValue] = useState("");
  const { label } = props;

  const handleClick = (): void => {
    if (isSubjectModule(props)) {
      const { handler, subjectIndex, subjectName } = props;
      handler(value, subjectIndex, subjectName);
    } else props.handler(value);

    setValue("");
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
