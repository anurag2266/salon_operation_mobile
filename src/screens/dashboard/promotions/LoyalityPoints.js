import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import LoyalityPointsCard from '../../../components/membership/LoyalityPointsCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import { getAllLoyaltypointData } from '../../../api/promotions/loyalityPoints';
import { useFocusEffect } from '@react-navigation/native';

const LoyalityPoints = ({navigation, route}) => {

  const [couponView, setcouponView] = useState(['', '']);


  useFocusEffect(
    React.useCallback(()=>{
      getAllLoyaltypointData().then((res)=>{
        setcouponView(res.data)
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
        title={'Loyality points'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            <LoyalityPointsCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateLoyalityPoints')}
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
              <LoyalityPointsCard
              data={item}
                onPressViewDetail={() => {
                  navigation.navigate('CreateLoyalityPoints'
                    
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
        label={'Create Coupons'}
        onPress={() => {
          navigation.navigate('CreateCoupon');
        }}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
    </View>
  );
};

export default LoyalityPoints;
