import * as React from "react"
import { View, Text, Keyboard, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, ScrollView } from "react-native"
import { Props } from "src/router"
import { useLearn } from "src/hst/hooks"
import { Daily } from "src/hst/types"
import { Entypo } from '@expo/vector-icons';
import style from "src/css"
import { incramentMissionComplate, incramentWriting } from "src/store";

import { useSelector, useDispatch } from "react-redux"
import { RootState, addBumbiScore } from "src/store"

import { Ionicons } from '@expo/vector-icons';
import { TransparentModal } from "src/components"

import ChatGPT from "src/assets/chatgpt.png"

export default function ReadingIndex({ navigation, route }: Props) {

    const learn = useLearn({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)
    const learnState = useSelector((e: RootState) => e.learn)

    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState<Daily | null>(null)

    const [viewModal, setViewModal] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [isSend, setSend] = React.useState(false)
    const [response, setResponse] = React.useState("")
    const [template, setTemplate] = React.useState("")

    const [modal, setModal] = React.useState(false);
    const [reading, setReading] = React.useState("");

    React.useEffect(() => {
        setLoading(true)
        if (route.params) {
            //@ts-ignore
            const levelId = route.params.level
            //@ts-ignore
            const lessonsId = route.params.lessonsId

            learn.dailyQuests({
                data: [
                    { query: "years=@0", value: new Date().getFullYear() },
                    { query: "mounth=@0", value: new Date().getMonth() + 1 },
                    { query: "day=@0", value: new Date().getDate() },
                    { query: "levelId=@0", value: levelId },
                    { query: "lessonsId=@0", value: lessonsId }
                ]
            }).then(res => {
                setLoading(false)
                setNews(res[learnState.studyComplate.writing])
                var level = "Level 1"
                if (levelId == 1) {
                    level = "Level 1"
                } else if (levelId == 6) {
                    level = "Level 2"
                } else {
                    level = "Level 3"
                }
                setTemplate("i develop an app about writing practice , give me score 0 to 10 about this topics comment from user by consider user level.Give me short answer. Topic: " + news?.question + ", Level:" + level + " ,Comment : $comment")
                learn.dailyQuestsFindOne({
                    data: [
                        { query: "years=@0", value: new Date().getFullYear() },
                        { query: "mounth=@0", value: new Date().getMonth() + 1 },
                        { query: "day=@0", value: new Date().getDate() },
                        { query: "levelId=@0", value: levelId },
                        { query: "lessonsId=@0", value: 1 }
                    ]
                }).then(res => {

                    setReading(res.text);
                })
            })
        }
    }, [])

    const openIA = () => {
        setSend(true)
        var veri = template.replaceAll("$comment", message);
        setMessage(veri)
        dispatch(addBumbiScore())
        learn.chatGPT({ request: veri }).then(res => {
            learn.answerControl({
                correct: true,
                lessonsId: 2,
                userId: user.id
            }).then(control => {
                setResponse(res)
                setSend(false)
                dispatch(incramentMissionComplate())
                dispatch(incramentWriting())
            })
        })
    }

    const closeAnalyze = function () {
        setViewModal(false)
        setResponse("")
        setSend(false)
        setMessage("")
        navigation.navigate("LearnIndex")
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Loading</Text>
            </View>
        )
    }

    return (
        news ? (
            <View style={{ flex: 1, backgroundColor: "#ecf0f1", padding: 24 }}>


                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <TouchableOpacity onPress={() => setModal(true)} style={{ backgroundColor: "#3498db", padding: 8, borderRadius: 50, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 24 }}>
                        <Ionicons name="document-text-outline" size={14} color="white" />
                        <Text style={{ color: "#fff" }}>Show Text</Text>
                    </TouchableOpacity>
                </View>
                <View style={[{ backgroundColor: "#fff", width: "100%", marginTop: 24 }]}>
                    <Image source={{ uri: news.videoUrl }} style={{ width: "100%", height: 200 }} resizeMode="contain" />
                    <View style={{ padding: 12 }}>
                        <Text>{news.question}</Text>
                    </View>
                </View>

                <Text style={{ marginVertical: 24, textAlign: "center", color: style.Color.grey, fontSize: 18 }}>Complete this exercise with writing.</Text>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <TouchableOpacity style={{ padding: 30, backgroundColor: style.Color.white, borderRadius: 50 }} onPress={() => setViewModal(true)}>
                        <Entypo name="brush" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <Modal
                    animationType="fade"
                    visible={viewModal}
                    presentationStyle={"formSheet"}
                    onRequestClose={() => {
                        setViewModal(!viewModal);
                    }}>
                    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
                        {
                            response.length <= 0 && !isSend ? <View style={{ padding: 24 }}>
                                <Text style={{ marginVertical: 24, textAlign: "center", color: style.Color.grey, fontSize: 18 }}>Complete this exercise with writing.</Text>
                                <View style={{ gap: 12 }}>
                                    <TextInput
                                        style={{ width: "100%", height: 200, borderWidth: 1, borderColor: "#55555550", borderRadius: 8, padding: 6 }}
                                        multiline
                                        value={message}
                                        onChangeText={setMessage}
                                        placeholder="Write"
                                        keyboardType="default"
                                    />
                                    <TouchableOpacity style={{ padding: 12, backgroundColor: "#fff", borderRadius: 50, borderWidth: 1, borderColor: "#bdc3c7", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 12 }} onPress={openIA}>
                                        <Image source={ChatGPT} style={{ width: 32, height: 32 }} />
                                        <Text style={{ textAlign: "center" }}>Analyze</Text>
                                    </TouchableOpacity>
                                </View>
                            </View> :
                                <View style={{ flex: 1 }}>
                                    {
                                        !isSend ?
                                            <View style={{ padding: 24 }}>
                                                <Text style={{ fontSize: 18, color: style.Color.grey, marginBottom: 12 }}>Hello, your analysis results are as follows.</Text>
                                                <View style={{ gap: 12 }}>
                                                    <Text style={{ fontSize: 16, textAlign: "center" }}>{response}</Text>
                                                    <TouchableOpacity style={{ padding: 18, backgroundColor: "#FCC52D", borderRadius: 50 }} onPress={() => closeAnalyze()}>

                                                        <Text style={{ textAlign: "center" }}>Close Analyze</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            :
                                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
                                                <Text style={{ fontSize: 16 }}>Please Wait</Text>
                                            </View>
                                    }

                                </View>
                        }

                    </TouchableWithoutFeedback>
                </Modal>

                <TransparentModal visible={modal} setVisible={() => setModal(!modal)} closeButton={true} title="Kişiler" animationType="fade" presentationStyle="overFullScreen" transparent >
                    <ScrollView>
                        <View>
                            <Text style={{ padding: 12, paddingHorizontal: 48, fontSize: 16 }}>{reading}</Text>
                        </View>
                    </ScrollView>
                </TransparentModal>

            </View>
        ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Content not found</Text>
            </View>
        )
    )
}