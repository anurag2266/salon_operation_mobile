import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../../utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme/theme';
import AppIcon from '../common/AppIcon';
import { getAllMembershipData } from '../../api/membership/getMembershipData';
import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';



const MembershipCard = ({
  dummy = false,
  onPressLog,
  onPressSaleHistory,
  onPressAvailHistory,
  navigation,
  onPressViewPlan,
}) => {
  const [data,setData]=useState([])

  const handleMembershipData= async ()=>{
    const {status, message, data} = await getAllMembershipData();
    if (status) {
      console.warn('data', data);
      setData(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }

  };


  useFocusEffect(
    React.useCallback(() => {
      handleMembershipData();
    }, []),
  );



  return (

   <>
{
  data?.map((item)=>{
    return(
    <View style={styles.container}>
    <ImageBackground
      resizeMode="cover"
      style={{borderRadius: vw(10), overflow: 'hidden'}}
      source={{uri: 'https://picsum.photos/id/223/4912/3264.jpg'}}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        style={styles.linearGradient}>
        <View style={{maxWidth: '85%', padding: vw(10)}}>
          <Text style={styles.title}>{item.membershipType}</Text>
          <View
            style={{
              width: vw(90),
              backgroundColor: theme.color.white,
              paddingHorizontal: 5,
              paddingVertical: 3,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: vh(10),
              borderRadius: vw(4),
            }}>
            <Text
              style={{
                fontSize: normalize(11),
                fontFamily: theme.font.regular,
                color: '#F0405A',
              }}>
              6 Members
            </Text>
          </View>
          <Text
            style={{
              fontFamily: theme.font.regular,
              fontSize: normalize(11),
              fontWeight: '400',
              color: theme.color.white,
            }}>
           {item.shortDescription}
          </Text>
          <Text
            style={{
              color: theme.color.white,
              fontSize: normalize(11),
              fontFamily: theme.font.regular,
              fontWeight: '400',
              marginTop: vh(5),
            }}>
           {item.validity.saleEndOn}
          </Text>
          <Text
            style={{
              color: theme.color.white,
              fontSize: normalize(11),
              fontFamily: theme.font.regular,
              fontWeight: '400',
              marginTop: vh(5),
            }}>
            Phone No : +91-9876543219
          </Text>
        </View>

        <Text
          style={{
            position: 'absolute',
            top: vh(9),
            right: vw(12),
            color: theme.color.white,
            fontFamily: theme.font.medium,
            fontSize: normalize(12),
          }}>
          {item.validity.expiration}
        </Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          color={theme.color.white}
          size={17}
          onPress={() => {
            navigation.navigate('');
          }}
          style={{justifyContent: 'flex-end', marginTop: vh(60)}}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: vh(9),
            right: vw(12),
            fontFamily: theme.font.bold,
            fontSize: normalize(22),
            color: theme.color.white,
          }}>
         {item.planPrice}
        </Text>
      </LinearGradient>
    </ImageBackground>
    {dummy ? null : (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: vh(10),
        }}>
        <TouchableOpacity
          onPress={onPressViewPlan}
          style={{alignItems: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: theme.font.regular,
              color: theme.color.LightBlue,
              fontSize: normalize(13),
              fontWeight: '500',
            }}>
            View Plan
          </Text>
          <AppIcon
            type="Ionicons"
            color={theme.color.LightBlue}
            name="chevron-forward"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressLog}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: vw(5),
          }}>
          <Text
            style={{
              fontFamily: theme.font.regular,
              color: theme.color.LightBlue,
              fontSize: normalize(13),
              fontWeight: '500',
            }}>
            Log
          </Text>
          <AppIcon
            type="Ionicons"
            color={theme.color.LightBlue}
            name="chevron-forward"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressSaleHistory}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: vw(5),
          }}>
          <Text
            style={{
              fontFamily: theme.font.regular,
              color: theme.color.LightBlue,
              fontSize: normalize(13),
              fontWeight: '500',
            }}>
            Sale History
          </Text>
          <AppIcon
            type="Ionicons"
            color={theme.color.LightBlue}
            name="chevron-forward"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressAvailHistory}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: vw(5),
          }}>
          <Text
            style={{
              fontFamily: theme.font.regular,
              color: theme.color.LightBlue,
              fontSize: normalize(13),
              fontWeight: '500',
            }}>
            Availed History
          </Text>
          <AppIcon
            type="Ionicons"
            color={theme.color.LightBlue}
            name="chevron-forward"
          />
        </TouchableOpacity>
      </View>
    )}
  </View>
    )
  })
}

   </>

  
  );
};

export default MembershipCard;

const styles = StyleSheet.create({
  linearGradient: {
    padding: vw(14),
    flexDirection: 'row',
    position: 'relative',
  },
  title: {
    fontFamily: theme.font.regular,
    fontSize: normalize(35),
    fontWeight: '700',
    color: theme.color.white,
  },
  container: {
    marginTop: vh(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
});
