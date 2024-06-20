import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/common/CustomButton';
import OTPTextInput from 'react-native-otp-textinput';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import {verifyOTPAPI} from '../../api/services/authService';
import {showMessage} from 'react-native-flash-message';
import {setToken} from '../../utils/localStorage';
import Container from '../../components/common/Container';

const OtpScreen = ({navigation, route}) => {
  const {countryCode, primaryPhone} = route.params;
  const maximumCodeLength = 4;
  const [otp, setOtp] = useState('');
  const [timerCount, setTimer] = useState(60);

  const handleResendOTP = async () => {
    setTimer(60);
    showMessage({message: 'OTP Sent Successfully', type: 'Success'});

    // alert('otp sent');
  };
  const handleVerifyOTP = async () => {
    const {status, data, message} = await verifyOTPAPI({
      primaryPhone: primaryPhone,
      otp: otp,
    });
    if (status) {
      setToken(data.token);
      showMessage({message: message, type: 'success'});
      navigation.navigate('AboutUs');
    } else {
      showMessage({message: message, type: 'danger'});
    }
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
    <Container
      title={'Enter OTP'}
      description={`OTP has been sent to ${'+' + countryCode + primaryPhone}`}
      leftIconName="arrow-left"
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons"
      leftIconColor={theme.color.dropdownColor}>
      <View style={styles.input}>
        <OTPTextInput
          style={styles.otpinput}
          containerStyle={styles.inputContainer}
          maximumLength={maximumCodeLength}
          handleTextChange={text => setOtp(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppIcon
          name={'cycle'}
          type={'Entypo'}
          size={15}
          style={styles.cycle}
        />
        <TouchableOpacity disabled={timerCount > 0} onPress={handleResendOTP}>
          {timerCount > 0 ? (
            <Text style={styles.resendOtp}>
              00:{timerCount > 9 ? timerCount : `0${timerCount}`}
            </Text>
          ) : (
            <Text style={styles.resendOtp}>Resend OTP</Text>
          )}
        </TouchableOpacity>
      </View>
      <CustomButton
        label={'Verify'}
        disabled={otp.length < 4}
        onPress={handleVerifyOTP}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: vh(130),
    marginHorizontal: vw(25),
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
    marginVertical: vh(40),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
  },
  cycle: {
    color: theme.color.primary,
    marginHorizontal: vw(10),
  },
});

export default OtpScreen;
