import { ReactElement, useState } from "react";
import { isSubjectModule } from "../types/helpers";
import { EntityFormProps } from "../types/stateTypes";

const EntityForm = (props: EntityFormProps): ReactElement => {
  const [value, setValue] = useState("");
  const { label } = props;

  const handleClick = (): void => {
    if (!value) return;
    if (isSubjectModule(props)) {
      const { handler, subjectIndex, subjectName } = props;
      handler(value, subjectIndex, subjectName);
    } else props.handler(value);

    setValue("");
  };

  return (
    <div className={`form ${props.isActive ? "expanded" : ""}`}>
      <input
        className="form_input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-cy="input-field"
      />
      <button className="btn" onClick={handleClick} data-cy="submit-btn">
        {label}
      </button>
    </div>
  );
};

export default EntityForm;
