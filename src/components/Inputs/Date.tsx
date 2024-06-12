import * as React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import style from "src/css"
import { Picker } from '@react-native-picker/picker';

export default function DatePicker() {

    const [date, setDate] = React.useState(new Date())
    const [day, setDay] = React.useState(new Date().toISOString().slice(8, 10));
    const [month, setMonth] = React.useState(new Date().toISOString().slice(5, 7));
    const [year, setYear] = React.useState(new Date().toISOString().slice(0, 4));
    const pickerRef = React.useRef();

    function open() {
        //@ts-ignore
        pickerRef.current.focus();
    }

    const DaySelector = () => {
        const days = []
        for (let index = 0; index < 31; index++) {
            if (index + 1 <= 9) {
                days.push("0" + (index + 1))
            } else {
                days.push("" + (index + 1))
            }
        }
        return (
            <Picker
                ref={pickerRef}
                selectedValue={day}
                onValueChange={(itemValue, itemIndex) =>
                    setDay(itemValue)
                }>
                {
                    days.map((e: string, index: number) => {
                        return (
                            <Picker.Item key={index} label={e} value={e} />
                        )
                    })
                }
            </Picker>
        )
    }

    return (
        <View>
            <View style={{ width: "100%", flexDirection: "row", gap: 12 }}>
                <TouchableOpacity style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6 }} onPress={open}>
                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{date.toISOString().slice(8, 10)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6 }}>
                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{date.toISOString().slice(5, 7)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ padding: 12, backgroundColor: style.Color.white, borderRadius: 6 }}>
                    <Text style={{ fontWeight: "600", fontSize: 18 }}>{date.toISOString().slice(0, 4)}</Text>
                </TouchableOpacity>
            </View>
            <DaySelector />
        </View>
    )

}