import { FC } from "react";
import { useAppSelector } from "../../hooks/useRedux";

const Username: FC = () => {
  const username = useAppSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
};

export default Username;
