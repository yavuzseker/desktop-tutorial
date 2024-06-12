import { configureStore } from '@reduxjs/toolkit'
import User, { setUser, changePhoto, addPhoto, updateProfile, changeFullName, changeAge, changeGender, changeDateGender, changeLevel, changeCountry , addBumbiScore , removeBumbiScore} from "./User"
import PageControls, { setLoading } from './PageControls'
import Swipper, { setList } from "./Swipper"
import Learn, { setDaily, incramentMissionComplate, incramentListening, incramentReading, incramentSpeaking, incramentWriting } from "./Learn"
export const store = configureStore({
    reducer: {
        user: User,
        pageControl: PageControls,
        swipper: Swipper,
        learn: Learn
    },
})

export {
    setLoading,
    setUser,
    changePhoto,
    addPhoto,
    updateProfile,
    changeFullName,
    changeAge,
    changeGender,
    changeDateGender,
    changeLevel,
    changeCountry,
    setList,
    setDaily,
    incramentMissionComplate,
    incramentListening,
    incramentReading,
    incramentWriting,
    incramentSpeaking,
    addBumbiScore,
    removeBumbiScore
    
}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch