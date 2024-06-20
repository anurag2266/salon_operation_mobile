import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';

const ManageEmployeeStylistProfile = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: require('../../../../assets/icons/ManageEmployeePersonalInfo.png'),
      label: 'Personal Information',
      navigation: 'StartAddingStylist',
    },
    {
      id: 2,
      imagePath: require('../../../../assets/icons/ManageEmployeeJobProfile.png'),
      label: 'Job Profile',
      navigation: 'JobProfile',
    },
    {
      id: 3,
      imagePath: require('../../../../assets/icons/ManageEmployeeWorkingHours.png'),
      label: 'Working Hours Of The Stylist',
      navigation: 'StylistCalendar',
    },
    {
      id: 4,
      imagePath: require('../../../../assets/icons/ManageEmployeeTargetPayroll.png'),
      label: 'Target & Payrolls',
      navigation: 'TargetPayroll',
    },
    {
      id: 5,
      imagePath: require('../../../../assets/icons/ManageEmployeeItemSold.png'),
      label: 'Items Sold',
      navigation: 'ItemSold',
    },
    {
      id: 6,
      imagePath: require('../../../../assets/icons/ManageEmployeeDocument.png'),
      label: 'Documents',
      navigation: 'Documents',
    },
    {
      id: 7,
      imagePath: require('../../../../assets/icons/ManageEmployeeReviewRating.png'),
      label: 'Review & Ratings',
      navigation: 'ReviewRating',
    },
    {
      id: 8,
      imagePath: require('../../../../assets/icons/ManageEmployeeOtherDetail.png'),
      label: 'Other Details',
      navigation: 'OtherDetail',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemTouch}
        onPress={() => {
          navigation.navigate(item.navigation);
        }}>
        <Image source={item.imagePath} style={styles.itemImage} />
        <Text style={styles.itemText}>{item.label}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Stylist Profile'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <ImageBackground
        source={{uri: 'https://picsum.photos/300/500'}}
        style={styles.img}
        resizeMode="cover">
        <View style={styles.nameView}>
          <Text style={styles.name}>Sunaina Singh</Text>
          <View style={{flexDirection: 'row'}}>
            <AppIcon
              style={{marginHorizontal: 10}}
              type="Entypo"
              name="camera"
              color={theme.color.white}
            />
          </View>
        </View>
      </ImageBackground>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vh(30)}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  img: {
    height: vh(243),
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
  },
  nameView: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: vh(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: theme.color.white,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(12),
    borderWidth: 1,
    marginTop: vh(13),
    paddingHorizontal: vw(19),
    paddingVertical: vh(24),
    borderRadius: vw(10),
    borderColor: '#D2D2D2',
  },
  itemImage: {
    width: vw(20),
    height: vh(20),
  },
  itemText: {
    marginRight: '15%',
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
  },
});

export default ManageEmployeeStylistProfile;
