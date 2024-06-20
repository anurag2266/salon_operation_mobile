import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container';

import ComboOfferCard from '../../../components/membership/ComboOfferCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import { getAllCashbacksData } from '../../../api/promotions/cashback';
import { useFocusEffect } from '@react-navigation/native';

const Cashback = ({navigation, route}) => {

  const [couponView, setcouponView] = useState(['']);


  useFocusEffect(
    React.useCallback(()=>{
      getAllCashbacksData().then((res)=>{
        console.log("Here is APi Respinse:",res)
      }
      )
      .catch((err)=>{
        console.log("Here is Error",err)
      })

    })
  )
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Combo Offers'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            <ComboOfferCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateComboOffers')}
              style={{alignItems: 'center', marginTop: vh(119)}}>
              <Text
                style={{color: theme.color.LightBlue, fontSize: normalize(18)}}>
                + Create Coupon
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            {couponView.map(item => (
              <ComboOfferCard
                onPressViewDetail={() => {
                  navigation.navigate('CreateCashback'
                    
                  );
                }}
                onPressLog={() => {
                  navigation.navigate('ComboOfferViewLog');
                }}
                onPressAvailHistory={() => {
                  navigation.navigate('ComboOfferAvailedHistory');
                }}
              />
            ))}
          </View>
        )}
      </Container>
      <CustomButton
        label={'Create Cashback'}
        onPress={() => {
          navigation.navigate('CreateCashback');
        }}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
    </View>
  );
};

export default Cashback
