import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from "react"

const Stack = createNativeStackNavigator();

import FirstName from "src/pages/Welcome/FirstName"
import AddPhoto from "src/pages/Welcome/AddPhoto"
import Age from "src/pages/Welcome/Age"
import Gender from "src/pages/Welcome/Gender"
import DateGender from "src/pages/Welcome/DateGender"
import Level from "src/pages/Welcome/Level"
import Country from "src/pages/Welcome/Country"
import { Props } from "src/router"

export default function WelcomeScreen({ route }: Props) {

    const [routeName, setRouteName] = React.useState("");

    React.useEffect(() => {
        if (route.params) {
            if (route.params.pageIndex == 1) {
                setRouteName("FirstName")
            } else if (route.params.pageIndex == 2) {
                setRouteName("AddPhoto")
            } else if (route.params.pageIndex == 3) {
                setRouteName("Age")
            } else if (route.params.pageIndex == 4) {
                setRouteName("Gender")
            } else if (route.params.pageIndex == 5) {
                setRouteName("DateGender")
            } else if (route.params.pageIndex == 6) {
                setRouteName("Level")
            } else if (route.params.pageIndex == 7) {
                setRouteName("Country")
            }
        }
    }, [route])

    if (routeName.length == 0) {
        return
    }

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName={routeName}>
            <Stack.Screen name="FirstName" component={FirstName} />
            <Stack.Screen name="AddPhoto" component={AddPhoto} />
            <Stack.Screen name="Age" component={Age} />
            <Stack.Screen name="Gender" component={Gender} />
            <Stack.Screen name="DateGender" component={DateGender} />
            <Stack.Screen name="Level" component={Level} />
            <Stack.Screen name="Country" component={Country} />
        </Stack.Navigator>
    )

}