import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppColors from '../../globals/styles/AppColors';
import {NavigationRef} from '../../../App';
import ChatModel from '../../networks/models/ChatModel';
import {apiRepository} from '../../networks/ApiRepository';
import useAuth from '../../hooks/useAuth';
import MessageModel from '../../networks/models/MessageModel';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import {
  icContactUnactive,
  icContactactive,
  iconBack,
  iconBackWihte,
  iconError,
  iconLoading,
  iconSend,
  iconStikerSend,
  iconSuccess,
} from '../../assets/path';
import useTheme from '../../hooks/useTheme';
import {formatDate} from '../../utils/utils';

export default function ChatDetailScreen(props: any) {
  const dataModal = props?.data;
  console.log();

  const {route} = props;
  const {authData} = useAuth();
  const chatItemData: ChatModel = route?.params || dataModal;
  const chatItemId = chatItemData?.id;

  const chatUserId = authData.user?.user?.id;
  const {theme, colorPalette} = useTheme();

  const [listMessage, setListMessage] = useState<MessageModel[]>([]);
  const [textChat, setTextChat] = useState('');
  const opacityHideValue = useRef(new Animated.Value(0)).current;
  const opacityDisplayValue = useRef(new Animated.Value(0)).current;

  const startAnimation = (toValue: number) => {
    Animated.timing(opacityHideValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const endAnimation = (toValue: number) => {
    Animated.timing(opacityDisplayValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  async function _getAllMessage() {
    try {
      const res = await apiRepository.getAllMessages(0, 10, chatItemId);

      if (res.status == 200) {
        const newRes = res.data.data.map((item: MessageModel) => {
          return {...item, status: 'sent'};
        });
        setListMessage(newRes);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function appendNewMessage(message: MessageModel) {
    setListMessage([message, ...listMessage]);
  }

  function _getReceiver() {
    return chatItemData?.users.find(item => {
      return item.id != authData?.user?.user.id;
    });
  }

  const receiver = _getReceiver();

  async function _sendMessage() {
    const date = new Date();
    const id = date.getTime();
    try {
      const now = date.toISOString();

      appendNewMessage({
        id,
        createdAt: now,
        updatedAt: now,
        content: textChat,
        sender: authData.user?.user!,
        status: 'sending',
      });
      const res = await apiRepository.sendMessage(chatItemId, textChat);

      if (res.status === 200) {
        // loop qua list message, update trang thai id bang status moi
        setListMessage(prev => {
          return prev.map(item => {
            if (item.id == id) {
              return {
                ...item,
                id: res.data.id,
                status: 'sent',
              } as MessageModel;
            }
            return item;
          });
        });
      } else {
        setListMessage(prev => {
          return prev.map(item => {
            if (item.id == id) {
              return {
                ...item,
                status: 'error',
              } as MessageModel;
            }
            return item;
          });
        });
      }
    } catch (e) {
      console.log(e);
      setListMessage(prev => {
        return prev.map(item => {
          if (item.id == id) {
            return {
              ...item,
              status: 'error',
            } as MessageModel;
          }
          return item;
        });
      });
    }
  }

  useAsyncEffect(async () => {
    await _getAllMessage();
  }, [dataModal]);

  useEffect(() => {
    startAnimation(1);
    endAnimation(0);
  }, []);

  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView
      style={[
        styles.mainContainer,
        {
          backgroundColor: colorPalette.backgroundColor2,
        },
      ]}>
      <View style={styles.header}>
        {!dataModal && (
          <TouchableOpacity
            onPress={() => {
              NavigationRef.current?.goBack();
            }}>
            <View style={[styles.flexRowCenter, {gap: 8}]}>
              <Image
                style={{
                  width: 12,
                  height: 21,
                }}
                source={theme == 'light' ? iconBack : iconBackWihte}
              />
              <Text
                style={{
                  color: colorPalette.textPrimary,
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Back
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Text
          style={{
            color: colorPalette.textColor1,
            fontSize: 17,
            fontWeight: '700',
          }}>
          {receiver?.full_name}
        </Text>
        {receiver?.avatar && (
          <Image
            style={{borderRadius: 999, width: 37, height: 37}}
            source={{uri: receiver?.avatar}}
          />
        )}
      </View>
      <ImageBackground
        source={
          theme == 'light'
            ? require('../../assets/images/background.png')
            : require('../../assets/images/bg_dark.png')
        }
        resizeMode="cover"
        style={{
          flex: 1,
        }}>
        <FlatList
          inverted
          data={listMessage}
          renderItem={({item}) => {
            const {time} = formatDate(item.createdAt);
            return (
              <View
                style={{
                  backgroundColor:
                    item.sender.id == chatUserId
                      ? colorPalette.backgroundColor4
                      : colorPalette.backgroundColor1,
                  marginBottom: 4,
                  marginHorizontal: 8,
                  maxWidth: (windowWidth * 65) / 100,
                  alignSelf:
                    item.sender.id !== chatUserId ? 'flex-start' : 'flex-end',
                  padding: 6,
                  borderRadius: 12,
                }}
                key={item.id}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: colorPalette.textColor1,
                    paddingRight: 74,
                  }}>
                  {item.content}
                </Text>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 6,
                    right: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Text
                    style={{
                      color: colorPalette.textColor2,
                    }}>
                    {time}
                  </Text>
                  {item.status == 'sending' ? (
                    <ActivityIndicator size="small" />
                  ) : (
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        marginLeft: 6,
                      }}
                      source={item.status == 'sent' ? iconSuccess : iconError}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
      </ImageBackground>

      {!dataModal && (
        <View style={styles.textInputContainer}>
          <Image
            style={styles.textInputIcon}
            source={require('../../assets/icons/ic_attach.png')}
          />
          <TextInput
            onChangeText={e => {
              setTextChat(e);
              startAnimation(e ? 0 : 1);
              endAnimation(e ? 1 : 0);
            }}
            placeholderTextColor={colorPalette.textColor2}
            value={textChat}
            style={[styles.textInput, {color: colorPalette.textColor1}]}
            placeholder="Message"
          />
          <Pressable
            onPress={() => {
              if (textChat.length > 0) {
                _sendMessage();
                setTextChat('');
              }
            }}>
            <Animated.Image
              style={{
                width: 22,
                height: 22,
                objectFit: 'contain',
                opacity: opacityHideValue,
              }}
              source={require('../../assets/icons/ic_mic.png')}
            />
            <Animated.Image
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                opacity: opacityDisplayValue,
              }}
              source={iconSend}
            />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    gap: 4,
    paddingVertical: 6,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 16,
  },
  textInputIcon: {
    width: 26,
    height: 19,
    objectFit: 'contain',
  },
});
