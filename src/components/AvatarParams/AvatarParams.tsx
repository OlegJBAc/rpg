import React, {useEffect, useState} from 'react';
import styles from './AvatarParams.module.scss';
import { v4 } from 'uuid'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import { getAllAvatarBaseParams, getAvatarName} from "../../redux/selectors";
import { changeName } from "../../redux/reducers/avatar-slice";
import AvatarParamsItem from "./AvatarParamsItem";
import { ReactComponent as PenIcon } from '../../images/pen_icon.svg'
import {paramNameType} from "../../types/avatarSliceTypes";

const AvatarParams = () => {
    const avatarName = useAppSelector(getAvatarName)
    const allAvatarBaseParams = useAppSelector(getAllAvatarBaseParams)

    const dispatch = useAppDispatch()

    const [isEditName, setIsEditName] = useState(false)
    const [avatarNameState, setAvatarNameState] = useState('')

    const baseParams = ['strength', 'agility', 'intelligence', 'charisma'] as paramNameType[]

    const changeNameFunc = (name: string, ) => () => {
        if(isEditName){
            if(name.length >= 1){
                dispatch(changeName({ name }))
            }
            setIsEditName(false)
        }else{
            setIsEditName(true)
        }
    }

    return (
        <div className={styles['avatars-nav']}>
            <h2>My avatar</h2>
            <div className={styles['avatars-nav__name']}>
                <div className={styles['avatars-nav__name-edit']}
                     onClick={() => setIsEditName(true)}
                >
                    <span className={styles['avatars-nav__name-text']}>
                        <b>Name: </b>
                    </span>
                    {
                        isEditName
                            ? <input onChange={(e: any) => setAvatarNameState(e.currentTarget.value)}
                                     placeholder={avatarName}
                                     value={avatarNameState}
                                     onKeyDown={(e: any) => e.key === 'Enter' && changeNameFunc(avatarNameState)()}
                            />
                            : <span>{ avatarName }</span>
                    }
                </div>
                <button onClick={changeNameFunc(avatarNameState)}>
                    <PenIcon className={styles.edit__icon}/>
                </button>
            </div>

            <ul className={styles.params}>
                { baseParams.map( (param, index) => {
                        return <AvatarParamsItem paramName={param}
                                                 param={allAvatarBaseParams[param]}
                                                 key={v4()}
                        />
                    })
                }
            </ul>
        </div>
    )
}

export default AvatarParams;
