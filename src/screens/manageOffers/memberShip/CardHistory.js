import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-element-textinput';
import {Dropdown} from 'react-native-element-dropdown';
import LocalImages from '../../../utils/LocalImages';

const CardHistory = ({navigation}) => {
  const [planValidity, setplanValidity] = useState('');
  const [extendMembership, setextendMembership] = useState('');
  const [btnShown, setbtnshown] = useState(false);
  const [transactionHistory, settransactionHistory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setgender] = useState('');
  const [name, setname] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [email, setemail] = useState('');

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

  historyData = [
    {
      id: 1,
      name: 'Sanjana Singh',
      member: '(Primary Member)',
    },
    {
      id: 2,
      name: 'Guest 1',
    },
  ];
  data = [
    {
      id: 1,
      cardNo: '#1265789045',
      paid: 'Paid',
      name: 'Sanjana Singh',
      phoneNo: 'Phone Number :',
      number: '9856342678',
      alternate: 'Alternate Number :',
      alternatenumber: '9856342678',
      sold: 'Sold By : ',
      ename: 'Vinit',
      employeeID: '(Employee ID)',
    },
  ];

  return (
    <Container
      title={'Membership Card History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => navigation.goBack()}>
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
      <View style={[styles.boxWithShadow, styles.cardView]}>
        {data.map(item => {
          return (
            <View key={item.id}>
              <View style={styles.cardInnerView}>
                <Text style={styles.number}>{item.cardNo}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: vw(10),
                    paddingVertical: vh(5),
                    backgroundColor: theme.color.switchOn,
                    borderRadius: vw(4),
                  }}>
                  <Text
                    style={{
                      color: theme.color.white,
                      fontFamily: theme.font.bold,
                      fontSize: normalize(11),
                    }}>
                    {item.paid}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginTop: vh(18),
                  fontFamily: theme.font.bold,
                  color: theme.color.black,
                  fontSize: normalize(23),
                }}>
                {item.name}
              </Text>
              <View style={styles.cardInnerView}>
                <Text style={[styles.number, {fontSize: normalize(14)}]}>
                  {item.phoneNo}
                </Text>
                <Text style={[styles.number, {fontSize: normalize(14)}]}>
                  {item.number}
                </Text>
              </View>
              <View style={styles.cardInnerView}>
                <Text style={[styles.number, {fontSize: normalize(14)}]}>
                  {item.alternate}
                </Text>
                <Text style={[styles.number, {fontSize: normalize(14)}]}>
                  {item.alternatenumber}
                </Text>
              </View>
              <Text style={[styles.employeeID, {marginTop: vh(18)}]}>
                {item.sold}
                <Text style={{fontWeight: '400'}}>{item.ename}</Text>
                <Text style={{fontWeight: '400'}}>{item.employeeID}</Text>
              </Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextInput
          value={planValidity}
          style={[styles.input, {width: '50%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Plan Validity"
          placeholder="Plan Validity"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setplanValidity(text);
          }}
        />
        <Text style={styles.expiryText}>
          Expiry : <Text>31 Nov 2022</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          setbtnshown(!btnShown);
        }}
        style={{
          margin: vw(15),
          padding: vw(11),
          alignSelf: 'flex-start',
          backgroundColor: btnShown
            ? theme.color.buttonInActive
            : theme.color.white,
        }}>
        <Text
          style={{
            fontSize: normalize(16),
            fontFamily: theme.font.bold,
            color: theme.color.LightBlue,
          }}>
          Update
        </Text>
      </TouchableOpacity>
      {btnShown ? (
        <>
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
              setextendMembership({text});
            }}
            renderRightIcon={() => (
              <AppIcon
                name={'copy1'}
                type={'AntDesign'}
                size={20}
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
        </>
      ) : null}
      <View style={styles.transactionHistoryView}>
        <Text
          style={{
            color: theme.color.black,
            fontFamily: theme.font.bold,
            fontSize: normalize(17),
          }}>
          Transaction History
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TransactionHistory');
            }}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          {transactionHistory ? (
            <AppIcon
              name={'up'}
              type={'AntDesign'}
              size={15}
              onPress={() => {
                settransactionHistory(!transactionHistory);
              }}
              color={theme.color.dropdownColor}
            />
          ) : (
            <AppIcon
              name={'down'}
              type={'AntDesign'}
              size={15}
              onPress={() => {
                settransactionHistory(!transactionHistory);
              }}
              color={theme.color.dropdownColor}
            />
          )}
        </View>
      </View>
      {transactionHistory ? (
        <>
          {historyData.map(item => {
            return (
              <View style={[styles.boxWithShadow, styles.miniView]}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemMember}>{item.member}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ServiceAvailedBy');
                  }}
                  style={styles.btnTouch}>
                  <Text style={styles.btnText}>Service/Products</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnTouch}>
                  <Text style={styles.btnText}>Invoices</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </>
      ) : null}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text
          style={{
            marginHorizontal: vw(16),
            marginTop: vh(30),
            color: theme.color.LightBlue,
            fontFamily: theme.font.bold,
            fontSize: normalize(18),
          }}>
          + Add Member
        </Text>
      </TouchableOpacity>
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
        <Text style={styles.clientText}>Share Details</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View style={styles.modalView}>
            <View style={styles.newMemberView}>
              <Text style={styles.newMemberText}>New Member</Text>
            </View>
            <Dropdown
              style={[styles.input, {paddingVertical: vh(12), width: vw(370)}]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={[
                {label: 'Male', value: '1'},
                {label: 'Female', value: '2'},
              ]}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              value={gender}
              onChange={item => {
                setgender(item);
              }}
            />
            <TextInput
              value={name}
              style={styles.input}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Name"
              placeholder="Name"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setname(text);
              }}
            />
            <TextInput
              value={mobileNo}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              maxLength={10}
              label="Mobile Number"
              placeholder="Mobile Number"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setmobileNo(text);
              }}
            />
            <TextInput
              value={email}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Email"
              placeholder="Email"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setemail(text);
              }}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                borderRadius: vw(10),
                borderWidth: 1,
                marginTop: vh(40),
                paddingVertical: vh(17),
                paddingHorizontal: vw(65),
                alignItems: 'center',
                backgroundColor: theme.color.primary,
                borderColor: theme.color.primary,
              }}>
              <Text
                style={{
                  color: theme.color.white,
                  fontSize: normalize(18),
                  fontFamily: theme.font.bold,
                }}>
                ADD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  cardView: {
    borderWidth: 1,
    marginTop: vh(40),
    backgroundColor: theme.color.white,
    padding: vw(20),
    borderColor: theme.color.white,
  },
  cardInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(18),
  },
  number: {
    fontFamily: theme.font.regular,
    fontWeight: '500',
    color: theme.color.dropdownColor,
    fontSize: normalize(16),
  },
  employeeID: {
    color: theme.color.black,
    fontSize: normalize(15),
    fontFamily: theme.font.regular,
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
  expiryText: {
    textAlign: 'center',
    marginRight: vw(30),
    marginTop: vh(20),
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  transactionHistoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(16),
    marginTop: vh(16),
    alignItems: 'center',
  },
  miniView: {
    borderWidth: 1,
    backgroundColor: theme.color.white,
    marginHorizontal: vw(16),
    borderRadius: vw(10),
    paddingVertical: vh(30),
    paddingHorizontal: vw(12),
    alignItems: 'center',
    marginTop: vh(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: theme.color.white,
  },
  viewAllText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
    marginRight: vw(10),
  },
  itemName: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontWeight: '500',
    fontSize: normalize(14),
  },
  itemMember: {
    color: theme.color.switchOn,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(12),
    marginTop: vh(10),
  },
  btnText: {
    fontSize: normalize(14),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
  },
  btnTouch: {
    paddingHorizontal: vw(10),
    borderWidth: 1,
    borderRadius: vw(10),
    paddingVertical: vh(5),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.white,
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
  modalView: {
    marginHorizontal: vw(12),
    backgroundColor: 'white',
    borderRadius: vw(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: vh(40),
  },
  newMemberText: {
    color: theme.color.white,
    fontFamily: theme.font.regular,
    fontSize: normalize(15),
  },
  newMemberView: {
    backgroundColor: theme.color.primary,
    paddingVertical: vh(15),
    alignItems: 'center',
    paddingHorizontal: vw(150),
    borderTopLeftRadius: vw(10),
    borderTopRightRadius: vw(10),
  },
});

export default CardHistory;
