import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppIcon from '../../../../components/common/AppIcon';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-element-textinput';

const ProductType = ({onPress, onPressAdd}) => {
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [selectProduct, setselectProduct] = useState('');
  const [selectquantity, setselectquantity] = useState('');
  const [unitOfMeasurement, setunitOfMeasurement] = useState('');
  const productTypeData = [
    {
      id: 1,
      label: 'Technical',
    },
    {
      id: 2,
      label: 'Disposable',
    },
    {
      id: 3,
      label: 'Reusable',
    },
  ];

  const productrenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setSelectedProductId(item.label);
        }}>
        {item.label == selectedProductId ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.mainHeaderView}>
        <Text style={styles.productText}>Select Product Used</Text>
        <TouchableOpacity onPress={onPress}>
          <AppIcon
            name={'close'}
            type={'AntDesign'}
            size={15}
            color={theme.color.black}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={productTypeData}
          horizontal={true}
          renderItem={productrenderItem}
          keyExtractor={item => item.id}
          extraData={selectedProductId}
        />
      </View>
      <MultiSelect
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color:theme.color.black}}
        itemTextStyle={{color:theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        // data={data}
        search
        labelField="label"
        valueField="lablel"
        placeholder="Select Product"
        searchPlaceholder="Search"
        value={selectProduct}
        onChange={item => {
          setselectProduct(item);
        }}
      />
      <Dropdown
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color:theme.color.black}}
        itemTextStyle={{color:theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        // data={data}
        search
        labelField="label"
        valueField="lablel"
        placeholder="Unit Of Measurement"
        searchPlaceholder="Search"
        value={unitOfMeasurement}
        onChange={item => {
          setunitOfMeasurement(item);
        }}
      />
      <TextInput
        value={selectquantity}
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
          setselectquantity(text);
        }}
      />
      <TouchableOpacity onPress={onPressAdd} style={styles.addTouch}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  mainHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(31),
    marginHorizontal: vw(15),
    borderBottomWidth: 1,
    padding: vw(12),
    borderColor: theme.color.Black_shadow,
  },
  productText: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    marginTop: vh(15),
  },
  labelText: {
    marginHorizontal: vw(5),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(12),
    marginTop: vh(30),
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
  addTouch: {
    borderWidth: 1,
    marginHorizontal: vw(21),
    marginVertical: vh(89),
    paddingVertical: vh(17),
    borderRadius: vw(10),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
  },
  addText: {
    color: theme.color.white,
    textAlign: 'center',
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
});

export default ProductType;
