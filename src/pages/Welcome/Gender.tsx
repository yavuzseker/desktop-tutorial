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
    const [woman, setWoman] = React.useState(true)
    const [man, setMan] = React.useState(false)
    const [nonbinary, setNonBinary] = React.useState(false)

    const welcome = useWelcome({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)


    function onSelect(select: Function) {
        setMan(false)
        setWoman(false)
        setNonBinary(false)

        select(true)
    }

    const onNext = () => {
        if (man) {
            welcome.Gender({
                sex: "Man",
                userId: user.id
            })
        } else if (woman) {
            welcome.Gender({
                sex: "Woman",
                userId: user.id
            })
        } else {
            welcome.Gender({
                sex: "Nonbinary",
                userId: user.id
            })
        }
        navigation.navigate("DateGender", { man: man, woman: woman, non: nonbinary })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={4} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>What's your gender?</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>Pick which best describes you. Then add more about your gender if you'd like.</Text>
                        <View style={{ gap: 12, marginTop: 24 }}>
                            <TouchableOpacity
                                onPress={() => onSelect(setWoman)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Woman</Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        woman ?
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: style.Color.background_yellow }} /> :
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: "transparent" }} />
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => onSelect(setMan)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Man</Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        man ?
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: style.Color.background_yellow }} /> :
                                            <View style={{ width: 12, height: 12, borderRadius: 18, backgroundColor: "transparent" }} />
                                    }
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => onSelect(setNonBinary)}
                                style={{ padding: 20, borderRadius: 6, backgroundColor: style.Color.white, width: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>Nonbinary</Text>

                                <View style={{ borderRadius: 50, padding: 4, borderColor: style.Color.grey, borderWidth: 1 }}>
                                    {
                                        nonbinary ?
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