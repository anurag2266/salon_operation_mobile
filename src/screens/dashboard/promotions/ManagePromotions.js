import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import { getAllCouponData } from '../../../api/promotions/coupon';

const ManagePromotions = ({navigation}) => {
  
  const DATA = [
    {
      id: 1,
      imagePath: require('../../../assets/icons/promotionCoupons.png'),
      mainHeading: 'Coupons',
      detail: 'View Details',
      navigation: 'CreateCoupon',
    },
    {
      id: 2,
      imagePath: require('../../../assets/icons/promotionLoyaltyPoints.png'),
      mainHeading: 'Loyalty Points',
      detail: 'View Details',
      navigation: 'CreateLoyalityPoints',
    },
    {
      id: 3,
      imagePath: require('../../../assets/icons/promotionComboOffers.png'),
      mainHeading: 'Combo Offers',
      detail: 'View Details',
      navigation: 'CreateComboOffers',
    },
    {
      id: 4,
      imagePath: require('../../../assets/icons/promotionSpecialDiscount.png'),
      mainHeading: 'Special Discount',
      detail: 'View Details',
      navigation: 'CreateSpecialDiscount',
    },
    {
      id: 5,
      imagePath: require('../../../assets/icons/promotionHappyHours.png'),
      mainHeading: 'Happy Hours',
      detail: 'View Details',
      navigation: 'CreateHappyHours',
    },
    {
      id: 6,
      imagePath: require('../../../assets/icons/promotionCashback.png'),
      mainHeading: 'Cashback',
      detail: 'View Details',
      navigation: 'CreateCashback',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <LinearGradient
          colors={['#2E4353', '#456277']}
          style={styles.linearGradient}>
          <View style={styles.imgView}>
            <Image
              source={item.imagePath}
              style={{width: vw(60), height: vh(60)}}
            />
          </View>
          <Text style={styles.mainHeading}>{item.mainHeading}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.navigation, {type: item.mainHeading});
            }}
            style={styles.touch}>
            <Text style={styles.detailTxt}>{item.detail}</Text>
            <AppIcon
              name={'arrow-right'}
              type={'MaterialCommunityIcons'}
              size={10}
              color={theme.color.white}
            />
          </TouchableOpacity>
        </LinearGradient>
        <AppIcon
          name={'pluscircle'}
          type={'AntDesign'}
          size={33}
          onPress={() => {
            navigation.navigate(item.navigation);
          }}
          color={theme.color.white}
          style={styles.plusIcon}
        />
      </>
    );
  };

  return (
    <Container
      title={'Manage Promotions'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vh(30), marginHorizontal: vw(5)}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingVertical: vw(14),
    paddingHorizontal: vw(30),
    marginHorizontal: vw(25),
    borderRadius: vw(20),
    borderWidth: 1,
    marginTop: vh(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgView: {
    borderWidth: 1,
    borderRadius: vw(60),
    padding: vw(8),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  mainHeading: {
    textAlign: 'center',
    marginVertical: vh(10),
    fontFamily: theme.font.bold,
    color: theme.color.white,
    fontSize: normalize(13),
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  detailTxt: {
    fontFamily: theme.font.medium,
    fontSize: normalize(10),
    color: theme.color.white,
    marginRight: vw(6),
  },
  plusIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: vw(40),
    top: vh(30),
    borderWidth: 1.37,
    borderColor: theme.color.black,
    borderRadius: vw(20),
  },
});

export default ManagePromotions;
