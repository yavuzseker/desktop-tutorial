import * as React from 'react';
import { Image, View, Animated, Text, TouchableOpacity, Platform } from 'react-native';
import style from "src/css"
import { StatusBar } from "expo-status-bar"
import { AppleLogin, GoogleLogin } from "src/components"
import { MaterialIcons } from "@expo/vector-icons"
import loginhead from "src/assets/loginhead.png"
import { LoginBottom } from "src/components"

import { Props } from "src/router"

export default function Welcome({ navigation, route }: Props) {

    const topAnim = React.useRef(new Animated.Value(0)).current;
    const visible = React.useRef(new Animated.Value(0)).current;

    const slideTop = () => {
        Animated.timing(topAnim, {
            toValue: -200,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            visibleAnimate()
        });
    }

    const visibleAnimate = () => {
        Animated.timing(visible, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    React.useEffect(() => {
        setTimeout(() => {
            slideTop();
        }, 500);
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: style.Color.background_dark, justifyContent: "center", alignItems: "center", padding: 24 }}>

            <Animated.View style={{ transform: [{ translateY: topAnim }], height: 200 }}>
                <View>
                    <Image source={loginhead} style={{ height: 100, width: 200 }} resizeMode='contain' />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: style.Color.grey_6, opacity: .5, fontSize: 42 }}>Learn</Text>
                    <Text style={{ color: style.Color.grey_6, opacity: .5, fontSize: 42 }}>Swipe</Text>
                    <Text style={{ color: style.Color.grey_6, opacity: .5, fontSize: 42 }}>Meet</Text>
                </View>
            </Animated.View>

            <Animated.View style={{ opacity: visible, width: "100%", gap: 12 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignIn")}
                    style={{ height: 48, flexDirection: "row", gap: 8, backgroundColor: style.Color.white, width: "100%", borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name='mail' size={18} />
                    <Text style={{ fontSize: 18, fontWeight: "600", color: style.Color.black }}>Login with email</Text>
                </TouchableOpacity>
                {
                    Platform.OS == "ios" && <AppleLogin />
                }
                {
                    Platform.OS == "ios" && <GoogleLogin />
                    //Platform.OS == "android" && <GoogleLogin /> 
                }
            </Animated.View>
            <LoginBottom />

            <StatusBar style='light' />
        </View>
    );
}