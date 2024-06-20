import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import {} from 'react-native-gesture-handler';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import {PieChart} from 'react-native-gifted-charts';
import AppIcon from '../../../components/common/AppIcon';
import * as Progress from 'react-native-progress';

const ManageAnalytics = ({navigation}) => {
  const [option, setOption] = useState('Week');
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {value: 0, color: '#0067B4', gradientCenterColor: '#7B3DD9'},
    {value: 45, color: '#FF9E01', gradientCenterColor: '#FF9D00'},
    {value: 16, color: '#17CBBE', gradientCenterColor: '#0067B4'},
  ];

  return (
    <Container
      title={'Manage Analytics'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.weekView}>
        <TouchableOpacity
          onPress={() => {
            setOption('Week');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Week' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {color: option == 'Week' ? theme.color.white : theme.color.black},
            ]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Month');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Month' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {
                color:
                  option == 'Month' ? theme.color.white : theme.color.black,
              },
            ]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Year');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Year' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {color: option == 'Year' ? theme.color.white : theme.color.black},
            ]}>
            Year
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Date Range');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Date Range' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {
                color:
                  option == 'Date Range'
                    ? theme.color.white
                    : theme.color.black,
              },
            ]}>
            Date Range
          </Text>
        </TouchableOpacity>
      </View>
      {option == 'Week' ? (
        <>
          <Text style={styles.billingText}>Total Billings</Text>
          <View
            style={[
              styles.billingView,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.totalBilling}>Rs. 100000</Text>
            <View>
              <Text style={styles.closedBilling}>80000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ClosedBillingAmount');
                }}>
                <Text style={styles.closedText}>Closed</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.openBilling}>20000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OpenBillingAmount');
                }}>
                <Text style={styles.closedText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <Text style={styles.totalEarningText}>Total Earnings</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TotalEarning');
              }}>
              <Text style={[styles.totalBilling, {marginTop: vh(30)}]}>
                Rs. 80000
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(20),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>10000</Text>
                <Text style={styles.earningType}>Services</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>800</Text>
                <Text style={styles.earningType}>Products</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>05</Text>
                <Text style={styles.earningType}>Gift Cards</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(30),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>1000</Text>
                <Text style={styles.earningType}>Membership</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>5000</Text>
                <Text style={styles.earningType}>Package</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>2000</Text>
                <Text style={styles.earningType}>Discount Card</Text>
              </View>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: theme.font.bold,
                  fontSize: normalize(18),
                  marginBottom: vh(30),
                }}>
                Payment Methods
              </Text>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={theme.color.white}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.color.black,
                          fontFamily: theme.font.bold,
                        }}>
                        Rs. 25,000
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(35),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#FF9E01'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Cash</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#17CBBE'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Card</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#7C3EDA'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Others</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Service</Text>
              <Progress.Bar
                progress={0.8}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#1E8CF2'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Product</Text>
              <Progress.Bar
                progress={0.7}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#F565C4'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Memberships</Text>
              <Progress.Bar
                progress={0.6}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#CD7CFF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Gift Cards</Text>
              <Progress.Bar
                progress={0.5}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#79E7FF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Packages</Text>
              <Progress.Bar
                progress={0.4}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#FFABAB'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Discount Card</Text>
              <Progress.Bar
                progress={0.3}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#855CF8'}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnalyticsAppointments');
            }}>
            <Text style={styles.appointmentText}>Appointments</Text>
          </TouchableOpacity>
          <View style={[styles.billingView, {paddingHorizontal: vw(60)}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.primary},
                  ]}>
                  100
                </Text>
                <Text style={styles.appointmentNumberText}>Total</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.switchOn},
                  ]}>
                  80
                </Text>
                <Text style={styles.appointmentNumberText}>Completed</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: vh(15),
                borderColor: '#D2D2D2',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.appoinmentNumber, {color: '#FFC305'}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>No-Show</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.appoinmentNumber, {color: theme.color.red}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>Cancelled</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppIcon
                name={'pricetags-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Most Item Sold By{' '}
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Vinit(20)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(15),
              }}>
              <AppIcon
                name={'cash-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Highest Revenue
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Tisha(20,000)
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {option == 'Month' ? (
        <>
          <Text style={styles.billingText}>Total Billings</Text>
          <View
            style={[
              styles.billingView,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.totalBilling}>Rs. 100000</Text>
            <View>
              <Text style={styles.closedBilling}>80000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ClosedBillingAmount');
                }}>
                <Text style={styles.closedText}>Closed</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.openBilling}>20000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OpenBillingAmount');
                }}>
                <Text style={styles.closedText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <Text style={styles.totalEarningText}>Total Earnings</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TotalEarning');
              }}>
              <Text style={[styles.totalBilling, {marginTop: vh(30)}]}>
                Rs. 80000
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(20),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>10000</Text>
                <Text style={styles.earningType}>Services</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>800</Text>
                <Text style={styles.earningType}>Products</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>05</Text>
                <Text style={styles.earningType}>Gift Cards</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(30),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>1000</Text>
                <Text style={styles.earningType}>Membership</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>5000</Text>
                <Text style={styles.earningType}>Package</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>2000</Text>
                <Text style={styles.earningType}>Discount Card</Text>
              </View>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: theme.font.bold,
                  fontSize: normalize(18),
                  marginBottom: vh(30),
                }}>
                Payment Methods
              </Text>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={theme.color.white}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.color.black,
                          fontFamily: theme.font.bold,
                        }}>
                        Rs. 25,000
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(35),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#FF9E01'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Cash</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#17CBBE'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Card</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#7C3EDA'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Others</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Service</Text>
              <Progress.Bar
                progress={0.8}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#1E8CF2'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Product</Text>
              <Progress.Bar
                progress={0.7}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#F565C4'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Memberships</Text>
              <Progress.Bar
                progress={0.6}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#CD7CFF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Gift Cards</Text>
              <Progress.Bar
                progress={0.5}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#79E7FF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Packages</Text>
              <Progress.Bar
                progress={0.4}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#FFABAB'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Discount Card</Text>
              <Progress.Bar
                progress={0.3}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#855CF8'}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnalyticsAppointments');
            }}>
            <Text style={styles.appointmentText}>Appointments</Text>
          </TouchableOpacity>
          <View style={[styles.billingView, {paddingHorizontal: vw(60)}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.primary},
                  ]}>
                  100
                </Text>
                <Text style={styles.appointmentNumberText}>Total</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.switchOn},
                  ]}>
                  80
                </Text>
                <Text style={styles.appointmentNumberText}>Completed</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: vh(15),
                borderColor: '#D2D2D2',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.appoinmentNumber, {color: '#FFC305'}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>No-Show</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.appoinmentNumber, {color: theme.color.red}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>Cancelled</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppIcon
                name={'pricetags-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Most Item Sold By{' '}
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Vinit(20)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(15),
              }}>
              <AppIcon
                name={'cash-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Highest Revenue
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Tisha(20,000)
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {option == 'Year' ? (
        <>
          <Text style={styles.billingText}>Total Billings</Text>
          <View
            style={[
              styles.billingView,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.totalBilling}>Rs. 100000</Text>
            <View>
              <Text style={styles.closedBilling}>80000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ClosedBillingAmount');
                }}>
                <Text style={styles.closedText}>Closed</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.openBilling}>20000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OpenBillingAmount');
                }}>
                <Text style={styles.closedText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <Text style={styles.totalEarningText}>Total Earnings</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TotalEarning');
              }}>
              <Text style={[styles.totalBilling, {marginTop: vh(30)}]}>
                Rs. 80000
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(20),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>10000</Text>
                <Text style={styles.earningType}>Services</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>800</Text>
                <Text style={styles.earningType}>Products</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>05</Text>
                <Text style={styles.earningType}>Gift Cards</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(30),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>1000</Text>
                <Text style={styles.earningType}>Membership</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>5000</Text>
                <Text style={styles.earningType}>Package</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>2000</Text>
                <Text style={styles.earningType}>Discount Card</Text>
              </View>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: theme.font.bold,
                  fontSize: normalize(18),
                  marginBottom: vh(30),
                }}>
                Payment Methods
              </Text>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={theme.color.white}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.color.black,
                          fontFamily: theme.font.bold,
                        }}>
                        Rs. 25,000
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(35),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#FF9E01'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Cash</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#17CBBE'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Card</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#7C3EDA'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Others</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Service</Text>
              <Progress.Bar
                progress={0.8}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#1E8CF2'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Product</Text>
              <Progress.Bar
                progress={0.7}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#F565C4'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Memberships</Text>
              <Progress.Bar
                progress={0.6}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#CD7CFF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Gift Cards</Text>
              <Progress.Bar
                progress={0.5}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#79E7FF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Packages</Text>
              <Progress.Bar
                progress={0.4}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#FFABAB'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Discount Card</Text>
              <Progress.Bar
                progress={0.3}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#855CF8'}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnalyticsAppointments');
            }}>
            <Text style={styles.appointmentText}>Appointments</Text>
          </TouchableOpacity>
          <View style={[styles.billingView, {paddingHorizontal: vw(60)}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.primary},
                  ]}>
                  100
                </Text>
                <Text style={styles.appointmentNumberText}>Total</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.switchOn},
                  ]}>
                  80
                </Text>
                <Text style={styles.appointmentNumberText}>Completed</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: vh(15),
                borderColor: '#D2D2D2',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.appoinmentNumber, {color: '#FFC305'}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>No-Show</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.appoinmentNumber, {color: theme.color.red}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>Cancelled</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppIcon
                name={'pricetags-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Most Item Sold By{' '}
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Vinit(20)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(15),
              }}>
              <AppIcon
                name={'cash-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Highest Revenue
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Tisha(20,000)
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {option == 'Date Range' ? (
        <>
          <Text style={styles.billingText}>Total Billings</Text>
          <View
            style={[
              styles.billingView,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text style={styles.totalBilling}>Rs. 100000</Text>
            <View>
              <Text style={styles.closedBilling}>80000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ClosedBillingAmount');
                }}>
                <Text style={styles.closedText}>Closed</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.openBilling}>20000</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OpenBillingAmount');
                }}>
                <Text style={styles.closedText}>Open</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <Text style={styles.totalEarningText}>Total Earnings</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TotalEarning');
              }}>
              <Text style={[styles.totalBilling, {marginTop: vh(30)}]}>
                Rs. 80000
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(20),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>10000</Text>
                <Text style={styles.earningType}>Services</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>800</Text>
                <Text style={styles.earningType}>Products</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>05</Text>
                <Text style={styles.earningType}>Gift Cards</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(30),
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>1000</Text>
                <Text style={styles.earningType}>Membership</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>5000</Text>
                <Text style={styles.earningType}>Package</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.earningText}>2000</Text>
                <Text style={styles.earningType}>Discount Card</Text>
              </View>
            </View>
          </View>
          <View style={[styles.billingView, {marginTop: vh(30)}]}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: theme.font.bold,
                  fontSize: normalize(18),
                  marginBottom: vh(30),
                }}>
                Payment Methods
              </Text>
              <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={theme.color.white}
                centerLabelComponent={() => {
                  return (
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.color.black,
                          fontFamily: theme.font.bold,
                        }}>
                        Rs. 25,000
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(35),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#FF9E01'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Cash</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#17CBBE'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Card</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <AppIcon
                  name={'circle'}
                  type={'FontAwesome'}
                  size={12}
                  color={'#7C3EDA'}
                  style={{marginRight: vw(7)}}
                />
                <Text style={styles.text}>Others</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Service</Text>
              <Progress.Bar
                progress={0.8}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#1E8CF2'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Product</Text>
              <Progress.Bar
                progress={0.7}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#F565C4'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Memberships</Text>
              <Progress.Bar
                progress={0.6}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#CD7CFF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Gift Cards</Text>
              <Progress.Bar
                progress={0.5}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#79E7FF'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Packages</Text>
              <Progress.Bar
                progress={0.4}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#FFABAB'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(12),
              }}>
              <Text>Discount Card</Text>
              <Progress.Bar
                progress={0.3}
                width={vw(235)}
                height={vh(27)}
                borderColor={theme.color.white}
                color={'#855CF8'}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AnalyticsAppointments');
            }}>
            <Text style={styles.appointmentText}>Appointments</Text>
          </TouchableOpacity>
          <View style={[styles.billingView, {paddingHorizontal: vw(60)}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.primary},
                  ]}>
                  100
                </Text>
                <Text style={styles.appointmentNumberText}>Total</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[
                    styles.appoinmentNumber,
                    {color: theme.color.switchOn},
                  ]}>
                  80
                </Text>
                <Text style={styles.appointmentNumberText}>Completed</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                marginVertical: vh(15),
                borderColor: '#D2D2D2',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={[styles.appoinmentNumber, {color: '#FFC305'}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>No-Show</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={[styles.appoinmentNumber, {color: theme.color.red}]}>
                  10
                </Text>
                <Text style={styles.appointmentNumberText}>Cancelled</Text>
              </View>
            </View>
          </View>
          <View style={styles.billingView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <AppIcon
                name={'pricetags-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Most Item Sold By{' '}
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Vinit(20)
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(15),
              }}>
              <AppIcon
                name={'cash-outline'}
                type={'Ionicons'}
                size={20}
                color={theme.color.black}
              />
              <Text
                style={{
                  marginLeft: vw(10),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                }}>
                Highest Revenue
              </Text>
              <Text
                style={{
                  marginHorizontal: vw(60),
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                  color: theme.color.switchOn,
                }}>
                Tisha(20,000)
              </Text>
            </View>
          </View>
        </>
      ) : null}
    </Container>
  );
};

