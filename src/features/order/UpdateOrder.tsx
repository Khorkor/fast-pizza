import { FC } from "react";
import { OrderType } from "../../types"; // Correct import path
import Button from "../../ui/Button";
import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

interface UpdateOrderProps extends OrderType {}

const UpdateOrder: FC<UpdateOrderProps> = ({ priority }: UpdateOrderProps) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">
        {fetcher.state === "submitting" ? "Updating..." : "Make Priority"}
      </Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const data = { priority: true };

  await updateOrder(!params.orderId ? "" : params.orderId, data);

  return null;
};
