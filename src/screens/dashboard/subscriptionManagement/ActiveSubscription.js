import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import { normalize, vh, vw } from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import { useState } from 'react';
import { CustomButton } from '../../../components/common/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

const ActiveSubscription = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: theme.color.white }}>
      <Container
        title={'Subscription Management'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={{ alignItems: 'center', paddingTop: vh(30) }}>
          <TouchableOpacity style={styles.blockbutton}>
            <Text
              style={{
                color: theme.color.white,
                fontFamily: theme.font.bold,
                fontSize: normalize(16),
              }}>
              Restore Purchases
            </Text>
          </TouchableOpacity>
        </View>
        <LinearGradient
          colors={['#2E4353', '#456277']}
          style={[styles.card, styles.boxWithShadow]}>

          <Text
            style={{
              fontFamily: theme.font.medium,
              fontSize: normalize(15),
              color: theme.color.white,
              paddingBottom: vw(10)
            }}>
            Offer of the day

          </Text>

          <Text
            style={{
              fontFamily: theme.font.bold,
              fontSize: normalize(20),
              color: theme.color.white,

            }}>
            Hair and Skin Care Offer

          </Text>
          <Text
            style={{
              fontFamily: theme.font.bold,
              fontSize: normalize(25),
              color: theme.color.white,
              paddingBottom: vw(20)
            }}>
            Rs. 599 On

          </Text>

          <View style={{ backgroundColor: theme.color.white, borderRadius: vw(20), alignSelf: "flex-start", padding: 10, width: vw(287), height: vh(180), borderBottomLeftRadius: 0 }}>
            <Text
              style={{
                fontFamily: theme.font.bold,
                fontSize: normalize(13),
                marginTop: vh(7),
                color: theme.color.black,
                marginHorizontal: vw(10)
              }}>
              Facial
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontSize: normalize(13),
                fontFamily: theme.font.bold,
                marginTop: vh(7),
                marginHorizontal: vw(10)
              }}>
              Hair Cut
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontSize: normalize(13),
                fontFamily: theme.font.bold,
                marginTop: vh(7),
                marginHorizontal: vw(10)
              }}>
              Conditioning
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontSize: normalize(13),
                fontFamily: theme.font.bold,
                marginTop: vh(7),
                marginHorizontal: vw(10)
              }}>
              L'Oreal Hair Spa Kit
            </Text>
            <Text
              style={{
                color: theme.color.black,
                fontSize: normalize(13),
                fontFamily: theme.font.bold,
                marginTop: vh(7),
                marginHorizontal: vw(10)
              }}>
              Hair Wash
            </Text>
          </View>
          <TouchableOpacity style={styles.blockbutton2}>
            <Text
              style={{
                color: theme.color.primary,
                fontFamily: theme.font.bold,
                fontSize: normalize(16),
              }}>
              Active Plan Now
            </Text>
          </TouchableOpacity>
        </LinearGradient>


        <View style={[styles.card2, styles.boxWithShadow]}>
          <Text style={{ fontFamily: theme.font.bold, color: theme.color.black, fontSize: normalize(20), margin:vw(5) }}>Active Plans</Text>
          <View style={[styles.boxWithShadow, styles.boxView]}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image
                source={LocalImages.training}
                style={{ width: vw(112), height: vh(126) }}
              />
              <View style={{ marginHorizontal: vw(11) }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontFamily: theme.font.regular,
                    color: theme.color.black,
                    fontSize: normalize(14), width: vw(200)
                  }}>
                    Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam
                    imperdiet mi

                  </Text>

                </View>


                <TouchableOpacity
                  style={{ marginTop: vh(28) }}
                  onPress={() => {
                    navigation.navigate('');
                  }}>
                  <Text style={{ color: "#0078FD", fontFamily: theme.font.medium }}>Cancel Plan </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[styles.boxWithShadow, styles.boxView,{paddingTop:vw(20)}]}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image
                source={LocalImages.training}
                style={{ width: vw(112), height: vh(126) }}
              />
              <View style={{ marginHorizontal: vw(11) }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{
                    fontFamily: theme.font.regular,
                    color: theme.color.black,
                    fontSize: normalize(14), width: vw(200)
                  }}>
                    Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam
                    imperdiet mi

                  </Text>

                </View>


                <TouchableOpacity
                  style={{ marginTop: vh(28) }}
                  onPress={() => {
                    navigation.navigate('');
                  }}>
                  <Text style={{ color: "#0078FD", fontFamily: theme.font.medium }}>Cancel Plan </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', paddingTop: vh(30) }}>
          <TouchableOpacity style={styles.blockbutton3}>
            <Text
              style={{
                color: "#929292",
                fontFamily: theme.font.bold,
                fontSize: normalize(16),
                padding:10,
                alignSelf:"center"
              }}>
              Add More Subscriptions
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SubscriptionTransactionHistory');
          }}>
          <Text style={styles.viewText}>View More</Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
};

export default ActiveSubscription;

const styles = StyleSheet.create({
  blockbutton: {
    alignItems: 'center',
    paddingVertical: vh(14),
    backgroundColor: theme.color.primary,
    borderRadius: vw(10),
    paddingHorizontal: vw(90),
  },
  blockbutton2: {
    // alignItems: 'flex-start',
    alignSelf: 'flex-start',
    paddingVertical: vh(14),
    paddingHorizontal: vw(30),
    backgroundColor: theme.color.white,
    marginTop: vh(15),
    borderRadius: vw(10),
  },
  blockbutton3: {
    // alignItems: 'flex-start',
    width:vw(350),
    borderRadius:15,
    height:vh(80),
    alignSelf: 'center',
    paddingVertical: vh(14),
    paddingHorizontal: vw(30),
    backgroundColor: "#EDEDED",
    marginTop: vh(15),
    borderRadius: vw(10),
  },
  viewText: {
    textAlign: 'center',
    marginTop: vh(25),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  card: {
    marginHorizontal: vw(25),
    borderRadius: vw(20),
    marginTop: vh(25),
    paddingHorizontal: vw(25),
    paddingVertical: vh(25),
  },
  card2: {
    marginHorizontal: vw(25),
    borderRadius: vw(20),
    marginTop: vh(25),
    paddingHorizontal: vw(25),
    paddingVertical: vh(25),
    backgroundColor: "#ecede6"
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: { width: 0, height: 1 },
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
    completed: {
      fontFamily: theme.font.regular,
      color: theme.color.black,
      fontSize: normalize(14),
    },
    linearGradient: {
      height: vh(186),
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
  },
});
