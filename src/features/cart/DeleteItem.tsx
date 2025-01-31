import { FC } from "react";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useAppDispatch } from "../../hooks/useRedux";

interface DeleteItemProps {
  id: number;
}

const DeleteItem: FC<DeleteItemProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(id))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
