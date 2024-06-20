import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../common/AppIcon';

const bubbles = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
const comboData = [
  {
    id: 1,
    imagePath: require('../../assets/icons/promotionCoupons.png'),
    discountPercent: '10%',
    discount: 'Discount',
    billValue: 'Rs. 1000 Min. bill value',
  },
];

const SpecialDiscountCard = ({
  data,
  dummy = false,
  onPressViewDetail,
  onPressLog,
  onPressAvailHistory,
}) => {

  return (
    <>
      <LinearGradient
        colors={['#2E4353', '#456277']}
        style={[styles.linearGradientView, styles.boxWithShadow]}>
        <View style={[styles.topView]}>
          {bubbles.map(item => (
            <View style={styles.bubbleView} />
          ))}
        </View>
        <View
          style={{
            padding: 30,
            marginVertical: vh(20),
          }}>
          
              <View style={styles.couponView}>
                <Image
                  //source={data.imageUrl}
                  style={{width: vw(60), height: vh(60)}}
                />
                <View style={{marginHorizontal: vw(10)}}>
                  <Text
                    style={{
                      color: theme.color.white,
                      fontFamily: theme.font.bold,
                      fontSize: normalize(40),
                    }}>
                 xyz
                  </Text>
                  <Text
                    style={{
                      color: theme.color.white,
                      fontFamily: theme.font.bold,
                      fontSize: normalize(12),
                    }}>
                    Discount
                  </Text>
                </View>
                <View style={styles.billValueView}>
                  <Text style={styles.billValueText}>Rs.{data.minBillValue} Min. bill value</Text>
                </View>
              </View>
           
        </View>
      </LinearGradient>
      {dummy ? null : (
        <View
          style={{
            flexDirection: 'row',
            marginVertical: vh(10),
            marginHorizontal: vw(33),
          }}>
          <TouchableOpacity
            onPress={onPressViewDetail}
            style={{alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styles.dummyTexts}>View Detail</Text>
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
            <Text style={styles.dummyTexts}>View Log</Text>
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
            <Text style={styles.dummyTexts}>Availed History</Text>
            <AppIcon
              type="Ionicons"
              color={theme.color.LightBlue}
              name="chevron-forward"
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  linearGradientView: {
    borderRadius: vw(20),
    marginTop: vh(20),
  },
  topView: {
    backgroundColor: theme.color.white,
    height: vh(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 4,
    backgroundColor: theme.color.white,
    borderWidth: 0.1,
    borderColor: theme.color.primary,
  },
  bubbleView: {
    height: vh(40),
    width: vh(40),
    borderRadius: 25,
    backgroundColor: theme.color.white,
  },
  couponView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: vh(24),
    borderColor: theme.color.white,
    width: '50%',
  },
  billValueView: {
    borderWidth: 1,
    borderRadius: vw(5),
    padding: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    marginLeft: vw(30),
  },
  billValueText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
  },
  dummyTexts: {
    fontFamily: theme.font.regular,
    color: theme.color.LightBlue,
    fontSize: normalize(13),
    fontWeight: '500',
  },
});

export default SpecialDiscountCard;
