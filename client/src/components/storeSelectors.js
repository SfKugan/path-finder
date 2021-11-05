import { shallowEqual, useSelector } from 'react-redux';

export const useMapData = () => {
    const distance = useSelector(({ map }) => map.distance, shallowEqual);
    const markers = useSelector(({ map }) => map.markers, shallowEqual);
    const path = useSelector(({ map }) => map.path, shallowEqual);

    return { distance, markers, path }
} 

export const useNotifications = () => {
    return useSelector(({ notifications }) => notifications.stack, shallowEqual);
} 

export const useDarkTheme = () => {
    return useSelector(({ settings }) => settings.isDarkTheme, shallowEqual);
} 

export const useLoader = () => {
    return useSelector(({ loader }) => loader.isActive);
} 

export const useNotificationsEnable = () => {
    return useSelector(({ settings }) => settings.isNotificationsEnable, shallowEqual);
} 
