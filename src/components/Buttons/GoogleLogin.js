import * as React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import jwtDecode from 'jwt-decode';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session';
import { useNavigation } from "@react-navigation/native"
import { useCreateAccount, useLogin } from "src/hst/hooks"

import GoogleLogo from "src/assets/google.png"


const GoogleLoginButton = () => {
    const navigation = useNavigation()
    const account = useCreateAccount()
    const login = useLogin()

    //const { expoPushToken, notification, setNotificationId } = useNotification(0);
    const [request, response, promptAsync] = Google.useAuthRequest({
        //clientId: '666632559157-ngt3vpd0apkffrabr80t8e53fuiuhga5.apps.googleusercontent.com',
        //iosClientId: '666632559157-800mfl6pog9fs15vcpjnbq566ol3uh8p.apps.googleusercontent.com',
        //androidClientId: '666632559157-l9e0sme9ogssulhqcfpbl13gpm0s40bn.apps.googleusercontent.com',
        expoClientId: '470107414218-dl00io3978hs4f86stm55na8bfu3ilur.apps.googleusercontent.com',
        iosClientId: '470107414218-pq26rd7kmcu56no4rj8ljcapnid9gksq.apps.googleusercontent.com',
        iosStandaloneAppClientId:'470107414218-pq26rd7kmcu56no4rj8ljcapnid9gksq.apps.googleusercontent.com',
        androidClientId: '470107414218-5ka8cplbi6rhhpscqkn4662n5v21i388.apps.googleusercontent.com',
        webClientId: '470107414218-dl00io3978hs4f86stm55na8bfu3ilur.apps.googleusercontent.com',
        redirectUri: makeRedirectUri({
            useProxy: true,
          }),
    });

    React.useEffect(() => {
        console.log('response' + JSON.stringify(response))
        if (response?.type === 'success') {
            const { authentication } = response;
            fetchUser(authentication)
        }
    }, [response]);

    async function fetchUser(authentication) {

        let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${authentication.accessToken}`
            }
        })
        const userInfo = await response.json()
        console.log(userInfo);
    }


    return (
        <TouchableOpacity
            onPress={() => promptAsync({ useProxy: true, showInRecents: true })}
            style={{ width: "100%", flexDirection: "row", padding: 12, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", gap: 8, borderRadius: 6 }}>
            <Image source={GoogleLogo} style={{ width: 16, height: 16 }} />
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Sign in with Google</Text>
        </TouchableOpacity>
    );
};

export default GoogleLoginButton;