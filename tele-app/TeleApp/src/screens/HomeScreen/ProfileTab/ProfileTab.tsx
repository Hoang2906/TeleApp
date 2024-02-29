import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Pressable,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAuth from '../../../hooks/useAuth';
import {apiRepository} from '../../../networks/ApiRepository';
import UserProflileModel from '../../../networks/models/UserProfileModel';
import AppColors from '../../../globals/styles/AppColors';
import {
  iconAppearance,
  iconArrowRight,
  iconData,
  iconLock,
  iconNotifi,
  iconPhone,
  iconSave,
  iconSticker,
} from '../../../assets/path';
import {SafeAreaView} from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme';

const ProfileTab: React.FC = () => {
  const {signOut} = useAuth();
  const [profileData, setProfileData] = useState<UserProflileModel>();
  const {theme, toggleTheme, colorPalette} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  async function _getProfile() {
    try {
      const res = await apiRepository.getProfile();
      if (res.status == 200) {
        setProfileData(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    _getProfile();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colorPalette.backgroundColor2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 8,
        }}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={theme == 'light' ? AppColors.colorPrimary : '#f4f3f4'}
          onValueChange={toggleTheme}
          value={theme == 'light'}
        />
        <Text
          style={{
            color: colorPalette.textPrimary,
            textAlign: 'right',
            marginVertical: 10,
          }}>
          Edit
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
        }}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image
            style={{width: 90, height: 90, borderRadius: 100}}
            source={{uri: profileData?.avatar}}
          />
        </Pressable>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            marginTop: 6,
            color: colorPalette.textColor1,
          }}>
          {profileData?.full_name}
        </Text>
        <Text
          style={{
            color: colorPalette.textColor2,
          }}>
          {profileData?.phone_number}
        </Text>
      </View>
      <ScrollView
        style={{
          marginBottom: 10,
        }}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.profileItemWrap}>
          <ProfileItem avt={iconSave} text={'Saved Messages'} line={true} />
          <ProfileItem avt={iconPhone} text={'Recent Calls'} line={true} />
          <ProfileItem avt={iconSticker} text={'Stickers'} line={false} />
        </View>
        <View style={styles.profileItemWrap}>
          <ProfileItem
            avt={iconNotifi}
            text={'Notifications and Sounds'}
            line={true}
          />
          <ProfileItem
            avt={iconLock}
            text={'Privacy and Security'}
            line={true}
          />
          <ProfileItem avt={iconData} text={'Data and Storage'} line={true} />
          <ProfileItem avt={iconAppearance} text={'Appearance'} line={false} />
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            paddingHorizontal: 8,
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: 32,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#000',
              opacity: 0.5,
            }}
          />
          <View
            style={{
              elevation: 1,
              backgroundColor: colorPalette.backgroundColor2,
              padding: 8,
              borderRadius: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={[styles.imageModal]}
                  source={{uri: profileData?.avatar}}
                />
                <Image
                  style={{
                    position: 'absolute',
                    width: 32,
                    height: 32,
                  }}
                  source={require('../../../assets/icons/ic_camera.png')}
                />
              </View>
              <Image
                style={[styles.imageModal]}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnUJcz4ZsgSeeBRKwwkMW94dxAjjPkCYVKw&usqp=CAU',
                }}
              />
              <Image
                style={[styles.imageModal]}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBjAwW9hP9WGGL_cZhL3BJQNdcHvLcfHDBQ&usqp=CAU',
                }}
              />
              <Image
                style={[styles.imageModal]}
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMxy5GxnaEeQg9jS335lVnlwmbamBMrCeziw&usqp=CAU',
                }}
              />
            </View>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text
                style={[styles.textModal, {color: colorPalette.textColor1}]}>
                Choose Photo
              </Text>
              <Text
                style={[styles.textModal, {color: colorPalette.textColor1}]}>
                Web Search
              </Text>
              <Text
                style={[styles.textModal, {color: colorPalette.textColor1}]}>
                View Photo
              </Text>
              <View>
                <Text
                  style={[
                    {
                      color: 'red',
                      fontSize: 20,
                      paddingVertical: 8,
                      textAlign: 'center',
                      fontWeight: '400',
                    },
                  ]}>
                  Remove Photo
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={{
              backgroundColor: colorPalette.backgroundColor2,
              marginTop: 5,
              borderRadius: 14,
              elevation: 1,
              padding: 10,
              alignItems: 'center',
            }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text
              style={{
                color: colorPalette.textColor1,
                fontSize: 20,
                paddingVertical: 4,
                textAlign: 'center',
                fontWeight: '400',
              }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  imageModal: {
    width: 84,
    height: 84,
    borderRadius: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileItemWrap: {
    marginBottom: 35,
    elevation: 1,
  },
  textModal: {
    width: '100%',
    fontSize: 20,
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: '400',
    borderBottomWidth: 0.2,
    borderColor: 'rgba(184, 184, 190, 0.29)',
  },
});
interface ProfileItemProps {
  avt: any;
  text: string;
  line: boolean;
}

export function ProfileItem(props: ProfileItemProps) {
  const {avt, text, line} = props;
  const {theme, toggleTheme, colorPalette} = useTheme();

  return (
    <View
      style={{
        backgroundColor: colorPalette.backgroundColor1,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 15,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{
            width: 29,
            height: 29,
          }}
          source={avt}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: '400',
              color: colorPalette.textColor1,
            }}>
            {text}
          </Text>
          <Image
            style={{
              height: 12,
              width: 7,
            }}
            source={iconArrowRight}
          />
        </View>
      </View>
      {line ? (
        <Image
          style={{
            height: 2,
            position: 'absolute',
            bottom: 0,
            left: 60,
          }}
          source={require('../../../assets/icons/line.png')}></Image>
      ) : null}
    </View>
  );
}
