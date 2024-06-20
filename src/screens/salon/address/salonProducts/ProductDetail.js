import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../../components/common/CustomButton';
import Container from '../../../../components/common/Container';
import ProgressBar from '../../../../components/common/ProgressBar';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {getDiscountCardbySalonId} from '../../../../api/discount/discountCardService';
import {salonProductUpdateGeneralSettingAPI} from '../../../../api/products/productMapService';
import {showMessage} from 'react-native-flash-message';

const ProductDetail = ({navigation, route}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const {productDetail} = route.params;
  const [discountData, setDiscountData] = useState([]);
  const [productName, setproductName] = useState('');
  const [brandName, setbrandName] = useState('');
  const [category, setcategory] = useState('');
  const [subCategory, setsubCategory] = useState('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [packSize, setPackSize] = useState('');
  const [skuSize, setSkuSize] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mrp, setMrp] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const DATA = [
    {
      id: 1,
      label: 'Consumption',
    },
    {
      id: 2,
      label: 'Retail',
    },
    {
      id: 3,
      label: 'Both',
    },
  ];

  const handleGetDiscount = async () => {
    const {data, message, status} = await getDiscountCardbySalonId(
      salonDetails._id,
    );
    if (status) {
      setDiscountData(data);
    } else {
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('id', productDetail._id);
    formData.append('shortDescription', productDescription);
    formData.append('productBarcode', productBarcode);
    formData.append('unitOfMeasurement', unitOfMeasurement);
    formData.append('hsnCode', hsnCode);
    formData.append('packSize', packSize);
    formData.append('skuSize', skuSize.toString());
    formData.append(
      'addMore',
      JSON.stringify([
        {
          batchNumber: batchNo,
          expiryDate: expiryDate,
          quantity: quantity,
          mrp: mrp,
          purchasePrice: purchasePrice,
          discountType: discountType,
          discount: discount,
          salePrice: salePrice,
        },
      ]),
    );

    const {data, message, status} = await salonProductUpdateGeneralSettingAPI(
      formData,
    );
    if (status) {
      showMessage({message: message, type: 'success'});
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    handleGetDiscount();
    setUnitOfMeasurement(productDetail.unitOfMeasurement);
    setProductDescription(productDetail.shortDescription);
    setProductBarcode(productDetail.productBarcode);
    setHsnCode(productDetail.hsnCode);
    setPackSize(productDetail.packSize);
    setSkuSize(productDetail.skuSize);
    setBatchNo(productDetail.addMore?.[0]?.batchNumber);
    setExpiryDate(productDetail.addMore?.[0]?.expiryDate);
    setQuantity(productDetail.addMore?.[0]?.quantity);
    setMrp(productDetail.addMore?.[0]?.mrp);
    setPurchasePrice(productDetail.addMore?.[0]?.purchasePrice);
    setSalePrice(productDetail.addMore?.[0]?.salePrice);
    setDiscount(productDetail.addMore?.[0]?.discount);
    setDiscountType(productDetail.addMore?.[0]?.discountType);
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setSelectedId(item.label);
        }}>
        {item.label == selectedId ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Product Details'}
        leftIconName="arrow-left"
        leftIconColor={theme.color.dropdownColor}
        leftIconType="MaterialCommunityIcons"
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        progressBar={<ProgressBar progress={60} />}>
        <View style={{flexDirection: 'row', marginHorizontal: vw(21)}}>
          <Image
            source={LocalImages.product}
            resizeMode="contain"
            style={[styles.productImg, styles.boxWithShadow]}
          />
          <View>
            <Text style={styles.productName}>
              L’Oreal Series Expert Shampoo
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: vw(28),
                marginTop: vh(7),
              }}>
              <Text style={styles.detail}>1L</Text>
              <View
                style={{
                  borderLeftWidth: 1,
                  marginHorizontal: vw(10),
                  borderColor: theme.color.dropdownColor,
                }}></View>
              <Text style={styles.detail}>Rs 1000/-</Text>
            </View>
          </View>
        </View>
        <Text
          style={{
            fontSize: normalize(11),
            marginHorizontal: vw(37),
            marginTop: vh(40),
            color: theme.color.inputGrey,
            fontFamily: theme.font.bold,
          }}>
          Product Name
        </Text>
        <Text
          style={{
            fontSize: normalize(16),
            marginHorizontal: vw(30),
            marginTop: vh(13),
            color: theme.color.black,
            fontFamily: theme.font.regular,
          }}>
          {productDetail.displayName}
        </Text>
        <TextInput
          value={productDetail.displayName}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Brand Name"
          placeholder="Brand Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          editable={false}
          showIcon={false}
        />
        <TextInput
          value={productDetail.categoryId.name}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Category"
          placeholder="Category"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          editable={false}
          showIcon={false}
        />
        <TextInput
          value={productDetail.subCategoryId.name}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Sub Category"
          placeholder="Sub Category"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          editable={false}
          showIcon={false}
        />
        <TextInput
          value={unitOfMeasurement}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Unit of Measurement"
          placeholder="Unit of Measurement"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setUnitOfMeasurement(text);
          }}
        />
        <TextInput
          value={productDescription}
          style={[styles.input, {height: vh(90)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          multiline={true}
          label="Product Description"
          placeholder="Product Description"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setProductDescription(text);
          }}
        />
        <Text style={styles.productuse}>Product Usage</Text>
        <FlatList
          data={DATA}
          contentContainerStyle={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            marginHorizontal: vw(15),
            borderColor: theme.color.black,
            paddingBottom: vh(30),
          }}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
        <Text
          style={{
            color: theme.color.LightBlue,
            marginTop: vh(16),
            marginHorizontal: vw(15),
            fontFamily: theme.font.bold,
            fontSize: normalize(16),
          }}>
          More Details
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={productBarcode}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Product Barcodes"
            placeholder="Product Barcodes"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setProductBarcode(text);
            }}
          />
          <TextInput
            value={hsnCode}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="HSN Code"
            placeholder="HSN Code"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setHsnCode(text);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={packSize}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Pack Size"
            placeholder="Pack Size"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setPackSize(text);
            }}
          />
          <TextInput
            value={skuSize}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="SKU size"
            placeholder="SKU size"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSkuSize(text);
            }}
          />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginHorizontal: vw(15),
            borderColor: theme.color.black,
            marginTop: vh(20),
          }}></View>
        <TextInput
          value={batchNo}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Batch No."
          placeholder="Batch No."
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setBatchNo(text);
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={expiryDate}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Expiry Date"
            placeholder="Expiry Date"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setExpiryDate(text);
            }}
          />
          <TextInput
            value={quantity}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Quantity"
            placeholder="Quantity"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setQuantity(text);
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={mrp}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="MRP"
            placeholder="MRP"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setMrp(text);
            }}
          />
          <TextInput
            value={purchasePrice}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Purchase Price "
            placeholder="Purchase Price "
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setPurchasePrice(text);
            }}
          />
        </View>
        <Dropdown
          style={[styles.input, {paddingVertical: vh(12)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={discountData}
          search
          labelField="discountcardName"
          valueField="discountcardType"
          placeholder="Discount"
          searchPlaceholder="Search"
          value={discount}
          onChange={item => {
            setDiscountType(item.discountcardType);
            setDiscount(item.discountcardPrice);
          }}
        />
        <TextInput
          value={salePrice}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Sale price"
          placeholder="Sale price"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setSalePrice(text);
          }}
        />
        {/* <TouchableOpacity>
          <Text
            style={{
              color: theme.color.LightBlue,
              fontFamily: theme.font.bold,
              fontSize: normalize(16),
              marginHorizontal: vw(23),
              marginTop: vh(25),
            }}>
            +Add More
          </Text>
        </TouchableOpacity> */}
      </Container>
      <CustomButton
        label={'Save'}
        onPress={handleSubmit}
        extraStyle={{marginTop: vh(70), marginBottom: vh(30)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  productImg: {
    borderWidth: 1,
    borderRadius: vw(5),
    borderColor: theme.color.white,
    marginTop: vh(20),
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productName: {
    marginTop: vh(30),
    marginHorizontal: vw(28),
    color: theme.color.Black_shadow,
    fontSize: normalize(16),
    fontFamily: theme.font.medium,
  },
  detail: {
    color: theme.color.dropdownColor,
    fontSize: normalize(13),
    fontFamily: theme.font.medium,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(16),
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
  productuse: {
    marginHorizontal: vw(16),
    marginVertical: vh(17),
    fontSize: normalize(16),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(10),
  },
  labelText: {
    marginHorizontal: vw(10),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
});

export default ProductDetail;
