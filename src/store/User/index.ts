import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './state'
import actions from './actions'

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        ...actions
    },
})

export const {addBumbiScore, removeBumbiScore, removeUser, setUser, updateUser, changePhoto, addPhoto, updateProfile, changeFullName ,changeAge , changeGender , changeDateGender , changeLevel , changeCountry} = userSlice.actions
export default userSlice.reducer