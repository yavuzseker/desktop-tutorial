import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useDispatch } from 'react-redux';
import { setList } from "src/store"
import { Props } from "src/router"
import { ChatType, Message } from '../types';


const useChat = ({ navigation }: Props) => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const findMatch = ({ userId }: { userId: number }) => {
        setWait(true)
        return new Promise<Array<ChatType>>((resolve, reject) => {
            service.get<Array<ChatType>>("api/Swapper/MatchList?userId=" + userId).then((res) => {
                //dispatch(setList(res.data))
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    type SendMessageType = {
        sendId: number
        reciverId: number
        messageText: string
        matchId: number
        questionId? : number
    }

    const sendMessage = (data: SendMessageType) => {
        setWait(true)
        return new Promise<SendMessageType>((resolve, reject) => {
            service.post<SendMessageType>("api/Swapper/sendMessage", data).then((res) => {
                //dispatch(setList(res.data))
                resolve(res.data)
            }).catch(err => {
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const getAllMessage = (matchId: number) => {
        setWait(true)
        return new Promise<Array<Message>>((resolve, reject) => {
            service.get<Array<Message>>("api/Swapper/getMessage?Id=" + matchId).then((res) => {
                //dispatch(setList(res.data))
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
        findMatch,
        sendMessage,
        getAllMessage
    }

}

export { useChat }