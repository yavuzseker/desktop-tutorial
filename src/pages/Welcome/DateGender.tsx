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

    React.useEffect(() => {

        if (route.params) {
            if (route.params.man) {
                setWoman(true)
                setMan(false)
                setNonBinary(false)
            } else if (route.params.woman) {
                setWoman(false)
                setMan(true)
                setNonBinary(false)
            } else {
                setWoman(false)
                setMan(false)
                setNonBinary(true)
            }
        } else {
            if (user.profile.sex == "Man") {
                setWoman(true)
                setMan(false)
                setNonBinary(false)
            } else if (user.profile.sex == "Woman") {
                setWoman(false)
                setMan(true)
                setNonBinary(false)
            } else {
                setWoman(false)
                setMan(false)
                setNonBinary(true)
            }
        }

    }, [])

    const onNext = () => {
        welcome.DateGender({
            man: man,
            woman: woman,
            non: nonbinary,
            userId: user.id
        })
        navigation.navigate("Level")
    }

    /*function onSelect(select: Function) {
        setMan(false)
        setWoman(false)
        setNonBinary(false)

        select(true)
    }*/

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={5} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>Who would you like to meet?</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>You can choose more than one answer and change any time.</Text>
                        <View style={{ gap: 12, marginTop: 24 }}>
                            <TouchableOpacity
                                onPress={() => setWoman(!woman)}
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
                                onPress={() => setMan(!man)}
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
                                onPress={() => setNonBinary(!nonbinary)}
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