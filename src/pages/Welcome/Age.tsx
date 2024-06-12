import * as React from 'react';
import { View, SafeAreaView, Platform, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import style from "src/css"
import { StatusBar } from 'expo-status-bar';
import { Props } from "src/router"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { DatePicker, Stepper } from "src/components"
import { TextInputProps } from 'react-native';
import { useWelcome } from "src/hst/hooks"
import { useSelector } from 'react-redux';
import { RootState } from "src/store"
export default function Age({ navigation, route }: Props) {

    const [next, setNext] = React.useState(false)
    const [day, setDay] = React.useState("")
    const [month, setMonth] = React.useState("")
    const [year, setYear] = React.useState("")
    const [error, setError] = React.useState(false)

    const welcome = useWelcome({ navigation, route })
    const user = useSelector((state: RootState) => state.user.user)

    function yearControl(value: any) {
        setYear("" + value)
        setNext(false)
        if (value.length == 4 && (new Date().getFullYear() - value >= 18)) {
            if (day.length > 0 && parseInt(day) <= 31) {
                if (month.length > 0 && parseInt(month) <= 12) {
                    setNext(true)
                }
            }
        }
    }

    function dayControl(value: any) {
        setDay("" + value)
        if (value.length > 0 && parseInt(value) <= 31) {
            setError(false)
        } else {
            setError(true)
        }
    }

    function monthControl(value: any) {
        setMonth("" + value)
        if (value.length > 0 && parseInt(value) <= 12) {
            setError(false)
        } else {
            setError(true)
        }
    }

    function nextPage() {
        welcome.Age({
            birthDay: day + "." + month + "." + year,
            userId: user.id
        })
        navigation.navigate("Gender")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={3} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>When's your birthday?</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>You must be over 18 to continue.</Text>
                        <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                            <TextInput
                                value={day}
                                onChangeText={dayControl}
                                placeholder='Day'
                                keyboardType='number-pad'
                                style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6, width: 90 }}
                            />
                            <TextInput
                                value={month}
                                onChangeText={monthControl}
                                placeholder='Month'
                                keyboardType='number-pad'
                                style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6, width: 90 }}
                            />
                            <TextInput
                                value={year}
                                onChangeText={yearControl}
                                placeholder='Year'
                                keyboardType='number-pad'
                                style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6, width: 90 }}
                            />
                        </View>
                        {
                            error && <View style={{ padding: 12, marginTop: 12, backgroundColor: style.Color.white, borderRadius: 6, alignItems: "center" }}>
                                <Text style={{ color: "red" }}>There is a problem with the data you entered</Text>
                            </View>
                        }
                    </View>
                    <View
                        style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, width: "70%" }}>
                            <AntDesign name="eye" size={24} color="black" />
                            <Text style={{ fontSize: 14, fontWeight: "500", color: style.Color.black }}>We only show your age to potential matches, not your birthday.</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => nextPage()}
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