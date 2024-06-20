import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import LocalImages from '../../utils/LocalImages';

const ClientActivity = ({
  navigation,
  onPress,
  onPressAvailedHistory,
  onPressIcon,
}) => {
  const [option, setOption] = useState('Service');
  const [offer, setOffer] = useState('Membership');
  const DATA = [
    {
      id: 1,
      name: 'Service',
    },
    {
      id: 2,
      name: 'Product',
    },
    {
      id: 3,
      name: 'Offers',
    },
    {
      id: 4,
      name: 'Loyalty Point',
    },
  ];
  const OffersDATA = [
    {
      id: 1,
      name: 'Membership',
    },
    {
      id: 2,
      name: 'Package',
    },
    {
      id: 3,
      name: 'GiftCard',
    },
    {
      id: 4,
      name: 'Discount',
    },
  ];
  const Data = [
    {
      id: 0,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
    {
      id: 1,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
    {
      id: 2,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
    {
      id: 3,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
    {
      id: 4,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
    {
      id: 5,
      date: '12/01/2023',
      product: 'Dryer',
      soldBy: 'Vinit',
    },
  ];

  const data = [
    {
      id: 1,
      date: '12/01/23',
      earnOn: 'Service',
      credit: '100',
      debit: '20',
    },
    {
      id: 2,
      date: '12/01/23',
      earnOn: 'Product',
      credit: '100',
      debit: '20',
    },
    {
      id: 3,
      date: '12/01/23',
      earnOn: 'Purchase',
      credit: '100',
      debit: '20',
    },
  ];

  const DataMembership = [
    {
      id: 1,
      invoiceDate: '25 Jun 2022 at 7:45PM',
      planName: 'Gold Plan',
      amount: 'Rs. 2000',
      paidUsing: 'UPI',
      startDate: '01-04-2022',
      expiryDate: '01-04-2023',
      soldBy: 'Vinit(Employee Id)',
    },
  ];

  const serviceData = [
    {
      id: 1,
      date: '12 Jan 2023',
      time: '1:00 PM',
      service1: 'Hair Coloring',
      service2: 'Hair Cut',
      stylist: 'Rebecca',
      duration: '1 h 30 mins',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOption(item.name);
        }}
        style={{
          backgroundColor: option == item.name ? '#D2D2D2' : '#D2D2D24D',
          paddingVertical: vh(18),
          paddingHorizontal: vw(18),
        }}>
        <Text
          style={{
            color: theme.color.black,
            fontFamily: theme.font.regular,
            fontSize: normalize(16),
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderOfferItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOffer(item.name);
        }}
        style={{
          borderBottomWidth: 0.5,
          backgroundColor:
            offer == item.name ? theme.color.primary : theme.color.white,
          paddingVertical: vh(18),
          paddingHorizontal: vw(18),
        }}>
        <Text
          style={{
            color: offer == item.name ? theme.color.white : theme.color.primary,
            fontFamily: theme.font.regular,
            fontSize: normalize(16),
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container header={false}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        contentContainerStyle={{
          borderColor: theme.color.buttonInActive,
          flex: 1,
          backgroundColor: '#D2D2D24D',
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />

      {option == 'Product' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: vw(18),
              padding: vh(10),
              marginTop: vh(50),
            }}>
            <Text style={styles.txt}>Date</Text>
            <Text style={styles.txt}>Product</Text>
            <Text style={styles.txt}>Sold by</Text>
            <Text style={styles.txt}>Invoice</Text>
          </View>

          {Data.map(item => {
            return (
              <View
                style={[
                  styles.mainview,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: vw(10),
                  },
                ]}>
                <Text style={styles.txt1}>{item.date}</Text>
                <Text style={styles.txt1}>{item.product}</Text>
                <Text style={styles.txt1}>{item.soldBy}</Text>
                <AppIcon
                  name={'file'}
                  type={'FontAwesome'}
                  size={17}
                  color={theme.color.black}
                />
              </View>
            );
          })}
        </>
      ) : null}

      {option == 'Offers' ? (
        <>
          <FlatList
            data={OffersDATA}
            renderItem={renderOfferItem}
            contentContainerStyle={{
              borderColor: theme.color.buttonInActive,
              flex: 1,
              backgroundColor: '#D2D2D24D',
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
          {offer == 'Membership' ? (
            <>
              {DataMembership.map(item => {
                return (
                  <>
                    <View style={[styles.mainview, {marginTop: vh(25)}]}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.invoicetxt}>Invoice Date: </Text>
                        <Text style={styles.invoicetxt}>
                          {item.invoiceDate}
                        </Text>
                        <AppIcon
                          name={'file'}
                          type={'FontAwesome'}
                          size={17}
                          color={theme.color.black}
                          onPress={onPressIcon}
                          style={{marginLeft: vw(80)}}
                        />
                      </View>
                      <View
                        style={{borderBottomWidth: 0.5, marginTop: vh(10)}}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <LinearGradient
                          colors={['#A960FA', '#FB3A40']}
                          style={{
                            borderWidth: 0.5,
                            borderColor: 'white',
                            alignSelf: 'flex-start',
                            marginTop: vh(15),
                            borderRadius: vw(16),
                          }}>
                          <Text
                            style={{
                              padding: vw(20),
                              color: theme.color.white,
                              fontFamily: theme.font.bold,
                            }}>
                            Gold
                          </Text>
                        </LinearGradient>
                        <View
                          style={{marginTop: vh(18), marginHorizontal: vw(15)}}>
                          <Text style={[styles.txt, {fontSize: normalize(16)}]}>
                            {item.planName}
                          </Text>
                          <Text style={[styles.txt, {fontSize: normalize(16)}]}>
                            {item.amount}
                          </Text>
                        </View>
                        <Text style={styles.txt2}>
                          Paid Using: {item.paidUsing}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.txt2}>
                          Start Date: {item.startDate}
                        </Text>
                        <Text style={styles.txt2}>
                          Expiry: {item.expiryDate}
                        </Text>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={[
                            styles.activebtn,
                            {marginHorizontal: vw(15)},
                          ]}>
                          <Text style={styles.activetxt}>6 Members</Text>
                        </View>
                        <View
                          style={[
                            styles.activebtn,
                            {marginHorizontal: vw(20)},
                          ]}>
                          <Text style={styles.activetxt}>Active</Text>
                        </View>
                      </View>
                      <Text style={styles.txt2}>Sold By: {item.soldBy}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={onPressAvailedHistory}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={[
                          styles.txt2,
                          {
                            color: theme.color.LightBlue,
                            fontFamily: theme.font.medium,
                            fontSize: normalize(13),
                          },
                        ]}>
                        Availed history
                      </Text>
                      <AppIcon
                        name={'right'}
                        type={'AntDesign'}
                        color={theme.color.LightBlue}
                        size={13}
                        style={{marginTop: vh(18)}}
                      />
                    </TouchableOpacity>
                  </>
                );
              })}
              <TouchableOpacity style={styles.btn1}>
                <AppIcon
                  name={'share'}
                  type={'Entypo'}
                  style={{marginRight: vw(15)}}
                  color={theme.color.primary}
                  size={20}
                />
                <Text style={styles.fadedText}>Share</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </>
      ) : null}

      {option == 'Service' ? (
        <View>
          {serviceData.map(item => {
            return (
              <View style={styles.serviceData}>
                <View>
                  <Text
                    style={{
                      color: theme.color.black,
                      fontFamily: theme.font.bold,
                      fontSize: normalize(12),
                    }}>
                    {item.date} at {item.time}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.serviceDataText,
                        {color: theme.color.primary},
                      ]}>
                      {item.service1}
                    </Text>
                    <View
                      style={{
                        borderLeftWidth: 1,
                        marginTop: vh(10),
                        marginHorizontal: vw(15),
                        borderColor: theme.color.primary,
                      }}></View>
                    <Text
                      style={[
                        styles.serviceDataText,
                        {color: theme.color.primary},
                      ]}>
                      {item.service2}
                    </Text>
                  </View>
                  <Text style={styles.serviceDataText}>
                    Stylist :{' '}
                    <Text style={{color: theme.color.LightBlue}}>
                      {item.stylist}
                    </Text>
                  </Text>
                  <Text style={styles.serviceDataText}>
                    Duration : {item.duration}
                  </Text>
                </View>
                <AppIcon
                  name={'file'}
                  type={'FontAwesome'}
                  size={20}
                  onPress={onPress}
                  color={theme.color.black}
                />
              </View>
            );
          })}
        </View>
      ) : null}
      {option == 'Loyalty Point' ? (
        <>
          <Image
            source={require('../../assets/promotionLoyaltyPoints.png')}
            style={{
              alignSelf: 'center',
              marginTop: vh(25),
              width: vw(94),
              height: vh(94),
            }}
          />
          <Text style={styles.loyaltyPointText}>
            Total Earned Loyalty Points : 1000
          </Text>
          <Text style={styles.loyaltyPointText}>
            Total available Loyalty Points : 800
          </Text>
          <Text style={styles.loyaltyPointText}>
            Total Redeemed Loyalty Points : 200
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: vw(30),
              marginTop: vh(50),
            }}>
            <Text style={styles.dateText}>Date</Text>
            <Text style={styles.dateText}>Earn On</Text>
            <Text style={styles.dateText}>Credited</Text>
            <Text style={styles.dateText}>Debited</Text>
            <Text style={styles.dateText}>Invoice</Text>
          </View>
          {data.map(item => {
            return (
              <View
                style={[
                  styles.mainview,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text style={styles.dataText}>{item.date}</Text>
                <Text style={styles.dataText}>{item.earnOn}</Text>
                <Text style={styles.dataText}>{item.credit}</Text>
                <Text style={styles.dataText}>{item.debit}</Text>
                <AppIcon
                  name={'file'}
                  type={'FontAwesome'}
                  size={15}
                  color={theme.color.black}
                />
              </View>
            );
          })}
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  activebtn: {
    marginTop: vh(10),
    backgroundColor: '#F2F2F2',
    borderRadius: vw(8),
  },
  btn1: {
    flexDirection: 'row',
    borderRadius: vw(10),
    borderWidth: 0.5,
    marginTop: vh(120),
    marginHorizontal: vw(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.width,
    paddingVertical: vw(16),
  },
  fadedText: {
    fontSize: vw(18),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
  },
  activetxt: {
    padding: vw(10),
    fontFamily: theme.font.bold,
    color: '#F0405A',
  },
  invoicetxt: {
    fontFamily: theme.font.regular,
  },
  txt1: {
    fontFamily: theme.font.medium,
    fontSize: normalize(12),
  },
  txt2: {
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
    marginTop: vh(18),
    marginLeft: vw(15),
  },
  serviceData: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginTop: vh(50),
    marginHorizontal: vw(15),
    paddingHorizontal: vw(14),
    paddingVertical: vh(10),
    borderColor: theme.color.white,
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  serviceDataText: {
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    marginTop: vh(12),
    color: theme.color.black,
  },
  loyaltyPointText: {
    textAlign: 'center',
    marginTop: vh(14),
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
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
    borderRadius: 13,
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  dateText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
    color: theme.color.black,
  },
  dataText: {
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  txt: {
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
    color: theme.color.black,
  },
});

export default ClientActivity;
