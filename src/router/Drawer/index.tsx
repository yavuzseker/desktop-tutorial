import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import style from "src/css"

const Drawer = createDrawerNavigator();

import Main from "src/router/Main"
import LearnScreen from "src/router/Learn"

function CustomDrawerContent({ navigation, state, options }: any) {
    const { routes } = state;
    return (
        <View style={{ flex: 1, paddingTop: 50 }}>
            <View style={{ paddingLeft: 20 }}>
                <Text style={{ fontSize: 16, color: style.Color.grey }}>Choose</Text>
            </View>
            {routes.map((route: any, index: number) => (

                <TouchableOpacity
                    key={index}
                    style={{ marginLeft: 20, marginTop: 30 }}
                    onPress={() => navigation.navigate(route.name)}
                >
                    <View style={{ flexDirection: "row", alignItems: "flex-start", height: 36 }}>
                        <View style={{ width: 36, height: 36, borderRadius: 36, backgroundColor: '#f39c12', justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name={route.name.includes("Learn") ? 'book' : 'flame'} size={16} color="white" />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ marginLeft: 12, width: 170 }}>
                                <Text style={{ fontSize: 20, flexWrap: "wrap", }}>{route.params.name}</Text>
                                <Text style={{ fontSize: 14, color: style.Color.grey, flexWrap: "wrap" }}>{route.name.includes("Learn") ? 'Do reading, writing, listening, speaking' : 'Make friends and find community'}</Text>
                            </View>
                            {
                                state.history[state.history.length - 1].status == 'open' ? state.history[state.history.length - 2].key.includes(route.name) ? <Ionicons name="checkmark-circle" size={26} color="#f39c12" /> : <View style={{ width: 22, height: 22, borderColor: "#95a5a6", borderWidth: 1, borderRadius: 26 }} /> : null
                            }


                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

function DrawerSceens() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={(props) => {
                return (
                    <CustomDrawerContent {...props} />
                )
            }}
        >
            <Drawer.Screen name="LearnScreen" component={LearnScreen} initialParams={{ name: "Learn" }} />
            <Drawer.Screen name="MainScreens" component={Main} initialParams={{ name: "Meet" }} />

        </Drawer.Navigator>
    );
}

export default DrawerSceens;