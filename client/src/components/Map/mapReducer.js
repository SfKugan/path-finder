import { 
    CLEAR_ALL, ADD_MARKER, 
    REMOVE_MARKER, SET_PATH 
} from './mapActions';

const initState = {
    distance: 0,
    markers: [],
    path: [],
}

export const mapReducer = (state = initState, { type, payload }) => {
    switch (type) {
        case REMOVE_MARKER:
            return {...state, markers: state.markers.filter(val => val !== payload)};
        case ADD_MARKER:
            return {...state, markers: [...state.markers, payload]};
        case SET_PATH:
            const { path, distance } = payload;
            return {...state, path, distance};
        case CLEAR_ALL:
            return {...initState};
        default: 
            return {...state};
    }
}