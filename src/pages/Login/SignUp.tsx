import * as React from 'react';
import { Image, View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import style from "src/css"
import { LoginBottom, ErrorModal } from "src/components"
import LoginLogo from "src/assets/loginhead.png"
import { useCreateAccount } from 'src/hst/hooks';
import { Props } from 'src/router';
export default function SignUp({ navigation, route }: Props) {

    const [email, setEmail] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [password, setPassword] = React.useState("");

    const account = useCreateAccount();

    const onNext = () => {
        account.createAccount({
            email: email.toLocaleLowerCase(),
            name: fullName.split(" ")[0],
            lastname: fullName.split(" ").length > 1 ?  fullName.split(" ")[1] : "",
            city: "",
            country: "",
            password: password,
            phone: "",
            photoUrl: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg",
            repassword: rePassword
        })?.then(res => {
            navigation.navigate("SignIn")
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: style.Color.background_dark, gap: 24, alignItems: "center", paddingVertical: 40, paddingHorizontal: 24 }}>
                <Image source={LoginLogo} style={{ height: 150, width: 200 }} resizeMode='contain' />

                <View style={{ width: "100%", gap: 12 }}>
                    <Text style={{ color: style.Color.white, fontSize: 22, fontWeight: "600" }}>Create Account</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder='Email Address'
                        keyboardType='email-address'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />
                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder='Full Name'
                        keyboardType='default'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder='Password'
                        secureTextEntry
                        keyboardType='visible-password'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />
                    <TextInput
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholder='Re-Password'
                        secureTextEntry
                        keyboardType='visible-password'
                        style={{ backgroundColor: style.Color.white, padding: 12, borderRadius: 6 }}
                    />

                    <TouchableOpacity
                        onPress={() => onNext()}
                        style={{ height: 48, flexDirection: "row", gap: 8, backgroundColor: style.Color.background_yellow, width: "100%", borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "500", color: style.Color.black }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <LoginBottom />
                <ErrorModal message={account.errorMessage} show={account.error} onShow={account.setError} />
            </View>
        </TouchableWithoutFeedback>
    )
}