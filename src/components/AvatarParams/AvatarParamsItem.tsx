import React, {useState} from 'react';
import styles from './AvatarParams.module.scss';
import { v4 } from 'uuid'
import { ReactComponent as PlusIcon } from '../../images/plus_icon.svg'
import { ReactComponent as PlusIconMain } from '../../images/plus_icon_main.svg'
import { ReactComponent as MinusIcon } from '../../images/minus_icon.svg'
import { ReactComponent as MinusIconMain } from '../../images/minus_icon_main.svg'

import {
    changeAvatarParamsValue,
    changeDependentSkillValue,
} from "../../redux/reducers/avatar-slice";

import {useAppDispatch} from "../../hooks/hooks";
import {paramNameType, skillNameType} from "../../types/avatarSliceTypes";


const AvatarParamsItem: React.FC<propsType> = ({ paramName, param }) => {
    const dependentSkillsKeys = Object.keys(param.dependentSkills) as skillNameType[]
    const dispatch = useAppDispatch()

    const changeAvatarParamsFunc = (requiredAction: 'increase' | 'decrease') => () => {
        dispatch(changeAvatarParamsValue({ paramName: paramName, requiredAction: requiredAction }))
    }
    const changeDependentSkillFunc = (requiredAction: 'increase' | 'decrease', skillName: skillNameType) => () => {
        dispatch(changeDependentSkillValue({ paramName, skillName, requiredAction}))
    }
    return (
        <li className={styles.params__item}>
            <div className={styles.params__content} id={styles.params__content_base}>
                <div className={styles['params__content-param']}>
                    <div id={styles['params__content_base-param']}>{paramName}: </div>
                    <b>{param.value}</b>
                </div>
                <div className={styles.params__buttons}>
                    <button onClick={changeAvatarParamsFunc('decrease')}>
                        <MinusIconMain className={styles['params__icon-plus']}/>
                    </button>
                    <button onClick={changeAvatarParamsFunc('increase')}>
                        <PlusIconMain className={styles['params__icon-plus']}/>
                    </button>
                </div>

            </div>
            <ul className={styles.params__skills}>
                { dependentSkillsKeys.map(( skill, index ) => {
                    return <li className={styles.params__skill} key={v4()}>
                        <div className={styles.params__content}>
                            <div className={styles['params__content-skill']}>
                                <div>{ dependentSkillsKeys[index] }: </div>
                                <b>{ param.dependentSkills[dependentSkillsKeys[index]] }</b>
                            </div>
                            <div className={styles.params__buttons}>
                                <button onClick={changeDependentSkillFunc('decrease', dependentSkillsKeys[index])}>
                                    <MinusIcon className={styles['params__icon-plus']}/>
                                </button>
                                <button onClick={changeDependentSkillFunc('increase', dependentSkillsKeys[index])}>
                                    <PlusIcon className={styles['params__icon-plus']}/>
                                </button>
                            </div>
                        </div>
                    </li>
                }) }
            </ul>
        </li>
    )
}

export default AvatarParamsItem;

interface propsType {
    paramName: paramNameType
    param: {
        value: number
        dependentSkills: {
            [key: string]: number
        }
    }
}