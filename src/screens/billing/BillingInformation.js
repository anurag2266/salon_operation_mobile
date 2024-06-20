import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import AppIcon from '../../components/common/AppIcon';
import theme from '../../theme/theme';
import LocalImages from '../../utils/LocalImages';
import CustomButton from '../../components/common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import BillingRBSheetComponent from '../../components/common/BillingRBSheetComponent';
import LinearGradient from 'react-native-linear-gradient';

const BillingInformation = ({navigation}) => {
  const refRBSheet = useRef();
  const [billingCompleted, setbillingCompleted] = useState(false);
  const [refundInitiate, setrefundInitiate] = useState(false);
  const [refundCompleted, setrefundCompleted] = useState(false);
  const [ratingReview, setratingreview] = useState(false);
  const [returnBtn, setreturnBtn] = useState(false);
  const [exchangeBtn, setexchangeBtn] = useState(false);
  const data = [
    {
      id: 1,
      label: 'Pedicure',
      price: 'Rs 1000',
    },
    {
      id: 2,
      label: 'Package Redemption',
      btn: 'Remove',
      price: '- Rs 1000',
    },
    {
      id: 3,
      label: 'Pedicure',
      price: 'Rs 1000',
    },
    {
      id: 4,
      label: 'Hair Colour',
      price: 'Rs 4000',
    },
    {
      id: 5,
      label: 'DiscountCard Redemption',
      btn: 'Remove',
      price: '-Rs 2000',
    },
    {
      id: 6,
      label: 'Hair colour',
      price: 'Rs 4000',
    },
    {
      id: 7,
      label: 'Membership discount',
      btn: 'Remove',
      price: '-Rs 400',
    },
    {
      id: 8,
      label: 'Stylist Charges',
      price: 'Rs 100',
    },
    {
      id: 9,
      label: 'Net Service Value',
      price: 'Rs 1600',
    },
    {
      id: 10,
      label: 'Advance',
      price: '-Rs 1000',
    },
    {
      id: 11,
      label: 'Amount Payable Pre GST',
      price: 'Rs 660',
    },
    {
      id: 12,
      label: 'GST to Charge @18%',
      price: 'Rs 108',
    },
  ];

  const productdata = [
    {
      id: 1,
      imageProduct: LocalImages.product,
      productName: 'MAC Cosmetics',
      price: 'Price : ',
      amount: 'Rs. 750',
      quantity: 'Quantity : ',
      quantityAmount: '4',
      applied: 'Package Applied',
    },
  ];

  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      name: 'Hair Colour',
      stylist: 'Stylist Update: ',
      stylistName: 'Rebecca Beck',
      timeTaken: '120 min',
      price: 'Rs 1150/-',
      time: '11:30 AM to 1:15 PM',
      service: 'Service Completed',
      discount: 'Membership Discount Applied',
      member: 'Ellen (Primary Member)',
    },
    {
      id: 2,
      imagePath: LocalImages.Profile,
      name: 'Hair Colour',
      stylist: 'Stylist Update: ',
      stylistName: 'Rebecca Beck',
      timeTaken: '120 min',
      time: '11:30 AM to 1:15 PM',
      price: 'Rs 1150/-',
      service: 'Service Completed',
      discount: 'Membership Discount Applied',
      member: 'Ellen (Primary Member)',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={[styles.mainItemView, styles.boxWithShadow]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.childView}>
            <Image
              source={item.imagePath}
              style={{width: vw(86), height: vh(86)}}
            />
          </View>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: theme.font.regular,
                  color: theme.color.black,
                  marginLeft: vw(16),
                  fontSize: normalize(14),
                  marginTop: vh(4),
                }}>
                {item.stylist}
              </Text>
              <Text
                style={{
                  fontFamily: theme.font.semiBold,
                  color: theme.color.black,
                  fontSize: normalize(14),
                  marginTop: vh(4),
                }}>
                {item.stylistName}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: theme.font.regular,
                  color: theme.color.dropdownColor,
                  marginLeft: vw(16),
                  fontSize: normalize(14),
                  marginTop: vh(4),
                }}>
                {item.timeTaken}
              </Text>
              <View
                style={{
                  borderLeftWidth: 0.5,
                  borderColor: theme.color.dropdownColor,
                  marginHorizontal: vw(10),
                }}></View>
              <Text
                style={{
                  fontFamily: theme.font.regular,
                  color: theme.color.dropdownColor,
                  fontSize: normalize(14),
                  marginTop: vh(4),
                }}>
                {billingCompleted ? item.time : item.price}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            marginVertical: vh(20),
            borderColor: theme.color.dropdownColor,
          }}></View>
        {billingCompleted ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: vw(15),
              }}>
              <View style={styles.btnTouch}>
                <Text style={styles.btnText}>{item.service}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('BillingAddStylist');
                }}>
                <Text
                  style={{
                    color: theme.color.LightBlue,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                  }}>
                  + Add Stylist
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                marginVertical: vh(20),
                borderColor: theme.color.dropdownColor,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: vw(24),
              }}>
              <View>
                <Text
                  style={{
                    color: theme.color.primary,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                  }}>
                  {item.discount}
                </Text>
                <Text
                  style={{
                    color: theme.color.black,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                    marginTop: vh(6),
                  }}>
                  {item.member}
                </Text>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    color: theme.color.red,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.notes}>
              Note:
              <Text style={{color: theme.color.dropdownColor}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </Text>
            <View
              style={{
                borderBottomWidth: 0.5,
                marginVertical: vh(20),
                borderColor: theme.color.dropdownColor,
              }}></View>
            {ratingReview ? (
              <>
                <Text style={styles.notes}>
                  Salon review:
                  <Text style={{color: theme.color.dropdownColor}}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </Text>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    marginVertical: vh(20),
                    borderColor: theme.color.dropdownColor,
                  }}></View>
                <Text
                  style={{
                    color: theme.color.primary,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                  }}>
                  {item.discount}
                </Text>
                <Text
                  style={{
                    color: theme.color.black,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                    marginTop: vh(6),
                  }}>
                  {item.member}
                </Text>
              </>
            ) : (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={LocalImages.shareReview}
                  style={{width: vw(29), height: vh(29)}}
                />
                <Text
                  style={{
                    color: theme.color.primary,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                    marginHorizontal: vw(10),
                  }}>
                  Share for review
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={
          billingCompleted
            ? 'Billing Information'
            : 'Completed Bill Information'
        }
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
        <View style={styles.profileView}>
          <View style={styles.usericon}>
            <AppIcon
              name={'user'}
              type={'FontAwesome'}
              size={30}
              color={theme.color.dropdownColor}
            />
          </View>
          <View style={{marginRight: '25%', alignItems: 'center'}}>
            <Text style={styles.name}>Shivani Singh</Text>
            <Text style={styles.number}>+91 9876543219</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.update}>Update</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: vh(20)}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        {billingCompleted ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: vw(16),
                marginVertical: vh(25),
              }}>
              <TouchableOpacity>
                <Text style={styles.add}>+ Add Items</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.add}>Redeem</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}
        {ratingReview ? null : (
          <>
            {productdata.map((item, index) => {
              return (
                <View
                  key={item.id}
                  style={[styles.mainItemView, styles.boxWithShadow]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={item.imageProduct}
                      style={{
                        width: vw(90),
                        height: vh(90),
                        borderWidth: 1,
                        borderRadius: vw(10),
                        backgroundColor: theme.color.white,
                        borderColor: theme.color.white,
                      }}
                    />
                    <View style={{marginLeft: vw(25)}}>
                      <Text
                        style={{
                          fontSize: normalize(16),
                          fontFamily: theme.font.bold,
                          color: theme.color.black,
                        }}>
                        {item.productName}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: theme.color.black,
                            fontFamily: theme.font.semiBold,
                            fontSize: normalize(13),
                            marginTop: vh(6),
                          }}>
                          {item.price}
                          <Text style={{fontFamily: theme.font.regular}}>
                            {item.amount}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            color: theme.color.black,
                            fontFamily: theme.font.semiBold,
                            fontSize: normalize(13),
                            marginTop: vh(6),
                            marginLeft: vw(14),
                          }}>
                          {item.quantity}
                          <Text style={{fontFamily: theme.font.regular}}>
                            {item.quantityAmount}
                          </Text>
                        </Text>
                      </View>
                      <Text
                        style={{
                          marginTop: vh(6),
                          color: theme.color.switchOn,
                          fontFamily: theme.font.bold,
                          fontSize: normalize(16),
                        }}>
                        {item.applied}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      borderTopWidth: 0.5,
                      marginVertical: vh(20),
                      borderColor: theme.color.dropdownColor,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setreturnBtn(!returnBtn);
                        navigation.navigate('ReturnOrder');
                      }}
                      style={[
                        styles.returnbtnTouch,
                        {
                          backgroundColor: returnBtn
                            ? theme.color.primary
                            : theme.color.white,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.returnbtnText,
                          {
                            color: returnBtn
                              ? theme.color.white
                              : theme.color.primary,
                          },
                        ]}>
                        Return
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setexchangeBtn(!exchangeBtn);
                      }}
                      style={[
                        styles.returnbtnTouch,
                        {
                          backgroundColor: exchangeBtn
                            ? theme.color.primary
                            : theme.color.white,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.returnbtnText,
                          {
                            color: exchangeBtn
                              ? theme.color.white
                              : theme.color.primary,
                          },
                        ]}>
                        Exchange
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </>
        )}
        <View style={[styles.boxWithShadow, styles.mainItemView]}>
          <Text style={styles.summary}>Summary</Text>
          {data.map((summary, index) => {
            return (
              <View
                key={summary.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(15),
                }}>
                <Text
                  style={{
                    color: theme.color.black,
                    fontFamily: theme.font.semiBold,
                    fontSize: normalize(14),
                  }}>
                  {summary.label}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: theme.color.red,
                      fontFamily: theme.font.regular,
                      marginRight: '5%%',
                      fontSize: normalize(14),
                    }}>
                    {summary.btn}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#717171',
                    fontFamily: theme.font.regular,
                    fontSize: normalize(14),
                  }}>
                  {summary.price}
                </Text>
              </View>
            );
          })}
          <View style={styles.totalAmountView}>
            <Text style={styles.totalAmount}>Total Amount Payable</Text>
            <Text style={styles.totalAmount}>Rs.708</Text>
          </View>
        </View>
        {refundInitiate ? (
          <>
            {billingCompleted ? null : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('RefundAmount');
                  }}>
                  <Text
                    style={{
                      fontFamily: theme.font.bold,
                      color: theme.color.LightBlue,
                      fontSize: normalize(18),
                      marginHorizontal: vw(16),
                      marginBottom: vh(33),
                    }}>
                    Refund amount to client
                  </Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['rgba(0, 123, 253, 0.15)', 'rgba(0, 123, 253, 0)']}
                  style={{
                    paddingHorizontal: vw(32),
                    paddingVertical: vh(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={LocalImages.LoyaltyPoints}
                    style={{width: vw(85), height: vh(85)}}
                  />
                  <View style={{marginLeft: vw(60)}}>
                    <Text
                      style={{
                        color: theme.color.black,
                        fontFamily: theme.font.bold,
                        fontSize: normalize(18),
                      }}>
                      Loyality Points Earned
                    </Text>
                    <Text
                      style={{
                        color: theme.color.LightBlue,
                        fontFamily: theme.font.bold,
                        fontSize: normalize(18),
                        marginTop: vh(4),
                      }}>
                      200
                    </Text>
                  </View>
                </LinearGradient>
              </>
            )}
          </>
        ) : (
          <>
            {refundCompleted ? (
              <>
                <View
                  style={[
                    styles.boxWithShadow,
                    {
                      borderWidth: 1,
                      borderColor: theme.color.white,
                      backgroundColor: theme.color.white,
                      paddingHorizontal: vw(18),
                      paddingVertical: vh(22),
                      marginHorizontal: vw(16),
                      borderRadius: vw(10),
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: normalize(18),
                      color: theme.color.black,
                      fontFamily: theme.font.semiBold,
                    }}>
                    Refund is Initiated
                  </Text>
                  <Text
                    style={{
                      marginTop: vh(10),
                      fontSize: normalize(14),
                      fontFamily: theme.font.semiBold,
                      color: theme.color.dropdownColor,
                    }}>
                    The amount will bw reflected in client’s account within x
                    working days.
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View
                  style={[
                    styles.boxWithShadow,
                    {
                      borderWidth: 1,
                      borderColor: theme.color.white,
                      paddingHorizontal: vw(18),
                      paddingVertical: vh(22),
                      marginHorizontal: vw(16),
                      borderRadius: vw(10),
                      backgroundColor: theme.color.white,
                    },
                  ]}>
                  <Text
                    style={{
                      fontSize: normalize(18),
                      color: theme.color.switchOn,
                      fontFamily: theme.font.semiBold,
                    }}>
                    Refund Completed
                  </Text>
                  <Text
                    style={{
                      marginTop: vh(10),
                      fontSize: normalize(14),
                      fontFamily: theme.font.semiBold,
                      color: theme.color.dropdownColor,
                    }}>
                    We have completed your requested for refund. Rs. 15500 has
                    been refunded to your bank account linked with UPI ID
                    ********@oksbi on April 28th, 2022. Any questions, please
                    contact your bank account with reference number 123456789
                  </Text>
                </View>
              </>
            )}
          </>
        )}
        <View style={styles.clientMainView}>
          <View style={[styles.clientView, styles.boxWithShadow]}>
            <Image
              source={LocalImages.callClient}
              style={{width: vw(31), height: vh(31)}}
            />
          </View>
          <Text style={styles.clientText}>Call Client</Text>
        </View>
        <View style={styles.clientMainView}>
          <View style={[styles.clientView, styles.boxWithShadow]}>
            <Image
              source={LocalImages.callClient}
              style={{width: vw(31), height: vh(31)}}
            />
          </View>
          <Text style={styles.clientText}>Share Salon Location</Text>
        </View>
        <View style={styles.clientMainView}>
          <View style={[styles.clientView, styles.boxWithShadow]}>
            <Image
              source={LocalImages.callClient}
              style={{width: vw(31), height: vh(31)}}
            />
          </View>
          <Text style={styles.clientText}>Share Booking</Text>
        </View>
        {billingCompleted ? null : (
          <>
            <Text
              style={{
                marginHorizontal: vw(16),
                fontSize: normalize(18),
                color: theme.color.black,
                fontFamily: theme.font.bold,
                marginTop: vh(40),
              }}>
              Payment Details
            </Text>
            <Text
              style={{
                marginHorizontal: vw(16),
                fontSize: normalize(18),
                color: theme.color.dropdownColor,
                fontFamily: theme.font.bold,
                marginVertical: vh(10),
              }}>
              Paid: Using UPI
            </Text>
          </>
        )}
      </Container>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: vh(304),
          },
        }}>
        <BillingRBSheetComponent
          heading={
            'Services aren’t completed yet.Do you still want to checkout?'
          }
          description={'System will mark services as completed'}
          label={'Cancel'}
          onPressLabel={''}
          btnText={'Checkout'}
          onPress={() => {
            refRBSheet.current.close();
          }}
          onPressBtnText={() => {
            refRBSheet.current.close(),
              navigation.navigate('UpdateAppointment');
          }}
        />
      </RBSheet>
      {billingCompleted ? (
        <>
          <CustomButton
            label={'Checkout'}
            onPress={() => {
              refRBSheet.current.open();
              navigation.navigate('');
            }}
            extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
          />
        </>
      ) : null}
    </View>
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
  profileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(25),
    alignItems: 'center',
    marginHorizontal: vw(21),
  },
  usericon: {
    borderWidth: 1,
    borderColor: theme.color.searchColor,
    borderRadius: vw(35),
    paddingVertical: vw(17),
    paddingHorizontal: vw(20),
    backgroundColor: theme.color.searchColor,
  },
  name: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  number: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    marginTop: vh(6),
  },
  update: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  mainItemView: {
    borderWidth: 1,
    borderRadius: vw(20),
    marginHorizontal: vw(16),
    paddingHorizontal: vw(15),
    paddingVertical: vh(15),
    marginVertical: vh(25),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  name: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    marginHorizontal: vw(16),
    fontSize: normalize(18),
  },
  childView: {
    borderWidth: 1,
    borderRadius: vw(80),
    borderColor: theme.color.white,
  },
  add: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  summary: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
  },
  totalAmount: {
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
    color: theme.color.primary,
  },
  totalAmountView: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(20),
    paddingVertical: vh(20),
    borderColor: theme.color.dropdownColor,
  },
  clientView: {
    padding: vw(10),
    borderWidth: 1,
    borderRadius: vw(40),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
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
  notes: {
    fontSize: normalize(14),
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
  },
  returnbtnTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginTop: vh(15),
    paddingHorizontal: vw(45),
    paddingVertical: vh(13),
    alignItems: 'center',
    borderColor: theme.color.primary,
  },
  returnbtnText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
});

export default BillingInformation;
