import React from 'react';
import classNames from 'classnames';
import './toggler.scss';

export const Toggler = props => {
    const { toggle, isActive, isDark = false } = props;

    const styles = classNames({
        "toggler-top": true,
        "active": isActive
    })

    const foundationStyles = classNames({
        "toggler-foundation": true,
        "dark": isDark
    })

    return (
        <div className={foundationStyles} onClick={toggle}>
            <div className={styles}></div>
        </div>
    )
} 