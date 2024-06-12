import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Profile from "src/pages/Profile/index"
import EditProfile from "src/pages/Profile/EditProfile"

export default function WelcomeScreen() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    )

}