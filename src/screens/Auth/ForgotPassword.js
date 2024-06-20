import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {vw, vh, normalize} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../theme/theme';
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../components/common/CustomButton';

const ForgotPassword = ({navigation}) => {
  const [phoneNo, setphoneNo] = useState('');
  const [OTP, setOTP] = useState('');
  const [timerCount, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const handleResendOTP = async () => {
    setTimer(60);
    alert('otp sent');
  };

  const handleSendOTP = async () => {
    setTimer(60);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(lastTimerCount => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [timerCount]);
  return (
    <ScrollContainer>
      <CustomHeader
        heading={'Forgot Password'}
        extraHeadingStyle={{marginHorizontal: vw(60)}}
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        value={phoneNo}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Phone No."
        keyboardType="number-pad"
        placeholder="Phone No."
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setphoneNo(text);
        }}
        renderRightIcon={() => (
          <>
            {!otpSent ? (
              <TouchableOpacity>
                <Text style={{color: theme.color.LightBlue}}>Send OTP</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      />
      <View style={{marginTop: vh(70), marginHorizontal: vw(25)}}>
        <OTPTextInput
          style={styles.otpinput}
          containerStyle={styles.inputContainer}
          maximumLength={4}
          handleTextChange={text => setOTP(text)}
        />
      </View>
      <TouchableOpacity disabled={timerCount > 0} onPress={handleResendOTP}>
        {timerCount > 0 ? (
          <Text style={styles.resendOtp}>
            Resend OTP in{' '}
            <Text style={styles.timer}>
              00:{timerCount > 9 ? timerCount : `0${timerCount}`}
            </Text>
          </Text>
        ) : (
          <Text style={styles.resendOtp}>Resend OTP</Text>
        )}
      </TouchableOpacity>
      <CustomButton
        onPress={() => {
          navigation.navigate('ResetPassword');
        }}
        label={'Veify OTP'}
        disabled={OTP <= 4}
      />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(35),
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: normalize(14),
    position: 'absolute',
    top: -10,
    backgroundColor: theme.color.white,
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpinput: {
    height: vh(50),
    width: vw(55),
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: vw(21),
    borderBottomWidth: 1,
    color: theme.color.primary,
  },
  resendOtp: {
    textAlign: 'center',
    marginTop: vh(40),
  },
});

export default ForgotPassword;
