import * as React from 'react';
import { View, SafeAreaView, Platform, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import style from "src/css"
import { StatusBar } from 'expo-status-bar';
import { Props } from "src/router"
import { MaterialIcons, AntDesign } from "@expo/vector-icons"
import { Stepper } from "src/components"
import { Picker } from '@react-native-picker/picker';
import { useWelcome } from 'src/hst/hooks';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import CountryList from "src/assets/Country.json"

export default function Age({ navigation, route }: Props) {

    const [next, setNext] = React.useState(true)

    const [selectedLanguage, setSelectedLanguage] = React.useState("");
    const [list, setList] = React.useState(CountryList);

    const welcome = useWelcome({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)

    const onNext = () => {
        welcome.Country({
            country: selectedLanguage,
            userId: user.id
        })
        navigation.navigate("DrawerSceens")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ backgroundColor: style.Color.background_yellow, flex: 1 }}>
                <View style={{ marginTop: Platform.OS == "android" ? 25 : 0, flex: 1 }}>
                    <Stepper page={7} step={7} />

                    <View style={{ padding: 25, gap: 4, flex: 1 }}>
                        <Text style={{ fontSize: 28, fontWeight: "600", color: style.Color.black }}>Where are you from ?</Text>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: style.Color.black }}>We will bring you together with people in your area.</Text>
                        <View style={{ gap: 12, marginTop: 24 }}>
                            <Picker
                                style={{ backgroundColor: style.Color.white, borderRadius: 6 }}
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedLanguage(itemValue)
                                }>
                                {
                                    list.map((e: string, index: number) => {
                                        return (
                                            <Picker.Item key={index} label={e} value={e} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View
                        style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 25, paddingVertical: 12 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, width: "70%" }}>
                            <AntDesign name="eye" size={24} color="black" />
                            <Text style={{ fontSize: 14, fontWeight: "500", color: style.Color.black }}>We only show your age to potential matches, not your birthday.</Text>
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