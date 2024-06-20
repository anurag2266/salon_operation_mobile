import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import AppIcon from '../../../components/common/AppIcon';
import theme from '../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {
  Calendar,
  CalendarList,
  CalendarProvider,
  ExpandableCalendar,
} from 'react-native-calendars';
import AppointmentStatusComp from '../../../components/AppointmentStatusComp';
import LocalImages from '../../../utils/LocalImages';
import {FloatingAction} from 'react-native-floating-action';

const Appointment = ({navigation}) => {
  const [search, setSearch] = useState('');
  const actions = [
    {
      text: 'Create New Appointment',
      position: 1,
      name: 'CreateNewAppointment',
    },
  ];
  return (
    <Container header={false}>
      <View style={{backgroundColor: theme.color.primary}}>
        <View style={styles.mainView}>
          <AppIcon
            name={'arrowleft'}
            type={'AntDesign'}
            size={18}
            color={theme.color.white}
          />
          <Image source={LocalImages.Profile} style={styles.profile} />
          <Text style={styles.nameText}>Hi, Rebecca</Text>
          <View style={styles.bellIconView}>
            <AppIcon
              name={'bells'}
              type={'AntDesign'}
              size={18}
              color={theme.color.black}
            />
          </View>
        </View>
        <TextInput
          value={search}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search..."
          placeholder="Search..."
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setSearch(text);
          }}
          renderLeftIcon={() => (
            <AppIcon
              name={'search1'}
              type={'AntDesign'}
              size={20}
              color={theme.color.white}
              style={{marginRight: vw(10)}}
            />
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: vw(15),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: vw(7),
              marginTop: vh(9),
            }}>
            <AppIcon
              name={'filter'}
              type={'AntDesign'}
              size={15}
              color={theme.color.white}
            />
            <Text style={styles.filter}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: vw(7),
              marginTop: vh(9),
            }}>
            <AppIcon
              name={'swap-vertical'}
              type={'Ionicons'}
              size={15}
              color={theme.color.white}
            />
            <Text style={styles.filter}>Sort By</Text>
          </TouchableOpacity>
        </View>
        <CalendarProvider
          theme={{
            backgroundColor: theme.color.primary,
            calendarBackground: theme.color.primary,
          }}
          style={{marginTop: vh(50)}}
          date={new Date()}>
          <ExpandableCalendar
            calendarStyle={{backgroundColor: theme.color.primary}}
            enableSwipeMonths={true}
          />
        </CalendarProvider>
      </View>
      <Text
        style={{
          fontFamily: theme.font.semiBold,
          fontSize: normalize(20),
          marginHorizontal: vw(21),
          marginTop: vh(30),
        }}>
        Appointments
      </Text>
      <AppointmentStatusComp />
      <View
        style={{
          position: 'relative',
          top: vh(-20),
          right: vw(15),
        }}>
        <FloatingAction
          buttonSize={60}
          tintColor={theme.color.black}
          color={theme.color.primary}
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
        />
      </View>
    </Container>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.white,
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
    color: theme.color.white,
  },
  placeholderStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.white,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.white,
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.white,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  bellIconView: {
    borderRadius: vw(100),
    backgroundColor: theme.color.white,
    padding: vw(12),
    alignItems: 'center',
    marginHorizontal: vw(60),
  },
  mainView: {
    flexDirection: 'row',
    marginTop: vh(30),
    marginHorizontal: vw(16),
    alignItems: 'center',
  },
  profile: {
    width: vw(45),
    height: vw(45),
    borderRadius: vw(100),
    marginHorizontal: vw(15),
  },
  nameText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(28),
    color: theme.color.white,
  },
  plusStyle: {
    position: 'relative',
    top: vh(-20),
    alignSelf: 'flex-end',
    marginHorizontal: vw(15),
  },
});
