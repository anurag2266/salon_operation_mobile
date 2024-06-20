import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Container from '../../components/common/Container';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';

const ClientManagementDashboard = ({navigation, route}) => {
  const data = ['1'];
  const [search, setSearch] = useState('');
  const [downBtn, setDownBtn] = useState(false);
  const [notification, setNotification] = useState(false);
  const DATA = [
    {
      id: 1,
      name: 'Tarun Sharma',
      phoneNo: '+91-9876543219',
      email: 'tarunsharma@gmail.com',
      lastVisit: '03-05-2022',
      status: 'Active',
    },
  ];
  return (
    <Container
      title={'Client Management'}
      description={data == '' ? null : 'Manage Your clients information here'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      {data == '' ? (
        <>
          <View style={styles.clientManagementView}>
            <Image
              source={LocalImages.clientManagement}
              style={styles.clientManagement}
            />
          </View>
          <Text style={styles.noClientText}>
            No Clients has been visited yet!
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PersonalInformation');
            }}
            style={styles.createClientTouch}>
            <Text style={styles.createClientTouchText}>+ Create Client</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addressBookTouch}>
            <Text style={styles.addressBookText}>+ Add From Address Book</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            value={search}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Search Name Here"
            placeholder="Search Name Here"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSearch(text);
            }}
            renderLeftIcon={() => (
              <AppIcon
                name={'search'}
                type={'Feather'}
                size={15}
                color={theme.color.inputGrey}
                style={{marginRight: vw(15)}}
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
              onPress={() => {
                setShowModal(true);
              }}
              style={{
                flexDirection: 'row',
                marginHorizontal: vw(7),
                marginTop: vh(9),
              }}>
              <AppIcon
                name={'filter'}
                type={'AntDesign'}
                size={15}
                color={theme.color.LightBlue}
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
                color={theme.color.LightBlue}
              />
              <Text style={styles.filter}>Sort By</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PersonalInformation');
            }}>
            <Text style={styles.createClientText}>+ Create Clients</Text>
          </TouchableOpacity>
          <View style={styles.allClientView}>
            <Text style={styles.allClientText}>All Clients</Text>
            {downBtn ? (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={12}
                style={{marginLeft: vw(10)}}
                onPress={() => {
                  setDownBtn(!downBtn);
                }}
                color={theme.color.black}
              />
            ) : (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={12}
                style={{marginLeft: vw(10)}}
                onPress={() => {
                  setDownBtn(!downBtn);
                }}
                color={theme.color.black}
              />
            )}
          </View>
          {downBtn ? (
            <>
              {DATA.map(item => {
                return (
                  <View style={styles.cardView}>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                      <Text
                        style={[
                          styles.member,
                          {backgroundColor: theme.color.primary},
                        ]}>
                        Influencer
                      </Text>
                      <Text
                        style={[
                          styles.member,
                          {backgroundColor: '#F67E8F', marginHorizontal: vw(7)},
                        ]}>
                        VIP
                      </Text>
                      <Text
                        style={[styles.member, {backgroundColor: '#E0C3FC'}]}>
                        Member
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: vh(10)}}>
                      <View>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.dataText}>
                          Phone No :{' '}
                          <Text style={{color: theme.color.black}}>
                            {item.phoneNo}
                          </Text>
                        </Text>
                        <Text style={styles.dataText}>
                          Email Address :{' '}
                          <Text style={{color: theme.color.black}}>
                            {item.email}
                          </Text>
                        </Text>
                        <Text style={styles.dataText}>
                          Last Visit :{' '}
                          <Text style={{color: theme.color.black}}>
                            {item.lastVisit}
                          </Text>
                        </Text>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={styles.dataText}>
                            Status :{' '}
                            <Text style={{color: theme.color.switchOn}}>
                              {item.status}
                            </Text>
                          </Text>
                          <View
                            style={[
                              styles.notification,
                              {marginLeft: vw(130)},
                            ]}>
                            <AppIcon
                              name={'md-notifications'}
                              type={'Ionicons'}
                              onPress={() => {
                                setNotification(!notification);
                              }}
                              size={16}
                              color={theme.color.black}
                            />
                          </View>
                          <View
                            style={[styles.notification, {marginLeft: vw(20)}]}>
                            <AppIcon
                              name={'call'}
                              type={'Ionicons'}
                              size={16}
                              color={theme.color.black}
                            />
                          </View>
                        </View>
                      </View>
                      <AppIcon
                        name={'right'}
                        type={'AntDesign'}
                        size={12}
                        onPress={() => {
                          navigation.navigate('ClientInfoScreen');
                        }}
                        color={theme.color.black}
                      />
                    </View>
                  </View>
                );
              })}
            </>
          ) : null}
          {notification ? (
            <View style={styles.membershipRenew}>
              <Text style={styles.membershipRenewText}>
                Renew your membership in 2 days
              </Text>
            </View>
          ) : null}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  clientManagementView: {
    marginHorizontal: vw(70),
    alignItems: 'center',
    marginTop: vh(50),
    borderRadius: vw(30),
    backgroundColor: theme.color.buttonInActive,
    padding: vw(21),
  },
  clientManagement: {
    width: vw(192),
    height: vw(192),
  },
  noClientText: {
    color: theme.color.dropdownColor,
    textAlign: 'center',
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
    marginTop: vh(60),
  },
  createClientTouch: {
    alignSelf: 'center',
    marginTop: vh(60),
    backgroundColor: theme.color.primary,
    paddingHorizontal: vw(26),
    paddingVertical: vh(12),
    borderRadius: vw(10),
  },
  createClientTouchText: {
    color: theme.color.white,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  addressBookTouch: {
    alignSelf: 'center',
    marginTop: vh(20),
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.primary,
    paddingHorizontal: vw(26),
    paddingVertical: vh(12),
    borderRadius: vw(10),
  },
  addressBookText: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
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
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  createClientText: {
    color: theme.color.LightBlue,
    marginHorizontal: vw(27),
    marginTop: vh(15),
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  allClientView: {
    alignSelf: 'flex-end',
    marginHorizontal: vw(25),
    marginTop: vh(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  allClientText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  cardView: {
    borderWidth: 1,
    marginTop: vh(15),
    borderRadius: vw(10),
    marginHorizontal: vw(16),
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(25),
    paddingBottom: vh(23),
    borderLeftWidth: 12,
    borderLeftColor: theme.color.primary,
    borderColor: theme.color.white,
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  name: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(22),
  },
  dataText: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    marginTop: vh(10),
  },
  notification: {
    borderRadius: vw(100),
    padding: vw(7),
    backgroundColor: theme.color.buttonInActive,
    alignItems: 'center',
    width: vw(32),
    height: vw(32),
  },
  member: {
    paddingHorizontal: vw(10),
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
    borderRadius: vw(2),
  },
  membershipRenew: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(16),
    position: 'relative',
    top: vh(-30),
    paddingHorizontal: vw(70),
    paddingVertical: vh(35),
    borderColor: theme.color.red,
    backgroundColor: '#FFDEE2',
  },
  membershipRenewText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
});

export default ClientManagementDashboard;
