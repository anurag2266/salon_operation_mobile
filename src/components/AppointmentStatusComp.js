import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AppIcon from './common/AppIcon';
import {vh, vw, normalize} from '../utils/dimensions';
import theme from '../theme/theme';
import CheckBox from '@react-native-community/checkbox';

const AppointmentStatusComp = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [select, setSelect] = useState('All');
  const Data = [
    {
      id: 1,
      label: 'All',
      name: 'border-all',
      type: 'FontAwesome5',
    },
    {
      id: 2,
      label: 'Ongoing',
      name: 'cycle',
      type: 'Entypo',
    },
    {
      id: 3,
      label: 'Upcoming',
      name: 'calendar-end',
      type: 'MaterialCommunityIcons',
    },
    {
      id: 4,
      label: 'Completed',
      name: 'checkcircle',
      type: 'AntDesign',
    },
    {
      id: 4,
      label: 'No Status',
      name: 'dingding',
      type: 'AntDesign',
    },
  ];

  const DATA = [
    {
      id: 1,
      currentStatus: 'Ongoing',
      duration: '12:15 PM - 1:45 PM',
      time: '1h 30Min',
      clientName: 'Shivangi',
      service: 'Hair Coloring',
      salonName: '@MySalon',
      stylist: 'Rebecca',
      amount: 'Rs. 900',
      status: 'Confirmed',
    },
    {
      id: 2,
      currentStatus: 'Upcoming',
      duration: '12:15 PM - 1:45 PM',
      time: '1h 30Min',
      clientName: 'Shivangi',
      service: 'Hair Coloring',
      salonName: '@MySalon',
      stylist: 'Rebecca',
      amount: 'Rs. 900',
      status: 'Confirmed',
    },
    {
      id: 3,
      currentStatus: 'Ongoing',
      duration: '1:15 PM - 2:45 PM',
      time: '1h 30Min',
      clientName: 'Shanaya',
      service: 'Hair Coloring',
      salonName: '@MySalon',
      stylist: 'Rebecca',
      amount: 'Rs. 900',
      status: 'Confirmed',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelect(item.label);
        }}
        style={[
          {
            padding: 3,
            marginTop: vh(15),
            alignItems: 'center',
            marginBottom: vh(25),
          },
        ]}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              width: vw(70),
              height: vw(70),
              borderRadius: 100,
              backgroundColor:
                select == item.label ? theme.color.primary : theme.color.white,
            },
          ]}>
          <AppIcon
            name={item.name}
            type={item.type}
            size={25}
            color={
              select == item.label ? theme.color.white : theme.color.primary
            }
          />
        </View>
        <Text style={styles.labelTxt}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        horizontal={true}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        data={Data}
        renderItem={renderItem}
      />
      {DATA.map(item => {
        return (
          <View style={styles.card}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  fontSize: normalize(12),
                  fontFamily: theme.font.medium,
                  marginHorizontal: vw(10),
                }}>
                {item.duration}
              </Text>
              <TouchableOpacity style={styles.phoneicon}>
                <AppIcon name={'phone'} type={'FontAwesome'} color={'white'} />
              </TouchableOpacity>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#FC4E03',
                  fontFamily: theme.font.bold,
                  fontSize: normalize(16),
                }}>
                {item.currentStatus}
              </Text>
              <Text style={{fontFamily: theme.font.medium}}>{item.time}</Text>
            </View>
            <Text
              style={{
                marginTop: vh(10),
                fontFamily: theme.font.medium,
                fontSize: normalize(16),
              }}>
              {item.clientName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.light,
                  fontSize: normalize(16),
                }}>
                {item.service}
              </Text>
              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.light,
                  fontSize: normalize(16),
                  marginHorizontal: vw(25),
                }}>
                1/2
              </Text>
              <AppIcon
                style={{marginTop: vh(10), marginHorizontal: vw(180)}}
                name={'right'}
                onPress={() => {
                  navigation.navigate('ViewAppointmentScreen');
                }}
                type={'AntDesign'}
                size={20}
              />
            </View>
            <Text
              style={{
                marginTop: vh(10),
                fontFamily: theme.font.medium,
                color: theme.color.lightBlack,
              }}>
              {item.salonName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  color: theme.color.lightBlack,
                }}>
                Amount:
              </Text>
              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  color: theme.color.LightBlue,
                  marginHorizontal: vw(10),
                }}>
                {item.amount}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: vh(10)}}>
              <Text style={{fontFamily: theme.font.medium}}>Status:</Text>
              <Text
                style={{
                  color: '#34C759',
                  marginLeft: vw(5),
                  fontFamily: theme.font.medium,
                }}>
                {item.status}
              </Text>
              <AppIcon
                name={'tag'}
                type={'AntDesign'}
                color={'lightgrey'}
                style={{marginLeft: vw(140)}}
              />
              <Text
                style={{fontFamily: theme.font.bold, color: theme.color.grey}}>
                Influencer
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 0.5,
                marginTop: vh(10),
                marginBottom: vh(10),
              }}
            />

            <View style={{flexDirection: 'row'}}>
              <CheckBox
                style={{
                  width: vw(17),
                  height: vh(18),
                  marginTop: vh(10),
                  marginBottom: vh(10),
                }}
                value={checkboxValue}
                boxType={'square'}
                onCheckColor="white"
                onTintColor={theme.color.primary}
                onFillColor={theme.color.primary}
                // rightTextStyle={{fontSize: normalize(14)}}
                onValueChange={() => setCheckboxValue(!checkboxValue)}
              />

              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  fontSize: normalize(12),
                  marginHorizontal: vw(20),
                }}>
                Check in
              </Text>
              <CheckBox
                style={{width: vw(17), height: vh(18), marginTop: vh(10)}}
                value={checkbox}
                boxType={'square'}
                onCheckColor="white"
                onTintColor={theme.color.primary}
                onFillColor={theme.color.primary}
                // rightTextStyle={{fontSize: normalize(14)}}
                onValueChange={() => setCheckbox(!checkbox)}
              />

              <Text
                style={{
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  fontSize: normalize(12),
                  marginHorizontal: vw(20),
                }}>
                No Show
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default AppointmentStatusComp;

