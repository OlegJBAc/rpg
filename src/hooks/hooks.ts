import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { appDispatchType, rootStateType } from "../redux/store";


export const useAppDispatch = () => useDispatch<appDispatchType>()
export const useAppSelector: TypedUseSelectorHook<rootStateType> = useSelector

