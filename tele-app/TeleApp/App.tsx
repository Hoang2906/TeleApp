import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef
} from "@react-navigation/native";
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen/ChatDetailScreen';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import useAuth from './src/hooks/useAuth';
import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';
import AppColors from "./src/globals/styles/AppColors";
import { StatusBar } from "react-native";
import useTheme from './src/hooks/useTheme';

export type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  ChatDetailScreen: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
export const NavigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export const pusher = Pusher.getInstance();

function App(): JSX.Element {
  useEffect(() => {
    // messaging()
    //   .getToken()
    //   .then(token => {
    //     console.log(`token ${token}`);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });

    return messaging().onMessage(async remoteMessage => {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      const {notification} = remoteMessage;

      // Display a notification
      await notifee.displayNotification({
        title: notification?.title,
        body: notification?.body,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
    });
  }, []);

  const {authData} = useAuth();

  const {theme, colorPalette} = useTheme()

  return (
    <NavigationContainer ref={NavigationRef}>
      <StatusBar
        barStyle={theme == "light"? "dark-content": "light-content"}
        backgroundColor={colorPalette.backgroundColor2}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {authData.user?.user ? (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
        <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
