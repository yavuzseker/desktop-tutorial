import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";
import { baseURL } from "../Configurations"
import axios from "axios"
const useNotification = (userId) => {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    async function registerForPushNotificationsAsync() {
        let token;
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                //alert('Failed to get push token for push notification!');
                return;
            }
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            });
        } else {
            //alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    const [Id, setUserId] = useState(userId);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);

    useEffect(() => {
        setUserId(userId)
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
        });
    }, []);


    const NotificationId = function (notificationId, userId) {
        return new Promise < IUser > ((resolve, reject) => {
            axios.get(baseURL + "api/Auth/NotificationId?notificationId=" + notificationId + "&userId=" + userId).then(res => {
                resolve(res.data)
            }).catch(({ response }) => {
                reject(response.data)
            })
        })
    }

    const setNotificationId = (userId) => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            if (token) {
                axios.get(baseURL + "service/Auth/NotificationId?notificationId=" + JSON.stringify(expoPushToken.data) + "&userId=" + userId).then(res => {

                }).catch(({ response }) => {

                })
            }
        });
    };

    return {
        expoPushToken,
        notification,
        setNotificationId
    };
};

export default useNotification;