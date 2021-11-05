import { PUSH_NOTIFICATION, REMOVE_NOTIFICATION } from './notificationsActions';

const initState = {
    stack: []
}

export const notificationsReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case PUSH_NOTIFICATION:
            return {stack: [ ...state.stack, payload ]}  
        case REMOVE_NOTIFICATION:
            return {stack: state.stack.filter(item => item.key !== payload)} 
        default: 
            return {...state};
    }
}