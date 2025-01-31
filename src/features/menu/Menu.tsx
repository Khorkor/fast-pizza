import { FC } from "react";
import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import { MenuItemType } from "../../types";

const Menu: FC = () => {
  const menu = useLoaderData() as MenuItemType[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

export const loader = async (): Promise<MenuItemType[]> => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
