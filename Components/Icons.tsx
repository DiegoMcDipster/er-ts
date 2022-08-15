import { ReactElement, ReactSVGElement } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

type DeleteIconProps = {
  handler: () => void;
};

export const DeleteIcon = ({ handler }: DeleteIconProps): ReactElement => {
  return (
    <RiDeleteBin6Line
      style={{ marginLeft: "16px", cursor: "pointer" }}
      onClick={handler}
      data-cy="delete-icon"
    />
  );
};
