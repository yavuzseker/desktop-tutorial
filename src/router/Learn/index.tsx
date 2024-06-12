import { NativeStackHeaderProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Text } from "react-native"
const Stack = createNativeStackNavigator();

import { Ionicons } from '@expo/vector-icons';
import LearnIndex from "src/pages/Learn"
import ReadingScreens from "src/router/LessonScreens/ReadingScreen"
import WritingScreens from "src/router/LessonScreens/WritingScreen"
import ListeningScreen from "src/router/LessonScreens/ListeningScreen"
import SpeakingScreen from "src/router/LessonScreens/SpeakingScreen"

export default function LearnScreens() {

    const options = {
        header: (props: NativeStackHeaderProps) => {
            return (
                <View style={{ paddingTop: 50, paddingHorizontal: 24, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#394750", }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Ionicons name="chevron-back" size={32} color="#fff" />
                    </TouchableOpacity>
                    <Text style={{ color: "#FFF", fontWeight: "600", fontSize: 16 }}>{props.route.name.split("Screen")[0]}</Text>
                    <View></View>
                </View>
            )
        },
        headerShown: true
    }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='LearnIndex'>
            <Stack.Screen name="LearnIndex" component={LearnIndex} />
            <Stack.Screen
                key={"Reading"}
                options={{ ...options }}
                name="ReadingScreen" component={ReadingScreens} />
            <Stack.Screen
                options={options}
                name="WritingScreen" component={WritingScreens} />
            <Stack.Screen
                options={options}
                name="ListeningScreen" component={ListeningScreen} />
            <Stack.Screen
                options={options}
                name="SpeakingScreen" component={SpeakingScreen} />
        </Stack.Navigator>
    )

}