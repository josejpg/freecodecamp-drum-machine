import { powerChangeEvent, pressKeyEvent, volumeChangeEvent } from "../events/events";
import { StateType } from "../types/state.type";
import { DrumKeyType } from "../types/drum-key.type";

const mapStateToProps = (state: StateType) => {
    return {
        ...state
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        drumKeyEvent: async (drumKey: DrumKeyType) => {
            dispatch(pressKeyEvent(drumKey));
        },
        powerEvent: async (power: boolean) => {
            dispatch(powerChangeEvent(power));
        },
        volumeEvent: async (volume: number) => {
            dispatch(volumeChangeEvent(volume));
        }
    }
};

export {
    mapStateToProps,
    mapDispatchToProps
}