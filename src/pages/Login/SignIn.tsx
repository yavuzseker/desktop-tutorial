import * as React from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import style from "src/css"
import { MaterialIcons } from "@expo/vector-icons"
import { LoginBottom, ErrorModal } from "src/components"
import LoginLogo from "src/assets/loginhead.png"
import Fire from "src/assets/fire.png"
import { Props } from "src/router"
import { useLogin } from 'src/hst/hooks';
import { Entypo } from '@expo/vector-icons';

export default function SignIn({ navigation, route }: Props) {
    
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const login = useLogin();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: style.Color.background_dark, gap: 24, alignItems: "center", paddingVertical: 40, paddingHorizontal: 24 }}>
                <Image source={LoginLogo} style={{ height: 150, width: 200 }} resizeMode='contain' />
                <View style={{ width: "100%", gap: 12 }}>
                    <Text style={{ color: style.Color.white, fontSize: 22, fontWeight: "600", textAlign: "center" }}>Login Tiningo</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email Address'
                        keyboardType='email-address'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        secureTextEntry
                        keyboardType='default'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />
                    <TouchableOpacity
                        onPress={() => login.login({
                            emailAddress: email,
                            password: password
                        })}
                        disabled={login.wait}
                        style={{ height: 48, flexDirection: "row", gap: 8, backgroundColor: !login.wait ? style.Color.background_yellow : style.Color.white, width: "100%", borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                        {
                            !login.wait ?
                                <View style={{ flexDirection: "row", gap: 12 }}>
                                    <Entypo name="login" size={24} color="black" />
                                    <Text style={{ fontSize: 18, fontWeight: "500", color: style.Color.black }}>Login</Text>
                                </View> :
                                <Image source={Fire} style={{ width: 28 }} resizeMode='contain' />
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("SignUp")}
                        style={{ height: 48, flexDirection: "row", gap: 8, backgroundColor: style.Color.white, width: "100%", borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                        <MaterialIcons name='mail' size={18} />
                        <Text style={{ fontSize: 18, fontWeight: "600", color: style.Color.black }}>Sign Up with email</Text>
                    </TouchableOpacity>
                </View>
                <LoginBottom />
                <ErrorModal message={login.errorMessage} show={login.error} onShow={login.setError} />
            </View>
        </TouchableWithoutFeedback>
    )
}