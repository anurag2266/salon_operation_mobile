import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {getSalonServicesBySalonID} from '../../../../api/services/salonMap';
import {
  getSalonProduct,
  updateProductAdditionalSettingAPI,
} from '../../../../api/products/productMapService';
import {getAllServiceTag} from '../../../../api/searchTag/searchTagMasterService';

const AdditionalSettingsProduct = ({navigation, route}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const {productDetail} = route.params;
  const [allTags, setAllTags] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  const handleGetSalonServices = async () => {
    const {data, status, message} = await getSalonServicesBySalonID(
      salonDetails._id,
    );
    if (status) {
      setAllServices(data);
    } else {
    }
  };
  const handleGetSalonProducts = async () => {
    const {data, status, message} = await getSalonProduct(salonDetails._id);
    if (status) {
      setAllProducts(data);
    } else {
    }
  };
  const handleGetTags = async () => {
    const {data, status, message} = await getAllServiceTag();
    if (status) {
      setAllTags(data);
    } else {
    }
  };

  const handleSubmit = async () => {
    const {data, status, message} = await updateProductAdditionalSettingAPI({
      id: productDetail._id,
      similarProducts: products,
      similarServices: services,
      viewSearchTag: tags,
    });

    if (status) {
      showMessage({message: message, type: 'success'});
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    setProducts(productDetail.similarProducts);
    setServices(productDetail.similarServices);
    setTags(productDetail.viewSearchTag);
    handleGetTags();
    handleGetSalonServices();
    handleGetSalonProducts();
  }, []);

  return (
    <Container
      title={'Additional Settings'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle={'OK'}
      onPressBottomButton={handleSubmit}>
      <Text style={styles.productNameText}>Product Name</Text>
      <Text style={styles.productType}>{productDetail.displayName}</Text>
      <View style={styles.bottomWidth} />
      <Text style={styles.recommendedText}>
        Recommended Tags For The Product
      </Text>
      <View style={[styles.bottomWidth, {marginTop: vh(8)}]} />
      <MultiSelect
        style={[
          styles.dropdown,
          {marginHorizontal: vw(15), marginVertical: vh(15)},
        ]}
        selectedStyle={{
          backgroundColor: theme.color.white,
          marginHorizontal: vw(15),
          borderRadius: vw(5),
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={allTags}
        value={tags}
        search
        maxHeight={300}
        labelField="name"
        valueField="name"
        placeholder={`View Search Tags (${tags.length})`}
        searchPlaceholder="Search..."
        onChange={item => setTags(item)}
      />
      <MultiSelect
        style={[
          styles.dropdown,
          {marginHorizontal: vw(15), marginVertical: vh(15)},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={allProducts}
        value={products}
        selectedStyle={{
          backgroundColor: theme.color.white,
          marginHorizontal: vw(15),
          borderRadius: vw(5),
        }}
        search
        maxHeight={300}
        labelField="displayName"
        valueField="_id"
        placeholder={`View Related Products (${products.length}) `}
        searchPlaceholder="Search..."
        onChange={item => setProducts(item)}
      />
      <MultiSelect
        style={[
          styles.dropdown,
          {marginHorizontal: vw(15), marginVertical: vh(15)},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={allServices}
        value={services}
        search
        maxHeight={300}
        selectedStyle={{
          backgroundColor: theme.color.white,
          marginHorizontal: vw(15),
          borderRadius: vw(5),
        }}
        labelField="displayName"
        valueField="_id"
        placeholder={`View Recommended Services (${services.length})`}
        searchPlaceholder="Search..."
        onChange={item => setServices(item)}
      />
    </Container>
  );
};

export default AdditionalSettingsProduct;

const styles = StyleSheet.create({
  productNameText: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    textAlign: 'center',
  },
  productType: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
  },
  bottomWidth: {
    borderBottomWidth: 1,
    borderColor: theme.color.bottomWidth,
    marginHorizontal: vw(21),
    marginTop: vh(15),
  },
  recommendedText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginTop: vh(30),
    marginHorizontal: vw(22),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: theme.color.primary,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
