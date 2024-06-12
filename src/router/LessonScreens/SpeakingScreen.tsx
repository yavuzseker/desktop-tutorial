import React from "react"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from "react-redux";
import { RootState } from "src/store";

import Page from "src/pages/Learn/Study/Speaking"

import { user } from "src/hst/types";

export default function LevelsScreens({ }) {

    const Tab = createMaterialTopTabNavigator();
    const user = useSelector((e: RootState) => e.user.user) as user

    return (
        <Tab.Navigator
            initialRouteName={user.levels.name}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#394750",
                },
                tabBarActiveTintColor: '#fff',
                tabBarIndicatorStyle: { backgroundColor: "#fff" }
            }}>
            <Tab.Screen name={"Level 1"} component={Page} initialParams={{ level: 1, lessonsId: 4 }} />
            <Tab.Screen name={"Level 2"} component={Page} initialParams={{ level: 6, lessonsId: 4 }} />
            <Tab.Screen name={"Level 3"} component={Page} initialParams={{ level: 7, lessonsId: 4 }} />
        </Tab.Navigator>
    )

}