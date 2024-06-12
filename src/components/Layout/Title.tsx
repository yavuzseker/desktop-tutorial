import * as React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Modal, Platform } from "react-native"
import { StatusBar } from "expo-status-bar"
import style from "src/css"
import DefaultUser from "src/assets/defaultUser.png"
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import Svg, { Path } from 'react-native-svg';

import loginhead from "src/assets/fire.png"
import { Dimensions } from 'react-native';

//@ts-ignore
export default function Title({ navigation, route, options }) {

    const [AccountModal, setAccountModal] = React.useState(false)
    const user = useSelector((e: RootState) => e.user.user)

    return (
        <SafeAreaView style={{
            backgroundColor: style.Color.background_dark
        }}>
            <View>
                <View style={{ padding: 12, backgroundColor: style.Color.background_dark, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: Platform.OS == 'android' ? 13 : 0 }}>
                    <Svg
                        height={64}
                        width={105}
                        viewBox={'0 0 105 64'}
                        style={{ position: "absolute", left: (Dimensions.get("screen").width / 2) - (105 / 2), top: Platform.OS == 'android' ? 43 + 13 : 56 }}
                    >
                        <Path
                            fill={style.Color.background_dark}
                            d='M0,0.19h0.15c3.98,0,7.76,1.71,10.38,4.7C20.81,16.6,35.88,24,52.69,24s31.88-7.4,42.16-19.11
                        c2.62-2.99,6.41-4.7,10.38-4.7h0.15V0H0V0.19z'
                        />
                    </Svg>
                    <View style={{ position: "absolute", left: (Dimensions.get("screen").width / 2) - (60 / 2), top: 8 }}>
                        <Image source={loginhead} style={{ width: 60, height: 60 }} resizeMode='contain' />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("LearnScreen")}>
                        <FontAwesome name="exchange" size={22} color={style.Color.white} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ProfileScreens")}>
                        <Image source={{ uri: user.profile.photoUrl }} style={{ width: 32, height: 32, borderRadius: 32 }} />
                    </TouchableOpacity>


                </View>

            </View>
            <StatusBar style='light' />

            <Modal
                animationType="fade"
                visible={AccountModal}
                presentationStyle={"formSheet"}
                onRequestClose={() => {
                    setAccountModal(!AccountModal);
                }}>
                <View style={{ padding: 24, gap: 24 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ color: style.Color.black, fontSize: 22, fontWeight: "600" }}>Hesap</Text>
                        <TouchableOpacity onPress={() => {
                            setAccountModal(!AccountModal);
                        }}>
                            <MaterialIcons name='close' size={22} />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: style.Color.grey, fontSize: 16, fontWeight: "600" }}>Çıkış</Text>
                    <TouchableOpacity style={{ backgroundColor: style.Color.black, padding: 12, borderRadius: 6, alignItems: "center" }} onPress={() => navigation.navigate("LoginScreens")}>
                        <Text style={{ color: style.Color.white, fontWeight: "600" }}>Oturumu Kapat</Text>
                    </TouchableOpacity>
                    <Text style={{ color: style.Color.grey, fontSize: 16, fontWeight: "600" }}>Hesap Değiştir</Text>

                    <View style={{ backgroundColor: style.Color.white, borderColor: style.Color.grey_6, borderWidth: 1, borderRadius: 6 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12 }}>
                            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                <Image source={DefaultUser} style={{ width: 32, height: 32, borderRadius: 64 }} />
                                <Text style={{ fontWeight: "500", fontSize: 16 }}>HST Planet</Text>
                            </View>
                            <MaterialIcons name='check' size={24} color={style.Color.grey} />
                        </View>
                        <View style={{ height: 1, width: "100%", backgroundColor: style.Color.grey_6 }} />
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12 }}>
                            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                                <Image source={DefaultUser} style={{ width: 32, height: 32, borderRadius: 64 }} />
                                <Text style={{ fontWeight: "500", fontSize: 16 }}>Other Account</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </Modal>

        </SafeAreaView>
    );
} 