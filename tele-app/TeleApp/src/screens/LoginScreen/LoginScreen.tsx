import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {apiRepository} from '../../networks/ApiRepository';
import AppColors from '../../globals/styles/AppColors';
import UserModel from '../../networks/models/UserModel';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
const windowWith = Dimensions.get('window').width;

export default function LoginScreen() {
  const {signIn} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const {theme, toggleTheme, colorPalette} = useTheme();

  async function _login() {
    try {
      const res = await apiRepository.login(phoneNumber, password);
      if (res.status == 200) {
        const user = res.data.data;
        signIn(user);
      } else {
        Alert.alert('Không thể đăng nhập');
      }
    } catch (e) {
      Alert.alert('Thông tin đăng nhập không chính xác');
    }
  }
  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {backgroundColor: colorPalette.backgroundColor1},
      ]}>
      <Image
        style={{width: 120, height: 120, marginBottom: 50}}
        source={require('../../assets/images/logo.png')}
      />
      <Text
        style={{
          fontSize: 30,
          color: AppColors.colorPrimary,
          fontWeight: '700',
          marginBottom: 20,
        }}>
        Login
      </Text>
      <TextInput
        onChangeText={e => {
          setPhoneNumber(e);
        }}
        placeholderTextColor={colorPalette.textColor2}
        value={phoneNumber}
        style={[styles.textInput, {color: colorPalette.textColor1}]}
        placeholder="Phone number"
      />
      <TextInput
        onChangeText={e => {
          setPassword(e);
        }}
        placeholderTextColor={colorPalette.textColor2}
        value={password}
        style={[styles.textInput, {color: colorPalette.textColor1}]}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: AppColors.colorPrimary,
        }}>
        Forget password?
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (phoneNumber.length !== 0 && password.length !== 0) {
            _login();
          } else {
            Alert.alert('Vui lòng nhập đủ thông tin');
          }
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 16,
            width: windowWith - 32,
            backgroundColor: AppColors.colorPrimary,
            borderRadius: 10,
            marginTop: 30,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 1)',
            }}>
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textInput: {
    width: windowWith - 32,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#5D7B8B',
    borderRadius: 12,

    fontWeight: '500',
    fontSize: 16,
  },
});
