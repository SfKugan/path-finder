import { 
    OPEN_LOADER, CLOSE_LOADER, 
    SET_LOADER_STATE 
} from './loaderActions';

const initState = {
    isActive: false
}

export const loaderReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case OPEN_LOADER:
            return { isActive: true };
        case CLOSE_LOADER:
            return { isActive: false };
        case SET_LOADER_STATE:
            return { isActive: payload };
        default: 
            return {...state};
    }
}