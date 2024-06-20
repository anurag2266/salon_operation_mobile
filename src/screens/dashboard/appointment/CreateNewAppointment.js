import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {normalize, vh, vw} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';

const CreateNewAppointment = ({navigation}) => {
  const [clientName, setclientName] = useState('');
  return (
    <Container
      title={'Create New Appointment'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle={'+ Add Client'}
      onPressBottomButton={() => {
        navigation.navigate('AddingClient');
      }}>
      <Text style={styles.clientNameText}>
        Type your client name here to add new appointment
      </Text>
      <TextInput
        value={clientName}
        style={[styles.input, {marginTop: vh(45)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search by client name/phone no. Email"
        placeholder="Search by client name/phone no. Email"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setclientName(text);
        }}
      />
    </Container>
  );
};

export default CreateNewAppointment;

const styles = StyleSheet.create({
  clientNameText: {
    textAlign: 'center',
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(14),
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
