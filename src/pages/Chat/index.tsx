import * as React from "react"
import { View, Text, ScrollView, RefreshControl, Image, Dimensions, TouchableOpacity } from "react-native"
import style from "src/css"
import defaultUser from "src/assets/defaultUser.png"
import { Props } from "src/router"

import { useSelector } from "react-redux"
import { RootState } from "src/store"
import { useChat } from "src/hst/hooks"
import { ChatType } from "src/hst/types"



export default function Chat({ navigation, route }: Props) {

    const [refreshing, setRefresh] = React.useState(false)
    const [data, setData] = React.useState(new Array<ChatType>())

    const user = useSelector((e: RootState) => e.user.user)
    const chat = useChat({ navigation, route });

    React.useEffect(() => {
        setData([])
        chat.findMatch({ userId: user.id }).then(res => {
            setData(res)
        })
    }, [user])


    /*navigation.addListener("focus", (e) => {
        chat.findMatch({ userId: user.id }).then(res => {
            setData(res)
        })
    })*/

    const onRefresh = () => {
        setRefresh(true)
        setData([])
        chat.findMatch({ userId: user.id }).then(res => {
            setRefresh(false)
            setTimeout(() => {
                setData(res)
            }, 1);
        })
    }

    const MessageCard = function ({ data }: { data: ChatType }) {

        const [endMessage, setEndMessage] = React.useState("")

        const imageURL = data.userId == user.id ? data.favoriUser.profile.photoUrl : data.user.profile.photoUrl
        const name = data.userId == user.id ? data.favoriUser.fullName : data.user.fullName

        const convertUnicode = (text: string) => {
            return text
                .split("-")
                .map((code) => {
                    if (code.length == 0) {
                        return ""
                    }
                    return String.fromCodePoint(parseInt(code, 10))
                })
                .join("");
        }


        React.useEffect(() => {
            const message = data.message.reverse();
            if (message.length > 0) {
                setEndMessage(convertUnicode(message[0].messageText))
            }
        }, [data])

        return (
            <TouchableOpacity onPress={() => navigation.navigate("Message", { message: data })}>
                <View style={{ flexDirection: "row", gap: 12 }}>
                    <View>
                        <Image source={{ uri: imageURL }} style={{ width: 64, height: 64, borderRadius: 64 }} resizeMode="contain" />
                        <View style={{ position: "absolute", width: 14, height: 14, backgroundColor: style.Color.background_yellow, borderRadius: 20, bottom: 10, right: 0 }} />
                    </View>
                    <View style={{ width: Dimensions.get("window").width - 120 }}>
                        <Text style={{ fontWeight: "600", fontSize: 16 }}>{name}</Text>
                        <Text style={{ fontWeight: "500", fontSize: 14 }}>{endMessage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <View style={{ flex: 1 }}>
            <View style={{ padding: 24 }}>
                <Text style={{ fontWeight: "600", fontSize: 16 }}>Messages</Text>
            </View>
            <View style={{ borderBottomColor: style.Color.grey_6 + "60", borderBottomWidth: 1 }} />
            <ScrollView style={{ flex: 1, padding: 24 }} refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

                <View style={{ gap: 12 }}>
                    {
                        data.map((e, index) => {
                            return (<MessageCard key={e.id} data={e} />)
                        })
                    }
                </View>

            </ScrollView>
        </View>
    )

}