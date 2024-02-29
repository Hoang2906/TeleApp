import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export default function SplashScreen(props: any): React.ReactElement {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Text>
        Loading... <ActivityIndicator />
      </Text>
    </View>
  );
}
