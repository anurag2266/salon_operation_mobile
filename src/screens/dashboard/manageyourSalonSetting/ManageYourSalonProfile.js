import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';

const ManageYourSalonProfile = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      text: 'Set Your Address',
      navigation: 'MapViewScreen',
    },
    {
      id: 2,
      text: 'Set Business Categories',
      navigation: 'SetBusinessCategory',
    },
    {
      id: 3,
      text: 'Set Salon Details',
      navigation: 'SetSalonDetails',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation, {from: 'manageScreen'});
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        <Text style={styles.itemTxt}>{item.text}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Manage Your Salon Profile'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vh(30)}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: vh(10),
    marginHorizontal: vw(12),
    paddingHorizontal: vw(20),
    paddingVertical: vh(25),
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemTxt: {
    textAlign: 'center',
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
});

export default ManageYourSalonProfile;
