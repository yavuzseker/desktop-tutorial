import * as React from "react"
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native"
import { Answer, Daily } from "src/hst/types";
import style from "src/css"
import { useSelector, useDispatch } from "react-redux";
import { RootState, addBumbiScore } from "src/store";
import { Props } from "src/router";
import { useLearn } from "src/hst/hooks";
import { incramentMissionComplate } from "src/store";
import { Audio } from 'expo-av';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Party from "src/assets/party.png"

export default function AnswerListening({ data, incrament, navigation, route }: Props & { data: Daily, incrament: any }) {

    const user = useSelector((e: RootState) => e.user.user)
    const learn = useLearn({ navigation, route })
    const dispatch = useDispatch()

    const [selectReferance, setSelectReferance] = React.useState(false)
    const  [green, setGreen] = React.useState(false)
    const answerControl = (answer: Answer) => {
        if (data) {
            if (answer.isCorrect) {
                dispatch(addBumbiScore())
                setGreen(true);
            }
            else{
                    setTimeout(() => {
                        setGreen(true);
                    }, 1000);
                
            }


            setSelectReferance(true)
            setTimeout(() => {
                learn.answerControl({
                    userId: user.id,
                    lessonsId: data.lessonsId,
                    correct: answer.isCorrect
                }).then(res => {
                    dispatch(incramentMissionComplate())
                    dispatch(incrament())

                    navigation.navigate("LearnIndex")
                })
            }, 3000);
        }
    }

    const soundObject = new Audio.Sound();
    const [isPlay, setPlay] = React.useState(false)

    const playSound = async () => {
        setPlay(true)
        try {
            await soundObject.loadAsync({ uri: data.videoUrl });
            await soundObject.playAsync();
            soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        } catch (error) {

        }
    };

    const onPlaybackStatusUpdate = async (status: any) => {
        if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
            setPlay(false)
            soundObject.stopAsync()
        }
        if (status.isPlay) {
            setPlay(true)
        }
    };

    return (
        <View style={{ flex: 1, gap: 24 }}>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                    disabled={isPlay}
                    onPress={playSound}
                    style={{
                        padding: 24, backgroundColor: isPlay ? "#bdc3c760" : "#fff", shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 2.54,
                        elevation: 3,
                        borderRadius: 50
                    }}>
                    <Entypo name="controller-play" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 24, marginTop: 12, color: style.Color.grey, marginVertical: 12, textAlign: "center" }}>
                {
                    data.question
                }
            </Text>
            <View style={{ gap: 24 }}>
                {
                    data.answer.map((e, index) => {
                        return (
                           
                           
                            <TouchableOpacity
                            onPress={() => { answerControl(e) }}
                            key={index}
                            disabled={(data.levelId != user.levels.id) || selectReferance  } 
                            style={{
                                paddingVertical: 24, 
                                paddingHorizontal: 24, 
                                backgroundColor: selectReferance  ? (e.isCorrect  ?  (green ? '#2ecc71':'white') : '#c0392b') : 'white',
                                borderColor: selectReferance  ? (e.isCorrect ? '#2ecc71' : '#c0392b') : '#bdc3c730', 
                                borderWidth: 2, 
                                borderRadius: 20,  // Azaltılmış köşe yuvarlaklığı
                                width: "100%", 
                                flexDirection: "row", 
                                alignItems: "center", 
                                gap: 12,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5, // Gölge ekleyerek daha fazla derinlik sağladım
                            }}
                        >
                            {
                                selectReferance ?
                                    (e.isCorrect ? <AntDesign name="checkcircleo" size={24} color="white" /> : <AntDesign name="closecircleo" size={24} color="white" />) :
                                    <View style={{ width: 24, height: 24, borderRadius: 50, borderWidth: 1, borderColor: "#bdc3c7" }} />
                            }
                            <Text style={{ fontWeight: "500", fontSize: 14, color: "black" }}>{e.text}</Text>
                        </TouchableOpacity>
                        )
                    })
                }

            </View>
        </View >
    )


}



const styles = StyleSheet.create({

    ok: {
        backgroundColor: "#27ae60",
    },
    nok: {
        backgroundColor: "#c0392b",
    },
    norm: {
        backgroundColor: "#fff",
    }
})