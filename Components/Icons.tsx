import { ReactElement } from "react";
import { RiDeleteBin6Line, RiCloseLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";

type IconProps = {
  handler: () => void;
};

export const DeleteIcon = ({ handler }: IconProps): ReactElement => {
  return (
    <RiDeleteBin6Line
      className="icon"
      onClick={handler}
      data-cy="delete-icon"
    />
  );
};

export const AddIcon = ({ handler }: IconProps): ReactElement => {
  return <BsPlus className="icon" onClick={handler} data-cy="add-icon" />;
};

export const CloseIcon = ({ handler }: IconProps): ReactElement => {
  return (
    <RiCloseLine className="icon" onClick={handler} data-cy="close-icon" />
  );
};
