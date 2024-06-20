import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../../../components/common/Container';
import OTPTextInput from 'react-native-otp-textinput';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import {verifyOTPAPI} from '../../../../api/services/authService';
import {setToken} from '../../../../utils/localStorage';
import {showMessage} from 'react-native-flash-message';

const SendOtp = ({navigation, onPress, route}) => {
  const [otp, setOtp] = useState('');
  const [timerCount, setTimer] = useState(60);

  const handleResendOTP = async () => {
    setTimer(60);
    alert('otp sent');
  };

  const handleVerifyOTP = async () => {
    const {status, data, message} = await verifyOTPAPI({
      primaryPhone: primaryPhone,
      otp: otp,
    });
    if (status) {
      setToken(data.token);
      showMessage({message: message, type: 'Success'});
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
      title={'Enter Otp'}
      //${'+' + countryCode + primaryPhone}
      description={`OTP has been sent to `}
      leftIconName={'close'}
      scroll={false}
      onPressLeftIcon={() => {
        handleVerifyOTP();
        onPress();
      }}
    
      leftIconType={'AntDesign'}>
      <View style={styles.input}>
        <OTPTextInput
          style={styles.otpinput}
          containerStyle={styles.inputContainer}
          maximumLength={4}
          handleTextChange={text => setOtp(text)}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AppIcon name={'cycle'} type={'Entypo'} style={styles.cycle} />
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
      </View>
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
  },
  cycle: {
    color: theme.color.primary,
    marginHorizontal: vw(10),
  },
});

export default SendOtp;
