import * as React from "react"
import { View, Text, Platform, Image, TouchableOpacity, Dimensions } from "react-native"
import { Props } from "src/router"
import style from "src/css"
import Fire from "src/assets/fire.png"
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import { useLearn } from "src/hst/hooks"
import { Lessons } from "src/hst/types"

import { Header, StudyButton, TransparentModal, DailyQuestionModal } from "src/components"
import { useFocusEffect } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons';

export default function LearnScreen({ navigation, route }: Props) {

    const user = useSelector((e: RootState) => e.user.user)
    const learn = useLearn({ navigation, route })

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState(new Array<Lessons>())
    const [allCompate, setAllCompate] = React.useState(0)
    const [missionCount, setMissionCount] = React.useState(0)

    const [modal, setModal] = React.useState(true)
    const [statu, setStatu] = React.useState(true)

    React.useEffect(() => {
        setLoading(true)

        learn.getLessons().then(res => {
            var sizeCompate = 0
            var sizeMission = 0
            res.forEach((element, index) => {
                sizeMission += element.stepSize;
                element.complate = []
                learn.findComplate({ userId: user.id, lessonId: element.id }).then(complate => {
                    element.complate = complate
                    sizeCompate += complate.length
                    if (index == res.length - 1) {
                        setData(res)
                        setLoading(false)
                        setMissionCount(sizeMission)
                        setAllCompate(sizeCompate)
                        console.log(sizeCompate);

                        if (sizeCompate == 0) {
                            setModal(true)
                        }
                    }
                })
            });

        })
    }, [])

    // <View style={{ width: 12, height: 12, borderRadius: 50, borderColor: "#95a5a6", borderWidth: 1 }}></View>

    return (
        <View style={{ flex: 1 }}>
            <Header navigation={navigation} route={route} />
            <View style={{ padding: 12, backgroundColor: "#152027", flex: 1, gap: 12 }}>
                <Text style={{ fontSize: 18, color: style.Color.white }}>
                    Daily Missions
                </Text>
                {
                    loading ?
                        <View>
                            <Text>Loading</Text>
                        </View>
                        :
                        <View style={{ borderWidth: .5, borderColor: style.Color.grey, borderRadius: 6 }}>
                            {
                                data.map((e, index) => {
                                    return (
                                        <View key={e.id}>
                                            <StudyButton data={e} navigation={navigation} route={route} screen={e.name + "Screen"} />
                                            {
                                                data.length - 1 != index && <View style={{ borderBottomColor: style.Color.grey, borderBottomWidth: 1 }} />
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                }
            </View>

            <TransparentModal visible={modal} setVisible={() => setModal(!modal)} closeButton={false} title="Kişiler" animationType="fade" presentationStyle="overFullScreen" transparent >
                <DailyQuestionModal navigation={navigation} route={route} setModal={setModal} />
            </TransparentModal>
        </View>
    )
}