import {View, Text, Switch, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../../../components/common/CustomButton';

let data = Array.from({length: 12}, (_, i) => i + 1)
  .map(String)
  .map(item => item + ':00');
data = [...data]
  .map(item => item + ' AM')
  .concat([...data].map(item => item + ' PM'));

const BreakTiming = ({
  onPressSave,
  breakStart,
  setBreakStart,
  breakEnd,
  setBreakEnd,
  isSameBreakTiming = false,
  setIsSameBreakTiming,
}) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopLeftRadius: vw(20),
        borderTopRightRadius: 20,
        borderColor: theme.color.white,
      }}>
      <Text style={styles.break}>Break Time</Text>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Picker
          selectedValue={breakStart}
          onValueChange={setBreakStart}
          dropdownIconColor={theme.color.black}
          style={{width: 150, marginHorizontal: 13}}>
          {data?.map(item => (
            <Picker.Item label={item} value={item} color={theme.color.black} />
          ))}
        </Picker>
        <Picker
          selectedValue={breakEnd}
          onValueChange={setBreakEnd}
          dropdownIconColor={theme.color.black}
          style={{width: 150, marginHorizontal: 14}}>
          {data?.map(item => (
            <Picker.Item label={item} value={item} color={theme.color.black} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: vw(30),
        }}>
        <Text style={styles.otherDays}>
          Set the same break time for all working days
        </Text>
        <Switch
          trackColor={{false: 'rgba(0, 120, 253, 0.05)', true: 'green'}}
          onValueChange={setIsSameBreakTiming}
          value={isSameBreakTiming}
        />
      </View>
      <CustomButton
        onPress={onPressSave}
        extraStyle={{marginTop: vh(40)}}
        label={'SAVE'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  otherDays: {
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.darkGrey,
  },
  break: {
    color: theme.color.black,
    textAlign: 'center',
    marginTop: vh(29),
    fontSize: normalize(24),
    fontFamily: theme.font.bold,
  },
});

export default BreakTiming;
