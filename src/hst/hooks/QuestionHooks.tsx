import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useDispatch } from 'react-redux';
import { setList } from "src/store"
import { Props } from "src/router"
import { ChatType, Message } from '../types';


const useQuestion = ({ navigation }: Props) => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    type Question = {
        id : number
        question : string
        category : string
        answer : string
        levelId : number
    }

    const findQuestion = () => {
        setWait(true)
        return new Promise<Array<Question>>((resolve, reject) => {
            service.get<Array<Question>>("api/Question/findQuestion").then((res) => {
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
        findQuestion
    }

}

export { useQuestion }