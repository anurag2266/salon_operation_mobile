import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../../components/common/CustomButton';

const AddBankAccountDetail = ({navigation, onPress}) => {
  const [accountHolderName, setaccountHolderName] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [confirmAccountNumber, setconfirmAccountNumber] = useState('');
  const [branchName, setbranchName] = useState('');
  const [ifscCode, setifscCode] = useState('');
  return (
    <>
      <View style={styles.headerView}>
        <Text style={styles.UPIText}>Add Bank Details</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.UPIText, {color: theme.color.LightBlue}]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={accountHolderName}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Account holder’s name"
        placeholder="Account holder’s name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setaccountHolderName({text});
        }}
      />
      <TextInput
        value={accountNumber}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Account Number"
        placeholder="Account Number"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setaccountNumber({text});
        }}
      />
      <TextInput
        value={confirmAccountNumber}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Confirm Account Number"
        placeholder="Confirm Account Number"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setconfirmAccountNumber({text});
        }}
      />
      <TextInput
        value={branchName}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Bank Branch Name"
        placeholder="Bank Branch Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setbranchName({text});
        }}
      />
      <TextInput
        value={ifscCode}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="IFSC Code"
        placeholder="IFSC Code"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setifscCode({text});
        }}
      />
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('');
        }}
        extraStyle={{marginTop: vh(40), marginBottom: vh(20)}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginTop: vh(30),
  },
  UPIText: {
    fontSize: normalize(16),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
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
});

export default AddBankAccountDetail;
