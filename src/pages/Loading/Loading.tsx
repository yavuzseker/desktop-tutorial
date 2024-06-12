import * as React from 'react';
import { Image, View, Text } from 'react-native';
import style from "src/css"
import { StatusBar } from "expo-status-bar"
import loginhead from "src/assets/loginhead.png"
import { Props } from "src/router"
import { setLoading } from 'src/store';
import { useDispatch } from 'react-redux';
import { useLogin } from "src/hst/hooks"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLearn } from 'src/hst/hooks';

import { checkForUpdateAsync, reloadAsync, fetchUpdateAsync } from 'expo-updates';

import { incramentReading, incramentMissionComplate, incramentListening, incramentSpeaking, incramentWriting } from 'src/store';

export default function Loading({ navigation, route }: Props) {

    const dispatch = useDispatch()
    const login = useLogin()
    const learn = useLearn({ navigation, route })
   
    const checkForUpdate = async () => {
        const update = await checkForUpdateAsync();
        if (update.isAvailable) {
            await fetchUpdateAsync();
            reloadAsync();
        } else {
            console.log("Güncelleme yok.");
        }
    }

    async function control() {
       
        const token = await AsyncStorage.getItem("phoenix_auth")
        dispatch(setLoading(false))
        if (token) {
      
            login.loginToken(token).then(res => {
                learn.checkDailyAnswer({ userId: res.id }).then(res => {
                    res.forEach(element => {
                        dispatch(incramentMissionComplate());
                        switch (element.lessonsId) {
                            case 1: dispatch(incramentReading()); break;
                            case 2: dispatch(incramentWriting()); break;
                            case 3: dispatch(incramentListening()); break;
                            case 4: dispatch(incramentSpeaking()); break;
                        }
                    });
                })
            })
            
        } else {
            navigation.navigate("LoginScreens")
        }

    }

    React.useEffect(() => {
        dispatch(setLoading(true))
        control()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: style.Color.background_dark, justifyContent: "center", alignItems: "center" }}>
            <Image source={loginhead} style={{ height: 200 }} resizeMode='contain' />
            <Text style={{ color: style.Color.background_yellow, fontSize: 18, fontWeight: "600" }}>Please Wait</Text>
            <StatusBar style='light' />
        </View>
    );
}