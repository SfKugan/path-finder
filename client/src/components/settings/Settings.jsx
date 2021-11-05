import React from 'react';
import classNames from 'classnames';
import { Toggler } from '../toggler';
import { useDispatch } from 'react-redux';
import { setThemeState, setNotificationsState } from './settingsActions'; 
import { useDarkTheme, useNotificationsEnable } from '../storeSelectors';
import './settings.scss';

export const Settings = () => {
    const isDarkTheme = useDarkTheme();
    const isNotificationsEnable = useNotificationsEnable();

    const dispatch = useDispatch();

    const toggleThemeState = () => dispatch(setThemeState(!isDarkTheme));
    const toggleNotificationsState = () => dispatch(setNotificationsState(!isNotificationsEnable));

    const styles = classNames({
        "settings-container": true,
        "dark": isDarkTheme
    })

    return (
        <div className={styles}>
            <div className="settings-item">
                <Toggler 
                    toggle={toggleThemeState} 
                    isActive={isDarkTheme} 
                    isDark={isDarkTheme} 
                />
                <span>Включить темную тему</span>
            </div>
            <div className="settings-item">
                <Toggler 
                    toggle={toggleNotificationsState} 
                    isActive={isNotificationsEnable} 
                    isDark={isDarkTheme} 
                />
                <span>Включить уведомления</span>
            </div>
        </div>
    )
}