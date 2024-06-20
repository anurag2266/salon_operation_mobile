import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-element-textinput';

const TransactionHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  employeDATA = [
    {
      id: 1,
      date: '30/11/22',
      service: 'Hair Cut',
      discountValue: '500',
    },
    {
      id: 2,
      date: '30/11/22',
      service: 'Hair Cut',
      discountValue: '500',
    },
    {
      id: 3,
      date: '30/11/22',
      service: 'Hair Cut',
      discountValue: '500',
    },
    {
      id: 4,
      date: '30/11/22',
      service: 'Hair Cut',
      discountValue: '500',
    },
  ];
  invoiceDATA = [
    {
      id: 1,
      invoiceText: ' Invoice Date :',
      date: '25 Jun 2022',
      at: 'at',
      time: '7:45PM',
      plan: 'Gold Plan',
      paid: 'Paid : ',
      using: 'Using UPI',
      price: '₹2000',
      start: 'Start Date : ',
      startDate: '01-04-2022',
      expiry: 'Expiry : ',
      expiryDate: '01-04-2023',
    },
  ];
  return (
    <Container
      title={'Transaction History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      {invoiceDATA.map(item => {
        return (
          <View
            key={item.id}
            style={[styles.boxWithShadow, styles.invoiceView]}>
            <View style={styles.invoiceDetail}>
              <Text style={styles.invoiceDetailText}>
                {item.invoiceText} <Text>{item.date} </Text>
                <Text>{item.at} </Text>
                <Text>{item.time}</Text>
              </Text>
              <AppIcon
                name={'file-upload'}
                type={'FontAwesome5'}
                size={17}
                color={theme.color.black}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(10),
                alignItems: 'center',
              }}>
              <LinearGradient
                colors={['#A960FA', '#FB3A40']}
                style={{
                  padding: vw(10),
                  borderRadius: vw(10),
                  alignItems: 'center',
                }}>
                <Text style={styles.LinearGradientText}>Gold</Text>
                <Text
                  style={{fontSize: normalize(7), color: theme.color.white}}>
                  #1265789045
                </Text>
              </LinearGradient>
              <View>
                <Text
                  style={{
                    fontSize: normalize(16),
                    fontFamily: theme.font.bold,
                    color: theme.color.black,
                  }}>
                  {item.plan}
                </Text>
                <Text
                  style={{
                    fontSize: normalize(14),
                    fontFamily: theme.font.regular,
                    color: theme.color.black,
                  }}>
                  {item.price}
                </Text>
              </View>
              <Text style={styles.paidText}>
                {item.paid}
                <Text>{item.using}</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: vh(20),
              }}>
              <Text style={styles.paidText}>
                {item.start}
                <Text>{item.startDate}</Text>
              </Text>
              <Text style={styles.paidText}>
                {item.expiry}
                <Text>{item.expiryDate}</Text>
              </Text>
            </View>
          </View>
        );
      })}
      <TextInput
        value={search}
        style={[styles.input, {paddingVertical: vh(18)}]}
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
          onPress={() => {
            setShowModal(true);
          }}
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
      <Text style={styles.name}>Sanjna Singh</Text>
      <View
        style={{
          flexDirection: 'row',
          marginTop: vh(30),
          justifyContent: 'space-around',
        }}>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Date
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Service
        </Text>
        <View>
          <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
            Discount Value
          </Text>
          <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
            (Rs.)
          </Text>
        </View>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Invoice
        </Text>
      </View>
      {employeDATA.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[styles.boxWithShadow, styles.employeeDataView]}>
            <Text style={styles.header}>{item.date}</Text>
            <Text style={styles.header}>{item.service}</Text>
            <Text style={styles.header}>{item.discountValue}</Text>
            <AppIcon
              name={'file'}
              type={'FontAwesome'}
              size={15}
              color={theme.color.black}
              onPress={() => {}}
            />
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: vh(17),
          marginHorizontal: vw(16),
        }}>
        <Text style={styles.total}>Total Discount Availed </Text>
        <Text style={[styles.total, {marginRight: vw(100)}]}>6000</Text>
      </View>
      <TouchableOpacity style={styles.shareBtn}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
          style={{marginRight: vw(15)}}
        />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  invoiceView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(16),
    padding: vw(16),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
    marginTop: vh(60),
  },
  invoiceDetail: {
    borderBottomWidth: 0.5,
    paddingBottom: vh(11),
    borderColor: theme.color.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceDetailText: {
    fontSize: normalize(16),
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontWeight: '500',
  },
  LinearGradientText: {
    fontSize: normalize(16),
    textAlign: 'center',
    fontFamily: theme.font.semiBold,
    color: theme.color.white,
    paddingTop: vh(10),
  },
  paidText: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.dropdownColor,
    fontWeight: '500',
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(25),
    marginHorizontal: vw(15),
    height: vh(55),
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
  name: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
    marginHorizontal: vw(16),
    marginTop: vh(15),
  },
  header: {
    fontSize: normalize(14),
    color: theme.color.black,
    fontFamily: theme.font.regular,
  },
  employeeDataView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.white,
    marginTop: vh(17),
    marginHorizontal: vw(16),
    paddingVertical: vh(11),
    borderRadius: vw(10),
    alignItems: 'center',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginTop: '20%',
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
  total: {
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    color: theme.color.primary,
  },
});

export default TransactionHistory;
