import { Level } from "./User"

type Lessons = {
    id: number
    name: string
    stepSize: number
    icon: string
    defination: string
    complate: Array<ComplateMission>
}

type ComplateMission = {
    id: number
    year: string
    month: string
    day: string
    correct: boolean
    userId: number
    lessonsId: number
}


type Daily = {
    id: number
    name: string
    levelId: number
    videoUrl: string
    videoSupport: boolean
    subTitle: string
    lessonsId: number
    years: number
    mounth: number
    day: number
    gain: number
    experiance: number
    text: string
    level: Level
    link: string
    question: string
    answer: Array<Answer>
    keyWords: Array<KeyWords>
}

type Answer = {
    id: number
    isCorrect: boolean
    text: string
    dailyQuestsId: number
}

type KeyWords = {
    id: number
    word: string
    dailyQuestsId: number
}

export { Lessons, ComplateMission, Daily, Answer }