import * as React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import Fire from "src/assets/fire.png"
import { AntDesign } from '@expo/vector-icons';
import { useQuestion } from "src/hst/hooks/QuestionHooks";
import { Props } from "src/router";
import { useAppSelector } from "src/store/hooks";

interface IPageQuestion extends Props {
    setModal: Function
}

export default function DailyQuestionModal({ navigation, route, setModal }: IPageQuestion) {

    const [wait, setWait] = React.useState(true)
    const [question, setQuestion] = React.useState<any>()
    const [answer, setAnswer] = React.useState(1)


    const { findQuestion } = useQuestion({ navigation, route });

    const user = useAppSelector(state => state.user.user)

    React.useEffect(() => {
        setWait(true)
        findQuestion().then((res) => {
            var questionLevel = res.filter(e => e.levelId == user.levelsId);
            var randomInteger = Math.floor(Math.random() * ((questionLevel.length - 1) - 0 + 1)) + 0;
            var data = questionLevel[9];
            console.log(data);
            

            data.answer = JSON.parse(data.answer);
            //@ts-ignore
            setQuestion(data);
            setWait(false)
        })
    }, [])

    const onAnswer = (e: any) => {
        if (e == "true") {
            setAnswer(2)
            setTimeout(() => {
                setModal(false)
            }, 3000);
        } else {
            setAnswer(3)
            setTimeout(() => {
                setModal(false)
            }, 3000);
        }
    }

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", gap: 12 }}>
                <Image source={Fire} resizeMode="contain" style={{ height: 120 }} />
                <Text style={{ fontWeight: "600", color: "#353b48", fontSize: 25 }}>Daily Quiz</Text>
            </View>
            {
                question && <View style={{ marginBottom: 24, justifyContent: "center", alignItems: "center", paddingHorizontal: 12, gap: 12 }}>
                    <Text style={{ fontWeight: "600", color: "#353b48", fontSize: 18 }}>{question.question}</Text>

                    <View style={{ paddingHorizontal: 28, gap: 12, width: "100%" }}>

                        {
                            Object.keys(question.answer).map((e: any, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onAnswer(e)} style={{ padding: 12, backgroundColor: answer == 1 ? 'white' : answer == 2 ? e == "true" ? '#2ecc71' : 'white' : e == "false" ? 'red' : 'white', borderRadius: 50, borderColor: "#bdc3c730", borderWidth: 1, width: "100%", flexDirection: "row", alignItems: "center", gap: 12 }}>
                                        {
                                            answer == 1 ?
                                                <View style={{ width: 24, height: 24, borderRadius: 50, borderWidth: 1, borderColor: "#95a5a6" }} />
                                                : <>
                                                    {
                                                        (e == "true") &&
                                                        <>
                                                            {
                                                                answer == 2 ? <AntDesign name="checkcircleo" size={24} color="white" /> :
                                                                    <View style={{ width: 24, height: 24, borderWidth: 1, borderColor: "#bdc3c7", borderRadius: 50 }} />
                                                            }
                                                        </>

                                                    }
                                                    {
                                                        (e == "false") &&
                                                        <>
                                                            {
                                                                answer == 3 ? <AntDesign name="closecircleo" size={24} color="white" /> :
                                                                    <View style={{ width: 24, height: 24, borderWidth: 1, borderColor: "#bdc3c7", borderRadius: 50 }} />
                                                            }
                                                        </>

                                                    }
                                                </>

                                        }
                                        <Text style={{ fontWeight: "500", color: answer == 1 ? "black" : answer == 2 && e == "true" ? "white" : answer == 3 && e == "false" ? "white" : "black" }}>{question.answer[e]}</Text>

                                    </TouchableOpacity>
                                )
                            })
                        }


                    </View>
                </View>
            }
            <View style={{ paddingVertical: 50 }}></View>
        </>
    )

} 



