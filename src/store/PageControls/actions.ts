import { PayloadAction } from "@reduxjs/toolkit"
import { PageControl } from "./types"


export default {
    setLoading: (state: PageControl, action: PayloadAction<boolean>) => {
        state.loading = action.payload
    },

}