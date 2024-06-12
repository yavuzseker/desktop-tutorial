import * as React from "react"
import { View, Text, Image, ScrollView, RefreshControl } from "react-native"
import style from "src/css"
import { Carosel } from "src/components"
import { useLogin } from "src/hst/hooks"

import Fire from "src/assets/fire.png"
import defaultImage from "src/assets/defaultUser.png"
import { TouchableOpacity } from "react-native-gesture-handler"

import { useSelector } from "react-redux"
import { RootState } from "src/store"
import { Props } from "src/router"

export default function Profile({ navigation, route }: Props) {

    const [refreshing, setRefresh] = React.useState(false)
    const user = useSelector((state: RootState) => state.user.user);

    const onRefresh = () => {
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 1000);
    }

    const login = useLogin();

    return (
        <ScrollView style={{ flex: 1 }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

            <View style={{ padding: 24 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                        <Image source={{ uri: user.profile.photoUrl }} style={{ width: 60, height: 60, borderRadius: 60 }} />
                        <View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: style.Color.grey }}>{user.fullName}</Text>
                            <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.grey }}>{user.levels.name}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: style.Color.white, borderRadius: 50 }}>
                        <Image source={Fire} style={{ width: 32, maxHeight: 32 }} resizeMode="contain" />
                        <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.grey }}>{user.bumbiScore} Bumbi</Text>
                    </View>
                </View>
            </View>

            <View>
                <Carosel images={user.profile.images} />
            </View>
            <View style={{ padding: 24, alignItems: "center", gap: 12 }}>
                <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.grey }}>You can consume Bumbi scores with in the app. You just have to complete daily missions.</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("LearnIndex")}
                    style={{ padding: 6, paddingHorizontal: 12, backgroundColor: style.Color.white, borderRadius: 50, borderWidth: 1, borderColor: style.Color.grey_6 }}>
                    <Text>Go To Learn</Text>
                </TouchableOpacity>

            </View>
            <View style={{ borderBottomColor: style.Color.grey_6 + "60", borderBottomWidth: 1 }} />
            <View style={{ padding: 24, gap: 12 }}>
                <TouchableOpacity style={{ backgroundColor: style.Color.background_dark, borderRadius: 6 }} onPress={() => navigation.navigate("EditProfile")}>
                    <Text style={{ color: style.Color.white, padding: 12, textAlign: "center" }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: style.Color.background_dark, borderRadius: 6 }} onPress={() => login.logout()}>
                    <Text style={{ color: style.Color.white, padding: 12, textAlign: "center" }}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

}