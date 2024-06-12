import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useSelector, useDispatch } from 'react-redux';
import { addPhoto, changePhoto, updateProfile } from "src/store"
import { Images, Profile } from "src/hst/types"

const useProfile = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const changePhotos = (data: Images) => {
        setWait(true)
        service.post<Images>("api/Users/changeImage", data).then((res) => {
            dispatch(changePhoto(res.data))
            setWait(false)
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })

    }

    const uploadPhotos = (data: Images) => {
        setWait(true)
        service.post<Images>("api/Users/addImage", data).then((res) => {
            dispatch(addPhoto(res.data))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })

    }

    const uploadProfiles = (data: Profile) => {
        setWait(true)
        service.post<Profile>("service/Auth/updateProfile", data).then((res) => {
            dispatch(updateProfile(res.data))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })

    }

    const changeFullName = ({ fullName , userId }: { fullName: string , userId : number }) => {

        


    }

    return {
        wait,
        error,
        errorMessage,
        changePhotos,
        uploadPhotos,
        uploadProfiles
    }

}

export { useProfile }