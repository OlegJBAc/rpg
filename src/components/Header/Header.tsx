import React from 'react'
import styles from './Header.module.scss'
import rpg_logo from '../../images/rpg_logo.webp'


const Header = () => {
    return (
        <div className={styles.header}>
            <img src={rpg_logo}/>
        </div>

    )
}

export default Header;
