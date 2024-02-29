import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileTab from './ProfileTab/ProfileTab';
import ChatTab from './ChatTab/ChatTab';
import AppColors from '../../globals/styles/AppColors';
import {
  icContactUnactive,
  icContactactive,
  icMessageActive,
  icMessageUnactive,
} from '../../assets/path';
import {PermissionsAndroid} from 'react-native';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import {PusherEvent} from '@pusher/pusher-websocket-react-native';
import {apiRepository} from '../../networks/ApiRepository';
import {pusher} from '../../../App';
import {handleUnAuthorize} from '../../networks/ApiClient';
import useAuth from '../../hooks/useAuth';
import useTheme from "../../hooks/useTheme";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  const {signOut} = useAuth();

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).finally(() => {});
    handleUnAuthorize(() => {
      signOut();
    });
  }, []);

  useAsyncEffect(async () => {
    try {
      await pusher.init({
        apiKey: 'aff6a6ed848dc2ae6717',
        cluster: 'ap1',
      });
      await pusher.connect();

      const res = await apiRepository.getAllChats();
      const listId: number[] = res.data.data.map((item: {id: any}) => item.id);
      for (const id of listId) {
        await pusher.subscribe({
          channelName: `conversation-${id}`,
          onEvent: (event: PusherEvent) => {
            // console.log(`Event received: ${event}`);
          },
        });
      }
    } catch (e) {
      console.error(e);
    }

    return () => {
      pusher.disconnect();
    };
  }, []);

  const {colorPalette, isDark, theme} = useTheme()

  return (
    <Tab.Navigator
      screenOptions={routeProps => {
        return {
          tabBarStyle: {
            borderTopWidth: 0
          },
          tabBarActiveBackgroundColor: colorPalette.backgroundColor2,
          tabBarInactiveBackgroundColor: colorPalette.backgroundColor2,
          headerShown: false,
          tabBarLabel: props => {
            return (
              <Text
                style={{
                  color: props.focused
                    ? isDark ? "white" : AppColors.colorPrimary
                    : AppColors.color5D7B8B,
                  fontSize: 10,
                  fontWeight: '500',
                }}>
                {routeProps.route.name}
              </Text>
            );
          },
        };
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  objectFit: 'contain',
                  tintColor: isDark ? "white" : AppColors.colorPrimary
                }}
                source={focused ? icMessageActive : icMessageUnactive}
              />
            );
          },
        }}
        name="Chats"
        component={ChatTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  objectFit: 'contain',
                  tintColor: isDark ? "white" : AppColors.colorPrimary
                }}
                source={focused ? icContactactive : icContactUnactive}
              />
            );
          },
        }}
        name="Settings"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
}
