import React, {useMemo, useRef, useState} from 'react';
import {
  Alert,
  Animated,
  Image,
  Modal,
  PanResponder,
  Pressable,
  Switch,
  Text,
  View,
} from 'react-native';
import {GestureResponderEvent} from 'react-native/Libraries/Types/CoreEventTypes';
import createAnimatedComponent = Animated.createAnimatedComponent;
import {icContactactive, iconArchive, iconDelete} from '../../../assets/path';
import ChatModel from '../../../networks/models/ChatModel';
import useTheme from '../../../hooks/useTheme';
import useAuth from '../../../hooks/useAuth';

interface ChatItemProps {
  enableScrollView: (isEnable: boolean) => void;
  onPress: () => void;
  onLongPress: () => void;
  data: ChatModel;
}

const ChatItem: React.FC<ChatItemProps> = props => {
  const {enableScrollView, onLongPress, onPress, data} = props;
  const {theme, colorPalette} = useTheme();
  function snap() {
    enableScrollView(true);
    //@ts-ignore
    const currentValue: number = swipeValue.__getValue();

    Animated.spring(swipeValue, {
      toValue: currentValue > -75 ? 0 : -150,
      useNativeDriver: false,
    }).start();
  }

  function reset() {
    enableScrollView(true);

    Animated.spring(swipeValue, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      onPanResponderMove: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > 20) {
          enableScrollView(false);
          // console.log('onPanResponderMove', gestureState.dx);
          swipeValue.setValue(Math.max(gestureState.dx, -150));
        }
      },
      onPanResponderEnd: () => {
        // console.log('onPanResponderEnd');
        snap();
      },
      onPanResponderStart: () => {
        // console.log('onPanResponderStart');
      },
      onPanResponderTerminationRequest: () => {
        // console.log('onPanResponderTerminationRequest');
        snap();
        return true;
      },
      onStartShouldSetPanResponder: () => {
        // console.log('onStartShouldSetPanResponder');
        return true;
      },
      onMoveShouldSetPanResponder: () => {
        // console.log('onMoveShouldSetPanResponder');
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => {
        // console.log('onMoveShouldSetPanResponderCapture');
        return true;
      },
      onStartShouldSetPanResponderCapture: (_, gestureState) => {
        // console.log('onStartShouldSetPanResponderCapture');
        const {dx, dy} = gestureState;
        if (dx == 0 && dy == 0) {
          // console.log("delegate to children's handler");
          reset();
          return false;
        }
        return true;
      },
    }),
  ).current;

  const swipeValue = useRef(new Animated.Value(0)).current;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const backgroundAnim = useRef(new Animated.Value(0)).current;

  const scaleAnimator = useMemo(() => {
    const stage1 = Animated.timing(scaleAnim, {
      duration: 150,
      toValue: 0.95,
      useNativeDriver: false,
    });
    const stage2 = Animated.timing(scaleAnim, {
      duration: 150,
      toValue: 1,
      useNativeDriver: false,
    });
    return Animated.sequence([stage1, stage2]);
  }, [scaleAnim]);

  const backgroundAnimator = useMemo(() => {
    const stage1 = Animated.timing(backgroundAnim, {
      duration: 150,
      toValue: 1,
      useNativeDriver: false,
    });

    const stage2 = Animated.timing(backgroundAnim, {
      duration: 150,
      toValue: 0,
      useNativeDriver: false,
    });

    return Animated.sequence([stage1, stage2]);
  }, [backgroundAnim]);

  function onLongPressHandle(_: GestureResponderEvent) {
    const animator = Animated.parallel([scaleAnimator, backgroundAnimator]);
    animator.reset();
    animator.start(result => {
      if (result.finished) {
        onLongPress();
      }
    });
  }

  function onPressHandle(_: GestureResponderEvent) {
    const animator = backgroundAnimator;
    animator.reset();
    animator.start(result => {
      if (result.finished) {
        onPress();
      }
    });
  }

  const AnimatedPressable = createAnimatedComponent(Pressable);

  const date = new Date(data.createdAt);
  const {
    authData: {user},
  } = useAuth();

  function _getReceiver() {
    return data.users.find(item => {
      return item.id != user?.user.id;
    });
  }

  const receiver = _getReceiver();

  // Convert the date to local time.
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const time = `${day}/${month}`;
  return (
    <View>
      <ChatBackground swipeDistance={swipeValue} />
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [
            {
              translateX: swipeValue,
            },
          ],
        }}>
        <AnimatedPressable
          onPress={onPressHandle}
          onLongPress={onLongPressHandle}
          style={{
            flexDirection: 'row',
            padding: 9,
            transform: [
              {
                scale: scaleAnim,
              },
            ],
            backgroundColor: backgroundAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                theme == 'light'
                  ? colorPalette.backgroundColor1
                  : colorPalette.backgroundColor2,
                colorPalette.backgroundColor2,
              ],
              extrapolate: 'clamp',
            }),
          }}>
          <Image
            height={60}
            width={60}
            source={{
              uri: receiver?.avatar,
            }}
            style={{
              borderRadius: 30,
              overflow: 'hidden',
            }}
          />
          <View
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                lineHeight: 21,
                color: colorPalette.textColor2,
                marginBottom: 10,
              }}>
              {receiver?.full_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 20,
                color: colorPalette.textColor2,
              }}>
              {data.last_message?.content}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 20,
                color: '#8E8E93',
                marginBottom: 14,
              }}>
              {time}
            </Text>
            {/* <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                paddingVertical: 1,
                paddingHorizontal: 5,
                backgroundColor: '#AEAEB2',
                color: 'white',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              {'1'}
            </Text> */}
          </View>
        </AnimatedPressable>
        <View
          style={{
            borderBottomColor: colorPalette.textColor2,
            borderBottomWidth: 0.2,
            marginLeft: 80,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ChatItem;

interface ChatBackgroundProps {
  swipeDistance: Animated.Value;
}

const ChatBackground: React.FC<ChatBackgroundProps> = props => {
  const {swipeDistance} = props;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: swipeDistance.interpolate({
          inputRange: [-150, 0],
          outputRange: [150, 0],
          extrapolate: 'clamp',
        }),
        right: 0,
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: 75,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
        }}>
        <Image
          source={iconDelete}
          style={{
            width: 25,
            height: 25,
            marginBottom: 4,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 13,
            fontWeight: '500',
          }}>
          Delete
        </Text>
      </View>
      <View
        style={{
          width: 75,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#BBBBC3',
        }}>
        <Image
          source={iconArchive}
          style={{
            width: 25,
            height: 25,
            marginBottom: 4,
          }}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 13,
            fontWeight: '500',
          }}>
          Archive
        </Text>
      </View>
    </Animated.View>
  );
};
