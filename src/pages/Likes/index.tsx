import * as React from "react"
import { View, Text, ImageBackground, Dimensions, TouchableOpacity, ScrollView, RefreshControl, Modal } from "react-native"

import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { Props } from 'src/router';
import { useSwipper } from 'src/hst/hooks';
import style from "src/css"

export default function Likes({ navigation, route }: Props) {

    const ImageWidth = (Dimensions.get("window").width - (60)) / 2;

    const [refreshing, setRefresh] = React.useState(false)

    const [data, setData] = React.useState(new Array())

    const swipper = useSwipper({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)

    React.useEffect(() => {
        swipper.like({
            userId: user.id
        }).then(res => {
            setData(res)
        })
    }, [])

    const onRefresh = () => {
        setRefresh(true)
        swipper.like({
            userId: user.id
        }).then(res => {
            setData(res)
            setRefresh(false)
        })
    }

    return (
        <ScrollView style={{ flex: 1 }} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            <View style={{ padding: 24, flex: 1, gap: 12, flexDirection: "row", flexWrap: "wrap" }}>

                {
                    data.map(e => {
                        return (
                            <TouchableOpacity key={e.id}>
                                <ImageBackground source={{ uri: e.user.profile.photoUrl }} style={{ width: ImageWidth, height: ImageWidth }} blurRadius={e.blur ? 50 : 0} resizeMode="contain" />
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
            {
                data.length == 0 &&
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
                    <Text style={{ color: style.Color.grey, fontWeight: "600", fontSize: 16, textAlign: "center" }}>No one likes you for now. But this is an opportunity for you to edit your profile.</Text>
                </View>
            }

        </ScrollView>
    )

}