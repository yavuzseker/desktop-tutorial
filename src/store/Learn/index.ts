import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import actions from './actions'

export const learnSlice = createSlice({
    name: 'learn',
    initialState,
    reducers: {
        ...actions
    },
})

export const { setDaily, incramentMissionComplate , incramentListening , incramentReading , incramentSpeaking , incramentWriting} = learnSlice.actions
export default learnSlice.reducer