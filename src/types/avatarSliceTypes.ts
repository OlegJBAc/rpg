
export interface initialStateType {
    avatarIsInitialized: boolean
    initializationData: initializationDataType

    avatarParams: {
        name: string
        sumPower: number
        quantityParams: number
        avatarLevel: number
        baseParams: {
            strength: {
                value: number
                dependentSkills: {
                    attack: number
                }
            }
            agility: {
                value: number
                dependentSkills: {
                    stealth: number
                    archery: number
                }
            }
            intelligence: {
                value: number
                dependentSkills: {
                    learnability: number
                    survival: number
                    medicine: number
                }
            }
            charisma: {
                value: number
                dependentSkills: {
                    intimidation: number
                    insight: number
                    appearance: number
                    manipulation: number
                }
            }
        }

        baseDependentParams: {
            stamina: number
            evasion: number
            energy: number
        }
    }
}

interface initializationDataType {
    baseParamsNames: paramNameType[]
    baseParamsDependentSkills: {
        strength: Array<'attack'>
        agility: Array<'stealth' | 'archery'>
        intelligence: Array<'learnability' | 'survival' | 'medicine'>
        charisma: Array<'intimidation' | 'insight' | 'appearance' | 'manipulation'>
    }
    baseDependentParamsNames: baseDependentParamType[]
}

export type paramNameType = 'strength' | 'agility' | 'intelligence' | 'charisma'

export type skillNameType = 'attack' | 'stealth' | 'archery' | 'learnability' | 'survival' | 'medicine'
    | 'intimidation' | 'insight' | 'appearance' | 'manipulation'

export type baseDependentParamType = 'stamina' | 'evasion' | 'energy'

export type requiredActionType = 'increase' | 'decrease'

export interface avatarInitializingAction {
    requiredAction: 'initialize' | 'resurrect'
}
export interface changeAvatarParamsValueAction {
    paramName: paramNameType
    requiredAction: requiredActionType
    count?: number
}

export interface changeDependentSkillValueAction {
    paramName: paramNameType
    skillName: skillNameType
    requiredAction: requiredActionType
    count?: number
}

export interface changeBaseDependentParamsAction {
    count?: number
}

export interface changeNameAction {
    name: string
}

