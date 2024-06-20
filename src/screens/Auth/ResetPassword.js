import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {vw, vh, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../components/common/CustomButton';

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  return (
    <ScrollContainer>
      <CustomHeader
        heading={'Reset Password'}
        extraHeadingStyle={{marginHorizontal: vw(60)}}
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        value={password}
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
          setPassword(text);
        }}
      />
      <TextInput
        value={confirmPassword}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Confirm Password"
        placeholder="Confirm Password"
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
          setConfirmPassword(text);
        }}
      />
      <CustomButton
        label={'Save'}
        disabled={password != confirmPassword}
        onPress={() => {
          navigation.navigate('Login');
        }}
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
});

export default ResetPassword;
