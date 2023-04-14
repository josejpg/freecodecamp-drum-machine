import { DrumKeyType } from "./drum-key.type";

export type StateType = {
    drumKey: DrumKeyType,
    volume: number,
    power: boolean,
    history: DrumKeyType[]
}