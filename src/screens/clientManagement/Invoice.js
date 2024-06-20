import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';

const Invoice = ({navigation}) => {
  const [down, setDown] = useState(false);
  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      date: '21/04/22 ',
      time: '2:05 pm',
      name: 'Hair Cut',
      stylistName: 'Rebecca Beck',
      timeTaken: '120 min',
      timeFromTo: '11:30 AM to 1:15 PM',
      service: 'Service Completed',
      discount: 'Membership Discount Applied',
      member: 'Ellen (Primary Member)',
    },
    {
      id: 2,
      imagePath: LocalImages.Profile,
      date: '21/04/22 ',
      time: '2:05 pm',
      name: 'Hair Colour',
      stylistName: 'Rebecca Beck',
      timeTaken: '120 min',
      timeFromTo: '11:30 AM to 1:15 PM',
      service: 'Service Completed',
      discount: 'Membership Discount Applied',
      member: 'Ellen (Primary Member)',
    },
  ];

  const data = [
    {
      id: 1,
      name: 'Hair Cut',
      haircutAmt: 'Rs 4000',
      discountCard: '-Rs 2000',
      stylistCharges: 'Rs 50',
      netServiceCharges: 'Rs 1600',
      advance: '-Rs 1000',
      amountPayable: 'Rs 600',
      gstCharge: 'Rs 108',
      totalAmount: 'Rs 708',
    },
  ];

  return (
    <Container
      title={'Invoice'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.serviceView}>
        <Text style={styles.time}>Today, 21st April, 2022 at 1:30pm</Text>
        <Text style={styles.duration}>1h 45min duration, ends at 3:15pm</Text>
        <View style={[styles.btnTouch, {marginHorizontal: vw(21)}]}>
          <Text style={styles.btnText}>Service Completed</Text>
        </View>
        <Text style={styles.booking}>Booking ref: 3A0087OIPO</Text>
        <View style={styles.salonServiceView}>
          <Text style={styles.salonServiceText}>Salon Service</Text>
          <View style={[styles.icon, {marginLeft: '40%'}]}>
            <AppIcon
              name={'call'}
              type={'Ionicons'}
              size={17}
              color={theme.color.primary}
            />
          </View>
          <View style={styles.icon}>
            <AppIcon
              name={'mic'}
              type={'Ionicons'}
              size={17}
              color={theme.color.primary}
            />
          </View>
        </View>
      </View>
      <View style={[styles.mainview]}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: vw(27),
            paddingVertical: vh(12),
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/Profile.png')}
            style={{
              width: vw(72),
              height: vh(72),
              borderRadius: vw(100),
            }}
          />
          <View style={{marginLeft: vw(20)}}>
            <Text
              style={{
                fontFamily: theme.font.medium,
                fontSize: normalize(18),
                color: theme.color.black,
              }}>
              Tarun Sharma
            </Text>
            <Text
              style={{
                fontFamily: theme.font.regular,
                color: theme.color.TextGrey,
                fontSize: normalize(12),
              }}>
              +91-XXXXXX3219
            </Text>
          </View>
        </View>
        <View style={{borderBottomWidth: 0.5, borderBottomColor: 'grey'}} />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(5),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[
              styles.cat,
              {backgroundColor: '#FFC305', flexDirection: 'row'},
            ]}>
            <View style={styles.iconView}>
              <AppIcon
                name={'star'}
                type={'AntDesign'}
                size={15}
                color="#FFC305"
              />
            </View>
            <Text style={[styles.catTxt, {color: theme.color.black}]}>
              Primary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cat,
              {
                backgroundColor: '#80B4FB',
                marginHorizontal: vw(20),
                flexDirection: 'row',
              },
            ]}>
            <View style={styles.iconView}>
              <AppIcon
                name={'tag'}
                type={'FontAwesome5'}
                size={15}
                color="#80B4FB"
              />
            </View>
            <Text style={[styles.catTxt, {color: 'white'}]}>Influencer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cat,
              {backgroundColor: '#FE4A60', flexDirection: 'row'},
            ]}>
            <View style={styles.iconView}>
              <AppIcon
                name={'crown'}
                type={'FontAwesome5'}
                size={15}
                color={theme.color.red}
              />
            </View>
            <Text style={[styles.catTxt, {color: 'white'}]}>VIP</Text>
          </TouchableOpacity>
        </View>
      </View>
      {DATA.map(item => {
        return (
          <>
            <View style={styles.mainview}>
              <Text style={[styles.stylistNameText, {alignSelf: 'flex-end'}]}>
                {item.date} at {item.time}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={item.imagePath}
                  style={{
                    borderRadius: vw(100),
                    width: vw(86),
                    height: vh(86),
                  }}
                />
                <View style={{marginLeft: vw(16)}}>
                  <Text
                    style={[styles.stylistNameText, {fontSize: normalize(18)}]}>
                    {item.name}
                  </Text>
                  <Text style={styles.stylistNameText}>
                    Stylist Update :{' '}
                    <Text style={{color: theme.color.black}}>
                      {item.stylistName}
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.stylistNameText,
                        {color: theme.color.dropdownColor},
                      ]}>
                      {item.timeTaken}
                    </Text>
                    <View
                      style={{
                        borderLeftWidth: 1,
                        marginHorizontal: vw(15),
                        marginTop: vh(5),
                        borderColor: theme.color.dropdownColor,
                      }}></View>
                    <Text
                      style={[
                        styles.stylistNameText,
                        {color: theme.color.dropdownColor},
                      ]}>
                      {item.timeFromTo}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme.color.dropdownColor,
                  marginTop: vh(30),
                }}
              />
              <View
                style={[
                  styles.btnTouch,
                  {marginHorizontal: vw(21), marginVertical: vh(15)},
                ]}>
                <Text style={styles.btnText}>{item.service}</Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: theme.color.dropdownColor,
                }}
              />
              <Text
                style={{
                  fontSize: normalize(14),
                  fontFamily: theme.font.bold,
                  color: theme.color.primary,
                  marginTop: vh(10),
                }}>
                {item.discount}
              </Text>
              <Text
                style={{
                  fontSize: normalize(14),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  marginTop: vh(10),
                }}>
                {item.member}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setDown(!down);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                marginTop: vh(30),
              }}>
              <Text style={styles.viewBillText}>
                View Bill Summary of Hair Cut
              </Text>
              {down ? (
                <AppIcon
                  name={'down'}
                  type={'AntDesign'}
                  size={15}
                  style={{marginLeft: vw(15)}}
                  color={theme.color.LightBlue}
                />
              ) : (
                <AppIcon
                  name={'up'}
                  type={'AntDesign'}
                  size={15}
                  style={{marginLeft: vw(15)}}
                  color={theme.color.LightBlue}
                />
              )}
            </TouchableOpacity>
            {down ? (
              <>
                {data.map(item => {
                  return (
                    <View style={[styles.mainview]}>
                      <Text
                        style={{
                          color: theme.color.black,
                          fontFamily: theme.font.bold,
                          fontSize: normalize(18),
                        }}>
                        Summary : {item.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.primary},
                            ]}>
                            Hair Cut{' '}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.dropdownColor},
                            ]}>
                            Discount Card Redemption{' '}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.primary},
                            ]}>
                            Stylist Charges{' '}
                          </Text>
                          <Text style={styles.dataText}>
                            Net Service Value{' '}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.primary},
                            ]}>
                            Advance{' '}
                          </Text>
                          <Text style={styles.dataText}>
                            Amount Payable Pre GST{' '}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.primary},
                            ]}>
                            GST to Charge @18%
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.dataText}>{item.haircutAmt}</Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.dropdownColor},
                            ]}>
                            {item.discountCard}
                          </Text>
                          <Text style={styles.dataText}>
                            {item.stylistCharges}
                          </Text>
                          <Text style={styles.dataText}>
                            {item.netServiceCharges}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.dropdownColor},
                            ]}>
                            {item.advance}
                          </Text>
                          <Text style={styles.dataText}>
                            {item.amountPayable}
                          </Text>
                          <Text
                            style={[
                              styles.dataText,
                              {color: theme.color.dropdownColor},
                            ]}>
                            {item.gstCharge}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderTopWidth: 1,
                          paddingTop: vh(17),
                          marginTop: vh(20),
                        }}>
                        <Text
                          style={{
                            fontFamily: theme.font.bold,
                            fontSize: normalize(18),
                            color: theme.color.primary,
                          }}>
                          Total Paid Amount{' '}
                        </Text>
                        <Text
                          style={{
                            fontFamily: theme.font.bold,
                            fontSize: normalize(18),
                            color: theme.color.primary,
                          }}>
                          {item.totalAmount}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </>
            ) : null}
          </>
        );
      })}
      <TouchableOpacity>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: normalize(14),
            marginTop: vh(30),
            marginHorizontal: vw(24),
            color: theme.color.LightBlue,
          }}>
          Refund Amount to Client
        </Text>
      </TouchableOpacity>
      <View style={styles.clientMainView}>
        <TouchableOpacity style={[styles.clientView, styles.boxWithShadow]}>
          <Image
            source={LocalImages.callClient}
            style={{width: vw(31), height: vh(31)}}
          />
        </TouchableOpacity>
        <Text style={styles.clientText}>Call Client</Text>
      </View>
      <View style={styles.clientMainView}>
        <TouchableOpacity style={[styles.clientView, styles.boxWithShadow]}>
          <Image
            source={LocalImages.shareBooking}
            style={{width: vw(31), height: vh(31)}}
          />
        </TouchableOpacity>
        <Text style={styles.clientText}>Share Booking</Text>
      </View>
      <View style={styles.paymentDetailView}>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: normalize(16),
            color: theme.color.black,
          }}>
          Payment Detail
        </Text>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: normalize(16),
            color: theme.color.dropdownColor,
            marginTop: vh(12),
          }}>
          Paid : Using UPI
        </Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  serviceView: {
    borderRadius: vw(20),
    backgroundColor: 'rgba(0, 120, 253, 0.1)',
    marginTop: vh(25),
  },
  time: {
    color: theme.color.black,
    marginTop: vh(40),
    fontFamily: theme.font.bold,
    marginHorizontal: vw(16),
    fontSize: normalize(16),
  },
  salonServiceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(21),
    paddingVertical: vh(15),
    backgroundColor: theme.color.primary,
    borderBottomLeftRadius: vw(20),
    borderBottomRightRadius: vw(20),
    alignItems: 'center',
  },
  icon: {
    borderRadius: vw(20),
    borderWidth: 1,
    padding: 10,
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  salonServiceText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  duration: {
    marginTop: vh(11),
    marginHorizontal: vw(21),
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  btnTouch: {
    marginTop: vh(9),
    borderWidth: 1,
    borderColor: theme.color.switchOn,
    paddingVertical: vh(12),
    borderRadius: vw(20),
    backgroundColor: theme.color.switchOn,
    alignItems: 'center',
    width: '60%',
  },
  btnText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  booking: {
    alignSelf: 'flex-end',
    marginHorizontal: vw(24),
    fontFamily: theme.font.regular,
    fontSize: normalize(13),
    marginBottom: vh(18),
    marginTop: vh(5),
    color: theme.color.black,
  },
  cat: {
    borderWidth: 0.5,
    borderColor: 'white',
    paddingRight: vh(17),
    paddingLeft: vw(4),
    paddingVertical: vh(6),
    marginTop: vh(18),
    borderRadius: vw(20),
    alignItems: 'center',
  },
  catTxt: {
    marginLeft: vw(10),
    fontFamily: theme.font.bold,
    color: theme.color.white,
    fontSize: normalize(12),
  },
  iconView: {
    borderWidth: 1,
    padding: vw(7),
    borderRadius: vw(100),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  mainview: {
    marginTop: vh(30),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(10),
    borderRadius: 18,
    padding: 20,
    marginHorizontal: vw(15),
  },
  stylistNameText: {
    marginTop: vh(5),
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    color: theme.color.primary,
  },
  viewBillText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  dataText: {
    marginTop: vh(14),
    fontFamily: theme.font.semiBold,
    color: theme.color.black,
    fontSize: normalize(14),
  },
  clientView: {
    padding: vw(10),
    borderWidth: 1,
    borderRadius: vw(40),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  clientMainView: {
    flexDirection: 'row',
    marginHorizontal: vw(16),
    alignItems: 'center',
    paddingVertical: vh(20),
  },
  clientText: {
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    marginLeft: vw(15),
  },
  paymentDetailView: {
    marginBottom: vh(50),
    marginTop: vh(10),
    paddingHorizontal: vw(24),
    paddingVertical: vh(15),
    borderStyle: 'dashed',
    borderRadius: 1,
    borderWidth: 1,
  },
});

export default Invoice;
