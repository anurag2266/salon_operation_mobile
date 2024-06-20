import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../components/common/CustomButton';
import BillingRBSheetComponent from '../../components/common/BillingRBSheetComponent';
import RBSheet from 'react-native-raw-bottom-sheet';

const UpdateAppointment = ({navigation}) => {
  const [discountCard, setdiscountCard] = useState(false);
  const [stylist, setstylist] = useState('');
  const [startDateTime, setstartDateTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [notes, setnotes] = useState('');
  const refRBSheet = useRef();

  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      service: 'Hair Colour',
      time: '120 min',
      amount: 'Rs 550',
      dicountCard: 'Discount Card Applied',
      remove: 'Remove',
    },
    {
      id: 2,
      imagePath: LocalImages.Profile,
      service: 'Hair Colour',
      time: '120 min',
      amount: 'Rs 550',
      dicountCard: 'Discount Card Applied',
      remove: 'Remove',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Update Appointment'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={[styles.profileView, styles.boxWithShadow]}>
          <View style={styles.usericon}>
            <AppIcon
              name={'user'}
              type={'FontAwesome'}
              size={30}
              color={theme.color.dropdownColor}
            />
          </View>
          <View style={{marginHorizontal: vw(20)}}>
            <Text style={styles.name}>Shivani Singh</Text>
            <Text style={styles.number}>+91 9876543219</Text>
          </View>
        </View>
        <View style={styles.clientHistoryView}>
          <Text style={styles.clientHistory}>Client History</Text>
          <AppIcon
            name={'down'}
            type={'AntDesign'}
            size={15}
            color={theme.color.dropdownColor}
          />
        </View>
        <Text style={styles.service}>Service</Text>
        {DATA.map((service, index) => {
          return (
            <>
              <View style={[styles.mainItemView, styles.boxWithShadow]}>
                <View
                  key={service.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View style={styles.childView}>
                    <Image
                      source={service.imagePath}
                      style={{width: vw(80), height: vh(80)}}
                    />
                  </View>
                  <View style={{marginLeft: vw(15)}}>
                    <Text style={styles.serviceText}>{service.service}</Text>
                    <View style={{flexDirection: 'row', marginTop: vh(2)}}>
                      <Text style={styles.time}>{service.time}</Text>
                      <View
                        style={{
                          borderLeftWidth: 1,
                          marginHorizontal: vw(15),
                          borderColor: theme.color.dropdownColor,
                        }}></View>
                      <Text style={styles.time}>{service.amount}</Text>
                    </View>
                  </View>
                  {discountCard == false ? (
                    <AppIcon
                      name={'delete'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.red}
                      style={{marginLeft: '28%'}}
                      onPress={() => {
                        '';
                      }}
                    />
                  ) : null}
                </View>
                {discountCard == true ? (
                  <View style={styles.discountCardView}>
                    <Text style={styles.discountCardText}>
                      {service.dicountCard}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={[
                          styles.discountCardText,
                          {color: theme.color.red},
                        ]}>
                        {service.remove}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <TextInput
                value={stylist}
                style={[styles.input, {marginTop: vh(25)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                multiline={true}
                label="Stylist"
                placeholder="Stylist"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                onChangeText={text => {
                  setstylist(text);
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  value={startDateTime}
                  style={[styles.input, {marginTop: vh(25), width: '40%'}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  textErrorStyle={styles.textErrorStyle}
                  multiline={true}
                  label="Start Date and Time"
                  placeholder="Start Date and Time"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  onChangeText={text => {
                    setstartDateTime(text);
                  }}
                />
                <TextInput
                  value={endTime}
                  style={[styles.input, {marginTop: vh(25), width: '40%'}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  textErrorStyle={styles.textErrorStyle}
                  multiline={true}
                  label="End Time"
                  placeholder="End Time"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  onChangeText={text => {
                    setendTime(text);
                  }}
                />
              </View>
            </>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: vh(37),
            marginHorizontal: vw(16),
            borderBottomWidth: 0.5,
            paddingBottom: vh(20),
            borderColor: theme.color.dropdownColor,
          }}>
          <TouchableOpacity>
            <Text style={styles.btnText}>+ Add Items</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.btnText}>Redeem</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={notes}
          style={[styles.input, {marginTop: vh(25), height: vh(134)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          multiline={true}
          label="Add booking Notes"
          placeholder="Add booking Notes"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setnotes(text);
          }}
        />
        <View style={styles.totalAmountView}>
          <Text style={styles.totalAmount}>Total Amount Rs. 708</Text>
          <TouchableOpacity>
            <Text style={styles.summary}>View Summary</Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              height: vh(350),
            },
          }}>
          <BillingRBSheetComponent
            heading={'Pedicure service is updated for another day.'}
            description={
              'Do you want to create a new appointment or continue for advance payment.'
            }
            label={'Create an Appointment'}
            onPressLabel={''}
            btnText={'Checkout'}
            onPress={() => {
              refRBSheet.current.close();
            }}
            onPressBtnText={() => {
              refRBSheet.current.close(),
                navigation.navigate('BillingPaymentMethod');
            }}
          />
        </RBSheet>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          refRBSheet.current.open();
          navigation.navigate('');
        }}
        extraStyle={{marginBottom: vh(30), marginTop: vh(30)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileView: {
    flexDirection: 'row',
    marginTop: vh(25),
    alignItems: 'center',
    padding: vw(25),
    borderWidth: 1,
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
  usericon: {
    borderWidth: 1,
    borderColor: theme.color.searchColor,
    borderRadius: vw(35),
    paddingVertical: vw(17),
    paddingHorizontal: vw(20),
    backgroundColor: theme.color.searchColor,
  },
  name: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  number: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    marginTop: vh(6),
  },
  clientHistoryView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    marginHorizontal: vw(16),
    alignItems: 'center',
    padding: vw(16),
    borderColor: theme.color.dropdownColor,
  },
  clientHistory: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
  },
  service: {
    fontFamily: theme.font.semiBold,
    marginTop: vh(15),
    marginHorizontal: vw(16),
    fontSize: normalize(16),
    color: theme.color.black,
  },
  childView: {
    borderWidth: 1,
    borderRadius: vw(80),
    borderColor: theme.color.white,
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
  discountCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    paddingVertical: vh(20),
    borderColor: theme.color.dropdownColor,
    marginTop: vh(26),
  },
  serviceText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  time: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  discountCardText: {
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.primary,
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
  btnText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  totalAmountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(16),
    marginTop: vh(20),
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
    color: theme.color.black,
    width: '40%',
  },
  summary: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
});

export default UpdateAppointment;
