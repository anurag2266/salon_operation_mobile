import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-element-textinput';

const AvailedHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  const data = [
    {
      id: 1,
      date: '30/11/22',
      service: 'Hair Cut',
      discValue: '500',
    },
    {
      id: 2,
      date: '30/11/22',
      service: 'Hair Cut',
      discValue: '500',
    },
    {
      id: 3,
      date: '30/11/22',
      service: 'Hair Cut',
      discValue: '500',
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
  return (
    <Container
      title={'Availed History '}
      description={'Membership History Of Tarun Sharma'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      {DataMembership.map(item => {
        return (
          <>
            <View style={[styles.mainview, {marginTop: vh(25)}]}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.invoicetxt}>Invoice Date: </Text>
                <Text style={styles.invoicetxt}>{item.invoiceDate}</Text>
                <AppIcon
                  name={'file'}
                  type={'FontAwesome'}
                  size={17}
                  color={theme.color.black}
                  style={{marginLeft: vw(80)}}
                />
              </View>
              <View style={{borderBottomWidth: 0.5, marginTop: vh(10)}} />
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
                <View style={{marginTop: vh(18), marginHorizontal: vw(15)}}>
                  <Text style={[styles.txt, {fontSize: normalize(16)}]}>
                    {item.planName}
                  </Text>
                  <Text style={[styles.txt, {fontSize: normalize(16)}]}>
                    {item.amount}
                  </Text>
                </View>
                <Text style={styles.txt2}>Paid Using: {item.paidUsing}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.txt2}>Start Date: {item.startDate}</Text>
                <Text style={styles.txt2}>Expiry: {item.expiryDate}</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <View style={[styles.activebtn, {marginHorizontal: vw(15)}]}>
                  <Text style={styles.activetxt}>6 Members</Text>
                </View>
                <View style={[styles.activebtn, {marginHorizontal: vw(20)}]}>
                  <Text style={styles.activetxt}>Active</Text>
                </View>
              </View>
              <Text style={styles.txt2}>Sold By: {item.soldBy}</Text>
            </View>
          </>
        );
      })}
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search"
        placeholder="Search"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSearch(text);
        }}
        renderLeftIcon={() => (
          <AppIcon
            name={'search1'}
            type={'AntDesign'}
            size={20}
            color={theme.color.bottomWidth}
            style={{marginRight: vw(15)}}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: vw(15),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'filter'}
            type={'AntDesign'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'swap-vertical'}
            type={'Ionicons'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Sort By</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(18),
          padding: vh(10),
          marginTop: vh(50),
        }}>
        <Text style={styles.txt}>Date</Text>
        <Text style={styles.txt}>Service</Text>
        <View>
          <Text style={styles.txt}>Disc.Value</Text>
          <Text style={styles.txt}>(Rs.)</Text>
        </View>
        <Text style={styles.txt}>Invoice</Text>
      </View>
      {data.map(item => {
        return (
          <View
            style={[
              styles.mainview,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.dataText}>{item.date}</Text>
            <Text style={styles.dataText}>{item.service}</Text>
            <Text style={styles.dataText}>{item.discValue}</Text>
            <AppIcon
              name={'file'}
              type={'FontAwesome'}
              size={15}
              color={theme.color.black}
            />
          </View>
        );
      })}
    </Container>
  );
};

export default AvailedHistory;

const styles = StyleSheet.create({
  mainview: {
    marginTop: vh(20),
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
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  invoicetxt: {
    fontFamily: theme.font.regular,
  },
  txt2: {
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
    marginTop: vh(18),
    marginHorizontal: vw(15),
  },
  activebtn: {
    marginTop: vh(10),
    backgroundColor: '#F2F2F2',
    borderRadius: vw(8),
  },
  activetxt: {
    padding: vw(10),
    fontFamily: theme.font.bold,
    color: '#F0405A',
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
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
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
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
