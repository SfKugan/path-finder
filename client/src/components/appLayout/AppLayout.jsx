import React, { createElement, createContext, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom'
import classNames from 'classnames';

import { Loader } from '../loader';
import { useDarkTheme } from '../storeSelectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './appLayout.scss';

const MenuStateContext = createContext();

export const AppMenu = props => {
    const { children } = props;
    const { toggleMenu } = useContext(MenuStateContext);

    return (
        <div className="app-menu">
            <div className="app-menu-title">
                <div className="icon-space" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                Logistics
            </div>
            { children }
        </div>
    );
}

export const MenuItem = ({ text, icon, onClick, linkTo }) => {
    const Component = ({ onClick, linkTo, children }) => createElement(
        linkTo ? NavLink : 'div', 
        {className: "app-menu-item", to: linkTo, onClick},
        children
    );

    return (
        <Component onClick={onClick} linkTo={linkTo}>
            <div className="icon-space">
                <FontAwesomeIcon icon={icon} />
            </div>
            { text }
        </Component>
    )
}

export const AppContent = props => {
    const { children } = props;
    const { isMenuOpen } = useContext(MenuStateContext);

    const classes = classNames({
        "app-content": true,
        "close": isMenuOpen
    })

    return (
        <div className={classes}>
            { children }
            <Loader />
        </div>
    );
}

export const AppLayout = ({ children }) => {
    const isDarkTheme = useDarkTheme();
    const [isMenuOpen, setMenuState] = useState(false);

    const toggleMenu = () => setMenuState(!isMenuOpen);
    const contextObject = { isMenuOpen, toggleMenu }
    
    const containerStyles = classNames({
        "app-layout-position": true,
        "dark": isDarkTheme
    })
    
    return (
        <div className={containerStyles} >
            <MenuStateContext.Provider value={contextObject}>
                <div className="app-layout-container">
                    { children }
                </div>
            </MenuStateContext.Provider>
        </div>
    );
}