export default ManageAnalytics;

const styles = StyleSheet.create({
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    paddingHorizontal: vw(6),
    paddingVertical: vh(5),
    backgroundColor: '#D9D9D9',
    borderRadius: vw(5),
    marginTop: vh(55),
  },
  weekText: {
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
  },
  weekTouch: {
    paddingLeft: vw(20),
    paddingRight: vw(7),
    borderRadius: vh(5),
    paddingVertical: vh(4),
    alignItems: 'center',
  },
  billingText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    marginTop: vh(50),
    marginHorizontal: vw(20),
  },
  billingView: {
    shadowColor: '#D2D2D280',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
    marginHorizontal: vw(15),
    marginTop: vh(15),
    paddingHorizontal: vw(24),
    paddingVertical: vh(20),
    borderRadius: vw(20),
  },
  totalBilling: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  closedBilling: {
    color: '#FFC305',
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  closedText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    marginTop: vh(5),
  },
  openBilling: {
    color: theme.color.red,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  totalEarningText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  earningText: {
    color: theme.color.LightBlue,
    fontSize: normalize(19),
    fontFamily: theme.font.bold,
  },
  earningType: {
    color: theme.color.black,
    fontSize: normalize(15),
    fontFamily: theme.font.regular,
  },
  text: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  appointmentText: {
    marginTop: vh(40),
    marginHorizontal: vw(20),
    color: theme.color.black,
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
  },
  appoinmentNumber: {
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
  },
  appointmentNumberText: {
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    marginTop: vh(5),
    color: theme.color.black,
  },
});
