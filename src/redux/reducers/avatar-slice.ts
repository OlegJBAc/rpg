import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    avatarInitializingAction,
    changeAvatarParamsValueAction,
    changeBaseDependentParamsAction,
    changeDependentSkillValueAction,
    changeNameAction,
    initialStateType
} from "../../types/avatarSliceTypes";
import {initializeAvatar, setSumPower, updateBaseDependentParams, updateLocalStorageAvatarParams} from "./avatar-mixins";


const initialState = {
    avatarIsInitialized: false,
    initializationData: {
        baseParamsNames: [ 'strength', 'agility', 'intelligence', 'charisma', ],
        baseParamsDependentSkills: {
            strength: [ 'attack', ],
            agility: [ 'stealth', 'archery', ],
            intelligence: [ 'learnability', 'survival', 'medicine', ],
            charisma: [ 'intimidation', 'insight', 'appearance', 'manipulation', ],
        },
        baseDependentParamsNames: [ 'stamina', 'evasion', 'energy', ],
    },
    avatarParams: {
        quantityParams: 0,
        avatarLevel: 0,
        baseParams: {},
        baseDependentParams: {},
    }
} as initialStateType


const avatarSlice = createSlice({
    name: 'avatar',
    initialState: initialState,
    reducers: {
        avatarInitializing: (state: initialStateType, action: PayloadAction<{ requiredAction: 'initial' | 'ressurect' }>) => {
            const { requiredAction } = action.payload
            const avatarIsInitialized = localStorage.getItem('avatarIsInitialized')

            if(!avatarIsInitialized && requiredAction === 'initial'){
               initializeAvatar(state)
               state.avatarIsInitialized = true
               localStorage.setItem('avatarIsInitialized', JSON.stringify(state.avatarIsInitialized))

            }else if(requiredAction === 'ressurect'){
               initializeAvatar(state)

            }else{
                state.avatarParams = JSON.parse(localStorage.getItem('avatarParams') as string)
                console.log('Avatar already initialized')

            }
        },

        changeAvatarParamsValue: (state: initialStateType, action: PayloadAction<changeAvatarParamsValueAction>) => {
            const { paramName, requiredAction, } = action.payload
            let { count, } = action.payload
            let currentValue = state.avatarParams.baseParams[paramName].value
            const baseParamsWithDependency = ['strength', 'agility', 'intelligence']

            if (!count) count = 1

            if (requiredAction === 'increase') {
                if (currentValue + count <= 4) {
                    state.avatarParams.baseParams[paramName].value += count
                    setSumPower(state)
                }
                if (baseParamsWithDependency.includes(paramName)) {
                    updateBaseDependentParams(state)
                }
                updateLocalStorageAvatarParams(state)
            } else if (requiredAction === 'decrease') {
                if (currentValue - count >= 0) {
                    state.avatarParams.baseParams[paramName].value -= count
                    setSumPower(state)
                }
                if (baseParamsWithDependency.includes(paramName)) {
                    updateBaseDependentParams(state)
                }
                updateLocalStorageAvatarParams(state)
            } else console.error('requiredAction or current value error')
        },

        changeDependentSkillValue: (state: initialStateType, action: PayloadAction<changeDependentSkillValueAction>) => {
            const {paramName, skillName, requiredAction,} = action.payload
            let {count} = action.payload
            // @ts-ignore
            let requiredSkill = state.avatarParams.baseParams[paramName].dependentSkills[skillName]
            const currentParamValue = state.avatarParams.baseParams[paramName].value

            if (!count) count = 1

            if (requiredAction === 'increase') {
                // @ts-ignore
                if (requiredSkill + count <= currentParamValue) state.avatarParams.baseParams[paramName].dependentSkills[skillName] += count
                setSumPower(state)
                updateLocalStorageAvatarParams(state)
            } else if (requiredAction === 'decrease') {
                // @ts-ignore
                if (requiredSkill - count >= 0) state.avatarParams.baseParams[paramName].dependentSkills[skillName] -= count
                setSumPower(state)
                updateLocalStorageAvatarParams(state)
            } else console.error('requiredAction or current value error')
        },

        getDamage: (state: initialStateType, action: PayloadAction<changeBaseDependentParamsAction>) => {
            let { count } = action.payload
            const currentStamina = state.avatarParams.baseDependentParams.stamina
            const currentStrength = state.avatarParams.baseParams.strength.value

            if (!count) count = 1

            if (currentStamina - count >= 0 && currentStrength - count >= 0) {
                state.avatarParams.baseDependentParams.stamina -= count
                state.avatarParams.baseParams.strength.value -= count
                setSumPower(state)
            } else {
                if(currentStamina - count >= 0){
                    state.avatarParams.baseDependentParams.stamina -= count
                    setSumPower(state)
                } else {
                    console.error('current stamina value will be below zero')
                }
            }
            updateLocalStorageAvatarParams(state)
        },

        changeName: (state: initialStateType, action: PayloadAction<changeNameAction>) => {
            state.avatarParams.name = action.payload.name
            updateLocalStorageAvatarParams(state)
        },
    },
})

export const { avatarInitializing, changeAvatarParamsValue, changeDependentSkillValue, getDamage, changeName } = avatarSlice.actions

export default avatarSlice.reducer
