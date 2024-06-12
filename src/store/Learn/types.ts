import { Daily } from "./types"
export * from "src/hst/types"



export interface LearnState {
    daily: Array<Daily>
    missionCount: number
    complateMission: number
    studyComplate: {
        reading: number,
        writing: number,
        listening: number,
        speaking: number
    }
}