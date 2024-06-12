import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useDispatch } from 'react-redux';
import { setList } from "src/store"
import { Answer, ComplateMission, Daily, Images, Lessons, Profile } from "src/hst/types"
import { Props } from "src/router"


const useLearn = ({ navigation }: Props) => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")



    const getLessons = () => {
        setWait(true)
        return new Promise<Array<Lessons>>((resolve, reject) => {
            service.post<Array<Lessons>>("api/Lessons/find", []).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const findComplate = ({ userId, lessonId }: { userId: number, lessonId: number }) => {
        setWait(true)
        return new Promise<Array<ComplateMission>>((resolve, reject) => {
            service.get<Array<ComplateMission>>("api/ComplateMission/findComplate?userId=" + userId + "&lessonId=" + lessonId).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    type DailyQuest = {
        query: string
        value: any
    }

    const dailyQuests = ({ data }: { data: Array<DailyQuest> }) => {
        setWait(true)
        return new Promise<Array<Daily>>((resolve, reject) => {
            service.post<Array<Daily>>("api/DailyQuests/find", data).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const dailyQuestsFindOne = ({ data }: { data: Array<DailyQuest> }) => {
        setWait(true)
        return new Promise<Daily>((resolve, reject) => {
            service.post<Daily>("api/DailyQuests/findOne", data).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const answerControl = (data: { userId: number, lessonsId: number, correct: boolean }) => {
        setWait(true)
        return new Promise<Answer>((resolve, reject) => {
            service.post<Answer>("api/ComplateMission/saveMission", data).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const checkDailyAnswer = (data: { userId: number }) => {
        setWait(true)
        return new Promise<Array<ComplateMission>>((resolve, reject) => {
            service.get<Array<ComplateMission>>("api/ComplateMission/findComplate?userId=" + data.userId).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const chatGPT = (data: { request: string }) => {
        setWait(true)
        return new Promise<string>((resolve, reject) => {
            service.post<string>("api/OpenAI/openAI", { message: data.request }).then((res) => {
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }


    return {
        wait,
        error,
        errorMessage,
        getLessons,
        findComplate,
        dailyQuests,
        answerControl,
        checkDailyAnswer,
        chatGPT,
        dailyQuestsFindOne
    }

}

export { useLearn }