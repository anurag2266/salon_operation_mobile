import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {normalize, vh, vw} from '../../../utils/dimensions';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';

const ManageAccounting = ({navigation}) => {
  const [payment, setPayment] = useState('1');
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('All');

  const allData = [
    {
      id: 1,
      InvoiceNo: '98765434',
      name: 'Vinit Chaudhary',
      number: '8398020076',
      complete: 'Completed',
      CreatedOn: '12/12/22',
      Amount: 'Rs. 1000',
      status: 'Billing',
    },
    {
      id: 2,
      InvoiceNo: '98765434',
      name: 'Vinit Chaudhary',
      number: '8398020076',
      complete: 'Initiated',
      CreatedOn: '12/12/22',
      Amount: 'Rs. 1000',
      status: 'Refund',
    },
    {
      id: 3,
      InvoiceNo: '98765434',
      name: 'Vinit Chaudhary',
      number: '8398020076',
      complete: 'Order Closed',
      CreatedOn: '12/12/22',
      Amount: 'Rs. 1000',
      status: 'Purchase',
    },
    {
      id: 4,
      InvoiceNo: '98765434',
      name: 'Vinit Chaudhary',
      number: '8398020076',
      complete: 'Completed',
      CreatedOn: '12/12/22',
      Amount: 'Rs. 1000',
      status: 'Billing',
    },
  ];
  const [data, setData] = useState(allData);
  return (
    <Container
      title={'Manage Accounting'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      {payment == '0' ? (
        <View>
          <Image
            source={require('../../../assets/images/manageAccounting.png')}
            style={{
              width: vw(287),
              height: vw(263),
              alignSelf: 'center',
              marginTop: vh(150),
            }}
          />
          <Text style={styles.paymentText}>No Payment Created Yet</Text>
        </View>
      ) : (
        <>
          <TextInput
            value={search}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Search products to add"
            placeholder="Search products to add"
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
          <ScrollView
            style={{marginTop: vh(30)}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              onPress={() => {
                setOption('All');
                setData(allData);
              }}
              style={[
                styles.dataViewTouch,
                {
                  backgroundColor:
                    option == 'All' ? theme.color.primary : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.dataText,
                  {
                    color:
                      option == 'All' ? theme.color.white : theme.color.black,
                  },
                ]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption('Billing');
                let array = allData.filter(item => item.status == 'Billing');
                setData(array);
              }}
              style={[
                styles.dataViewTouch,
                {
                  backgroundColor:
                    option == 'Billing'
                      ? theme.color.primary
                      : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.dataText,
                  {
                    color:
                      option == 'Billing'
                        ? theme.color.white
                        : theme.color.primary,
                  },
                ]}>
                Billing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption('Refund');
                let array = allData.filter(item => item.status == 'Refund');
                setData(array);
              }}
              style={[
                styles.dataViewTouch,
                {
                  backgroundColor:
                    option == 'Refund'
                      ? theme.color.primary
                      : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.dataText,
                  {
                    color:
                      option == 'Refund'
                        ? theme.color.white
                        : theme.color.black,
                  },
                ]}>
                Refund
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption('Purchase');
                let array = allData.filter(item => item.status == 'Purchase');
                setData(array);
              }}
              style={[
                styles.dataViewTouch,
                {
                  backgroundColor:
                    option == 'Purchase'
                      ? theme.color.primary
                      : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.dataText,
                  {
                    color:
                      option == 'Purchase'
                        ? theme.color.white
                        : theme.color.black,
                  },
                ]}>
                Purchase
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {data.map(item => {
            return (
              <View style={styles.mainView}>
                <View
                  onPress={() => {
                    setOption(item.status);
                  }}
                  style={[
                    styles.billingView,
                    {
                      backgroundColor:
                        item.status == 'Billing'
                          ? '#FFC305'
                          : '#80B4FB' && item.status == 'Refund'
                          ? '#FCAD6D'
                          : '#80B4FB',
                    },
                  ]}>
                  <Text style={styles.billingText}>{item.status}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.invoiceText}>
                      Invoice No. {item.InvoiceNo}
                    </Text>
                    <Text style={[styles.nameText, {marginVertical: vh(12)}]}>
                      {item.name}
                    </Text>
                    <Text style={styles.invoiceText}>{item.number}</Text>
                  </View>
                  <View>
                    <Text
                      style={[styles.nameText, {color: theme.color.switchOn}]}>
                      {item.complete}
                    </Text>
                    <Text
                      style={[styles.invoiceText, {marginVertical: vh(12)}]}>
                      Created on {item.CreatedOn}
                    </Text>
                    <Text style={styles.nameText}>Amount{item.Amount}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default ManageAccounting;

const styles = StyleSheet.create({
  paymentText: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(24),
    textAlign: 'center',
    marginTop: vh(25),
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
  dataViewTouch: {
    paddingHorizontal: vw(20),
    paddingVertical: vh(3),
    borderWidth: 1,
    borderRadius: vw(12),
    marginHorizontal: vw(10),
    borderColor: theme.color.primary,
  },
  dataText: {
    fontFamily: theme.font.regular,
    fontSize: normalize(20),
  },
  mainView: {
    marginTop: vh(40),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(15),
    marginHorizontal: vw(20),
    borderRadius: vw(10),
    paddingHorizontal: vw(17),
  },
  billingView: {
    alignSelf: 'flex-end',
    position: 'relative',
    top: vh(-25),
    borderRadius: vw(400),
    paddingHorizontal: vw(25),
    paddingVertical: vh(3),
  },
  billingText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  invoiceText: {
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  nameText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
});
