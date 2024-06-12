import { PayloadAction } from "@reduxjs/toolkit"
import {  user, SwipperState } from "./types"

export default {
    setList: (state: SwipperState, action: PayloadAction<Array<user>>) => {
        state.swipperList = action.payload
    },
}