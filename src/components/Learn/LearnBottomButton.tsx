import * as React from "react"
import { View, Text, Dimensions, TouchableOpacity } from "react-native"

export default function LearnBottomButton({ step, progress, setStep }: { step: number, progress: Function, setStep: Function }) {

    const width = Dimensions.get("window").width

    const incerement = () => {
        setStep(step + 1)
        const w = width - 66;
        progress((w / 3) * (step + 1))
    }

    return (
        <>
            {
                step != 3 ? (
                    <View style={{
                        paddingHorizontal: 36, paddingVertical: 20, backgroundColor: "#fff", borderTopStartRadius: 24, borderTopEndRadius: 24,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: .4,
                        shadowRadius: 3,
                    }}>
                        <TouchableOpacity style={{ backgroundColor: "#3498db", padding: 12, borderRadius: 6 }} onPress={() => { incerement() }}>
                            <Text style={{ color: "#fff", textAlign: "center" }}>Continue</Text>
                        </TouchableOpacity>
                    </View>) : (<></>)
            }
        </>
    )

}