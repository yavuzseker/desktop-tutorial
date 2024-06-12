import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Index from "src/pages/Chat"
import Message from "src/pages/Chat/Message"

export default function WelcomeScreen() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='Chat'>
            <Stack.Screen name="Chat" component={Index} />
            <Stack.Screen name="Message" component={Message} />
        </Stack.Navigator>
    )

}