import * as React from 'react';
import { View, SafeAreaView, Platform, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import style from "src/css"
import { StatusBar } from 'expo-status-bar';
import { Props } from "src/router"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Stepper } from "src/components"

import { useSelector } from 'react-redux';
import { RootState } from "src/store"
import { user } from 'src/hst/types';
import { useWelcome } from "src/hst/hooks"

export default function FirstName({ navigation, route }: Props) {

    const [firstName, setFirtName] = React.useState("")
    const user = useSelector((state: RootState) => state.user.user) as user
    const welcome = useWelcome({ navigation, route });

    React.useEffect(() => {
        setFirtName(user.fullName)
    }, [user])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={1} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>What's your first name?</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>You won't be able to change this later.</Text>
                        <TextInput
                            value={firstName}
                            onChangeText={setFirtName}
                            placeholder='Add your first name'
                            style={{
                                padding: 12,
                                backgroundColor: style.Color.white,
                                borderRadius: 6,
                                marginTop: 32
                            }}
                        />
                    </View>

                    <View
                        style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <AntDesign name="eye" size={24} color="black" />
                            <Text style={{ fontSize: 14, fontWeight: "500", color: style.Color.black }}>This will be shown on your profile.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => welcome.changeName({ fullName: firstName, userId: user.id })}
                            disabled={firstName.length == 0}>
                            <View style={{
                                padding: 12,
                                backgroundColor: firstName.length == 0 ? style.Color.white + "30" : style.Color.white,
                                borderRadius: 50,
                            }}>
                                <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <StatusBar style='dark' />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}