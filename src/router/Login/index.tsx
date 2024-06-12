import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Welcome from "src/pages/Login/Welcome"
import SignIn from "src/pages/Login/SignIn"
import SignUp from "src/pages/Login/SignUp"

export default function LoginScreens() {

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='Welcome'>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )

}