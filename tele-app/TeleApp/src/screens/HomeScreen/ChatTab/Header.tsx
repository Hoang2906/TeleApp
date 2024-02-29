import React from 'react';
import {Image, Text, View} from 'react-native';
import {icContactUnactive, icContactactive} from '../../../assets/path';
import useTheme from '../../../hooks/useTheme';

const Header: React.FC = () => {
  const {theme, colorPalette} = useTheme();
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 21,
            color: colorPalette.textPrimary,
          }}>
          {'Edit'}
        </Text>

        <Text
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            fontSize: 17,
            fontWeight: '500',
            lineHeight: 22,
            flex: 1,
            textAlign: 'center',
            color: colorPalette.textColor2,
          }}>
          {'Chats'}
        </Text>

        <Image
          source={theme == 'light' ? icContactactive : icContactUnactive}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </View>
    </View>
  );
};

export default Header;
