import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import MembershipCard from '../../components/membership/MembershipCard';
import {vw, vh, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../components/common/CustomButton';

const Membership = ({navigation}) => {
  const [service, setservice] = useState('');
  const [appliedDate, setappliedDate] = useState('');
  const [expiryDate, setexpiryDate] = useState('');
  const [availedBy, setavailedBy] = useState('');
  const [planValidity, setplanValidity] = useState('');
  const [membersIncluded, setmembersIncluded] = useState('');
  const [price, setprice] = useState('');
  const [discount, setdiscount] = useState('');
  const [tax, settax] = useState('');
  const [totalAmount, settotalAmount] = useState('');
  const DATA = [
    {
      id: 1,
      label: 'Total Price',
      price: 'Rs 1200',
    },
    {
      id: 2,
      label: 'Service Fee',
      price: 'Rs 45',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <View style={styles.mainView}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Memberships'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={{marginHorizontal: vw(20)}}>
          <MembershipCard dummy />
        </View>
        <TextInput
          value={service}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Service"
          placeholder="Service"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setservice(text);
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={appliedDate}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Applied Date"
            placeholder="Applied Date"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setappliedDate(text);
            }}
          />
          <TextInput
            value={expiryDate}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Expiry Date"
            placeholder="Expiry Date"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setexpiryDate(text);
            }}
          />
        </View>
        <TextInput
          value={availedBy}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Availed By"
          placeholder="Availed By"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setavailedBy(text);
          }}
        />
        <TextInput
          value={planValidity}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Plan Validity"
          placeholder="Plan Validity"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setplanValidity(text);
          }}
        />
        <TextInput
          value={membersIncluded}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Members Included"
          placeholder="Members Included"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setmembersIncluded(text);
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={price}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Price"
            placeholder="Price"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setprice(text);
            }}
          />
          <TextInput
            value={discount}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Discount"
            placeholder="Discount"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setdiscount(text);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={tax}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Tax"
            placeholder="Tax"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              settax(text);
            }}
          />
          <TextInput
            value={totalAmount}
            style={[styles.input, {marginTop: vh(25), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Total Amount"
            placeholder="Total Amount"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              settotalAmount(text);
            }}
          />
        </View>
        <View style={[styles.border, styles.boxWithShadow]}>
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: vh(30),
              marginHorizontal: vw(21),
            }}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.dashed}></View>
          <View style={[styles.mainView, {marginHorizontal: vw(35)}]}>
            <Text style={styles.label}>Total Amount</Text>
            <Text style={styles.price}>Rs 1200</Text>
          </View>
        </View>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('Offers');
        }}
        extraStyle={{marginBottom: vh(50), marginTop: vh(5)}}
      />
    </View>
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
  dashed: {
    height: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    marginTop: vh(24),
    marginBottom: vh(10),
    marginHorizontal: vw(25),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(13),
    marginHorizontal: vw(25),
  },
  label: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  price: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
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
  border: {
    borderWidth: 1,
    marginVertical: vh(40),
    paddingVertical: vh(30),
    borderColor: theme.color.white,
  },
});

export default Membership;
