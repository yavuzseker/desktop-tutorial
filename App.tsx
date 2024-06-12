import React, { useEffect, useState,useRef} from 'react';
import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import Router from "./src/router";
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStateChanged } from 'src/hst/hooks/AuthHooks';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const { isLogin } = useAuthStateChanged();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("phoenix_auth");
                console.log("Retrieved token:", token);
                setIsAuthenticated(!!token);
            } catch (error) {
                console.error("Failed to retrieve the token:", error);
                setIsAuthenticated(false);  // Consider how to handle errors - perhaps treat as not authenticated
            }
            setIsLoading(false);
        };

        checkToken();
    }, []);


    return (
     
        <Provider store={store}>
                  <NavigationContainer>
            <Router isAuthenticated={isAuthenticated} />
        </NavigationContainer>
        </Provider>
        
    );
};

export default App;

console.log("App has loaded");  // Bu log, modül yüklendiğinde çalışır
