import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect,useState} from 'react';
import Container from '../../../components/common/Container';
import CouponCard from '../../../components/membership/CouponCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import { getAllCouponData } from '../../../api/promotions/coupon';
import {useSelector} from 'react-redux';

const Coupons = ({navigation, route}) => {
  const [couponView, setcouponView] = useState(['']);
  const [couponData,setCouponData]=useState([])
  const {flightReducer} = useSelector(state => ({...state}));

  useEffect(()=>{
    getAllCouponData().then((res)=>{
      console.log("Here is Api Response",res.data)
      setcouponView(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Coupons'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            {/* <CouponCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateCoupon')}
              style={{alignItems: 'center', marginTop: vh(119)}}>
              <Text
                style={{color: theme.color.LightBlue, fontSize: normalize(18)}}>
                + Create Coupon
              </Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            {couponView.map(item => (
              <CouponCard
                data={item}
                onPressViewDetail={() => {
                  navigation.navigate('CreateCoupon',
                    {id:item._id}
                  );
                }}
                onPressLog={() => {
                  navigation.navigate('ViewLogHistory', {id: item._id});
                }}
                onPressAvailHistory={() => {
                  navigation.navigate('MembershipAvailedHistory',{
                    id:item._id
                  });
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

export default Coupons;
