import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { removeNotification } from './notificationsActions';
import { useNotifications } from '../storeSelectors';
import './notifications.scss';

export const Notifications = props => {
    const notifications = useNotifications();

    const dispatch = useDispatch();
    const removeItem = key => dispatch(removeNotification(key));

    const render = () => {
        return (
            <div className="notifications-container">
                {
                    notifications.map(({ message, key }) => 
                        <Notification key={key} isError message={message} onClick={() => removeItem(key)}/>
                    )
                }
            </div>
        )
    }

    return createPortal(
        render(),
        document.getElementById('notification'),
    );
}

export const Notification = ({ message, onClick, isError, ttl = 6 }) => {
    const [ isTimeOver, setTimeState ] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => { 
            setTimeState(true) 
        }, ttl * 1000);

        return () => clearTimeout(timeout);
    }, [ ttl ]);

    const onElementHidded = event => {
        if (event.animationName === "hide") {
            onClick()
        }
    }

    const notificationClasses = classNames({
        "notification-container": true,
        "open-notification": !isTimeOver,
        "close-notification": isTimeOver,
        "error": isError,
    })

    return (
        <div 
            className={notificationClasses}
            onAnimationEnd={onElementHidded}
        >
            <div className="header">
                <FontAwesomeIcon icon={faTimes} onClick={onClick}/>
            </div>
            <hr />
            <span>{ message }</span>
        </div>
    );
}