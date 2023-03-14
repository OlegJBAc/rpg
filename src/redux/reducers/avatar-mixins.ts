import {initialStateType} from "../../types/avatarSliceTypes";


export const initializeAvatar = (state: initialStateType) => {

    const { baseParamsNames, baseParamsDependentSkills, baseDependentParamsNames } = state.initializationData
    const stateBaseParams = state.avatarParams.baseParams
    const stateBaseDependentParams = state.avatarParams.baseDependentParams

    let quantityParams = 0

    baseParamsNames.forEach((paramName, index, arr) => {
        quantityParams++
        stateBaseParams[paramName] = {
            value: 0,
            dependentSkills: {} as any,
        }
        baseParamsDependentSkills[paramName].forEach((skill, index, arr) => {
            quantityParams++
            // @ts-ignore
            stateBaseParams[paramName].dependentSkills[skill] = 0
        })
    })

    let strengthValue = state.avatarParams.baseParams.strength.value
    let agilityValue = state.avatarParams.baseParams.agility.value
    let intelligenceValue = state.avatarParams.baseParams.intelligence.value


    baseDependentParamsNames.forEach(param => {
        quantityParams++
        if(param === 'stamina') stateBaseDependentParams[param] = strengthValue + 3
        if(param === 'evasion') stateBaseDependentParams[param] = agilityValue + 10
        if(param === 'energy') stateBaseDependentParams[param] = agilityValue + intelligenceValue
    })

    let { stamina, evasion, energy } = state.avatarParams.baseDependentParams

    state.avatarParams.quantityParams = quantityParams
    state.avatarParams.sumPower = stamina + evasion + energy
    state.avatarParams.name = 'Example'

    state.avatarParams.avatarLevel = getAvatarLevel(state.avatarParams.sumPower, state.avatarParams.quantityParams)

    updateLocalStorageAvatarParams(state)

}
export const getAvatarLevel: getAvatarLevelFunc = (currentSumPower, currentQuantityParams) => {
    if(currentSumPower !== 0 && currentSumPower !== 0) return Math.round(currentSumPower / currentQuantityParams)
    else {
        console.error('some error with params for calculation avatar level')
        return 0
    }
}
type getAvatarLevelFunc = (currentSumPower: number, currentQuantityParams: number) => number

export const setSumPower = (state: initialStateType) => {

    let {  strength, agility, intelligence, charisma  } = state.avatarParams.baseParams
    let {  stamina, evasion, energy  } = state.avatarParams.baseDependentParams

    state.avatarParams.sumPower = strength.value + agility.value + intelligence.value + charisma.value + stamina + evasion + energy

    state.initializationData.baseParamsNames.forEach(param => {
        state.initializationData.baseParamsDependentSkills[param].forEach(skill => {
            // @ts-ignore
            state.avatarParams.sumPower += state.avatarParams.baseParams[param].dependentSkills[skill]
        })
    })
    state.avatarParams.avatarLevel = getAvatarLevel(state.avatarParams.sumPower, state.avatarParams.quantityParams)
}

export const updateBaseDependentParams = (state: initialStateType) => {

    let { strength, agility, intelligence } = state.avatarParams.baseParams

    state.avatarParams.baseDependentParams.stamina = strength.value + 3
    state.avatarParams.baseDependentParams.evasion = agility.value + 10
    state.avatarParams.baseDependentParams.energy = agility.value + intelligence.value

    setSumPower(state)

}

export const updateLocalStorageAvatarParams = (state: initialStateType) => localStorage.setItem('avatarParams', JSON.stringify(state.avatarParams))