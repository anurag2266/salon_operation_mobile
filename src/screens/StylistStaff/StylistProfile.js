import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';

const StylistProfile = ({navigation}) => {
  return (
    <Container
      title="Stylist Profile"
      leftIconName="arrow-left"
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <ImageBackground
        source={{uri: 'https://picsum.photos/300/500'}}
        style={{
          height: vh(243),
          width: '100%',
          position: 'relative',
          flexDirection: 'row',
        }}
        resizeMode="cover">
        <View
          style={{
            alignSelf: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: vh(20),
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: theme.color.white,
              fontFamily: theme.font.semiBold,
              fontSize: normalize(16),
            }}>
            Sunaina Singh
          </Text>
          <View style={{flexDirection: 'row'}}>
            <AppIcon
              style={{marginHorizontal: 10}}
              type="Entypo"
              name="camera"
              color={theme.color.white}
            />
            <AppIcon
              type="MaterialCommunityIcons"
              name="delete"
              color={theme.color.white}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={{marginHorizontal: vw(11)}}>
        <View
          style={{
            marginVertical: vh(10),
            paddingVertical: vh(10),
            borderBottomWidth: 1,
            borderColor: theme.color.grey,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppIcon
                type={'Feather'}
                name="info"
                color={theme.color.lightBlack}
              />
              <View style={{marginHorizontal: vw(17)}}>
                <Text
                  style={{
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(16),
                    color: theme.color.lightBlack,
                  }}>
                  Personal Info
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <AppIcon
            color={theme.color.grey}
            type="Ionicons"
            name="chevron-forward"
          />
        </View>
        <View
          style={{
            marginVertical: vh(10),
            paddingVertical: vh(10),
            borderBottomWidth: 1,
            borderColor: theme.color.grey,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppIcon
                type={'Ionicons'}
                name="person"
                color={theme.color.lightBlack}
              />
              <View style={{marginHorizontal: vw(17)}}>
                <Text
                  style={{
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(16),
                    color: theme.color.lightBlack,
                  }}>
                  Job Profile
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <AppIcon
            color={theme.color.grey}
            type="Ionicons"
            name="chevron-forward"
          />
        </View>
        <View
          style={{
            marginVertical: vh(10),
            paddingVertical: vh(10),
            borderBottomWidth: 1,
            borderColor: theme.color.grey,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppIcon
                type={'MaterialCommunityIcons'}
                name="store-clock"
                color={theme.color.lightBlack}
              />
              <View style={{marginHorizontal: vw(17)}}>
                <Text
                  style={{
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(16),
                    color: theme.color.lightBlack,
                  }}>
                  Working Hours Of The Stylist
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <AppIcon
            color={theme.color.grey}
            type="Ionicons"
            name="chevron-forward"
            onPress={() => {
              navigation.navigate('StylistCalender');
            }}
          />
        </View>
      </View>
    </Container>
  );
};

export default StylistProfile;

const styles = StyleSheet.create({});
