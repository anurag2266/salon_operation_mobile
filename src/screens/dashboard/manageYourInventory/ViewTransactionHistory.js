import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';

const ViewTransactionHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [fromDate, setfromDate] = useState('');
  const [toDate, settoDate] = useState('');

  const data = [
    {
      id: 1,
      itemname: 'Hair Dryer',
      action: 'Action',
      qty: '10',
    },
    {
      id: 2,
      itemname: 'Hair Dryer',
      action: 'Action',
      qty: '10',
    },
    {
      id: 3,
      itemname: 'Hair Dryer',
      action: 'Action',
      qty: '10',
    },
  ];

  return (
    <Container
      title={'View Transaction History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search Locations"
        placeholder="Search Locations"
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
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={fromDate}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="From Date"
          placeholder="From Date"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setfromDate(text);
          }}
        />
        <TextInput
          value={toDate}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="To Date"
          placeholder="To Date"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            settoDate(text);
          }}
        />
      </View>
      <View style={[styles.itemView, styles.boxWithShadow]}>
        <Text style={styles.dateText}>
          Date : <Text>20/12/22</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: vh(10),
            backgroundColor: theme.color.searchColor,
            paddingVertical: 10,
          }}>
          <Text style={[styles.text, {fontFamily: theme.font.bold}]}>
            Item Name
          </Text>
          <Text
            style={[
              styles.text,
              {marginHorizontal: '20%', fontFamily: theme.font.bold},
            ]}>
            Action
          </Text>
          <Text style={[styles.text, {fontFamily: theme.font.bold}]}>Qty</Text>
        </View>
        {data.map(item => {
          return (
            <View style={{flexDirection: 'row', marginTop: vh(10)}}>
              <Text style={styles.text}>{item.itemname}</Text>
              <Text style={[styles.text, {marginHorizontal: '22%'}]}>
                {item.action}
              </Text>
              <Text style={styles.text}>{item.qty}</Text>
              <AppIcon
                name={'right'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  '';
                }}
                style={{
                  marginLeft: vw(40),
                }}
              />
            </View>
          );
        })}
      </View>
      <View style={[styles.itemView, styles.boxWithShadow]}>
        <Text style={styles.dateText}>
          Date : <Text>23/12/22</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: vh(10),
            backgroundColor: theme.color.searchColor,
            paddingVertical: 10,
          }}>
          <Text style={[styles.text, {fontFamily: theme.font.bold}]}>
            Item Name
          </Text>
          <Text
            style={[
              styles.text,
              {marginHorizontal: '20%', fontFamily: theme.font.bold},
            ]}>
            Action
          </Text>
          <Text style={[styles.text, {fontFamily: theme.font.bold}]}>Qty</Text>
        </View>
        {data.map(item => {
          return (
            <View style={{flexDirection: 'row', marginTop: vh(10)}}>
              <Text style={styles.text}>{item.itemname}</Text>
              <Text style={[styles.text, {marginHorizontal: '22%'}]}>
                {item.action}
              </Text>
              <Text style={styles.text}>{item.qty}</Text>
              <AppIcon
                name={'right'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  '';
                }}
                style={{
                  marginLeft: vw(40),
                }}
              />
            </View>
          );
        })}
      </View>
      <TouchableOpacity style={styles.shareBtnView}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
        />
        <Text
          style={{
            color: theme.color.primary,
            fontSize: normalize(16),
            fontFamily: theme.font.bold,
            marginLeft: vw(15),
          }}>
          Share
        </Text>
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
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 3.23,
    shadowRadius: 1.62,
    elevation: 4,
  },
  itemView: {
    marginTop: vh(45),
    borderWidth: 1,
    marginHorizontal: vw(16),
    borderRadius: vw(10),
    paddingVertical: vh(15),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(10),
  },
  dateText: {
    textAlign: 'center',
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
    color: theme.color.black,
  },
  text: {
    color: theme.color.black,
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
  },
  shareBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.primary,
    paddingHorizontal: vw(60),
    paddingVertical: vh(17),
    marginTop: vh(47),
  },
});

export default ViewTransactionHistory;
