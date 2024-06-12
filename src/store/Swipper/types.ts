import { user } from "./types"
import { Profile } from "./types"
export * from "src/hst/types"


export interface IUser {
    id: number
    name: string
    fullName: string,
    welcomeQuestions: Array<IWelcomeQuestion>
    profile: Profile
}

export interface IWelcomeQuestion {
    id: number
    pageName: string
    question: string
    type: number
    userId: number
}

export interface State {
    user: IUser | any
}

export type SwipperState = {

    swipperList: Array<user>

}