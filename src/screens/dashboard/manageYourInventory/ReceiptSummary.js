import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';

const ReceiptSummary = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [issuedFrom, setissuedFrom] = useState('');
  const [issuedTo, setissuedTo] = useState('');
  const [received, setReceived] = useState('Received');

  const DATA = [
    {
      id: 1,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Saved as Draft',
    },
    {
      id: 2,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Received',
      replacement: 'Replacement',
    },
    {
      id: 3,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Received',
      replacement: 'Replacement',
    },
    {
      id: 4,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Received',
      replacement: 'Repair',
    },
    {
      id: 5,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Received',
      replacement: 'Exchange',
    },
    {
      id: 6,
      date: '12/12/2022',
      time: '2:00 PM',
      totalqty: '10',
      from: 'Main Store',
      to: 'Spa Room',
      recieved: 'Received',
      replacement: 'Expired',
    },
  ];

  return (
    <Container
      title={'Receipt Summary'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle={'+ Receipt Items'}
      onPressBottomButton={() => {
        navigation.navigate('ReceiptStockItem');
      }}>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
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
        renderRightIcon={() => (
          <AppIcon
            name={'calendar'}
            type={'AntDesign'}
            size={20}
            color={theme.color.dropdownColor}
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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={issuedFrom}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Issued From"
          placeholder="Issued From"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setissuedFrom(text);
          }}
        />
        <AppIcon
          name={'arrow-circle-right'}
          type={'FontAwesome'}
          size={22}
          color={theme.color.searchColor}
          style={{marginTop: vh(15)}}
        />
        <TextInput
          value={issuedTo}
          style={[styles.input, {marginTop: vh(25), width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Issued To"
          placeholder="Issued To"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setissuedTo(text);
          }}
        />
      </View>
      {DATA.map(item => {
        return (
          <View style={[styles.boxWithShadow, styles.dataView]}>
            <View style={styles.topView}>
              <TouchableOpacity
                style={[
                  styles.recieved,
                  {
                    borderColor:
                      received == item.recieved
                        ? theme.color.switchOn
                        : theme.color.red,
                    backgroundColor:
                      received == item.recieved
                        ? theme.color.switchOn
                        : theme.color.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.recievedText,
                    {
                      color:
                        received == item.recieved
                          ? theme.color.white
                          : theme.color.red,
                    },
                  ]}>
                  {item.recieved}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  color: theme.color.LightBlue,
                  fontFamily: theme.font.bold,
                  fontSize: normalize(14),
                }}>
                {item.replacement}
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.datatext}>
                Date : <Text>{item.date}</Text>
              </Text>
              <Text style={styles.datatext}>
                Time : <Text>{item.date}</Text>
              </Text>
              <Text style={styles.quantityText}>
                Total Quantity :{' '}
                <Text style={{fontFamily: theme.font.regular}}>
                  {item.totalqty}
                </Text>
              </Text>
              <AppIcon
                name={'right'}
                type={'AntDesign'}
                size={15}
                color={theme.color.dropdownColor}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: vh(16)}}>
              <Text style={styles.quantityText}>
                From :{' '}
                <Text
                  style={{
                    color: theme.color.primary,
                    fontFamily: theme.font.semiBold,
                  }}>
                  {item.from}
                </Text>
              </Text>
              <Text style={[styles.quantityText, {marginLeft: vw(75)}]}>
                To :{' '}
                <Text
                  style={{
                    color: theme.color.primary,
                    fontFamily: theme.font.semiBold,
                  }}>
                  {item.to}
                </Text>
              </Text>
            </View>
          </View>
        );
      })}
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
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  dataView: {
    borderWidth: 1,
    marginTop: vh(35),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingVertical: vh(20),
    paddingHorizontal: vw(10),
  },
  datatext: {
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.dropdownColor,
  },
  quantityText: {
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
    color: theme.color.black,
  },
  recieved: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: vw(10),
    paddingHorizontal: vw(10),
    paddingVertical: vh(5),
  },
  topView: {
    position: 'relative',
    bottom: vh(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: vw(20),
  },
  recievedText: {
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
});

export default ReceiptSummary;
