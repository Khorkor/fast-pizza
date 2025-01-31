import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../store"; // Path to your store
import { AppDispatch } from "../store"; // Path to your store

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useRedux = () => ({
  dispatch: useAppDispatch(),
  selector: useAppSelector,
});
