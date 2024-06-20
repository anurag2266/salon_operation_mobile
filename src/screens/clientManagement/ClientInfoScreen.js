import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {FlatList} from 'react-native';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import ClientProfile from './ClientProfile';
import ClientAppointment from './ClientAppointment';
import ClientActivity from './ClientActivity';
import ClientBilling from './ClientBilling';
import ConsentForm from './ConsentForm';
import ClientNotes from './ClientNotes';
import ClientCommunication from './ClientCommunication';
import ClientChangePassword from './ClientChangePassword';
import ClientLogout from './ClientLogout';
import ClientOverview from './ClientOverview';

import ReviewAndRatings from './ReviewAndRatings';

const ClientInfoScreen = ({navigation}) => {
  const [option, setOption] = useState('Profile');
  const DATA = [
    {
      id: 1,
      name: 'Profile',
    },
    {
      id: 2,
      name: 'Appointment',
    },
    {
      id: 3,
      name: 'Activity',
    },
    {
      id: 4,
      name: 'Billing',
    },
    {
      id: 5,
      name: 'Consent Form',
    },
    {
      id: 6,
      name: 'Notes',
    },
    {
      id: 7,
      name: 'Communication',
    },
    {
      id: 8,
      name: 'Reviews & Ratings',
    },
    {
      id: 9,
      name: 'Change Password',
    },
    {
      id: 10,
      name: 'Logout',
    },
    {
      id: 11,
      name: 'Overview',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setOption(item.name);
        }}
        style={[
          styles.dataViewTouch,
          {
            backgroundColor:
              option == item.name ? theme.color.primary : theme.color.white,
          },
        ]}>
        <Text
          style={[
            styles.dataText,
            {
              color:
                option == item.name ? theme.color.white : theme.color.primary,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Tarun Sharma'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressBottomButton={() => {
        '';
      }}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        contentContainerStyle={{
          marginTop: vh(20),
          borderTopWidth: 1,
          borderBottomWidth: 1,
          paddingVertical: vh(18),
          marginHorizontal: vw(23),
          borderColor: theme.color.buttonInActive,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
      {option == 'Profile' ? <ClientProfile /> : null}
      {option == 'Appointment' ? <ClientAppointment /> : null}
      {option == 'Activity' ? (
        <ClientActivity
          onPress={() => {
            navigation.navigate('Invoice');
          }}
          onPressAvailedHistory={() => {
            navigation.navigate('AvailedHistory');
          }}
          onPressIcon={() => {
            navigation.navigate('ClientManagementMembership');
          }}
        />
      ) : null}
      {option == 'Billing' ? <ClientBilling /> : null}
      {option == 'Consent Form' ? <ConsentForm /> : null}
      {option == 'Notes' ? <ClientNotes /> : null}
      {option == 'Communication' ? <ClientCommunication /> : null}
      {option == 'Reviews & Ratings' ? <ReviewAndRatings /> : null}
      {option == 'Change Password' ? <ClientChangePassword /> : null}
      {option == 'Logout' ? <ClientLogout /> : null}
      {option == 'Overview' ? (
        <ClientOverview
          onPressAppointment={() => {
            navigation.navigate('ClientAppointment');
          }}
          onPressBilling={() => {
            navigation.navigate('ClientBilling');
          }}
          onPressConsentForm={() => {
            navigation.navigate('ConsentForm');
          }}
          onPressNotes={() => {
            navigation.navigate('ClientNotes');
          }}
          onPressCommunications={() => {
            navigation.navigate('ClientCommunication');
          }}
        />
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  dataViewTouch: {
    paddingHorizontal: vw(25),
    paddingVertical: vh(8),
    borderWidth: 1,
    borderRadius: vw(12),
    marginHorizontal: vw(10),
    borderColor: theme.color.primary,
  },
  dataText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
});

export default ClientInfoScreen;
