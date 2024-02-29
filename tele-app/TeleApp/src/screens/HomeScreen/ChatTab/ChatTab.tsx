import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import ChatItem from './ChatItem';
import Header from './Header';
import {NavigationRef} from '../../../../App';
import {apiRepository} from '../../../networks/ApiRepository';
import ChatModel from '../../../networks/models/ChatModel';
import useTheme from '../../../hooks/useTheme';
import {useFocusEffect} from '@react-navigation/native';
import ChatDetailScreen from '../../ChatDetailScreen/ChatDetailScreen';

const ChatTab: React.FC = () => {
  const [allChat, setAllchat] = useState<ChatModel[]>([]);
  const [searchChat, setSearchChat] = useState<string>('');
  const [filter, setFilter] = useState<ChatModel[]>([]);
  const [enableScroll, setEnableScroll] = useState(true);

  const [dataModal, setDataModal] = useState<ChatModel>();

  const {colorPalette, isDark} = useTheme();
  async function _getAllChats() {
    try {
      const res = await apiRepository.getAllChats();
      if (res.status == 200) {
        setAllchat(res.data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      // call api
      _getAllChats();
    }, []),
  );

  useEffect(() => {
    if (!searchChat) {
      setFilter(allChat);
    } else {
      const searchAllChat = allChat.filter(item => {
        return item.users[0].full_name.includes(searchChat);
      });
      setFilter(searchAllChat);
    }
  }, [searchChat, allChat]);

  const offsetValue = useRef(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const searchHeightAnim = offsetValue.current.interpolate({
    inputRange: [0, 50],
    outputRange: [36, 0],
    extrapolate: 'clamp',
  });

  const flatListRef = React.createRef<FlatList>();

  function enableScrollView(isEnable: boolean) {
    setEnableScroll(isEnable);
  }
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorPalette.backgroundColor2,
      }}>
      <Header />

      <Animated.View
        style={{
          backgroundColor: colorPalette.backgroundColor3,
          marginHorizontal: 10,
          marginVertical: offsetValue.current.interpolate({
            inputRange: [0, 50],
            outputRange: [10, 0],
            extrapolate: 'clamp',
          }),
          borderRadius: 10,
          overflow: 'hidden',
          height: searchHeightAnim,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={{
            fontSize: 16,
            position: 'absolute',
            color: colorPalette.textColor1,
          }}
          value={searchChat}
          onChangeText={e => {
            setSearchChat(e);
          }}
          placeholderTextColor={colorPalette.textColor2}
          placeholder="🔎 Search for messages or users"
        />
      </Animated.View>

      <FlatList
        scrollEnabled={enableScroll}
        ref={flatListRef}
        onResponderRelease={e => {
          //@ts-ignore
          const offsetY = offsetValue.current.__getValue();

          if (offsetY > 50) {
            return;
          }

          flatListRef.current?.scrollToOffset({
            animated: true,
            offset: offsetY < 25 ? 0 : 50,
          });
        }}
        onScroll={e => {
          offsetValue.current.setValue(e.nativeEvent.contentOffset.y);
        }}
        data={filter}
        renderItem={({item}) => {
          return (
            <ChatItem
              data={item}
              onLongPress={() => {
                setDataModal(item);
                setModalVisible(true);
              }}
              onPress={() => {
                NavigationRef.current?.navigate('ChatDetailScreen', item);
              }}
              enableScrollView={enableScrollView}
            />
          );
        }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
            }}
          />
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.4,
            backgroundColor: '#000',
          }}></Pressable>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <View
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                height: 500,
                width: windowWidth - 32,
              }}>
              <ChatDetailScreen data={dataModal} />
            </View>
            <View
              style={{
                borderRadius: 16,
                backgroundColor: colorPalette.backgroundColor2,
                width: (windowWidth - 32) / 1.5,
                marginTop: 12,
              }}>
              <View style={[styles.modalItemWrapper, {borderTopWidth: 0}]}>
                <Text
                  style={[styles.textModal, {color: colorPalette.textColor1}]}>
                  Mark as Unread
                </Text>
                <Image
                  style={[
                    styles.iconModal,
                    {tintColor: isDark ? 'white' : '#000'},
                  ]}
                  source={require('../../../assets/icons/ic_message_mask.png')}
                />
              </View>
              <View style={styles.modalItemWrapper}>
                <Text
                  style={[styles.textModal, {color: colorPalette.textColor1}]}>
                  Pin
                </Text>
                <Image
                  style={[
                    styles.iconModal,
                    {tintColor: isDark ? 'white' : '#000'},
                  ]}
                  source={require('../../../assets/icons/ic_pin.png')}
                />
              </View>
              <View style={styles.modalItemWrapper}>
                <Text
                  style={[styles.textModal, {color: colorPalette.textColor1}]}>
                  Mute
                </Text>
                <Image
                  style={[
                    styles.iconModal,
                    {tintColor: isDark ? 'white' : '#000'},
                  ]}
                  source={require('../../../assets/icons/ic_mute.png')}
                />
              </View>
              <View style={styles.modalItemWrapper}>
                <Text style={[styles.textModal, {color: 'red'}, {}]}>
                  Delete
                </Text>
                <Image
                  tintColor={'red'}
                  style={[styles.iconModal]}
                  source={require('../../../assets/icons/ic_delete.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 0.2,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconModal: {
    width: 19,
    height: 19,
    objectFit: 'contain',
  },
  textModal: {
    fontSize: 17,
    fontWeight: '500',
  },
});

export default ChatTab;
