import * as React from "react"
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native"
import { Props } from "src/router"
import { useLearn } from "src/hst/hooks"
import { Daily } from "src/hst/types"
import { Ionicons } from "@expo/vector-icons"
import style from "src/css"
import { incramentListening, incramentReading } from "src/store";

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store"

import { TextArea, Difficult, AnswerListening, LearnBottomButton } from "src/components";

export default function ReadingIndex({ navigation, route }: Props) {

    const learn = useLearn({ navigation, route })
    const width = Dimensions.get("screen").width
    const learnState = useSelector((e: RootState) => e.learn)

    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState<Daily | null>(null)
    const [step, setStep] = React.useState(1)
    const [progressWidth, setProgressWidth] = React.useState(0)

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
                setNews(res[learnState.studyComplate.listening])
            })
        }
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Loading</Text>
            </View>
        )
    }

    return (
        news ? (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", alignItems: "center", padding: 12, zIndex: 1, borderBottomColor: style.Color.grey_6, borderBottomWidth: 1 }}>
                    <Ionicons name="information-circle-outline" size={22} color="#3498db" />
                    <View style={{
                        width: width - 66,
                        marginLeft: 10,
                        height: 8,
                        backgroundColor: "#bdc3c7",
                        borderRadius: 6
                    }}>
                        <View
                            style={{
                                width: progressWidth,
                                marginLeft: 0,
                                height: 8,
                                backgroundColor: "#16a085",
                                borderRadius: 6
                            }}
                        />
                    </View>
                </View>
                <ScrollView style={{ flex: 1, padding: 12, backgroundColor: "#fff" }}>

                    {
                        step == 1 ?
                            (
                                <TextArea data={news} visibleLink={false} />)
                            :
                            step == 2 ? (
                                <Difficult data={news} />) :
                                (<AnswerListening data={news} incrament={incramentListening} navigation={navigation} route={route} />)
                    }

                </ScrollView>
                <LearnBottomButton progress={setProgressWidth} setStep={setStep} step={step} />
            </View>
        ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Content not found</Text>
            </View>
        )
    )
}