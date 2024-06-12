import { useState } from 'react';
import { service } from "src/hst/Configurations"

import { useDispatch } from 'react-redux';
import { changeFullName, addPhoto, changeAge, changeGender, changeDateGender, changeLevel, changeCountry } from "src/store"
import { Images, Profile } from "src/hst/types"
import { Props } from "src/router"


const useWelcome = ({ navigation }: Props) => {

    const dispatch = useDispatch();

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const changeName = ({ fullName, userId }: { fullName: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeFullName?fullName=" + encodeURIComponent(fullName) + "&userId=" + userId).then((res) => {
            dispatch(changeFullName(fullName))
            navigation.navigate("AddPhoto")
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const Photo = ({ photoUrl, userId }: { photoUrl: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/addPhoto?photoUrl=" + encodeURIComponent(photoUrl) + "&userId=" + userId).then((res) => {
            dispatch(addPhoto({
                url: photoUrl,
                profileId: 0,
                id: 0
            }))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const Age = ({ birthDay, userId }: { birthDay: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeAge?birthDay=" + encodeURIComponent(birthDay) + "&userId=" + userId).then((res) => {
            dispatch(changeAge(birthDay))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const Gender = ({ sex, userId }: { sex: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeGender?sex=" + encodeURIComponent(sex) + "&userId=" + userId).then((res) => {
            dispatch(changeGender(sex))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const DateGender = ({ man, woman, non, userId }: { man: boolean, woman: boolean, non: boolean, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeDateGender?man=" + man + "&woman=" + woman + "&non=" + non + "&userId=" + userId).then((res) => {
            dispatch(changeDateGender({
                man: man,
                woman: woman,
                non: non
            }))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const Level = ({ name, levelId, userId, }: { levelId: number, name: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeLevel?LevelId=" + levelId + "&userId=" + userId).then((res) => {
            dispatch(changeLevel({
                id: levelId,
                name: name,
                defination: name,
                experiance: 0
            }))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    const Country = ({ country, userId, }: { country: string, userId: number }) => {
        setWait(true)
        service.post("api/Welcome/changeCountry?country=" + country + "&userId=" + userId).then((res) => {
            dispatch(changeCountry(country))
        }).catch(err => {
            setError(true)
            setErrorMessage("Could not upload photo")
            setWait(false)
        })
    }

    return {
        wait,
        error,
        errorMessage,
        changeName,
        Photo,
        Age,
        Gender,
        DateGender,
        Level,
        Country
    }

}

export { useWelcome }