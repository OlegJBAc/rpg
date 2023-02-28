import { configureStore, combineReducers } from "@reduxjs/toolkit"
import avatarSliceReducer from './reducers/avatar-slice'


const rootReducer = combineReducers({
    avatarSliceReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export type rootStateType = ReturnType<typeof store.getState>
export type appDispatchType = typeof store.dispatch


export default store