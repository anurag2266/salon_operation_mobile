import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';
import BillingModal from './BillingModal';

const Billing = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [salonServices, setsalonServices] = useState(false);
  const [homeServices, sethomeServices] = useState(false);
  const [billing, setbilling] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const DATA = [
    {
      id: 1,
      service: 'Service Completed',
      client: 'Client Name',
      number: '+91 9876543219',
      totalService: '2 Services',
      time: '1h 30min',
    },
    {
      id: 2,
      service: 'Service Completed',
      client: 'Client Name',
      number: '+91 9876543219',
      totalService: '2 Services',
      time: '1h 30min',
    },
    {
      id: 3,
      service: 'Service Completed',
      client: 'Client Name',
      number: '+91 9876543219',
      totalService: '2 Services',
      time: '1h 30min',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BillingInformation');
        }}
        style={[styles.boxWithShadow, styles.itemTouch]}>
        <Text style={[styles.itemText, {color: theme.color.switchOn}]}>
          {item.service}
        </Text>
        <Text style={styles.itemText}>{item.client}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.itemText, {fontFamily: theme.font.regular}]}>
            {item.number}
          </Text>
          <AppIcon
            name={'right'}
            type={'AntDesign'}
            size={15}
            color={theme.color.black}
          />
        </View>
        <Text
          style={[
            styles.itemText,
            {fontFamily: theme.font.regular, color: theme.color.inputGrey},
          ]}>
          {item.totalService}
        </Text>
        <Text
          style={[
            styles.itemText,
            {
              alignSelf: 'flex-end',
              color: theme.color.inputGrey,
              fontFamily: theme.font.regular,
            },
          ]}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Container
      title={'Billing'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => {
            setsalonServices(!salonServices);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor: salonServices
                ? theme.color.primary
                : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {color: salonServices ? theme.color.white : theme.color.primary},
            ]}>
            Salon Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            sethomeServices(!homeServices);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor: homeServices
                ? theme.color.primary
                : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {color: homeServices ? theme.color.white : theme.color.primary},
            ]}>
            Home Services
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search Billing"
        placeholder="Search Billing"
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
            color={theme.color.bottomWidth}
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
      {billing ? (
        <>
          <Image source={LocalImages.billing} style={styles.billingImg} />
          <Text style={styles.noBillingText}>No Billing Done Yet</Text>
          <Text style={styles.billingText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </Text>
        </>
      ) : (
        <>
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: vh(45)}}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </>
      )}
      <BillingModal
        visible={showModal}
        setVisible={() => setShowModal(false)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(16),
    marginTop: vh(30),
  },
  btnTouch: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
    paddingHorizontal: vw(40),
    paddingVertical: vh(11),
    alignItems: 'center',
  },
  btnText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
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
  billingImg: {
    alignSelf: 'center',
    marginTop: vh(100),
    width: vw(83),
    height: vh(83),
  },
  noBillingText: {
    marginTop: vh(25),
    textAlign: 'center',
    fontFamily: theme.font.bold,
    color: theme.color.black,
    fontSize: normalize(16),
  },
  billingText: {
    textAlign: 'center',
    marginTop: vh(16),
    marginHorizontal: vw(46),
    color: theme.color.dropdownColor,
    fontSize: normalize(13),
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 4,
  },
  itemTouch: {
    borderWidth: 1,
    borderColor: theme.color.white,
    marginVertical: vh(25),
    paddingHorizontal: vw(17),
    paddingVertical: vh(20),
    backgroundColor: theme.color.white,
  },
  itemText: {
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    color: theme.color.black,
    marginTop: vh(12),
  },
});

export default Billing;
