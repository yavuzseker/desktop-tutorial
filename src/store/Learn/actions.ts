import { PayloadAction } from "@reduxjs/toolkit"
import { Daily, LearnState } from "./types"

export default {
    setDaily: (state: LearnState, action: PayloadAction<Array<Daily>>) => {
        state.daily = action.payload
    },
    incramentMissionComplate(state: LearnState) {
        state.complateMission += 1
    },
    incramentReading(state: LearnState) {
        state.studyComplate.reading += 1
    },
    incramentWriting(state: LearnState) {
        state.studyComplate.writing += 1
    },
    incramentListening(state: LearnState) {
        state.studyComplate.listening += 1
    },
    incramentSpeaking(state: LearnState) {
        state.studyComplate.speaking += 1
    }
}