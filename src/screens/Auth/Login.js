import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import {TextInput} from 'react-native-element-textinput';

import CustomButton from '../../components/common/CustomButton';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import {loginWithPasswordAPI} from '../../api/services/authService';
import {showMessage} from 'react-native-flash-message';
import AccountCreated from '../../components/loader/AccountCreated';
import {useDispatch} from 'react-redux';
import {ValueChanged} from '../../redux/actions/flightActions';
import {setToken} from '../../utils/localStorage';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [credential, setCredenial] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const {status, message, data} = await loginWithPasswordAPI(credential);
    if (status) {
      showMessage({message: message, type: 'Success'});
      setToken(data.token);
      dispatch(ValueChanged('isLogin', true));
      dispatch(ValueChanged('userDetails', data));
      dispatch(ValueChanged('salonDetails', data.salons[0]));
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  return (
    <ScrollContainer>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome To!</Text>
        <Image
          style={styles.logo}
          source={require('../../assets/images/logo-blue.png')}
        />
        <Text style={styles.loginText}>Login to your account</Text>
        <TextInput
          value={credential.emailOrPhone}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Email/Phone No."
          placeholder="Email/Phone No."
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setCredenial({...credential, emailOrPhone: text});
          }}
        />
        <TextInput
          value={credential.password}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Password"
          placeholder="Password"
          textContentType="password"
          secureTextEntry={!showPassword}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          )}
          onChangeText={text => {
            setCredenial({...credential, password: text});
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.forgetPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <CustomButton
          label="LOGIN"
          onPress={handleLogin}
          extraStyle={{marginTop: vh(30), width: vw(373)}}
        />
        <View style={styles.registerContainer}>
          <Text style={styles.notAMember}>Not a member? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('GettingStarted')}>
            <Text style={styles.registerNow}>Register Now.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.color.white,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(35),
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
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
  welcome: {
    fontFamily: theme.font.semiBold,
    fontSize: normalize(24),
    color: theme.color.black,
    marginTop: vh(87),
  },
  logo: {
    marginTop: vh(22),
  },
  loginText: {
    marginTop: vh(40),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    color: theme.color.primary,
    textAlign: 'center',
    marginBottom: vh(22),
  },
  forgetPassword: {
    marginTop: vh(22),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    color: theme.color.LightBlue,
    textAlign: 'center',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: vh(22),
    alignItems: 'center',
  },
  notAMember: {
    fontFamily: theme.font.medium,
    fontSize: normalize(12),
    color: theme.color.TextGrey,
  },
  registerNow: {
    fontFamily: theme.font.medium,
    fontSize: normalize(12),
    color: theme.color.LightBlue,
  },
  show: {
    fontFamily: theme.font.medium,
    fontSize: normalize(11),
    color: theme.color.LightBlue,
  },
});
