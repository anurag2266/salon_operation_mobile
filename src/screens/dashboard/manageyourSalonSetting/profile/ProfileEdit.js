import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import theme from '../../../../theme/theme';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import CountryPicker from 'react-native-country-picker-modal';
import {TextInput} from 'react-native-element-textinput';
import RBSheet from 'react-native-raw-bottom-sheet';
import SendOtp from './SendOtp';
import ChangePassword from './ChangePassword';
import {useFocusEffect} from '@react-navigation/native';

import {
  getUserDetailsAPI,
  updateUserPasswordAPI,
  updateUserProfileAPI,
} from '../../../../api/services/authService';
import OtpScreen from '../../../Auth/OtpScreen';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

const ProfileEdit = ({navigation}) => {
  const {userDetails} = useSelector(state => state.flightReducer);
  const refRBSheet = useRef();
  const refRBSheetBtn = useRef();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [visible, setVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [dialCode, setDailCode] = useState('91');
  const [additionalDetail, setadditionalDetail] = useState(false);
  const [aadharNo, setaadharNo] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleGetUserInfo = async () => {
    const {status, message, data} = await getUserDetailsAPI();
    console.log('User data--->', data);

    if (status) {
      setfirstName(data.firstName);
      setlastName(data.lastName);
      setEmail(data.primaryEmail);
      setPhoneNo(data.primaryPhone);
      setaadharNo(data.addharcard);
      setadditionalDetail(true);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const hanldleUpdateProfile = async () => {
    const {data, status, message} = await updateUserProfileAPI({
      firstName: firstName,
      lastName: lastName,
      countryCode: dialCode,
      primaryPhone: phoneNo,
      primaryEmail: email,
      addharcard: aadharNo,
    });
    if (status) {
      showMessage({message: message, type: 'success'});
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleUpdatePassword = async () => {
    if (password != confirmPassword) {
      showMessage({message: 'Password Mismatched', type: 'danger'});
    } else if (password.length < 7) {
      showMessage({
        message: 'Password must be 8 digit',
        type: 'danger',
      });
    } else {
      const {data, status, message} = await updateUserPasswordAPI({
        oldPassword: oldPassword,
        newPassword: password,
      });
      if (status) {
        refRBSheetBtn.current.close();
        showMessage({
          message: 'Updated Password Successfully',
          type: 'success',
        });
        setConfirmPassword('');
        setPassword('');
        setOldPassword('');
      } else {
        showMessage({
          message: message ? message : 'Something Went Wrong',
          type: 'danger',
        });
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetUserInfo();
    }, []),
  );

  return (
    <Container
      title={'About You'}
      description={
        'Tell us more about you. Please fill in your Personal Details'
      }
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      bottomButtonTitle={'SAVE'}
      onPressBottomButton={hanldleUpdateProfile}
      leftIconType={'MaterialCommunityIcons'}>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(593),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <SendOtp
          onPress={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetBtn}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(593),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ChangePassword
          onClose={() => {
            refRBSheetBtn.current.close();
          }}
          password={password}
          oldPassword={oldPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={text => setConfirmPassword(text)}
          setOldPassword={text => setOldPassword(text)}
          setPassword={text => setPassword(text)}
          onSave={handleUpdatePassword}
        />
      </RBSheet>
      <TextInput
        value={firstName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="First Name"
        placeholder="First Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setfirstName(text);
        }}
        renderRightIcon={() => (
          <TouchableOpacity
            onPress={() => {
              setfirstName('');
            }}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={lastName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Last Name"
        placeholder="Last Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setlastName(text);
        }}
        renderRightIcon={() => (
          <TouchableOpacity
            onPress={() => {
              setlastName('');
            }}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={email}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Email"
        placeholder="Email"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setEmail(text);
        }}
        renderRightIcon={() => (
          <TouchableOpacity
            onPress={() => {
              setEmail('');
            }}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={phoneNo}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Mobile Number"
        placeholder="Your Mobile Number"
        placeholderTextColor={theme.color.darkGrey}
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
            countryCode={countryCode}
            visible={visible}
            onClose={() => setVisible(false)}
            containerButtonStyle={{paddingRight: 5, borderRightWidth: 1.5}}
            onSelect={e => {
              setCountryCode(e.cca2);
              setDailCode(e.callingCode);
            }}
          />
        )}
        onChangeText={text => {
          setPhoneNo(text);
        }}
        renderRightIcon={() =>
          userDetails.primaryPhone == phoneNo ? (
            <Text
              style={{
                color: '#00AB26',
                fontSize: normalize(14),
                fontFamily: theme.font.medium,
              }}>
              Verified
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Text style={styles.edit}>Send OTP</Text>
            </TouchableOpacity>
          )
        }
      />
      <TouchableOpacity
        onPress={() => {
          setadditionalDetail(!additionalDetail);
        }}>
        <Text
          style={{
            color: theme.color.LightBlue,
            fontFamily: theme.font.bold,
            fontSize: normalize(11),
            marginHorizontal: vw(15),
            marginTop: vh(30),
          }}>
          + Add additional Information
        </Text>
      </TouchableOpacity>
      {additionalDetail ? (
        <TextInput
          value={aadharNo}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Aadhar Number(optional)"
          placeholder="Aadhar Number(optional)"
          placeholderTextColor={theme.color.darkGrey}
          autoFocus
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={text => {
            setaadharNo(text);
          }}
        />
      ) : null}
      <TouchableOpacity
        onPress={() => {
          refRBSheetBtn.current.open();
        }}>
        <Text style={styles.changePasswordTxt}>Change Your Password</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
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
  edit: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  ChangePasswordBtn: {
    borderWidth: 1,
    marginVertical: vh(30),
    marginHorizontal: vw(20),
    borderRadius: vw(10),
    paddingVertical: vh(20),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
  },
  changePasswordTxt: {
    textAlign: 'center',
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
    marginTop: vh(30),
  },
});

export default ProfileEdit;
