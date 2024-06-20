import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {updateUserPasswordAPI} from '../../../../api/services/authService';

const ChangePassword = ({
  onClose,
  onPressForgotPwd,
  oldPassword,
  setOldPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSave,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container
      title={'Change Password'}
      leftIconName={'close'}
      onPressLeftIcon={onClose}
      leftIconType={'AntDesign'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={onSave}>
      <TextInput
        value={oldPassword}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Current Password"
        placeholder="Current Password"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        secureTextEntry={true}
        onChangeText={setOldPassword}
      />
      <TextInput
        value={password}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="New Password"
        placeholder="New Password"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        secureTextEntry={!showPassword}
        onChangeText={setPassword}
        renderRightIcon={() => (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontSize: normalize(11),
          marginHorizontal: vw(15),
          marginTop: vh(8),
          color: theme.color.inputGrey,
          fontFamily: theme.font.medium,
        }}>
        Minimum 8 characters
      </Text>
      <TextInput
        value={confirmPassword}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Confirm New Password"
        placeholder="Confirm New Password"
        secureTextEntry={!showPassword}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={setConfirmPassword}
        renderRightIcon={() => (
          <TouchableOpacity onPress={setShowPassword}>
            <Text style={styles.show}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        )}
      />
      {/* <TouchableOpacity onPress={onPressForgotPwd}>
        <Text style={styles.forgotPwdText}>Forgot Password?</Text>
      </TouchableOpacity> */}
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
  show: {
    fontFamily: theme.font.medium,
    fontSize: normalize(11),
    color: theme.color.LightBlue,
  },
  forgotPwdText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
    marginTop: vh(12),
    marginHorizontal: vw(15),
  },
});

export default ChangePassword;
