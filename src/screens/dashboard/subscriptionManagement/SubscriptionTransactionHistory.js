import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    validity: ' 12/06/2022- 01/08/2023',
    paymentmode: 'App Store billing',
    date: '12/06/2022',
    paymentStatus: 'Completed',
    transactionType: 'Purchase',
    transactionId: '9887876789898',
  },
  {
    validity: ' 12/06/2022- 01/08/2023',
    paymentmode: 'App Store billing',
    date: '12/06/2022',
    paymentStatus: 'Completed',
    transactionType: 'Purchase',
    transactionId: '9887876789898',
  },
  {
    validity: ' 12/06/2022- 01/08/2023',
    paymentmode: 'App Store billing',
    date: '12/06/2022',
    paymentStatus: 'Completed',
    transactionType: 'Purchase',
    transactionId: '9887876789898',
  },
  {
    validity: ' 12/06/2022- 01/08/2023',
    paymentmode: 'App Store billing',
    date: '12/06/2022',
    paymentStatus: 'Completed',
    transactionType: 'Purchase',
    transactionId: '9887876789898',
  },
];

const TransactionHistory = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Transaction History'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View
          style={{
            backgroundColor: theme.color.grey,
            paddingVertical: vh(15),
            paddingHorizontal: vw(25),
          }}>
          <Text
            style={{
              fontFamily: theme.font.bold,
              color: theme.color.black,
              fontSize: normalize(16),
            }}>
            Reet Bundela
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                fontFamily: theme.font.medium,
                fontSize: normalize(16),
                color: theme.color.black,
              }}>
              reetbundela@gmail.com
            </Text>
            <Text
              style={{
                fontFamily: theme.font.medium,
                fontSize: normalize(16),
                color: theme.color.black,
              }}>
              +91-9898989898
            </Text>
          </View>
        </View>

        <LinearGradient
          colors={['#2E4353', '#456277']}
          style={[styles.boxWithShadow, styles.card]}>
          <Text
            style={{
              color: theme.color.white,
              fontFamily: theme.font.black,
              fontSize: normalize(20),
              alignSelf: 'flex-end',
            }}>
            $ 299.00
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: theme.font.bold,
                fontSize: normalize(20),
                color: theme.color.white,
              }}>
              LIV Premium
            </Text>
            <View
              style={{
                alignItems: 'center',
                padding: vw(7),
                backgroundColor: theme.color.switchOn,
                borderRadius: vw(10),
                marginLeft: vw(15),
              }}>
              <Text
                style={{
                  color: theme.color.white,
                  fontFamily: theme.font.bold,
                  fontSize: normalize(15),
                }}>
                ACTIVE
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
                marginRight: 50,
              }}>
              Validity : {'\n'} 12/06/2022 - 01/06/2023
            </Text>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
              }}>
              Date : {'\n'} 12/06/2022
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
                marginRight: 83,
              }}>
              Payment Mode : {'\n'} App Store Billing
            </Text>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
              }}>
              Payment Status: {'\n'} Completed
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
                marginRight: 90,
              }}>
              Transaction Id : {'\n'} 1567631795436
            </Text>
            <Text
              style={{
                color: theme.color.white,
                fontSize: normalize(11),
                fontFamily: theme.font.medium,
                fontWeight: '400',
                marginTop: vh(5),
              }}>
              Transaction Type : {'\n'} Purchase
            </Text>
          </View>
        </LinearGradient>
      </Container>
    </View>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  blockbutton: {
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: theme.color.primary,
    borderRadius: 10,
  },
  blockbutton2: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: theme.color.primary,
    borderRadius: 10,
  },
  viewText: {
    textAlign: 'center',
    marginTop: vh(25),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  card: {
    marginHorizontal: vw(15),
    borderRadius: vw(20),
    marginTop: vh(25),
    paddingHorizontal: vw(25),
    paddingVertical: vh(25),
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
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
    itemTxt: {
      textAlign: 'center',
      marginHorizontal: vw(30),
      paddingVertical: vh(7),
      color: theme.color.black,
      fontFamily: theme.font.bold,
      fontSize: normalize(16),
    },
    linearGradient: {
      height: vh(186),

      padding: vw(14),
      flexDirection: 'row',
      // alignItems: 'center',
      // justifyContent: 'space-between',
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
  },
});
