import * as React from 'react';
import { View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from "@react-navigation/native"
import { useCreateAccount, useLogin } from "src/hst/hooks"

//import useNotification from 'src/hst/hook/useNotification';

const AppleLoginButton = () => {
    const navigation = useNavigation()
    //const { expoPushToken, notification, setNotificationId } = useNotification(0);

    const account = useCreateAccount()
    const login = useLogin()
    const handleAppleLogin = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            var decode = jwtDecode(credential.identityToken);
            //await AsyncStorage.setItem('phoenix_auth', "" + decode.email)
            account.createAccount({
                email: decode.email,
                city: "",
                country: "",
                lastname: credential.fullName.familyName ? credential.fullName.familyName : "",
                name: credential.fullName.givenName ? credential.fullName.givenName : decode.email.split("@")[0],
                password: decode.c_hash,
                repassword: decode.c_hash,
                phone: "",
                photoUrl: "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
            }).then(res => {
                login.loginToken(res.emailAddress)
            })

        } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    };



    return (
        <View>
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={5}
                style={{ padding: 24 }}
                onPress={handleAppleLogin}
            >
            </AppleAuthentication.AppleAuthenticationButton>
        </View>
    );
};

export default AppleLoginButton;