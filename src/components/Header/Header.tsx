import React from 'react'
import styles from './Header.module.scss'
import rpg_logo from '../../images/rpg_logo.webp'
import {getAppTheme} from "../../redux/selectors";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import cnBind from "classnames/bind";
import {changeAppTheme} from "../../redux/reducers/app-slice";
import { ReactComponent as RpgLogo } from '../../images/rpg_logo.svg'


const Header = () => {
    const dispatch = useAppDispatch()
    const appTheme = useAppSelector(getAppTheme)

    const cx = cnBind.bind(styles)

    const changeTheme = () => {
        dispatch(changeAppTheme(appTheme === 'Light' ? 'Dark' : 'Light'))
    }

    return (
        <div className={styles.header}>
            <RpgLogo className={styles.header__logo}/>
            <button className={cx('theme__toggle', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}
                    onClick={changeTheme}
                    title={'change theme'}
            >
            </button>
        </div>

    )
}

export default Header;
