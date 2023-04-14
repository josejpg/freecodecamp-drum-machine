import { EventPressKeyDrumType } from "../types/event-press-key-drum.type";
import { POWER_CHANGE, PRESS_KEY, VOLUME_CHANGE } from "./consts";
import { EventVolumeType } from "../types/event-volume.type";
import { EventPowerType } from "../types/event-power.type";
import { DrumKeyType } from "../types/drum-key.type";

const pressKeyEvent = (drumKey: DrumKeyType): EventPressKeyDrumType => {
    return {
        type: PRESS_KEY,
        drumKey
    }
};

const volumeChangeEvent = (volume: number): EventVolumeType => {
    return {
        type: VOLUME_CHANGE,
        volume
    }
};

const powerChangeEvent = (power: boolean): EventPowerType => {
    return {
        type: POWER_CHANGE,
        power
    }
};

export {
    pressKeyEvent,
    volumeChangeEvent,
    powerChangeEvent
}