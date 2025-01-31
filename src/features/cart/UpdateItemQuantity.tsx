import { FC } from "react";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";
import { useAppDispatch } from "../../hooks/useRedux";

interface UpdateItemQuantityProps {
  id: number;
  currentQuantity: number;
}

const UpdateItemQuantity: FC<UpdateItemQuantityProps> = ({
  id,
  currentQuantity,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItemQuantity(id))}>
        -
      </Button>
      <span className="text-sm font-medium"> {currentQuantity} </span>
      <Button type="round" onClick={() => dispatch(increaseItemQuantity(id))}>
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
