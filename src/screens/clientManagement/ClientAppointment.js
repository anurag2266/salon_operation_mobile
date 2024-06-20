import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import AppIcon from '../../components/common/AppIcon';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../../components/common/CustomButton';
import AppointmentStatusComp from '../../components/AppointmentStatusComp';

const ClientAppointment = () => {
  return (
    <Container header={false}>
      <Text style={styles.appoinmentstatusText}>Appointments Status</Text>
      <AppointmentStatusComp />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.fadedText}>New Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          style={{marginRight: vw(15)}}
          color={theme.color.primary}
          size={20}
        />
        <Text style={styles.fadedText1}>SHARE</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    borderRadius: vw(10),
    marginTop: vh(40),
    marginHorizontal: vw(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
    paddingVertical: vw(16),
  },
  btn1: {
    flexDirection: 'row',
    borderRadius: vw(10),
    borderWidth: 0.5,
    marginTop: vh(40),
    marginHorizontal: vw(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.width,
    paddingVertical: vw(16),
  },
  fadedText: {
    fontSize: vw(18),
    color: theme.color.white,
    fontFamily: theme.font.bold,
  },
  fadedText1: {
    fontSize: vw(18),
    color: theme.color.primary,
    fontFamily: theme.font.bold,
  },
  appoinmentstatusText: {
    color: theme.color.black,
    fontSize: normalize(20),
    fontFamily: theme.font.semiBold,
    marginTop: vh(40),
    marginHorizontal: vw(22),
  },
});

export default ClientAppointment;
