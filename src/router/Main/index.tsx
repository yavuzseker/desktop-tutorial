import * as React from 'react';
import { Image, View, Text } from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { Title } from 'src/components';

import fire from "src/assets/fire.png"

import Index from "src/pages/index"
import MessageScreens from "src/router/Message"
import Likes from "src/pages/Likes"
import ProfileScreens from "src/router/Profile"
import { useSwipper } from 'src/hst/hooks';

import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const Tab = createBottomTabNavigator();

export default function MainScreens() {

    const { like } = useSwipper()
    const user = useSelector((e: RootState) => e.user.user)
    const [likeSize, setLikeSize] = React.useState(0)

    React.useEffect(() => {
        if (user) {
            like({ userId: user.id }).then(res => {
                setLikeSize(res.length)
            })
        }
    }, [user])

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                header: (props) => {
                    return (
                        <Title navigation={props.navigation} options={props.options} route={props.route} />
                    )
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Index') {
                        return <Image source={fire} style={{ width: 22, height: 32 }} resizeMode='contain' />
                    } else if (route.name === 'MessageScreens') {
                        return <View style={{ position: "relative" }}>
                            <View style={{ position: "absolute", width: 8, height: 8, borderRadius: 10, backgroundColor: "#d63031", right: 0, zIndex: 5 }} />
                            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
                        </View>
                    } else if (route.name === 'ProfileScreens') {
                        iconName = "user"
                    } else if (route.name === 'Likes') {
                        return <View style={{ position: "relative" }}>
                            {
                                likeSize > 0 && <View style={{ position: "absolute", width: 8, height: 8, borderRadius: 10, backgroundColor: "#d63031", right: 0, zIndex: 5 }} />
                            }
                            <AntDesign name={"like2"} size={size} color={color} />
                        </View>;
                    }
                    //@ts-ignore
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Index" component={Index} options={{ title: "Tiningo" }} />
            <Tab.Screen name="Likes" component={Likes} options={{ title: "Likes" }} />
            <Tab.Screen name="MessageScreens" component={MessageScreens} options={{ title: "Messages" }} />
            <Tab.Screen name="ProfileScreens" component={ProfileScreens} options={{ title: "Profile" }} />
        </Tab.Navigator >
    );
}