const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: theme.color.orange,
    paddingHorizontal: vw(24),
    paddingVertical: vh(28),
    marginHorizontal: vw(16),
    borderRadius: vw(10),
    marginTop: vh(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelImage: {
    borderWidth: 1,
    padding: vw(20),
    marginHorizontal: vw(15),
    marginTop: vh(32),
    marginBottom: vh(7),
    borderRadius: vw(60),
    borderColor: theme.color.white,
  },
  labelTxt: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    textAlign: 'center',
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  clockin: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  time: {
    color: theme.color.white,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },

  totalTarget: {
    marginTop: vh(30),
    shadowColor: theme.color.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(30),
  },
  targetAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(30),
    marginHorizontal: vw(30),
  },
  targetText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
  },
  mainView: {
    flexDirection: 'row',
    marginHorizontal: vw(10),
    marginTop: vh(20),
    alignItems: 'center',
  },
  stylistView: {
    borderWidth: 3,
    borderColor: '#BFB5FF',
    borderRadius: vw(40),
    padding: vw(2),
  },
  hiText: {
    fontSize: normalize(20),
    fontFamily: theme.font.bold,
    marginLeft: vw(15),
    color: theme.color.white,
  },

  viewDetailTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: vw(25),
    marginTop: vh(15),
  },
  viewDetailText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
    marginRight: vw(5),
  },

  phoneicon: {
    backgroundColor: '#FD995B',
    width: 40,
    height: 40,
    borderRadius: 100,
    padding: 8,
    borderWidth: 0.5,
    borderColor: 'orange',
  },

  totalTarget: {
    marginTop: vh(10),
    shadowColor: theme.color.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(30),
    borderRadius: 18,
    padding: 10,
    marginHorizontal: 10,
  },
  card: {
    marginTop: vh(10),
    shadowColor: theme.color.shadowColor,
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
    padding: 10,
    marginHorizontal: vw(10),
  },
  targetAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(30),
    marginHorizontal: vw(30),
  },
  targetText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
  },
  mainView: {
    flexDirection: 'row',
    marginHorizontal: vw(25),
    marginTop: vh(20),
    alignItems: 'center',
  },
  stylistView: {
    borderWidth: 3,
    borderColor: '#BFB5FF',
    borderRadius: vw(40),
    padding: vw(7),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    height: vh(55),
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(25),
    marginTop: vh(20),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
    backgroundColor: theme.color.white,
  },

  inputStyle: {fontSize: 13},
  labelStyle: {
    fontSize: normalize(13),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.semiBold,
    color: theme.color.primary,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.semiBold,
    color: theme.color.primary,
  },
});
