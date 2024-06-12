import * as React from "react"
import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native"
import { MaterialIcons, AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import { RootState } from "src/store"
import style from "src/css"
import Fire from "src/assets/fire.png"
import { MeasuredDimensions } from "react-native-reanimated"
import { Props } from "src/router"

export default function Header({ navigation, route }: Props) {

    const learnStore = useSelector((e: RootState) => e.learn)
    const progressWidth = (learnStore.complateMission / learnStore.missionCount * 100) + "%" as MeasuredDimensions;

    return (
        <View style={{ backgroundColor: "#1abc9c", padding: 12 }}>
            <View style={{ height: 100, paddingTop: 50 }}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MainScreens")} style={{ width: 46 }}>
                        <View style={{ position: "relative", backgroundColor: "#fff", padding: 12, borderRadius: 6 }}>
                            <FontAwesome name="exchange" size={22} color={style.Color.background_yellow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ paddingVertical: 12 }}>
                <Text style={{ color: "white", fontWeight: "600", fontSize: 18, flexWrap: "wrap" }}>Finish your daily missions to meet people.</Text>
            </View>
            <View style={{ backgroundColor: "#152027", padding: 12, width: "100%", borderRadius: 12 }}>
                <Text style={{ fontSize: 18, color: style.Color.white }}>
                    {learnStore.complateMission} complete missions.
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20, gap: 12 }}>

                    <View style={{ backgroundColor: "#394750", width: Dimensions.get("window").width - 82, height: 22, borderRadius: 50, justifyContent: "center" }}>
                        <View style={{ position: "absolute", height: "100%", width: progressWidth, borderRadius: 50, backgroundColor: "#1abc9c" }} />


                        <View style={{ position: "absolute", height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: "white", textAlign: "center" }}>
                                {learnStore.complateMission} / {learnStore.missionCount}
                            </Text>
                        </View>
                    </View>
                    <Image source={Fire} style={{ width: 32, height: 32 }} resizeMode="contain" />
                </View>
            </View>
        </View>
    )

}