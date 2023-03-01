import React from 'react';
import styles from './Avatar.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getAllAvatarBaseDependentParams, getAvatarLevel, getAvatarSumPower} from "../../redux/selectors";
import cnBind from 'classnames/bind'
import {avatarInitializing, getDamage} from "../../redux/reducers/avatar-slice";

const Avatar = () => {
    let avatarSumPower = useAppSelector(getAvatarSumPower)
    let avatarLevel = useAppSelector(getAvatarLevel)
    const allAvatarBaseDependentParams = useAppSelector(getAllAvatarBaseDependentParams)

    const dispatch = useAppDispatch()

    const cx = cnBind.bind(styles)

    const getDamageFunc = (count=1) => () => {
        dispatch(getDamage({ count }))
    }
    return (
        <div className={cx('avatars-settings', {
            weak: avatarLevel <= 1,
            middle: avatarLevel === 2,
            strong: avatarLevel === 3,
            very__strong: avatarLevel === 4,
            legendary: avatarLevel === 5,
        })}>
            <div className={styles['base-dependent-params__wrapper']}>
                <div className={styles['base-dependent-params']}>
                <span>
                    Stamina: <b>{ allAvatarBaseDependentParams.stamina }</b>
                </span>
                <span>
                    Evasion: <b>{ allAvatarBaseDependentParams.evasion }</b>
                </span>
                <span>
                    Energy: <b>{ allAvatarBaseDependentParams.energy }</b>
                </span>
                <span>
                    Level: <b>{ avatarLevel }</b>
                </span>
                    <b>
                        <span>Summ power of avatar: { avatarSumPower }</span>
                    </b>
                    <div>
                        <button className={styles['ressurect-button']}
                                onClick={() => dispatch(avatarInitializing( { requiredAction: 'ressurect' } ) ) }
                        >
                            <span>Ressurect\reload avatar</span>
                        </button>
                    </div>
                </div>

            </div>

            <div className={styles.avatar__wrapper}>
                <div className={cx('avatar', {
                    weak: avatarLevel <= 1,
                    middle: avatarLevel === 2,
                    strong: avatarLevel === 3,
                    very__strong: avatarLevel === 4,
                    legendary: avatarLevel === 5,
                })}
                     onClick={getDamageFunc()}
                     title={'Attack avatar'}
                ></div>
            </div>

        </div>
    )
}

export default Avatar;
