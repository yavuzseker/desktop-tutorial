import * as React from "react"
import { View, Text, Image, TouchableOpacity } from "react-native"
import { Props } from "src/router"
import { useLearn } from "src/hst/hooks"
import { Daily } from "src/hst/types"
import { Entypo, Feather } from '@expo/vector-icons';
import style from "src/css"
import { Audio } from 'expo-av';
import { incramentMissionComplate, incramentSpeaking, incramentWriting } from "src/store";

import { useSelector, useDispatch } from "react-redux"
import { RootState , addBumbiScore } from "src/store"

export default function ReadingIndex({ navigation, route }: Props) {

    const learn = useLearn({ navigation, route })
    const user = useSelector((e: RootState) => e.user.user)
    const learnState = useSelector((e: RootState) => e.learn)

    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(true);
    const [news, setNews] = React.useState<Daily | null>(null)

    const [recording, setRecording] = React.useState(null);
    const [isRecording, setIsRecording] = React.useState(false);
    const [sound, setSound] = React.useState(null);
    const [save, setSave] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [timer, setTimer] = React.useState(30)
    const [listener, setListener] = React.useState(30)

    React.useEffect(() => {
        Audio.requestPermissionsAsync();
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        });
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
                setNews(res[learnState.studyComplate.speaking])
            })
        }
    }, [])

    React.useEffect(() => {
        if (timer == 0) {
            stopRecording()
        }
    }, [timer])

    const startRecording = async () => {
        setSound(null)
        setTimer(30)
        try {

            // Ses kaydını başlatmadan önce ses ayarlarını düzenleme
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: false,
            });

            // Ses kaydını başlatma
            const recording = new Audio.Recording();
            //@ts-ignore
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            //@ts-ignore
            setRecording(recording);
            setIsRecording(true);

            var interval = setInterval(() => {
                setTimer((timer) => timer - 1)
            }, 1000);
            //@ts-ignore
            setListener(interval)

        } catch (error) {
            console.error('Kayıt başlatılamadı:', error);
        }
    };

    const stopRecording = async () => {
        try {
            setSave(true)
            // Ses kaydını durdurma
            //@ts-ignore
            await recording.stopAndUnloadAsync();
            setIsRecording(false);
            //@ts-ignore
            await recording.createNewLoadedSoundAsync();

            if (recording) {
                const createSound = async () => {
                    //@ts-ignore
                    const { sound } = await recording.createNewLoadedSoundAsync();
                    setSound(sound);
                    setSave(false)
                };
                createSound();
                clearInterval(listener)
            }

        } catch (error) {

        }
    };

    const play = async () => {
        if (sound) {
            setIsPlaying(true)
            //@ts-ignore
            await sound.playAsync();
        }
    };

    const stop = async () => {
        if (sound) {
            setIsPlaying(false)
            //@ts-ignore
            await sound.stopAsync();
        }
    };


    const answerControl = () => {
        if (news) {

            dispatch(addBumbiScore())

            learn.answerControl({
                correct: true,
                lessonsId: news?.lessonsId,
                userId: user.id
            }).then(res => {
                dispatch(incramentMissionComplate())
                dispatch(incramentSpeaking())
                navigation.navigate("LearnIndex")
            })
        }

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

                <View style={[{ backgroundColor: "#fff", width: "100%" }]}>
                    <Image source={{ uri: news.videoUrl }} style={{ width: "100%", height: 200 }} resizeMode="contain" />
                    <View style={{ padding: 12 }}>
                        <Text>{news.text}</Text>
                    </View>
                </View>

                <Text style={{ marginVertical: 24, textAlign: "center", color: style.Color.grey, fontSize: 18 }}>Speak at least {timer} seconds.</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 12 }}>

                    <TouchableOpacity
                        onPress={isRecording ? stopRecording : startRecording}
                        disabled={news.levelId != user.filter.levelsId}
                        style={{
                            padding: 24, backgroundColor: isRecording ? 'red' : 'white', borderRadius: 50, shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.17,
                            shadowRadius: 2.54,
                            elevation: 3,
                        }}>
                        {
                            !isRecording ?
                                <Entypo name="mic" size={24} color="black" />
                                :
                                <Feather name="mic-off" size={24} color="white" />
                        }

                    </TouchableOpacity>

                    {sound && (

                        <TouchableOpacity
                            onPress={isPlaying ? stop : play}
                            style={{
                                padding: 24, backgroundColor: isPlaying ? 'red' : 'white', borderRadius: 50, shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.17,
                                shadowRadius: 2.54,
                                elevation: 3,
                            }}>
                            {
                                isPlaying ?
                                    <Entypo name="controller-stop" size={24} color="white" />
                                    :
                                    <Entypo name="controller-play" size={24} color="black" />
                            }
                        </TouchableOpacity>

                    )}
                </View>
                {
                    save &&
                    <View style={{ marginVertical: 12 }}>
                        <Text style={{ textAlign: "center" }}>Save Voice...</Text>
                    </View>
                }
                <View style={{ marginVertical: 12 }}>
                    <TouchableOpacity
                        onPress={answerControl}
                        disabled={timer != 0}
                        style={{ padding: 12, backgroundColor: timer != 0 ? "#bdc3c7" : "#FCC52D", borderRadius: 50 }}
                    >
                        <Text style={{ textAlign: "center" }}>Finish</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: style.Color.grey, fontSize: 18 }}>Content not found</Text>
            </View>
        )
    )
}