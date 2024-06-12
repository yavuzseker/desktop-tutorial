import { useState } from 'react';
import { useEmailValidate } from './ValidateHooks'
import { createAccount, emailandpassword, signUp, user } from "src/hst/types"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { service } from "src/hst/Configurations"
import { setUser } from "src/store"
import { useDispatch } from 'react-redux';
import { IUser, State } from 'src/store/User/types';
import useNotification from './useNotification';

const setAsyncStorage = async (token: string | null) => {
    if (!token) {
        await AsyncStorage.removeItem("phoenix_auth");
    } else {
        await AsyncStorage.setItem("phoenix_auth", token);
    }
}

const login = function () {

}

const useLogin = () => {

    const [error, setError] = useState(false)
    const [wait, setWait] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigation();
    const { setNotificationId } = useNotification()
    const login = (login: emailandpassword) => {
        setWait(true)

        if (!useEmailValidate(login.emailAddress)) {
            setError(true)
            setWait(false)
            setErrorMessage("Your email address is not in the proper format")
            return
        }

        if (login.emailAddress.length == 0 || login.password.length == 0) {
            setError(true)
            setWait(false)
            setErrorMessage("Please fill in your full email and password.")
            return
        }

        service.post<user>("service/Auth/signIn?email=" + encodeURIComponent(login.emailAddress) + "&password=" + encodeURIComponent(login.password)).then(res => {
            dispatch(setUser(res.data))
            setAsyncStorage(res.data.emailAddress);
            setNotificationId(res.data.id)
            setWait(false)
         
            if (res.data.profileComplate) {
                //@ts-ignore
                navigate.navigate("DrawerScreens")
            } else {
                //@ts-ignore
                navigate.navigate("WelcomeScreens", { pageIndex: res.data.profileComplateIndex })
            }
        }).catch(err => {
            setWait(false)
            setError(true)
            setErrorMessage("Your information may be incorrect, please check.")
        })
    }

    const loginToken = (email: string) => {
       
        setWait(true)
        return new Promise<user>((resolve, reject) => {
            service.post<user>("service/Auth/signInToken?email=" + encodeURIComponent(email)).then(res => {
                dispatch(setUser(res.data))
                setAsyncStorage(res.data.emailAddress);
                setNotificationId(res.data.id)
                setWait(false)
                if (res.data.profileComplate) {
                    //@ts-ignore
                    navigate.navigate("DrawerScreens")
                } else {
                    //@ts-ignore
                    navigate.navigate("WelcomeScreens", { pageIndex: res.data.profileComplateIndex })
                }
                resolve(res.data)
            }).catch(err => {
                setWait(false)
                setError(true)
                setErrorMessage("Your information may be incorrect, please check.")
            })
        })
    }

    const logout = () => {
        //dispatch(setUser(null))
        setAsyncStorage(null);
        setTimeout(() => {
            //@ts-ignore
            navigate.navigate("LoginScreens")
        }, 100);
    }

    const deleteAccount = (id: number) => {
        service.delete("api/users/deleteAccount?Id=" + id).then(res => {
            dispatch(setUser(null))
            setAsyncStorage(null);
            setTimeout(() => {
                //@ts-ignore
                navigate.navigate("LoginScreens")
            }, 100);
        })
    }

    return {
        errorMessage,
        error,
        wait,
        setError,
        login,
        logout,
        loginToken,
        deleteAccount
    }
}

const useCreateAccount = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const createAccount = (createInfo: createAccount) => {

        if (!createInfo) {
            setError(true)
            return
        }

        if (!useEmailValidate(createInfo.email)) {
            setErrorMessage("Your email address is not in the proper format")
            setError(true)
            return
        }

        if (createInfo.password != createInfo.repassword) {
            setErrorMessage("Your passwords are incompatible")
            setError(true)
            return
        }

        return new Promise<user>((resolve, reject) => {
            service.post<user>("service/auth/signup", createInfo).then(res => {
                resolve(res.data)
            })
        })
    }
    return {
        errorMessage,
        error,
        user,
        setError,
        createAccount
    };
}

const useAuthStateChanged = () => {
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const isLogin = async () => {
        //const navigate=useNavigation()
        const tokens = await AsyncStorage.getItem("phoenix_auth");
        setToken(tokens ? tokens.toString() : "")
        if (!tokens) {
            setLogin(false)
            return
        }
        else{
            setLogin(true);
            //navigate.navigate("DrawerScreens");
            console.log('already has token')
        }
    }
    return {
        token,
        login,
        isLogin
    }
}

const useLoading = () => {
    const [loading, setLoading] = useState(true);
    return {
        loading,
        setLoading
    }
}

export { useLogin, useCreateAccount, useAuthStateChanged, useLoading }