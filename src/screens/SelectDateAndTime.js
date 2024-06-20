import {View, Text, TouchableOpacity, StyleSheet, Switch} from 'react-native';

import React, {useState, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import Container from '../components/common/Container';

import theme from '../theme/theme';
import AppIcon from '../components/common/AppIcon';

import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../utils/dimensions';

import RBSheet from 'react-native-raw-bottom-sheet';

const SelectDateAndTime = ({onPressApply, dayTime, setDayTime}) => {
  const TimePick = [
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '01:00',
      endTime: '23:00',
    },
    {
      id: 0,
      startTime: '02:00',
      endTime: '22:00',
    },
    {
      id: 0,
      startTime: '03:00',
      endTime: '21:00',
    },
    {
      id: 0,
      startTime: '04:00',
      endTime: '20:00',
    },
    {
      id: 0,
      startTime: '05:00',
      endTime: '19:00',
    },
    {
      id: 0,
      startTime: '04:00',
      endTime: '18:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
    {
      id: 0,
      startTime: '00:00',
      endTime: '24:00',
    },
  ];
  const [dayTimings, setDayTimings] = useState({
    Monday: '22:00',
    Tuesday: '20:00',
    Wednesday: '20:00',
    Thursday: '20:00',
    Friday: '20:00',
    Saturday: '20:00',
    Sunday: '20:00',
  });
  const [startTime, setStartTime] = useState({
    Monday: '12:00',
    Tuesday: '10:00',
    Wednesday: '10:00',
    Thursday: '10:00',
    Friday: '10:00',
    Saturday: '10:00',
    Sunday: '10:00',
  });
  const [isOpen, setIsOpen] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const HandleSave = () => {
    let newObject = {};
    Object.entries(isOpen).forEach(([day, value]) => {
      if (day) {
        newObject[day] = {
          startTime: startTime[day],
          endTime: dayTimings[day],
          isApplicable: isOpen[day],
        };
      }
      setDayTime(newObject);
    });

    console.log('Here is Data:', newObject);
  };
  const ref2RBSheet = useRef();
  const ref4RBSheet = useRef();

  return (
    <Container
      title={'Select Day & Time'}
      onPressLeftIcon={onPressApply}
      bottomButtonTitle={'SAVE'}
      onPressBottomButton={HandleSave}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() => setIsOpen({...isOpen, Sunday: !isOpen.Sunday})}
          value={isOpen.Sunday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Sunday
        </Text>

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() => setIsOpen({...isOpen, Monday: !isOpen.Monday})}
          value={isOpen.Monday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Monday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() => setIsOpen({...isOpen, Tuesday: !isOpen.Tuesday})}
          value={isOpen.Tuesday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Tuesday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() =>
            setIsOpen({...isOpen, Wednesday: !isOpen.Wednesday})
          }
          value={isOpen.Wednesday}
        />
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: normalize(15),
            alignItems: 'center',
          }}>
          Wednesday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() =>
            setIsOpen({...isOpen, Thursday: !isOpen.Thursday})
          }
          value={isOpen.Thursday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Thrusday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() => setIsOpen({...isOpen, Friday: !isOpen.Friday})}
          value={isOpen.Friday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Friday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(30),
          marginTop: vh(30),
        }}>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          //style={{marginHorizontal:vw(30), marginVertical:vh(10),marginBottom:vh(30)}}
          onValueChange={() =>
            setIsOpen({...isOpen, Saturday: !isOpen.Saturday})
          }
          value={isOpen.Saturday}
        />
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(16)}}>
          Saturday
        </Text>
        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Start Time'}
          placeholder={'Start Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />

        <TextInput
          //value={datePicker}
          style={{
            borderRadius: 10,
            borderWidth: 0.5,

            borderColor: theme.color.borderGrey,
            paddingHorizontal: vw(20),
            //marginTop: vh(25),
            marginHorizontal: vw(10),
            height: vh(40),
            width: vw(90),
          }}
          inputStyle={styles.inputStyle}
          labelStyle={{
            fontSize: normalize(8),
            position: 'absolute',
            top: -5,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            marginLeft: -4,
            fontFamily: theme.font.bold,
            color: theme.color.inputGrey,
          }}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'End Time'}
          placeholder={'End Time'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          renderRightIcon={() => (
            <AppIcon
              name={'calendar'}
              type={'AntDesign'}
              size={10}
              color={theme.color.dropdownColor}
              onPress={() => ref4RBSheet.current.open()}
            />
          )}
        />
      </View>

      <RBSheet
        ref={ref4RBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: '45%',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{fontFamily: theme.font.medium}}>Start Time</Text>
          <Text style={{fontFamily: theme.font.medium}}>End Time</Text>
        </View>

        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: vh(21),
            backgroundColor: 'rgba(0, 120, 253, 0.05)',
          }}>
          <Picker
            // value={dayTimings.Monday}
            selectedValue={dayTimings.Monday}
            onValueChange={(itemValue, itemIndex) => setDayTimings({...dayTimings, Monday: itemValue})}
            dropdownIconColor={theme.color.black}
            style={{width: 150, marginHorizontal: 14}}>
            {TimePick.map(item => {
              return (
                <Picker.Item label={item.startTime} value={item.startTime} color={theme.color.black} />
              );
            })}
          </Picker>
          <Picker
            dropdownIconColor={theme.color.black}
            selectedValue={startTime.Monday}
            onValueChange={(itemValue, itemIndex) => setStartTime({...startTime, Monday: itemValue})}
            style={{width: 150, marginHorizontal: 14}}>
            {TimePick.map(item => {
              return (
                <Picker.Item label={item.endTime} value={item.endTime} color={theme.color.black} />
              );
            })}
            {/* <Picker.Item label={startTime.Monday} value={startTime.Monday} color={theme.color.black} />
       <Picker.Item label={startTime.Monday} value={startTime.Monday} color={theme.color.black} />
       <Picker.Item label={startTime.Monday} value={startTime.Monday} color={theme.color.black} /> */}
          </Picker>
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 0.25,
            marginHorizontal: vw(50),
            borderRadius: 15,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(15),
              fontFamily: theme.font.bold,
            }}>
            SAVE
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </Container>
  );
};

export default SelectDateAndTime;

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
