import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import ProgressBar from '../../components/common/ProgressBar';
import Container from '../../components/common/Container';

const Profiledashboard = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: require('../../assets/icons/manage-salon-settings.png'),
      headerText: 'Manage Your Salon Settings',
      navigation: 'ManageSalonSetting',
      descriptionText:
        'Recheck your salon profile and keep it updated simply and regularly',
    },
    {
      id: 2,
      imagePath: require('../../assets/icons/manage-offers.png'),
      headerText: 'Manage Offers',
      navigation: 'ManageOffers',
      descriptionText:
        'Create membership benefits and irresistible offers for your clients',
    },
    {
      id: 3,
      imagePath: require('../../assets/icons/manage-promotions.png'),
      headerText: 'Manage Promotions',
      navigation: 'ManagePromotions',
      descriptionText:
        'Make unique coupon codes and more to make your clients drool',
    },
    {
      id: 4,
      imagePath: require('../../assets/icons/manage-inventory.png'),
      headerText: 'Manage Your Inventory',
      navigation: 'InventoryManagement',
      descriptionText:
        'Directly control your inventory assets, products, and everything',
    },
    {
      id: 5,
      imagePath: require('../../assets/icons/client-management.png'),
      headerText: 'Client Management',
      navigation: 'ClientManagementDashboard',
      descriptionText:
        'Deliver a smooth experience by supervising the client-appointments',
    },
    {
      id: 6,
      imagePath: require('../../assets/icons/manage-accounting.png'),
      headerText: 'Manage Accounting',
      navigation: 'ManageAccounting',
      descriptionText:
        'Keep up with your accounts, track them, and manage the records',
    },
    {
      id: 7,
      imagePath: require('../../assets/icons/manage-analystics.png'),
      headerText: 'Manage Analytics',
      navigation: 'ManageAnalytics',
      descriptionText:
        'Have an insight to all your activities on Salonesis through analytics',
    },
    {
      id: 8,
      imagePath: require('../../assets/icons/trainings.png'),
      headerText: 'Training',
      navigation: 'Training',
      descriptionText:
        'Revise the training material and keep your employees updated',
    },
    {
      id: 9,
      imagePath: require('../../assets/icons/advertisement-management.png'),
      headerText: 'Advertisement Management',
      navigation: '',
      descriptionText:
        'Promote the upcoming events and surprises in your space',
    },
    {
      id: 10,
      imagePath: require('../../assets/icons/subscription-management.png'),
      headerText: 'Subscription Management',
      navigation: 'ActiveSubscription',
      descriptionText:
        'Check your subscription with us and find the best that fits you',
    },
    {
      id: 11,
      imagePath: require('../../assets/icons/manage-social-media.png'),
      headerText: 'Manage Social Media',
      navigation: 'ManageSocialMedia',
      descriptionText:
        'Keep your social media updated through all the channels',
    },
    {
      id: 12,
      imagePath: require('../../assets/icons/manage-campain.png'),
      headerText: 'Manage Campaigns',
      navigation: '',
      descriptionText: 'Run a streamlined campaign and keep it organized here',
    },
    {
      id: 13,
      imagePath: require('../../assets/icons/contact-salonsis.png'),
      headerText: 'Contact Salonesis',
      navigation: 'contactSalonesis',
      descriptionText:
        'We are always open for a healthy conversation with our Salons',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        style={styles.itemTouch}>
        <View style={styles.boxWithShadow}>
          <Image source={item.imagePath} style={styles.imagePath} />
        </View>
        <View>
          <Text style={styles.headerText}>{item.headerText}</Text>
          <Text style={styles.descriptionText}>{item.descriptionText}</Text>
        </View>
        <AppIcon
          type={'AntDesign'}
          name={'right'}
          size={15}
          style={styles.righticon}
        />
      </TouchableOpacity>
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container scroll={false} header={false}>
      <ImageBackground
        source={LocalImages.Salon}
        resizeMode="cover"
        style={styles.profileSalon}>
        <View style={styles.rowView}>
          <TouchableOpacity
            style={{
              ...styles.share,
              borderRadius: vw(90),
              overflow: 'hidden',
              paddingHorizontal: vw(15),
            }}>
            <AppIcon
              name={'edit'}
              type={'FontAwesome'}
              size={20}
              style={{marginVertical: vh(5)}}
              color={theme.color.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.share}>
            <Text style={styles.shareTxt}>Share</Text>
            <AppIcon
              name={'share'}
              type={'Feather'}
              size={20}
              style={{marginLeft: vw(8), marginVertical: vh(5)}}
              color={theme.color.white}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.centralIndia}>Central India</Text>
      </ImageBackground>
      <View style={styles.mainView}>
        <View
          style={{
            padding: vw(16),
            marginHorizontal: vw(25),
            marginTop: -vh(30),
            zIndex: 999999,
            backgroundColor: theme.color.white,
            borderRadius: 20,
            shadowColor: theme.color.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={styles.profileCompletionText}>Profile Completion</Text>
            <Text style={styles.profileCompletionText}>67%</Text>
          </View>
          <ProgressBar progress={67} />
        </View>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: vh(30), paddingBottom: vh(30)}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileSalon: {
    width: vw(428),
    height: vh(271),
  },
  mainView: {
    width: '100%',
    borderTopLeftRadius: vw(20),
    borderTopRightRadius: vw(20),
    flex: 1,
    backgroundColor: theme.color.white,
  },
  share: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: vw(10),
    paddingVertical: vh(9),
    paddingHorizontal: vw(30),
  },
  shareTxt: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    textAlign: 'center',
    marginVertical: vh(5),
  },
  centralIndia: {
    marginLeft: vw(30),
    color: theme.color.white,
    marginTop: vh(55),
    fontFamily: theme.font.bold,
    fontSize: normalize(24),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(19),
    marginTop: vh(30),
    alignItems: 'center',
  },
  itemTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(28),
    paddingVertical: vh(20),
    borderBottomWidth: 1,
    borderColor: theme.color.bottomWidth,
    marginHorizontal: vw(22),
  },
  imagePath: {
    borderWidth: 1,
    borderRadius: vw(55),
    width: vw(55),
    height: vh(55),
    marginRight: vw(21),
    borderColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  headerText: {
    color: theme.color.Black_shadow,
    marginVertical: vh(7),
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  descriptionText: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    width: vw(247),
  },
  righticon: {
    color: theme.color.dropdownColor,
    alignSelf: 'center',
    marginLeft: vw(32),
  },
  profileCompletionText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
});

export default Profiledashboard;
