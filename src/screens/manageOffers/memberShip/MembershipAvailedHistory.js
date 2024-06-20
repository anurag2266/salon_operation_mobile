import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import MembershipCard from '../../../components/membership/MembershipCard';
import {vw, vh, normalize} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';

const MembershipAvailedHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  employeDATA = [
    {
      id: 1,
      date: '30/11/22',
      cardNo: '9876519876511234',
      name: 'Sanjana Singh',
      discountAvail: 'Rs.2000',
    },
  ];
  return (
    <Container
      title={'Membership Availed History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={{marginHorizontal: vw(22)}}>
        <MembershipCard dummy />
      </View>
      <TextInput
        value={search}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search"
        placeholder="Search"
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
      <Text style={styles.availedDetailText}>Membership Availed Details</Text>
      <View style={styles.totalNumberView}>
        <Text style={styles.totalNumberText}>Number of Customers</Text>
        <Text style={styles.totalNumberText}>30</Text>
      </View>
      <View style={styles.totalNumberView}>
        <Text style={styles.totalNumberText}>Total Discount Availed</Text>
        <Text style={styles.totalNumberText}>Rs.1000</Text>
      </View>
      <View style={styles.bottomWidth}></View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: vh(30),
          justifyContent: 'space-around',
        }}>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Date
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Card Number
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Customer
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Disc Availed
        </Text>
      </View>
      {employeDATA.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[styles.boxWithShadow, styles.employeeDataView]}>
            <Text style={styles.header}>{item.date}</Text>
            <Text style={[styles.header, {color: theme.color.LightBlue}]}>
              {item.cardNo}
            </Text>
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.header}>{item.discountAvail}</Text>
          </View>
        );
      })}
      <TouchableOpacity style={styles.shareBtn}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
          style={{marginRight: vw(15)}}
        />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </Container>
  );
};

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
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  availedDetailText: {
    fontSize: normalize(17),
    fontFamily: theme.font.bold,
    color: theme.color.black,
    marginHorizontal: vw(16),
    marginTop: vh(20),
  },
  totalNumberView: {
    marginHorizontal: vw(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(12),
  },
  totalNumberText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(16),
    marginTop: vh(8),
    borderColor: theme.color.dropdownColor,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginTop: '40%',
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
  header: {
    fontSize: normalize(14),
    color: theme.color.black,
    fontFamily: theme.font.regular,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  employeeDataView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.white,
    marginTop: vh(17),
    marginHorizontal: vw(16),
    paddingVertical: vh(11),
    borderRadius: vw(10),
    alignItems: 'center',
  },
});

export default MembershipAvailedHistory;
