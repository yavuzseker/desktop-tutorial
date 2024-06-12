import * as React from "react"
import { Text, TouchableOpacity, Modal, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, ModalProps, Animated, Easing, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"


interface ComponentProp extends ModalProps {
    setVisible: Function
    title?: string
    closeButton?: boolean
}

export function TransparentModal(props: ComponentProp) {
    const visiblePanel = React.useRef(new Animated.Value(400)).current;
    const showAnimate = () => {
        Animated.timing(visiblePanel, {
            toValue: 0,
            duration: 400,
            easing: Easing.elastic(.8),
            useNativeDriver: true
        }).start(() => {

        });
    }

    const hideAnimate = () => {
        Keyboard.dismiss()
        Animated.timing(visiblePanel, {
            toValue: 330,
            duration: 400,
            easing: Easing.elastic(.8),
            useNativeDriver: true
        }).start(() => {
            props.setVisible()
        });
    }

    React.useEffect(() => {
        if (props.visible) {
            showAnimate()
        }
    }, [props.visible])

    return (
        <Modal
            animationType={props.animationType}
            visible={props.visible}
            presentationStyle={props.presentationStyle}
            transparent={props.transparent}
            onRequestClose={() => { props.setVisible() }}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <View style={{ backgroundColor: "#00000075", flex: 1, justifyContent: "flex-end" }} >
                    <KeyboardAvoidingView behavior="padding">
                        <Animated.View style={{ transform: [{ translateY: visiblePanel }] }}>
                            <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", padding: 12 }}>
                                    {
                                        props.closeButton && <TouchableOpacity onPress={() => { hideAnimate() }} style={{ padding: 8, borderRadius: 50 }}>
                                            <Ionicons name="close" size={22} color="black" />
                                        </TouchableOpacity>
                                    }
                                </View>

                                <View style={{ gap: 12, marginTop: 5 }}>
                                    {props.children}
                                </View>
                            </View>
                        </Animated.View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

