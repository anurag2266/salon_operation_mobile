import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../../components/common/Container';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';

const ManageSalonSetting = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: require('../../assets/icons/manage-your-profile.png'),
      text: 'Manage Your Profile',
      navigation: 'ProfileEdit',
    },
    {
      id: 2,
      imagePath: require('../../assets/icons/manage-salon-profile.png'),
      text: 'Manage Your Salon Profile',
      navigation: 'ManageYourSalonProfile',
    },
    {
      id: 3,
      imagePath: require('../../assets/icons/manage-your-business-hrs.png'),
      text: 'Manage Your Buisness Hours',
      navigation: 'BuisnessHours',
    },
    {
      id: 4,
      imagePath: require('../../assets/icons/manage-your-salon-photos.png'),
      text: 'Manage Your Salon Photos',
      navigation: 'ManageSalonPhotos',
    },
    {
      id: 5,
      imagePath: require('../../assets/icons/manage-your-salon-operations.png'),
      text: 'Manage Your Salon Operations',
      navigation: 'ManageSalonOperation',
    },
    {
      id: 6,
      imagePath: require('../../assets/icons/manage-services.png'),
      text: 'Manage Services',
      navigation: 'ServiceSetup',
    },
    {
      id: 7,
      imagePath: require('../../assets/icons/manage-employees.png'),
      text: 'Manage Employee',
      navigation: 'ManageEmployee',
    },
    {
      id: 8,
      imagePath: require('../../assets/icons/manage-products.png'),
      text: 'Manage Your Products',
      navigation: 'SelectedProduct',
    },
    {
      id: 9,
      imagePath: require('../../assets/icons/manage-payments.png'),
      text: 'Manage Payment Methods',
      navigation: 'AddingPaymentDetail',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        <Image source={item.imagePath} style={styles.itemImg} />
        <Text style={styles.itemTxt}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Salon Settings'}
      description={'Choose and update your salon settings'}
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
    borderWidth: 1,
    marginVertical: vh(10),
    marginHorizontal: vw(12),
    paddingHorizontal: vw(20),
    paddingVertical: vh(12),
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
  itemImg: {
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
  },
  itemTxt: {
    textAlign: 'center',
    marginHorizontal: vw(30),
    paddingVertical: vh(7),
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
});

export default ManageSalonSetting;
