import * as React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import WebView from 'react-native-webview';
import style from "src/css"

export default function LoginBottom() {

    const [showTerms, setShowTerms] = React.useState(false)

    return (
        <View style={{ position: "absolute", bottom: 0, width: "100%", padding: 20, zIndex: -1 }}>
            <TouchableOpacity onPress={() => setShowTerms(true)}>
                <Text style={{ color: style.Color.white, textAlign: "center" }}>By signing up, you agree to our Terms, See how we use your data in our Privacy policy</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                visible={showTerms}
                presentationStyle={"formSheet"}
                onRequestClose={() => {
                    setShowTerms(!showTerms);
                }}
            >
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 12 }}>
                        <TouchableOpacity onPress={() => setShowTerms(false)}>
                            <Text style={{ fontWeight: "600" }}>
                                Return App
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <WebView
                        source={{ uri: 'https://www.bumbingoapp.com/general-5' }}
                    />
                </View>
            </Modal >

        </View >
    )

}