import React, { FC } from "react"
import './layout.scss'
import cn from 'classnames'
import { useAppSelector } from "../hooks/hooks"
import { getAppTheme } from "../redux/selectors"


const Layout: FC<propsType> = ({ children }) => {
    const appTheme = useAppSelector(getAppTheme) 
    return (
        <div className={cn("layout", {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            { children }
        </div>
    )
}

export default Layout


interface propsType {
    children: any
}