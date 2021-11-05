import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useDarkTheme, useLoader } from '../storeSelectors';
import classNames from 'classnames';
import './loader.scss';

export const Loader = props => {
    const isDarkTheme = useDarkTheme();
    const isActive = useLoader();

    if (!isActive) 
        return null;

    const loaderStyles = classNames({
        "loader-background": true,
        "dark": isDarkTheme
    })

    return (
        <div className={loaderStyles} >
            <FontAwesomeIcon icon={faSpinner} size="8x" spin />
        </div>
    )
}