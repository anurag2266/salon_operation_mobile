import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../common/Container';
import AppIcon from '../common/AppIcon';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';

const ReplacementBottomSheet = ({navigation, onPress, onPressLeft}) => {
  const [search, setSearch] = useState('');

  const itemDATA = [
    {
      id: 1,
      name: 'Hair Dryer',
      modelNO: 'Model No. :  12345',
      serialNo: 'Serial No. :  09876',
      qty: '1',
      refundQty: '1',
    },
    {
      id: 2,
      name: 'LO’real Sha',
      modelNO: 'Model No. :  12345',
      serialNo: 'Serial No. :  09876',
      qty: '5',
      refundQty: '2',
    },
  ];

  return (
    <Container
      title={'Items Send To'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={onPressLeft}
      bottomButtonTitle={'SAVE'}
      onPressBottomButton={onPress}>
      <Text style={styles.vendorNameText}>Vendor Name</Text>
      <Text style={styles.replacementText}>For Replacement</Text>
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
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: vw(15),
          borderBottomWidth: 1,
          borderColor: theme.color.dropdownColor,
          paddingBottom: vh(40),
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
      <Text
        style={{
          backgroundColor: theme.color.searchColor,
          paddingVertical: vh(10),
          marginTop: vh(40),
          paddingLeft: vw(23),
          color: theme.color.primary,
          fontFamily: theme.font.bold,
          fontSize: normalize(14),
        }}>
        Date : <Text>22/12/22</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: vh(10),
          marginHorizontal: vw(23),
        }}>
        <Text style={styles.itemText}>Item</Text>
        <Text style={[styles.itemText, {marginLeft: vw(45)}]}>Send Qty</Text>
        <Text style={styles.itemText}>Returned Qty</Text>
      </View>
      {itemDATA.map(item => {
        return (
          <View style={[styles.boxWithShadow, styles.itemView]}>
            <View>
              <Text style={styles.itemDataText}>{item.name}</Text>
              <Text
                style={[
                  styles.itemDataText,
                  {fontSize: normalize(8), marginTop: vh(8)},
                ]}>
                {item.modelNO}
              </Text>
              <Text
                style={[
                  styles.itemDataText,
                  {fontSize: normalize(8), marginTop: vh(4)},
                ]}>
                {item.serialNo}
              </Text>
            </View>
            <View style={styles.qtyView}>
              <Text style={styles.itemDataText}>{item.qty}</Text>
            </View>
            <View style={styles.qtyView}>
              <Text style={styles.itemDataText}>{item.refundQty}</Text>
            </View>
          </View>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
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
  replacementText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  vendorNameText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    textAlign: 'center',
  },
  itemView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(15),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(10),
    paddingVertical: vh(14),
    marginTop: vh(15),
  },
  itemText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  itemDataText: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  qtyView: {
    borderWidth: 1,
    borderRadius: vw(5),
    paddingHorizontal: vw(20),
    alignItems: 'center',
    paddingVertical: vh(4),
    height: '60%',
    borderColor: theme.color.searchColor,
    backgroundColor: theme.color.searchColor,
  },
});

export default ReplacementBottomSheet;
