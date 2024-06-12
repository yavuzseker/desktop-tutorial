import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from "react"
const Stack = createNativeStackNavigator();
import LoginScreens from "src/router/Login"
import Loading from "src/pages/Loading/Loading"
import WelcomeScreens from "src/router/Welcome"
import DrawerScreens from 'src/router/Drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useAuthStateChanged } from "src/hst/hooks"
import { useSelector } from 'react-redux';
import { RootState } from "src/store"
import { ChatType, Message } from 'src/hst/types';
export default function Router(isAuthenticated: boolean) {
    const user = useSelector((state: RootState) => state.user.user);
    return (
 
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='Loading'>
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="LoginScreens" component={LoginScreens} />
                <Stack.Screen name="WelcomeScreens" component={WelcomeScreens} />
                <Stack.Screen name="DrawerScreens" component={DrawerScreens} />
            </Stack.Navigator>
    )

}
export type RouterRootList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    Loading: undefined;
    LoginScreens: undefined;
    Manager: undefined;
    Start: undefined;
    Customer: undefined;
    Finish: undefined;
    FirstName: undefined;
    WelcomeScreens: { pageIndex: number };
    AddPhoto: undefined;
    Age: undefined;
    Gender: undefined;
    DateGender: { man: boolean, woman: boolean, non: boolean }
    Level: undefined;
    Country: undefined;
    MainScreens: undefined;
    DrawerScreens: undefined;
    Message: { message: ChatType };
    EditProfile: undefined;
    ProfileScreens: undefined;
    MessageScreens: undefined;
    ReadingScreens: undefined;
    LearnScreen: undefined;
    LearnIndex: undefined
};

export type Props = NativeStackScreenProps<RouterRootList>;
export type DrawerProps = DrawerNavigationProp<RouterRootList>;

