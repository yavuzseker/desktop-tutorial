import * as React from "react"
import { View, Text, Dimensions, Animated, TouchableOpacity } from "react-native"

type props = {
    message?: string,
    onShow?: Function,
    show: boolean
}

export default function ErrorModal({ show, onShow, message }: props) {

    const opacity = React.useRef(new Animated.Value(0)).current;

    const visible = () => {
        Animated.timing(opacity, {
            duration: 200,
            toValue: 1,
            useNativeDriver: true
        }).start();
    }

    const hidden = () => {
        Animated.timing(opacity, {
            duration: 200,
            toValue: 0,
            useNativeDriver: true
        }).start(() => {
            if (onShow) {
                onShow(false)
            }
        });
    }

    React.useEffect(() => {
        show ? visible() : hidden()
    }, [show])

    if (!show) {
        return (<></>)
    }

    return (
        <Animated.View style={{ opacity: opacity, position: "absolute", left: 0, top: 0 }}>
            <View style={{ width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080", padding: 25 }}>
                <View style={{ padding: 25, backgroundColor: "#FFF", width: "90%", borderRadius: 6, gap: 12 }}>
                    <Text style={{ color: "red" }}>There is a problem</Text>
                    <Text>{message}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <TouchableOpacity onPress={() => hidden()}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )

}