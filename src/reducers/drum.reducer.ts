import { StateType } from "../types/state.type";
import { POWER_CHANGE, PRESS_KEY, VOLUME_CHANGE } from "../events/consts";

const initialState: StateType = {
    drumKey: { name: '', key: '', sound: '' },
    history: [],
    volume: 0.5,
    power: true
};

const drumReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PRESS_KEY:
            return {
                ...state,
                drumKey: action?.drumKey,
                history: [...state.history, action?.drumKey]
            };
        case VOLUME_CHANGE:
            return {
                ...state,
                volume: action?.volume
            };
        case POWER_CHANGE:
            return {
                ...state,
                power: action?.power
            };
        default:
            return state;
    }
};

export {
    drumReducer
}