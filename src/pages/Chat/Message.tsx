import * as React from "react"
import { View, Text, Image, ScrollView, RefreshControl, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, Modal } from "react-native"
import style from "src/css"
import { Props } from "src/router"
import { Message, user } from "src/hst/types"
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSelector } from "react-redux"
import { RootState } from "src/store"
import { useChat } from "src/hst/hooks"

import { ProfileViewModal } from "src/components"
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

import { baseURL } from "src/hst/Configurations"
import { useQuestion } from "src/hst/hooks/QuestionHooks"
import { FlatList } from "react-native-gesture-handler"
import { convertToRGBA } from "react-native-reanimated"

export default function MessageScreen({ navigation, route }: Props) {


    const user = useSelector((e: RootState) => e.user.user)
    const chat = useChat({ navigation, route });

    const question = useQuestion({ navigation, route })

    const [refreshing, setRefresh] = React.useState(false)
    const [profileView, setProfileView] = React.useState(false)
    const [viewData, setViewData] = React.useState(null as user | null)
    const [message, setMessageChange] = React.useState("")

    const [messageData, setMessageData] = React.useState([] as Array<Message>)

    const [sender, setSender] = React.useState({} as user)
    const [reciver, setReciver] = React.useState({} as user)
    const [matchId, setMatchId] = React.useState(0)
    const [connection, setConnection] = React.useState(null as HubConnection | null)
    const scrollViewRef = React.useRef();


    const [questionModal, setQuestionModal] = React.useState(false)
    const [questionData, setQuestionData] = React.useState([] as any)

    React.useEffect(() => {

        if (route.params) {
            //@ts-ignore
            const senderData = route.params.message.userId == user.id ? route.params.message.user : route.params.message.favoriUser
            //@ts-ignore
            const reciverData = route.params.message.userId != user.id ? route.params.message.user : route.params.message.favoriUser
            //@ts-ignore
            const matchIdData = route.params.message.id
            //@ts-ignore
            //setMessageData(route.params.message.message)
            setSender(senderData)
            setReciver(reciverData)
            setMatchId(matchIdData)
        }

        const createConnection = async () => {
            if (!connection) {
                const newConnection = new HubConnectionBuilder()
                    .withUrl(baseURL + `chat`)
                    .withAutomaticReconnect()
                    .build();

                try {
                    await newConnection.start();
                    newConnection.on('SendMessage', (res) => {
                        //@ts-ignore
                        if (res.matchId == route.params.message.id) {
                            res.messageText = !res.questionId ? convertUnicode(res.messageText) : ""
                            setMessageData((prevMessages) => [...prevMessages, res]);

                            //@ts-ignore
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    });

                    setConnection(newConnection);
                } catch (error) {

                }
            }
        }

        const getAllMessage = () => {
            //@ts-ignore
            chat.getAllMessage(route.params.message.id).then(res => {
                var messages = res.reverse().map(e => {
                    return {
                        matchId: e.matchId,
                        messageText: e.messageText ? convertUnicode(e.messageText) : "",
                        reciverId: e.reciverId,
                        sendId: e.sendId,
                        questionId: e.questionId ? e.questionId : null,
                        question: e.question
                    }
                }) as Array<Message>


                setMessageData(messages)
                //@ts-ignore
                scrollViewRef.current.scrollToEnd({ animated: true });

                if (messages.length == 0) {
                    question.findQuestion().then(res => {
                        setQuestionData(res)
                        setQuestionModal(true)
                    })

                }
            })
        }

        const convertUnicode = (text: string) => {
            return text
                .split("-")
                .map((code) => String.fromCodePoint(parseInt(code, 10)))
                .join("");
        }

        getAllMessage()
        createConnection();

        return () => {
            if (connection) {
                connection.stop();

            }
        };
    }, [route])


    const sendMessage = function () {
        if (message.length > 0) {

            const unicodeMessage = Array.from(message)
                .map((char) => char.codePointAt(0))
                .join("-");
            chat.sendMessage({
                sendId: user.id,
                reciverId: reciver.id,
                matchId: matchId,
                messageText: unicodeMessage,
            }).then(res => {
                setMessageChange("")
            })
        }
    }

    const convertUnicode = (text: string) => {
        return text
            .split("-")
            .map((code) => String.fromCodePoint(parseInt(code, 10)))
            .join("");
    }

    const sendMessageQuestion = function (questionId: number) {
        chat.sendMessage({
            sendId: user.id,
            reciverId: reciver.id,
            matchId: matchId,
            messageText: "",
            questionId: questionId
        }).then(res => {
            setQuestionModal(false)
            setMessageChange("")
        })
    }

    const onViewProfile = () => {
        setViewData(reciver)
        setProfileView(true)
    }

    const onRefresh = () => {
        /*setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 1000);*/
    }

    const sendAnswer = (question: string, answer: string) => {
        const unicodeMessage = Array.from(question + " - " + answer)
            .map((char) => char.codePointAt(0))
            .join("-");
        chat.sendMessage({
            sendId: user.id,
            reciverId: reciver.id,
            matchId: matchId,
            messageText: unicodeMessage
        }).then(res => {
            setMessageChange("")
        })
    }

    const ChatCard = function ({ data, send }: { data: Message, send: boolean }) {

        const userData = data.sendId == sender.id ? sender : reciver
        let answer = {} as { true: string, false: string }
        if (data.questionId) {
            answer = JSON.parse(data.question.answer)
        }


        return (
            <>
                {
                    !send && userData ?
                        <View style={{ padding: 8, flexDirection: "row", gap: 12, maxWidth: Dimensions.get("window").width - 40 }}>
                            <Image source={{ uri: userData.profile.photoUrl }} style={{ width: 32, height: 32, borderRadius: 64 }} />
                            <View style={{ backgroundColor: style.Color.grey_6, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 6 }}>
                                <Text style={{ fontWeight: "600", fontSize: 12 }}>{userData.fullName}</Text>
                                {
                                    !data.questionId ?
                                        <Text>{data.messageText}</Text> :
                                        <View>
                                            <Text>{data.question.question}</Text>
                                            <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                                                {
                                                    Object.keys(answer).map(e => {
                                                        return (
                                                            <TouchableOpacity onPress={() => sendAnswer(data.question.question, answer[e])} style={{ paddingVertical: 12, paddingHorizontal: 24, backgroundColor: style.Color.background_dark + "50", borderRadius: 4 }}>
                                                                <Text style={{ color: "white" }}>{answer[e]}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>

                                        </View>
                                }
                            </View>
                        </View>
                        :
                        <View style={{ padding: 8, flexDirection: "row", gap: 12, justifyContent: "flex-end" }}>
                            <View style={{ backgroundColor: style.Color.background_yellow, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 6, maxWidth: Dimensions.get("screen").width - 60 }}>
                                <Text style={{ fontWeight: "600", fontSize: 12, textAlign: "right" }}>{userData.fullName}</Text>
                                {
                                    !data.questionId ?
                                        <Text>{data.messageText}</Text> :
                                        <View>
                                            <Text>{data.question.question}</Text>
                                        </View>
                                }
                            </View>
                            <Image source={{ uri: userData.profile.photoUrl }} style={{ width: 32, height: 32, borderRadius: 64 }} />
                        </View>
                }
            </>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {
                reciver.id &&
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 24 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                            <Image source={{ uri: reciver.profile.photoUrl }} style={{ width: 40, height: 40, borderRadius: 64 }} />
                            <View>
                                <Text style={{ fontWeight: "600", fontSize: 16 }}>{reciver.fullName}</Text>
                                <Text>{reciver.levels.name}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => { onViewProfile() }}
                        style={{ paddingHorizontal: 24, paddingVertical: 6, backgroundColor: style.Color.white, borderRadius: 50, borderWidth: 1, borderColor: style.Color.grey_6 }}>
                        <Text>View Profile</Text>
                    </TouchableOpacity>
                </View>
            }
            <View style={{ borderBottomColor: style.Color.grey_6 + "60", borderBottomWidth: 1 }} />


            <ScrollView
                style={{ flex: 1 }}
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 50 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>

                {
                    messageData.map((e, index) => {
                        return (
                            <ChatCard key={index} data={e} send={e.sendId == user.id} />
                        )
                    })
                }
            </ScrollView>

            <KeyboardAvoidingView
                keyboardVerticalOffset={100}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: style.Color.white, alignItems: "center", paddingHorizontal: 24 }}
            >
                <TextInput
                    editable={messageData.length != 0 && messageData[messageData.length - 1]?.questionId == null}
                    style={{ width: Dimensions.get("window").width - 84, height: 60 }}
                    onChangeText={setMessageChange}
                    value={message}
                    placeholder="Message..."
                />
                <TouchableOpacity style={{ width: 60, height: 60, justifyContent: "center", alignItems: "center" }} onPress={sendMessage}>
                    <Feather name="send" size={24} color="black" />
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <ProfileViewModal visible={profileView} onRequestClose={setProfileView} data={viewData} />

            <Modal
                animationType="slide"
                visible={questionModal}
                presentationStyle={"formSheet"}
                onRequestClose={() => {
                    setQuestionModal(!questionModal)
                }}>
                <View style={{ flex: 1, padding: 12 }}>
                    <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "600" }}>Choose your question</Text>
                    <Text style={{ fontSize: 16, textAlign: "center", marginTop: 8 }}>Once you've both responded, we'll reveal your answers.</Text>
                    <FlatList
                        data={questionData}
                        horizontal
                        renderItem={(data) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    sendMessageQuestion(data.item.id)

                                }}>
                                    <View style={{ flex: 1, marginHorizontal: 12, justifyContent: "center", alignItems: "center" }}>
                                        <View style={{ width: 300, height: 400, gap: 12, backgroundColor: style.Color.background_yellow, padding: 12, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 14, }}>Question {data.index + 1} of {questionData.length}</Text>
                                            <Text style={{ fontSize: 24, textAlign: "center" }}>{data.item.question}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    >

                    </FlatList>
                </View>


            </Modal>


        </View >
    )

}