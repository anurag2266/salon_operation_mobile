import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import AppIcon from '../../components/common/AppIcon';

const StylistAndStaffList = ({navigation}) => {
  return (
    <Container
      title="Stylist Staff"
      leftIconName="arrow-left"
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <View
        style={{
          marginHorizontal: vw(15),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(50),
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: theme.color.grey,
              borderRadius: 10,
              width: vw(355),
              paddingHorizontal: 10,
            }}
            placeholderStyle={{color: theme.color.TextGrey}}
            placeholder="Search for stylists..."
            renderLeftIcon={() => (
              <AppIcon
                color={theme.color.grey}
                type="AntDesign"
                name="search1"
              />
            )}
          />
          <AppIcon
            color={theme.color.LightBlue}
            type="AntDesign"
            name="filter"
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
              onPress={() => {
                navigation.navigate('StylistProfile');
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: vw(78), width: vw(78), borderRadius: vw(39)}}
                source={{uri: 'https://picsum.photos/200/300'}}
              />
              <View style={{marginHorizontal: vw(17)}}>
                <Text
                  style={{
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(16),
                    color: theme.color.lightBlack,
                  }}>
                  Sunaina Singh
                </Text>
                <Text
                  style={{
                    fontFamily: theme.font.medium,
                    fontSize: normalize(12),
                    marginVertical: vh(3),
                    color: theme.color.TextGrey,
                  }}>
                  Beautician & Hair Stylist Expert
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <AppIcon color="red" type="MaterialCommunityIcons" name="delete" />
        </View>
        <TouchableOpacity>
          <Text
            style={{
              color: theme.color.LightBlue,
              fontFamily: theme.font.medium,
              fontSize: normalize(14),
            }}>
            + Add more stylists
          </Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default StylistAndStaffList;

const styles = StyleSheet.create({});
