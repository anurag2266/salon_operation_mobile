import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import {TextInput} from 'react-native-gesture-handler';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import CustomButton from '../../../../components/common/CustomButton';

const Pricing = ({navigation}) => {
  const [purchasePrice, setpurchasePrice] = useState('');
  const [MRP, setMRP] = useState('');
  const [salePrice, setsalePrice] = useState('');
  const [GST, setGST] = useState('');
  const [discount, setdiscount] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Pricing'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={purchasePrice}
            style={[styles.input, {height: vh(55), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Purchase Price"
            placeholder="Purchase Price"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setpurchasePrice(text);
            }}
          />
          <TextInput
            value={MRP}
            style={[styles.input, {height: vh(55), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="MRP"
            placeholder="MRP"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setMRP(text);
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            value={salePrice}
            style={[styles.input, {height: vh(55), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Sale Price"
            placeholder="Sale Price"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setsalePrice(text);
            }}
          />
          <TextInput
            value={GST}
            style={[styles.input, {height: vh(55), width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="GST %"
            placeholder="GST %"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setGST(text);
            }}
          />
        </View>
        <TextInput
          value={discount}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Discount %"
          placeholder="Discount %"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setdiscount(text);
          }}
        />
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('ManageProduct');
        }}
        extraStyle={{marginTop: vh(40), marginBottom: vh(100)}}
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
    marginTop: vh(30),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 13, paddingHorizontal: 8},
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
});

export default Pricing;
