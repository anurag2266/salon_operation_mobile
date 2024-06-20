import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../../components/common/CustomButton';
import {TextInput} from 'react-native-element-textinput';

const ReturnOrder = ({navigation}) => {
  const [reason, setreason] = useState([]);
  const [yourReason, setyourReason] = useState('');
  const data = [
    {
      id: 1,
      label: 'Change of a mind',
    },
    {
      id: 2,
      label: 'Looking for something else',
    },
    {
      id: 3,
      label: 'Product came damaged',
    },
    {
      id: 4,
      label: 'Other',
    },
  ];
  const productdata = [
    {
      id: 1,
      imageProduct: LocalImages.product,
      productName: 'MAC Cosmetics',
      price: 'Price : ',
      amount: 'Rs. 750',
      quantity: 'Quantity : ',
      quantityAmount: '4',
      applied: 'Package Applied',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Return Order'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {productdata.map((item, index) => {
          return (
            <View
              key={item.id}
              style={[
                styles.mainItemView,
                styles.boxWithShadow,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Image source={item.imageProduct} style={styles.image} />
              <View style={{marginLeft: vw(25)}}>
                <Text style={styles.productName}>{item.productName}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.itemValues}>
                    {item.price}
                    <Text style={{fontFamily: theme.font.regular}}>
                      {item.amount}
                    </Text>
                  </Text>
                  <Text style={[styles.itemValues, {marginLeft: vw(14)}]}>
                    {item.quantity}
                    <Text style={{fontFamily: theme.font.regular}}>
                      {item.quantityAmount}
                    </Text>
                  </Text>
                </View>
                <Text style={styles.appliedText}>{item.applied}</Text>
              </View>
            </View>
          );
        })}
        <Text style={styles.returnOrder}>
          Are you sure you want to return order?
        </Text>
        <Dropdown
          style={[styles.input, {paddingVertical: vh(12)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.textErrorStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={data}
          search
          labelField="label"
          valueField="id"
          placeholder="Select your reason here"
          searchPlaceholder="Search"
          value={reason}
          onChange={item => {
            setreason(item.id);
          }}
        />
        {reason == 4 ? (
          <TextInput
            value={yourReason}
            style={[styles.input, {height: vh(140)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Type Your Reason Here"
            placeholder="Type Your Reason Here"
            multiline={true}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              btnShown == true;
              setyourReason(text);
            }}
          />
        ) : null}
      </Container>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(35),
        }}>
        <CustomButton
          label={'Cancel'}
          onPress={() => {
            navigation.navigate('');
          }}
          extraStyle={{
            width: '40%',
            marginTop: vh(30),
            marginBottom: vh(140),
            borderColor: theme.color.primary,
            borderWidth: 1,
            backgroundColor: theme.color.white,
          }}
          labelExtraStyle={{
            color: theme.color.primary,
          }}
        />
        <CustomButton
          label={'Yes'}
          onPress={() => {
            Alert.alert(
              'We have submitted your request for return!',
              'Our team will shortly inform you about the return. Kindly check your mail for more updates',
              [
                {
                  text: 'Back',
                },
              ],
            );
            navigation.navigate('BillingInformation');
          }}
          extraStyle={{width: '40%', marginTop: vh(30), marginBottom: vh(140)}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainItemView: {
    borderWidth: 1,
    borderRadius: vw(20),
    marginHorizontal: vw(16),
    paddingHorizontal: vw(15),
    paddingVertical: vh(15),
    marginVertical: vh(25),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  image: {
    width: vw(90),
    height: vh(90),
    borderWidth: 1,
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  productName: {
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  itemValues: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(13),
    marginTop: vh(6),
  },
  appliedText: {
    marginTop: vh(6),
    color: theme.color.switchOn,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  returnOrder: {
    textAlign: 'center',
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    color: theme.color.black,
    marginTop: vh(10),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
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
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
});

export default ReturnOrder;
