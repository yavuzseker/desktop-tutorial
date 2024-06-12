import * as React from "react"
import { View, Dimensions } from "react-native"
import style from "src/css"

type StepperType = {
    page: number
    step: number
}

export default function Stepper({ page, step }: StepperType) {

    const unitSize = ((Dimensions.get("screen").width - 80) / page) - 8

    return (
        <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 40 }}>
            {
                new Array(page).fill(0).map((e: number, index: number) => {
                    return (
                        <View key={index} style={{
                            width: unitSize, height: 4, backgroundColor: index + 1 <= step ? style.Color.black : style.Color.black + "30", borderRadius: 6
                        }} />
                    )
                })
            }
        </View>
    )

}