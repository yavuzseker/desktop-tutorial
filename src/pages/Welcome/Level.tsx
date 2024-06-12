import * as React from 'react';
import { View, SafeAreaView, Platform, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import style from "src/css"
import { StatusBar } from 'expo-status-bar';
import { Props } from "src/router"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Stepper } from "src/components"
import { useWelcome } from 'src/hst/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export default function Age({ navigation, route }: Props) {

    const [next, setNext] = React.useState(true)
    const [level_1, setLevel_1] = React.useState(true)
    const [level_2, setLevel_2] = React.useState(false)
    const [level_3, setLevel_3] = React.useState(false)

    const welcome = useWelcome({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)

    function onSelect(select: Function) {
        setLevel_1(false)
        setLevel_2(false)
        setLevel_3(false)

        select(true)
    }

    const onNext = () => {
        welcome.Level({
            levelId: level_1 ? 1 : level_2 ? 6 : 7,
            name: level_1 ? "Level 1" : level_2 ? "Level 2" : "Level 3",
            userId: user.id
        })
        navigation.navigate("Country")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={6} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>What do you think about your English level ?</Text>
                        <View style={{ gap: 12, marginTop: 24 }}>
                            <TouchableOpacity
                                onPress={() => onSelect(setLevel_1)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Level 1 <Text style={{ color: style.Color.grey }}>(A1 - A2)</Text></Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        level_1 ?
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: style.Color.background_yellow }} /> :
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: "transparent" }} />
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => onSelect(setLevel_2)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Level 2 <Text style={{ color: style.Color.grey }}>(B1 - B2)</Text></Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        level_2 ?
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: style.Color.background_yellow }} /> :
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: "transparent" }} />
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => onSelect(setLevel_3)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Level 3 <Text style={{ color: style.Color.grey }}>(C1 - C2)</Text></Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        level_3 ?
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: style.Color.background_yellow }} /> :
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: "transparent" }} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, width: "70%" }}>

                        </View>
                        <TouchableOpacity
                            onPress={() => onNext()}
                            disabled={!next}
                        >
                            <View style={{
                                padding: 12,
                                backgroundColor: next ? style.Color.white : style.Color.white + "30",
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