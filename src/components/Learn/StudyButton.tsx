import * as React from "react"
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native"
import { useSelector } from "react-redux"
import { RootState } from "src/store"
import style from "src/css"
import { MeasuredDimensions } from "react-native-reanimated"
import { Props, RouterRootList } from "src/router"
import { Lessons } from "src/hst/types"

import Party from "src/assets/party.png"

export default function StudyButton({ navigation, data, screen }: Props & { data: Lessons, screen: string }) {

    const [complate, setComplate] = React.useState(0)

    const learnStore = useSelector((e: RootState) => e.learn)
    const progressWidth = (complate / data.stepSize * 100) + "%" as MeasuredDimensions;

    const [disable, setDisable] = React.useState(false)

    React.useEffect(() => {

        if (data.id == 1) {
            setComplate(learnStore.studyComplate.reading)
            if (learnStore.studyComplate.reading == data.stepSize) {
                setDisable(true)
            }
        } else if (data.id == 2) {
            setComplate(learnStore.studyComplate.writing)
            if (learnStore.studyComplate.writing == data.stepSize) {
                setDisable(true)
            }
        } else if (data.id == 3) {
            setComplate(learnStore.studyComplate.listening)
            if (learnStore.studyComplate.listening == data.stepSize) {
                setDisable(true)
            }
        } else if (data.id == 4) {
            setComplate(learnStore.studyComplate.speaking)
            if (learnStore.studyComplate.speaking == data.stepSize) {
                setDisable(true)
            }
        }

    }, [learnStore])

    return (
        //@ts-ignore
        <TouchableOpacity disabled={disable} onPress={() => navigation.navigate(screen)}>
            <View style={{ flexDirection: "row", paddingHorizontal: 12, paddingVertical: 20, alignItems: "center" }} >
                <Image source={{ uri: data.icon }} style={{ width: 42, height: 42 }} />
                <View style={{ marginLeft: 12, gap: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 18, color: style.Color.white }}>
                            {data.name}
                        </Text>
                        <Text style={{ color: style.Color.grey_6, fontSize: 14 }}>1-5 min</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <View style={{ backgroundColor: "#394750", width: Dimensions.get("window").width - 140, height: 22, borderRadius: 50, justifyContent: "center" }}>
                            <View style={{ position: "absolute", height: "100%", width: progressWidth, borderRadius: 50, backgroundColor: "#1abc9c" }}></View>
                            <View style={{ position: "absolute", height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: "white", textAlign: "center" }}>
                                    {complate} / {data.stepSize}
                                </Text>
                            </View>
                            {
                                complate / data.stepSize == 1 && <Image source={Party} style={{ width: 42, height: 42, position: "absolute", right: -15, top: -18 }} />
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}