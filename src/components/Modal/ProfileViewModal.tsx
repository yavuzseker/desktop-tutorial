import * as React from "react"
import { View, Text, Modal, ScrollView, Image, TouchableOpacity } from "react-native"
import style from "src/css"
import Carosel from "src/components/Carosel/Carosel"
import { AntDesign, SimpleLineIcons, Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import Fire from "src/assets/fire.png"
import { useReport } from "src/hst/hooks/Report"
import { useSelector } from "react-redux"
import { RootState } from "src/store"

type ProfileModalType = {
    visible: boolean
    onRequestClose: Function
    data: any | null
}

export default function ProfileViewModal(props: ProfileModalType) {

    const { sendReport, findReport } = useReport()
    const user = useSelector((e: RootState) => e.user.user)


    React.useEffect(() => {
        if (props.data) {
            findReport(props.data.id).then(res => {
                setSender(true)
                setVisible(true)
            }).catch(err => {
                setSender(false)
                setVisible(true)
            })
        }
    }, [props.visible])

    const [report, setReport] = React.useState(false)
    const [visible, setVisible] = React.useState(false)

    const [sender, setSender] = React.useState(false)

    const send = (message: string) => {
        sendReport({
            message: message,
            userId: user.id,
            reportUserId: props.data.id
        }).then(res => {
            setSender(true)
        })
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
                <ScrollView style={{ flex: 1 }}>
                    {
                        props.data &&
                        <View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 24 }}>
                                <View style={{ flexDirection: "row", gap: 12 }}>
                                    <Image source={{ uri: props.data.profile.photoUrl }} style={{ width: 60, height: 60, borderRadius: 60 }} />
                                    <View>
                                        <Text style={{ fontWeight: "600", fontSize: 16, color: style.Color.grey }}>{props.data.fullName}</Text>
                                        <Text style={{ fontWeight: "500", fontSize: 14, color: style.Color.grey }}>{props.data.levels.name}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: style.Color.white, borderRadius: 50 }}>
                                    {
                                        props.data.levelsId == 1 ?
                                            <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                            : props.data.levelsId == 6 ?
                                                <View style={{ flexDirection: "row", gap: 12 }}>
                                                    <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                    <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                </View>
                                                :
                                                <View style={{ flexDirection: "row", gap: 12 }}>
                                                    <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                    <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                    <AntDesign name="star" size={24} color={style.Color.background_yellow} />
                                                </View>
                                    }
                                </View>
                            </View>
                            <View>
                                <Carosel images={props.data.profile.images} />
                            </View>
                            <View style={{ padding: 24 }}>
                                <Text style={{ color: style.Color.grey, fontWeight: "600", fontSize: 16 }}>
                                    Tiningo lets you practice what you've learned with other people while learning English. Make them notice you by liking {props.data.fullName}.
                                </Text>
                            </View>


                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => setReport(true)} style={{ paddingVertical: 8, paddingHorizontal: 12, backgroundColor: style.Color.background_yellow, borderRadius: 6 }}>
                                    <Text style={{ color: style.Color.white }}>Report This User</Text>
                                </TouchableOpacity>

                                <Modal
                                    animationType="slide"
                                    visible={report}
                                    presentationStyle={"formSheet"}
                                    onRequestClose={() => {
                                        setReport(!report);
                                    }}>

                                    {
                                        visible &&
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 24, paddingTop: 24 }}>
                                                <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                                                    <Image source={Fire} style={{ width: 36, height: 36 }} resizeMode="contain" />
                                                    <Text style={{ color: style.Color.background_yellow, fontWeight: "600", fontSize: 22 }}>
                                                        Tiningo
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={() => setReport(!report)}>
                                                    <AntDesign name="close" size={24} color={style.Color.grey} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
                                                <Text style={{ fontWeight: "600", fontSize: 18, marginVertical: 12 }}>Block and report this person</Text>
                                                <Text style={{ fontWeight: "400", fontSize: 18, color: style.Color.grey }}>Don't worry, your feedback is anonymous and they won't know that you've blocked or reported them.</Text>
                                            </View>
                                            {
                                                !sender ? <View style={{ paddingVertical: 8, marginTop: 12 }}>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Fake profile")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <SimpleLineIcons name="user-unfollow" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Fake profile</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Rude or abusive behavior")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <Ionicons name="md-chatbubble-outline" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Rude or abusive behavior</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Inappropriate content")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <AntDesign name="warning" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Inappropriate content</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Scam or commercial")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <Feather name="flag" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Scam or commercial</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Identity-based hate")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <AntDesign name="notification" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Identity-based hate</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Off Tiningo behavior")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <SimpleLineIcons name="ban" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Off Tiningo behavior</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("Underage")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <MaterialCommunityIcons name="baby-carriage-off" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>Underage</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                    <TouchableOpacity onPress={() => send("I'm just not interested")} style={{ flexDirection: "row", gap: 12, padding: 12, alignItems: "center" }}>
                                                        <MaterialCommunityIcons name="face-agent" size={24} color="black" />
                                                        <Text style={{ fontSize: 16 }}>I'm just not interested</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ height: 1, backgroundColor: style.Color.grey_6 }} />
                                                </View>
                                                    :
                                                    <View style={{ padding: 12, justifyContent: "center", alignItems: "center", marginTop: 12, gap: 12 }}>
                                                        <Text style={{ fontWeight: "600", fontSize: 18 }}>Thank You</Text>
                                                        <Text>Thanks for your feedback. We are working together to make this platform a better place. We will review the notification you made.</Text>
                                                    </View>
                                            }
                                        </View>
                                    }

                                </Modal>
                            </View>

                        </View>


                    }
                </ScrollView>
            </View>
        </Modal>
    )

}