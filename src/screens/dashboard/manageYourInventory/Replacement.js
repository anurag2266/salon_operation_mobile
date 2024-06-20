import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';

const Replacement = ({onPressRbSheet}) => {
  const [from, setfrom] = useState('');
  const [to, setto] = useState('');
  const [date, setdate] = useState('');
  const [time, settime] = useState('');
  const [selectItems, setselectItems] = useState('');
  const [reason, setreason] = useState('');
  return (
    <>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={from}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="From"
          placeholder="Vendor Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setfrom(text);
          }}
        />
        <AppIcon
          name={'arrow-circle-right'}
          type={'FontAwesome'}
          size={22}
          color={theme.color.searchColor}
          style={{marginTop: vh(15)}}
        />
        <TextInput
          value={to}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="To"
          placeholder="Main Store"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setto(text);
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={date}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Date"
          placeholder="Date"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setdate(text);
          }}
        />
        <TextInput
          value={time}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Time"
          placeholder="Time"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            settime(text);
          }}
        />
      </View>
      <TextInput
        value={selectItems}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Select Items"
        placeholder="Select Items"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setselectItems(text);
        }}
        renderRightIcon={()=>
        <AppIcon
        name={'right'}
        type={'AntDesign'}
        size={18}
        onPress={onPressRbSheet}
        />
        }
      />
      <TextInput
        value={reason}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Reason"
        placeholder="Reason"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setreason(text);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(14),
          marginTop: vh(70),
        }}>
        <TouchableOpacity style={styles.cancelBtnTouch}>
          <Text style={styles.cancelBtnText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity
         
          style={[
            styles.cancelBtnTouch,
            {backgroundColor: theme.color.primary},
          ]}>
          <Text style={[styles.cancelBtnText, {color: theme.color.white}]}>
            SEND ITEMS
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Replacement;

const styles = StyleSheet.create({
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
  cancelBtnTouch: {
    paddingHorizontal: vw(50),
    borderWidth: 1,
    borderRadius: vw(5),
    paddingVertical: vh(15),
    borderColor: theme.color.primary,
  },
  cancelBtnText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
});
