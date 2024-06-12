import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import actions from './actions'

export const swipperSlice = createSlice({
    name: 'swipper',
    initialState,
    reducers: {
        ...actions
    },
})

export const { setList } = swipperSlice.actions
export default swipperSlice.reducer