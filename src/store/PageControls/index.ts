import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import actions from './actions'

export const pageControlsSlice = createSlice({
    name: 'page_controls',
    initialState,
    reducers: {
        ...actions
    },
})

export const { setLoading } = pageControlsSlice.actions
export default pageControlsSlice.reducer