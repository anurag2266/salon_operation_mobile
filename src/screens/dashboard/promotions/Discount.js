import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container';
import CouponCard from '../../../components/membership/CouponCard';
import DiscountCard from '../../../../discount/DiscountCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import { useFocusEffect } from '@react-navigation/native';
import { getAllspecialDiscountData } from '../../../api/promotions/specialDiscount';

const Discount = ({navigation, route}) => {

  const [couponView, setcouponView] = useState(['', '']);

  useEffect(async ()=>{
    await getAllspecialDiscountData().then((res)=>{
    console.log("Here is Res:",res.data.length)
    setcouponView(res.data)
  }
  )
  .catch((err)=>{
    console.log("Here is Error",err)
  })},[])
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Special Discounts'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            <DiscountCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateSpecialDiscount')}
              style={{alignItems: 'center', marginTop: vh(119)}}>
              <Text
                style={{color: theme.color.LightBlue, fontSize: normalize(18)}}>
                + Create Discount
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            {couponView.map(item => (
              <DiscountCard
              data={item}
                onPressViewDetail={() => {
                  navigation.navigate('createSpecialDiscount'
                    
                  );
                }}
                onPressLog={() => {
                  navigation.navigate('DiscountViewlog');
                }}
                onPressAvailHistory={() => {
                  navigation.navigate('DiscountAvailedHistory');
                }}
              />
            ))}
          </View>
        )}
      </Container>
      <CustomButton
        label={'Create Special Discount'}
        onPress={() => {
          navigation.navigate('CreateSpecialDiscount');
        }}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
    </View>
  );
};

export default Discount;
