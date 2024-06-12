import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useDispatch } from 'react-redux';
import { setList } from "src/store"
import { Images, Profile } from "src/hst/types"
import { Props } from "src/router"


const useSwipper = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const findUser = ({ userId, skep }: { userId: number, skep: number }) => {
        setWait(true)
        service.get("api/Users/FindUserSkip?userId=" + userId + "&skep=" + skep).then((res) => {
            dispatch(setList(res.data))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const swipe = (data: { userId: number, favoriUserId: number }) => {
        setWait(true)
        return new Promise((resolve, reject) => {
            service.post("api/Swapper/sendLikes", data).then((res) => {
                //dispatch(setList(res.data))
                resolve(res.data)
            }).catch(err => {
                reject(err)
                setError(true)
                setErrorMessage("Could not upload photo")
                setWait(false)
            })
        })
    }

    const like = (data: { userId: number }) => {
        setWait(true)
        return new Promise<Array<any>>((resolve, reject) => {
            service.get<Array<any>>("api/Swapper/getLikes?userId=" + data.userId).then((res) => {
                //dispatch(setList(res.data))
                resolve(res.data)
            }).catch(err => {
                reject(err)
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
        findUser,
        swipe,
        like
    }

}

export { useSwipper }