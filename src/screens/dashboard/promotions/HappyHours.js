import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import HappyHoursCard from '../../../components/membership/HappyHoursCard';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import {vh, vw} from '../../../utils/dimensions';
import { useFocusEffect } from '@react-navigation/native';
import { getAllHappyHoursData } from '../../../api/promotions/happyHours';

const HappyHours = ({navigation, route}) => {

  const [couponView, setcouponView] = useState(['', '']);
  
  useFocusEffect(
    React.useCallback(()=>{
      getAllHappyHoursData().then((res)=>{
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
        title={'Happy Hours'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {couponView.length == 0 ? (
          <View style={{marginHorizontal: vw(15), marginTop: vh(30)}}>
            <HappyHoursCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('CreateHappyHours')}
              style={{alignItems: 'center', marginTop: vh(119)}}>
              <Text
                style={{color: theme.color.LightBlue, fontSize: normalize(18)}}>
                + Create HappyHours
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            {couponView.map(item => (
              <HappyHoursCard
              data={item}
                onPressViewDetail={() => {
                  navigation.navigate(''
                    
                  );
                }}
                onPressLog={() => {
                  navigation.navigate('');
                }}
                onPressAvailHistory={() => {
                  navigation.navigate('');
                }}
              />
            ))}
          </View>
        )}
      </Container>
      <CustomButton
        label={'Add Happy Hours'}
        onPress={() => {
          navigation.navigate('CreateHappyHours');
        }}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
    </View>
  );
};

export default HappyHours;
