import { PayloadAction } from "@reduxjs/toolkit"
import { State, user, Images, Profile, Level } from "./types"

export default {
    setUser: (state: State, action: PayloadAction<user | null>) => {
        state.user = action.payload
    },
    updateUser: (state: State) => {
        state.user = null
    },
    removeUser: (state: State, action: PayloadAction<user>) => {
        state.user = action.payload
    },
    changePhoto: (state: State, action: PayloadAction<Images>) => {

        var index = state.user.profile.images.findIndex((e: any) => e.id == action.payload.id)
        if (index > -1) {
            state.user.profile.images[index] = action.payload
            state.user.profile.photoUrl = action.payload.url
            state.user = { ...state.user }
        }

    },
    addPhoto: (state: State, action: PayloadAction<Images>) => {

        state.user.profile.images.push(action.payload)
        state.user.profile.photoUrl = action.payload.url
        state.user = { ...state.user }
    },
    updateProfile: (state: State, action: PayloadAction<Profile>) => {

        state.user.profile = action.payload
        state.user = { ...state.user }
    },

    // Welcome Actions
    changeFullName: (state: State, action: PayloadAction<string>) => {
        state.user.fullName = action.payload
        state.user.name = action.payload.split(" ")[0]
        state.user.lastname = action.payload.split(" ")[1]
    },
    changeAge: (state: State, action: PayloadAction<string>) => {
        state.user.profile.birthDay = action.payload
        state.user = { ...state.user }
    },
    changeGender: (state: State, action: PayloadAction<string>) => {
        state.user.profile.sex = action.payload
        state.user = { ...state.user }
    },
    changeDateGender: (state: State, action: PayloadAction<{ man: boolean, woman: boolean, non: boolean }>) => {
        state.user.filter.men = action.payload.man
        state.user.filter.women = action.payload.woman
        state.user.filter.nonSex = action.payload.non
        state.user = { ...state.user }
    },
    changeLevel: (state: State, action: PayloadAction<Level>) => {
        state.user.levels = action.payload
        state.user.levelsId = action.payload.id
        state.user = { ...state.user }
    },
    changeCountry: (state: State, action: PayloadAction<string>) => {
        state.user.filter = action.payload
        state.user.profileComplate = true
        state.user = { ...state.user }
    },


    addBumbiScore(state: State) {
        state.user.bumbiScore = state.user.bumbiScore + 10
    },

    removeBumbiScore(state: State) {
        state.user.bumbiScore = state.user.bumbiScore - 3
    }

}