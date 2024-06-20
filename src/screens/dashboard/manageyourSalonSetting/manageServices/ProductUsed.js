import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../../components/common/AppIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import ProductType from './ProductType';
import {version} from 'react';

const ProductUsed = ({navigation}) => {
  const data = [
    {
      productName: 'L’Oreal Paris Hydrated',
      quantityNo: '2',
      quantity: '30 g',
    },
  ];
  const refRBSheet = useRef();
  const [product, setProduct] = useState('');
  return (
    <Container
      title={'Product Used'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={() => {
        navigation.navigate('SelectedServicesDetails');
      }}>
      <RBSheet
        ref={refRBSheet}
        // closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(600),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ProductType
          onPress={() => {
            refRBSheet.current.close();
          }}
          onPressAdd={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
      <Text style={styles.serviceName}>Service Name</Text>
      <Text style={styles.service}>Hair Colour</Text>
      <View style={styles.bottom}></View>
      <TextInput
        value={product}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search products to add"
        placeholder="Search products to add"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setProduct(text);
        }}
        renderLeftIcon={() => (
          <AppIcon
            name={'search'}
            type={'MaterialIcons'}
            size={20}
            color={theme.color.inputGrey}
            style={{marginRight: vw(12)}}
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
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(15),
          marginTop: vh(42),
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.productTxt,
            {color: theme.color.primary, fontFamily: theme.font.bold},
          ]}>
          Professional Products
        </Text>
        <Text
          style={[
            styles.productTxt,
            {
              color: theme.color.primary,
              fontFamily: theme.font.bold,
              marginRight: vw(60),
            },
          ]}>
          Quantity
        </Text>
      </View>
      {data.map((type, index) => {
        return (
          <View
            key={type.id}
            style={[styles.productView, styles.boxWithShadow]}>
            <Text style={styles.productTxt}>{type.productName}</Text>
            <Text
              style={[
                styles.productTxt,
                {
                  color: theme.color.black,
                  marginRight: vw(60),
                },
              ]}>
              {type.quantity}
            </Text>
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(15),
          marginTop: vh(42),
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.productTxt,
            {color: theme.color.primary, fontFamily: theme.font.bold},
          ]}>
          Disposable Products
        </Text>
        <Text
          style={[
            styles.productTxt,
            {
              color: theme.color.primary,
              fontFamily: theme.font.bold,
              marginRight: vw(60),
            },
          ]}>
          Quantity
        </Text>
      </View>
      {data.map((type, index) => {
        return (
          <View
            key={type.id}
            style={[styles.productView, styles.boxWithShadow]}>
            <Text style={styles.productTxt}>{type.productName}</Text>
            <Text
              style={[
                styles.productTxt,
                {color: theme.color.black, marginRight: vw(60)},
              ]}>
              {type.quantity}
            </Text>
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(15),
          marginTop: vh(42),
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            styles.productTxt,
            {color: theme.color.primary, fontFamily: theme.font.bold},
          ]}>
          Reusable Products
        </Text>
        <Text
          style={[
            styles.productTxt,
            {
              color: theme.color.primary,
              fontFamily: theme.font.bold,
              marginRight: vw(60),
            },
          ]}>
          Quantity
        </Text>
      </View>
      {data.map((type, index) => {
        return (
          <View
            key={type.id}
            style={[styles.productView, styles.boxWithShadow]}>
            <Text style={styles.productTxt}>{type.productName}</Text>
            <Text
              style={[
                styles.productTxt,
                {color: theme.color.black, marginRight: vw(60)},
              ]}>
              {type.quantity}
            </Text>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.open();
        }}>
        <Text style={styles.addProductText}>+ Add Products Used</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  serviceName: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    marginHorizontal: vw(21),
    marginTop: vh(15),
    fontSize: normalize(14),
    textAlign: 'center',
  },
  service: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    marginHorizontal: vw(21),
    fontSize: normalize(16),
    textAlign: 'center',
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
  productTxt: {
    fontSize: normalize(16),
    fontFamily: theme.font.medium,
    color: theme.color.black,
  },
  quantity: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    marginHorizontal: vw(15),
    marginTop: vh(4),
    color: theme.color.dropdownColor,
  },
  bottom: {
    marginHorizontal: vw(15),
    borderTopWidth: 1,
    borderColor: theme.color.borderGrey,
    marginTop: vh(15),
  },
  addProductText: {
    color: theme.color.LightBlue,
    marginTop: vh(12),
    fontFamily: theme.font.bold,
    marginHorizontal: vw(20),
    marginTop: vh(12),
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
  productView: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    justifyContent: 'space-between',
    marginTop: vh(15),
    borderWidth: 1,
    borderRadius: vw(10),
    paddingHorizontal: vw(12),
    paddingVertical: vh(15),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
});

export default ProductUsed;
