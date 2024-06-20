import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import CouponCard from '../../../components/membership/CouponCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import CashbackCard from '../../../components/membership/CashbackCard';
import { useFocusEffect } from '@react-navigation/native';
import { getAllCashbacksData } from '../../../api/promotions/cashback';

const CashbackOffers = ({navigation, route}) => {

  const [couponView, setcouponView] = useState(['']);

  useFocusEffect(
    React.useCallback(()=>{
      getAllCashbacksData().then((res)=>{
        console.log(res.data)
        setcouponView(res.data)
      }
      )
      .catch((err)=>{
        console.log("Here is Error",err)
      })

    },[])
  )

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Cashback Offers'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            <CashbackCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateCoupon')}
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
              <CashbackCard
                data={item}
                onPressViewDetail={() => {
                  navigation.navigate('createSpecialDiscount'
                  );
                }}
                onPressLog={() => {
                  navigation.navigate('ViewLogHistory');
                }}
                onPressAvailHistory={() => {
                  navigation.navigate('MembershipAvailedHistory');
                }}
              />
            ))}
          </View>
        )}
      </Container>
      <CustomButton
        label={'Create Cashback Offers'}
        onPress={() => {
          navigation.navigate('CreateCashback');
        }}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
    </View>
  );
};

export default CashbackOffers;
