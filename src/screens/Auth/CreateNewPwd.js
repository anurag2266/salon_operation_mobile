import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import OTPTextInput from 'react-native-otp-textinput';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/common/CustomButton';

const CreateNewPwd = ({navigation}) => {
  const maximumCodeLength = 4;
  const [pin, setpin] = useState(' ');
  const [confirmPin, setconfirmPin] = useState(' ');
  const [passwordShown, setPasswordShown] = useState(true);
  const [checked, setChecked] = useState('');

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <ScrollContainer>
      <CustomHeader
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        extraHeadingStyle={{marginLeft: vw(30)}}
        onPress={() => navigation.goBack()}
        heading={'Create Your Login PIN'}
        description={'Create your login pin to setup your business profile'}
      />
      <Text style={styles.pin}>Enter Your Pin</Text>
      <View style={styles.input}>
        <OTPTextInput
          style={styles.otpinput}
          containerStyle={styles.inputContainer}
          maximumLength={maximumCodeLength}
          secureTextEntry={passwordShown}
          handleTextChange={text => setpin(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisiblity}>
          {passwordShown == true ? (
            <Text style={styles.show}>Show</Text>
          ) : (
            <Text style={[styles.show, {color: theme.color.TextGrey}]}>
              Hide
            </Text>
          )}
        </TouchableOpacity>
        <Text style={styles.pin}>Confirm your Pin</Text>
        <OTPTextInput
          style={[styles.otpinput, {marginTop: vh(10)}]}
          containerStyle={styles.inputContainer}
          secureTextEntry={passwordShown}
          maximumLength={maximumCodeLength}
          handleTextChange={text => setconfirmPin(text)}
        />
        <TouchableOpacity onPress={togglePasswordVisiblity}>
          {passwordShown == true ? (
            <Text style={styles.show}>Show</Text>
          ) : (
            <Text style={[styles.show, {color: theme.color.TextGrey}]}>
              Hide
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxView}>
        <CheckBox
          boxType="square"
          hideBox
          style={{
            height: vh(19),
            width: vw(19),
            borderWidth: 1,
            marginHorizontal: vw(4),
            borderColor: theme.color.checkBox,
          }}
          onPress={() => {
            setChecked('');
          }}
          onValueChange={''}
          disabled={false}
        />
        <Text style={styles.RememberMeText}>Remember Me</Text>
      </View>
      <CustomButton
        disabled={pin <= maximumCodeLength || confirmPin <= maximumCodeLength}
        label={'Continue'}
        onPress={() => {
          navigation.navigate('SalonSetup');
        }}
        extraStyle={{marginTop: vh(25)}}
      />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  pin: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    marginVertical: vh(40),
    textAlign: 'center',
    fontSize: normalize(11),
  },
  input: {
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
  show: {
    color: theme.color.LightBlue,
    textAlign: 'right',
    padding: vw(2),
  },
  checkboxView: {
    flexDirection: 'row',
    marginLeft: vw(75),
    marginVertical: vh(43),
  },
  RememberMeText: {
    color: theme.color.primary,
    fontSize: normalize(11),
    alignSelf: 'center',
    fontFamily: theme.font.semiBold,
  },
});

export default CreateNewPwd;
