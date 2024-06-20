import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-element-textinput';
import {Dropdown} from 'react-native-element-dropdown';

const ClientManagementMembership = ({navigation}) => {
  const [applicableOn, setapplicableOn] = useState('');
  const [appliedDate, setappliedDate] = useState('');
  const [expiryDate, setexpiryDate] = useState('');
  const [planValidity, setplanValidity] = useState('');
  const [extendMembership, setextendMembership] = useState('');
  const [membersIncluded, setmembersIncluded] = useState('');
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
      totalPrice: 'Rs 1200',
      serviceFee: 'Rs 45',
      stylistFee: 'Rs 20',
      discount: '-Rs 300',
      tax: 'Rs 45',
      roundOff: '-Rs 300',
      totalPaidAmt: 'Rs 1200',
    },
  ];
  return (
    <Container
      title={'Memberships'}
      description={'Offers Details Of Tarun Sharma'}
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
        value={applicableOn}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Applicable On'}
        placeholder={'Applicable On'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setapplicableOn(text);
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={appliedDate}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Applied Date'}
          placeholder={'Applied Date'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setappliedDate(text);
          }}
        />
        <TextInput
          value={expiryDate}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Expiry Date'}
          placeholder={'Expiry Date'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setexpiryDate(text);
          }}
        />
      </View>
      <TextInput
        value={planValidity}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Plan Validity'}
        placeholder={'Plan Validity'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setplanValidity(text);
        }}
        renderRightIcon={() => (
          <TouchableOpacity>
            <Text
              style={{
                color: theme.color.LightBlue,
                fontFamily: theme.font.semiBold,
                fontSize: normalize(14),
              }}>
              Update
            </Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={extendMembership}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        placeholder="dd/mm/yyyy"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setextendMembership(text);
        }}
        renderRightIcon={() => (
          <AppIcon
            name={'edit'}
            type={'FontAwesome'}
            size={15}
            color={theme.color.dropdownColor}
          />
        )}
        renderLeftIcon={() => (
          <Dropdown
            style={{width: '60%'}}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            placeholder="Extend Membership"
            labelField="label"
            valueField="value"
            maxHeight={300}
            data={[
              {label: 'Extended Membership', value: '1'},
              {label: 'Freeze Membership', value: '2'},
            ]}
          />
        )}
      />
      <TextInput
        value={membersIncluded}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Members Included'}
        placeholder={'Members Included'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setmembersIncluded(text);
        }}
        renderRightIcon={() => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddMembers');
            }}>
            <Text
              style={{
                color: theme.color.LightBlue,
                fontFamily: theme.font.semiBold,
                fontSize: normalize(14),
              }}>
              Add Members
            </Text>
          </TouchableOpacity>
        )}
      />
      {serviceData.map(item => {
        return (
          <View style={styles.mainviewServiceData}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: vw(25),
              }}>
              <View>
                <Text style={styles.dataText}>Total Price</Text>
                <Text style={styles.dataText}>Service Fee</Text>
                <Text style={styles.dataText}>Stylist Fee</Text>
                <Text style={styles.dataText}>Discount</Text>
                <Text style={styles.dataText}>Tax</Text>
                <Text style={styles.dataText}>Rounding Off</Text>
              </View>
              <View>
                <Text style={styles.dataText}>{item.totalPrice}</Text>
                <Text style={styles.dataText}>{item.serviceFee}</Text>
                <Text style={styles.dataText}>{item.stylistFee}</Text>
                <Text style={styles.dataText}>{item.discount}</Text>
                <Text style={styles.dataText}>{item.tax}</Text>
                <Text style={styles.dataText}>{item.roundOff}</Text>
              </View>
            </View>
            <View style={styles.totalAmtView}>
              <Text style={styles.totalAmt}>Total Paid Amount</Text>
              <Text style={styles.totalAmt}>{item.totalPaidAmt}</Text>
            </View>
          </View>
        );
      })}
    </Container>
  );
};

export default ClientManagementMembership;

const styles = StyleSheet.create({
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
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  invoicetxt: {
    fontFamily: theme.font.regular,
  },
  txt: {
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
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
  mainviewServiceData: {
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
    marginBottom: vh(50),
  },
  dataText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    marginTop: vh(12),
  },
  totalAmt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  totalAmtView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(24),
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: vh(24),
    paddingHorizontal: vw(25),
    borderColor: theme.color.dropdownColor,
  },
});
