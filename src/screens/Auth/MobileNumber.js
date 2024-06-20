import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BasicContainer from '../../components/common/BasicContainer';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/common/CustomButton';
import CustomHeader from '../../components/common/CustomHeader';
import {TextInput} from 'react-native-element-textinput';
import CountryPicker from 'react-native-country-picker-modal';
import {verifyPhoneAPI} from '../../api/services/authService';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {ValueChanged} from '../../redux/actions/flightActions';
import Container from '../../components/common/Container';
import {Country} from 'country-state-city';

const MobileNumber = ({navigation}) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [dialCode, setDailCode] = useState('91');
  const [visible, setVisible] = useState(false);
  const country = Country.getAllCountries().filter(
    item => item.phonecode == dialCode,
  );
  const handleSubmit = async () => {
    const {status, data, message} = await verifyPhoneAPI({
      countryCode: dialCode,
      primaryPhone: phoneNumber,
    });

    if (status) {
      showMessage({message: message, type: 'Success'});
      dispatch(ValueChanged('phone', {phoneNumber, dialCode, countryCode}));
      navigation.navigate('OtpScreen', {
        countryCode: dialCode,
        primaryPhone: phoneNumber,
      });
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  return (
    <Container
      title={'Enter Your Mobile Number'}
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      scroll={false}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <TextInput
          value={phoneNumber}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Mobile Number"
          placeholder="Your Mobile Number"
          placeholderTextColor={theme.color.darkGrey}
          autoFocus
          focusColor={theme.color.black}
          maxLength={10}
          keyboardType="number-pad"
          renderLeftIcon={() => (
            <CountryPicker
              withFilter
              withFlag
              withFlagButton
              withCallingCodeButton
              withCallingCode
              withEmoji
              withModal
              countryCode={country[0]?.isoCode ? country[0].isoCode : 'IN'}
              visible={visible}
              onClose={() => setVisible(false)}
              containerButtonStyle={{paddingRight: 5, borderRightWidth: 1.5}}
              onSelect={e => {
                setDailCode(e.callingCode[0]);
                setCountryCode(e.cca2);
              }}
            />
          )}
          onChangeText={text => {
            setPhoneNumber(text);
          }}
        />

        <CustomButton
          extraStyle={{marginTop: vh(546)}}
          label={'Send OTP'}
          disabled={phoneNumber.length < 10}
          onPress={handleSubmit}
        />
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  BackBtn: {
    color: theme.color.lightBlack,
  },
  input: {
    height: 55,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.color.dropdownColor,
    marginHorizontal: vw(16),
    marginTop: vh(61),
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  labelStyle: {
    fontSize: 10,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    color: theme.color.black,
    fontFamily: theme.font.bold,
  },
  placeholderStyle: {fontSize: 16, paddingHorizontal: 8},
  textErrorStyle: {fontSize: 16},
});

export default MobileNumber;
