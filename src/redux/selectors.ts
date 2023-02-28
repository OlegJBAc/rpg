import { rootStateType } from "./store";


export const getAvatarName= (state: rootStateType) => {
    return state.avatarSliceReducer.avatarParams.name
}
export const getAvatarSumPower= (state: rootStateType) => {
    return state.avatarSliceReducer.avatarParams.sumPower
}
export const getAvatarLevel= (state: rootStateType) => {
    return state.avatarSliceReducer.avatarParams.avatarLevel
}
export const getAllAvatarBaseParams = (state: rootStateType) => {
    return state.avatarSliceReducer.avatarParams.baseParams
}
export const getAllAvatarBaseDependentParams = (state: rootStateType) => {
    return state.avatarSliceReducer.avatarParams.baseDependentParams
}
