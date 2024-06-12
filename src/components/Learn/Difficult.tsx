import * as React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Daily } from "src/hst/types";
import style from "src/css"

export default function Difficult({ data }: { data: Daily }) {
    return (
        <View>
            <Text style={{ fontSize: 24, marginTop: 12, color: style.Color.grey, marginVertical: 12 }}>Difficult Words</Text>
            <View style={{ borderColor: style.Color.grey_6, borderWidth: 1, borderRadius: 6 }}>
                <View style={{ borderRadius: 16, backgroundColor: "#fff" }}>
                    {
                        data.keyWords.map((e, index) => {
                            return (
                                <View key={e.id}>
                                    <TouchableOpacity>
                                        <View style={{ flexDirection: "column", padding: 12 }}>
                                            <Text style={{ color: style.Color.blue }}>{e.word.split(":")[0].trim()}</Text>
                                            <Text style={{ color: style.Color.grey, flexWrap: "wrap", marginTop: 6 }}>{e.word.split(":")[1]}</Text>
                                        </View>
                                        {
                                            index < data.keyWords.length - 1 ? (<View style={{ borderBottomColor: style.Color.grey_6 + "60", borderBottomWidth: 1 }} />) : (<></>)
                                        }
                                    </TouchableOpacity>
                                    {
                                        data.keyWords.length > 1 && data.keyWords.length - 1 <= index && <View style={{ borderBottomColor: style.Color.grey_6, borderBottomWidth: 1 }} />
                                    }
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}
