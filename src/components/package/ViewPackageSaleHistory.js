import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';

const ViewPackageSaleHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  employeDATA = [
    {
      id: 1,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 2,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 3,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 4,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 5,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 6,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
    {
      id: 7,
      soldOn: '30/11/22',
      customer: 'Sanjana Singh',
      expiry: '30/11/22',
      status: 'Expired',
    },
  ];
  return (
    <Container
      title={'Package Sale History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <Text style={styles.planText}>Gold Plan</Text>
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
      <Text style={styles.saleDetailText}>Sale Details</Text>
      <View style={styles.totalNumberView}>
        <Text style={styles.totalNumberText}>Total Number of Customers</Text>
        <Text style={styles.totalNumberText}>30</Text>
      </View>
      <View style={styles.totalNumberView}>
        <Text style={styles.totalNumberText}>Total payment Received</Text>
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
          Sold On
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Customer
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Expiry
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Status
        </Text>
      </View>
      {employeDATA.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[styles.boxWithShadow, styles.employeeDataView]}>
            <Text style={styles.header}>{item.soldOn}</Text>
            <Text style={styles.header}>{item.customer}</Text>
            <Text style={[styles.header, {color: theme.color.red}]}>
              {item.expiry}
            </Text>
            <View style={styles.statusView}>
              <Text
                style={{
                  color: theme.color.white,
                  fontFamily: theme.font.semiBold,
                  fontSize: normalize(11),
                }}>
                {item.status}
              </Text>
            </View>
            <AppIcon
              name={'right'}
              type={'AntDesign'}
              size={15}
              color={theme.color.dropdownColor}
              onPress={() => {}}
            />
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
  planText: {
    textAlign: 'center',
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
  },
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
  saleDetailText: {
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
  statusView: {
    backgroundColor: theme.color.red,
    padding: 4,
    borderRadius: vw(4),
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginTop: vh(40),
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
});

export default ViewPackageSaleHistory;
