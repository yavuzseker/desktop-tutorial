import { LearnState } from "./types";

const initialState: LearnState = {
    daily: [],
    missionCount: 6,
    complateMission: 0,

    studyComplate: {
        listening: 0,
        reading: 0,
        speaking: 0,
        writing: 0
    }
}

export { initialState }