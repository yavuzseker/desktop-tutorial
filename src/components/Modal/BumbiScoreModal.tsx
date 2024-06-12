import * as React from "react"
import { View, Text, Modal, ScrollView, Image, TouchableOpacity } from "react-native"
import style from "src/css"
import Carosel from "src/components/Carosel/Carosel"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import Fire from "src/assets/fire.png"


import { useNavigation } from "@react-navigation/native"



type ProfileModalType = {
    visible: boolean
    onRequestClose: Function
    data: any | null
}

export default function ProfileViewModal(props: ProfileModalType) {

    const nativation = useNavigation()

    React.useEffect(() => {
        if (props.visible) {

        }
    }, [props.visible])

    const goToLearn = () => {

        props.onRequestClose(false);
        nativation.navigate("LearnScreen")
    }

    return (
        <Modal
            animationType="slide"
            visible={props.visible}
            presentationStyle={"formSheet"}
            onRequestClose={() => {
                props.onRequestClose(!props.visible);
            }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 24 }}>
                    <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                        <Image source={Fire} style={{ width: 36, height: 36 }} resizeMode="contain" />
                        <Text style={{ color: style.Color.background_yellow, fontWeight: "600", fontSize: 22 }}>
                            Tiningo
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => props.onRequestClose(!props.visible)}>
                        <AntDesign name="close" size={24} color={style.Color.grey} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 24 }}>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: style.Color.red }}>Your score is finished!</Text>
                    <Text style={{ fontSize: 18, marginTop: 24 }}>To continue increasing your matchmaking odds, you can earn Bumbi points by doing daily missions.</Text>

                </View>
                <View style={{ padding: 24, borderTopStartRadius: 24, borderTopEndRadius: 24, justifyContent: "flex-end", alignItems: "center", ...style.shadow, backgroundColor: style.Color.white }}>
                    <TouchableOpacity onPress={goToLearn} style={{ marginBottom: 12, width: "100%", flexDirection: "row", gap: 12, justifyContent: "center", alignItems: "center", backgroundColor: style.Color.background_yellow, borderRadius: 6, padding: 12, paddingHorizontal: 50 }}>
                        <Ionicons name="earth" size={24} color="white" />
                        <Text style={{ color: style.Color.white, fontWeight: "600", fontSize: 16 }}>Go To Learn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}