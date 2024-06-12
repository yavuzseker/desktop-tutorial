import * as React from "react"
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from "react-native"
import { Answer, Daily } from "src/hst/types";
import style from "src/css"
import { useSelector, useDispatch } from "react-redux";
import { RootState, addBumbiScore } from "src/store";
import { Props } from "src/router";
import { useLearn } from "src/hst/hooks";
import { incramentMissionComplate } from "src/store";
import { AntDesign } from '@expo/vector-icons';

export default function AnswerStep({ data, incrament, navigation, route }: Props & { data: Daily, incrament: any }) {

    const user = useSelector((e: RootState) => e.user.user)
    const learn = useLearn({ navigation, route })
    const dispatch = useDispatch()

    const [selectReferance, setSelectReferance] = React.useState(false)
    const [green, setGreen] = React.useState(false)

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

    return (
        <View style={{ flex: 1, marginTop: 120 }}>
            <Text style={{ fontSize: 24, marginTop: 12, color: style.Color.grey, marginVertical: 12, textAlign: "center" }}>
                {
                    data.question
                }
            </Text>
            <View style={{ gap: 12 }}>
            {
                data.answer.map((e, index) => {
                    return (
                        <TouchableOpacity
                        onPress={() => { answerControl(e) }}
                        key={index}
                        disabled={(data.levelId != user.levels.id) || selectReferance }
                        style={{ 
                            paddingVertical: 24, 
                            paddingHorizontal: 24, 
                            backgroundColor: selectReferance  ? (e.isCorrect  ?  (green ? '#2ecc71':'white') : '#c0392b') : 'white',
                            borderColor: selectReferance ? ((e.isCorrect && green) ? '#2ecc71' :  '#bdc3c7') : 'grey', 
                            borderWidth: 4, 
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
                            }}  // Padding'i artırdım
                    >
                        {
                            selectReferance ?
                                (e.isCorrect ? <AntDesign name="checkcircleo" size={24} color="white" /> : <AntDesign name="closecircleo" size={24} color="white" />) :
                                <View style={{ width: 24, height: 24, borderRadius: 50, borderWidth: 1, borderColor: "#bdc3c7" }} />
                        }
                        <Text style={{ fontWeight: "500", fontSize: 18 }}>{e.text}</Text>  
                    </TouchableOpacity>
                    )
                })
            }
        </View>


        </View>
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