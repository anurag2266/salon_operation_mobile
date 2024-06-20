import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import AppIcon from '../../../../components/common/AppIcon';
import theme from '../../../../theme/theme';

const SelectedServicesDetails = ({navigation, route}) => {
  const {serviceDetail} = route.params;

  const DATA = [
    {
      id: 1,
      value: 'Service Detail',
      navigation: 'ServiceDetail',
    },
    {
      id: 2,
      value: 'Additional Setting',
      navigation: 'AdditionalSetting',
    },
    {
      id: 3,
      value: 'Service steps',
      navigation: 'ServiceSteps',
    },
    {
      id: 4,
      value: 'Products Used',
      navigation: 'ProductUsed',
    },
    {
      id: 5,
      value: 'Staff Management',
      navigation: 'StaffManagement',
    },
    {
      id: 6,
      value: 'Client Management',
      navigation: 'ClientManagement',
    },
    {
      id: 7,
      value: 'Reviews & Ratings',
      navigation: 'ReviewRating',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation, {serviceDetail});
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        <Text style={styles.value}>{item.value}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          color={theme.color.dropdownColor}
          size={15}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container header={false}>
      <ImageBackground
        source={{uri: serviceDetail.serviceId.imageUrl}}
        resizeMode={'cover'}
        style={styles.profileSalon}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <AppIcon
            name={'arrow-left'}
            type={'MaterialCommunityIcons'}
            color={theme.color.white}
            size={20}
            style={{margin: vw(22)}}
          />
        </TouchableOpacity>
        <Text style={styles.serviceText}>
          {serviceDetail?.serviceId?.serviceName}
        </Text>
      </ImageBackground>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        contentContainerStyle={{marginBottom: vh(30), marginTop: vh(20)}}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  profileSalon: {
    width: vw(428),
    height: vh(246),
    marginBottom: vh(19),
  },
  serviceText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    marginHorizontal: vw(16),
    marginTop: vh(100),
    fontSize: normalize(24),
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: vw(10),
    paddingHorizontal: vw(13),
    paddingVertical: vh(20),
    marginHorizontal: vw(12),
    marginTop: vh(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  value: {
    fontSize: normalize(16),
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
  },
});

export default SelectedServicesDetails;
