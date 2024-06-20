import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';
import {Dropdown} from 'react-native-element-dropdown';
import theme from '../../theme/theme';
import {vw, vh, normalize} from '../../utils/dimensions';

const AddMembers = ({navigation}) => {
  const [guestName, setguestName] = useState('');
  const [gender, setgender] = useState('');
  const [phoneNo, setphoneNo] = useState('');
  const [emailId, setemailId] = useState('');
  return (
    <Container
      title={'Add Member'}
      description={'Fill details for your guest here.'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Add Guest'}
      onPressBottomButton={() => {
        navigation.navigate('ClientManagementMembership');
      }}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <TextInput
        value={guestName}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Guest Name'}
        placeholder={'Guest Name'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setguestName(text);
        }}
      />
      <Dropdown
        style={[styles.input, {paddingVertical: vh(12)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.textErrorStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[
          {label: 'Male', value: '1'},
          {label: 'Female', value: '2'},
          {label: 'Unisex', value: '2'},
        ]}
        labelField="label"
        valueField="value"
        placeholder="Select gender"
        value={gender}
        onChange={item => {
          setgender(item.value);
        }}
      />
      <TextInput
        value={phoneNo}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Phone no.'}
        placeholder={'Phone no.'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setphoneNo(text);
        }}
      />
      <TextInput
        value={emailId}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label={'Email'}
        placeholder={'Email'}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setemailId(text);
        }}
      />
    </Container>
  );
};

export default AddMembers;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(25),
    marginHorizontal: vw(15),
    height: vh(55),
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
