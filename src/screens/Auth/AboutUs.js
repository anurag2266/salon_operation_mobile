import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import {normalize, vh, vw} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../theme/theme';
import CountryPicker from 'react-native-country-picker-modal';
import CustomHeader from '../../components/common/CustomHeader';
import CustomButton from '../../components/common/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {updateUserInfoAPI} from '../../api/services/authService';

import {showMessage} from 'react-native-flash-message';
import validator from 'validator';
import {setToken} from '../../utils/localStorage';
import {ValueChanged} from '../../redux/actions/flightActions';
import AccountCreated from '../../components/loader/AccountCreated';
import Container from '../../components/common/Container';

const AboutUs = ({navigation}) => {
  const dispatch = useDispatch();
  const {phone} = useSelector(state => state.flightReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    primaryPhone: phone?.phoneNumber,
    primaryEmail: '',
    password: '',
    countryCode: phone?.dialCode,
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const handleUpdateUserInfo = async () => {
    if (userDetails.firstName.length < 3) {
      showMessage({
        message: 'First Name Must be minimum 3 letters',
        type: 'danger',
      });
    } else if (!validator.isEmail(userDetails.primaryEmail)) {
      showMessage({
        message: 'Enter a valid email address',
        type: 'danger',
      });
    } else if (userDetails.password.length < 8) {
      showMessage({
        message: 'Password should be minimum 8 digits',
        type: 'danger',
      });
    } else if (userDetails.password != confirmPassword) {
      showMessage({
        message: 'Password mismatched',
        type: 'danger',
      });
    } else {
      const {status, message, data} = await updateUserInfoAPI(userDetails);
      if (status) {
        showMessage({message: message, type: 'success'});
        setToken(data.token);
        dispatch(ValueChanged('userDetails', data));

        setVisible(true);
        setTimeout(() => {
          dispatch(ValueChanged('isLogin', true));
          navigation.navigate('SalonSetup');
        }, 3000);
      } else {
        showMessage({message: message, type: 'danger'});
      }
    }
  };

  return (
    <Container
      title={'About You'}
      description={'Let’s make it quick and start exploring'}
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <AccountCreated visible={visible} />
      <TextInput
        value={userDetails.firstName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your first name"
        placeholder="Your First Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setUserDetails({...userDetails, firstName: text});
        }}
      />
      <TextInput
        value={userDetails.lastName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your last name"
        placeholder="Your last name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setUserDetails({...userDetails, lastName: text});
        }}
      />
      <TextInput
        value={userDetails.primaryEmail}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your email"
        placeholder="Your email"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setUserDetails({...userDetails, primaryEmail: text});
        }}
      />
      <TextInput
        value={userDetails.primaryPhone}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Mobile Number"
        placeholder="Your Mobile Number"
        placeholderTextColor={theme.color.darkGrey}
        autoFocus
        focusColor={theme.color.black}
        maxLength={10}
        editable={false}
        keyboardType="number-pad"
        renderLeftIcon={() => (
          <CountryPicker
            withFilter
            withFlag
            withFlagButton
            withCallingCodeButton
            withCallingCode
            withEmoji
            modalProps={{visible: false}}
            countryCode={phone?.countryCode}
            visible={false}
            onClose={() => setVisible(false)}
            containerButtonStyle={{
              paddingRight: 5,
              marginRight: 5,
              borderRightWidth: 1.5,
              borderColor: theme.color.borderGrey,
            }}
          />
        )}
        renderRightIcon={() => (
          <Text
            style={{
              color: '#00AB26',
              fontSize: normalize(14),
              fontFamily: theme.font.medium,
            }}>
            Verified
          </Text>
        )}
      />
      {userDetails.primaryEmail ? (
        <>
          <TextInput
            value={userDetails.password}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            label="Create Password"
            placeholder="Create Password"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setUserDetails({...userDetails, password: text});
            }}
            renderRightIcon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.show}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            value={confirmPassword}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            label="Confirm Password"
            placeholder="Confirm Password"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            secureTextEntry={!showPassword}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            renderRightIcon={() => (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.show}>
                  {showPassword ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : null}
      <CustomButton
        label={'NEXT'}
        extraStyle={{marginTop: vh(70)}}
        onPress={handleUpdateUserInfo}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  BackBtn: {
    color: theme.color.lightBlack,
    width: vw(21),
    height: vh(17),
    marginTop: vh(7),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(34),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 16, color: theme.color.black},
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  genderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderText: {
    fontSize: normalize(18),
    marginLeft: vw(30),
    fontFamily: theme.font.regular,
  },
  selectedGender: {
    color: theme.color.inputGrey,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    textAlign: 'center',
    marginTop: vh(20),
  },
  show: {
    fontFamily: theme.font.medium,
    fontSize: normalize(11),
    color: theme.color.LightBlue,
  },
});
export default AboutUs;
