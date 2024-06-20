import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import OTPTextInput from 'react-native-otp-textinput';

const EnterPin = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('BillingInformation');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const maximumCodeLength = 4;
  const [otp, setOtp] = useState('');
  return (
    <Container
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <Text style={styles.enterPinText}>Enter Pin</Text>
      <Text style={styles.confirmpin}>Enter Employee Pin to confirm</Text>
      <View style={styles.input}>
        <OTPTextInput
          style={styles.otpinput}
          containerStyle={styles.inputContainer}
          maximumLength={maximumCodeLength}
          handleTextChange={text => setOtp(text)}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  enterPinText: {
    textAlign: 'center',
    marginTop: vh(70),
    fontSize: normalize(24),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  confirmpin: {
    textAlign: 'center',
    marginTop: vh(8),
    fontFamily: theme.font.regular,
    fontSize: normalize(11),
    color: theme.color.black,
  },
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
});

export default EnterPin;
