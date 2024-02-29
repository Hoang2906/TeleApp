import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {iconBack} from '../../assets/path';
import appColors from '../styles/AppColors';
import {useNavigation} from '@react-navigation/native';

interface GoBackProps {
  name: string;
}

export default function GoBack(props: GoBackProps): React.ReactElement {
  const navigation = useNavigation();
  const {name} = props;

  return (
    <Pressable
      onPress={() => {
        navigation.goBack();
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          marginTop: 16,
        }}>
        <Image
          style={{
            width: 32,
            height: 32,
          }}
          source={iconBack}
        />
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: appColors.color112A37,
          }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
}
