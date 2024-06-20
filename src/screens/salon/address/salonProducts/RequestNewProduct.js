import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../../components/common/CustomButton';
import Container from '../../../../components/common/Container';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';

import {useCameraPermission} from '../../../../hooks/usePermissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';

import {requestSalonService} from '../../../../api/services/salonService';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {getCategoryWithServicesAPI} from '../../../../api/services/getCategories';
import {getSubCategoriesByIdAPI} from '../../../../api/services/subCategoryService';
import AppIcon from '../../../../components/common/AppIcon';
import {requestProductAPI} from '../../../../api/products/requestProductService';
import {getProductCategoryAPI} from '../../../../api/products/productCategoryService';
import {
  getProductSubCategoryAPI,
  getProductSubCategoryByCategoryIdAPI,
} from '../../../../api/products/productSubCategoryService';
import {getAllMasterBrandAPI} from '../../../../api/brands/brandMasterService';

const RequestNewProduct = ({navigation}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [customField, setcustomField] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  const [product, setProduct] = useState({
    productName: '',
    displayName: '',
    category: '',
    subCategory: '',
    customField: '',
    productDescription: '',
    unit: '',
    additionalInformation: '',
    brand: '',
  });

  // const launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //       alert(response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri
  //       });
  //     }
  //   });

  // }

  const handleImagePicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImageCropPicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: 'photo',
      })
        .then(res => {
          setFile(res);
        })
        .finally(close);
    } else {
      openSettings();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('salonId', salonDetails._id);
    formData.append('categoryId', product.category);
    formData.append('subCategoryId', product.subCategory);
    formData.append('brandId', product.brand);
    formData.append('unitOfMeasurement', product.unit);
    formData.append('displayName', product.productName);
    formData.append('shortDescription', product.productDescription);
    formData.append('longDescription', product.additionalInformation);
    if (file) {
      formData.append('file', {
        name: file?.filename,
        type: file?.mime,
        uri:
          Platform.OS === 'ios'
            ? file?.sourceURL.replace('file://', '')
            : file?.sourceURL,
      });
    } else {
    }

    const {data, message, status} = await requestProductAPI(formData);
    if (status) {
      setLoading(false);
      showMessage({message: message, type: 'Success'});
      navigation.goBack();
    } else {
      setLoading(false);
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleGetCategories = async () => {
    const {data, status, message} = await getProductCategoryAPI();
    if (status) {
      setAllCategory(data);
    } else {
      showMessage({message: message});
    }
  };

  const handleGetSubCategory = async () => {
    const {data, status, message} = await getProductSubCategoryByCategoryIdAPI(
      product.category,
    );
    if (status) {
      setAllSubCategory(data);
    } else {
      showMessage({message: message});
    }
  };

  const handleGetAllBrands = async () => {
    const {data, status, message} = await getAllMasterBrandAPI();
    if (status) {
      setAllBrands(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    handleGetCategories();
    handleGetAllBrands();
  }, []);
  useEffect(() => {
    handleGetSubCategory();
  }, [product.category]);
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Request New Product'}
        description={'Request for a new product to Salonesis'}
        leftIconColor={theme.color.dropdownColor}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={{flexDirection: 'row'}}>
          <ImageBackground
            style={styles.Profile}
            source={{uri: file?.sourceURL}}>
            <TouchableOpacity onPress={handleImagePicker} style={styles.camera}>
              <Image style={styles.cameraIcon} source={LocalImages.camera} />
            </TouchableOpacity>
          </ImageBackground>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={styles.AddImageTouch}>
            <Text style={styles.AddImageTxt}>+ Add Image</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={product.productName}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Product Name"
          placeholder="Product Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setProduct({
              ...product,
              productName: text,
            });
          }}
        />
        <Dropdown
          style={[styles.input, {paddingVertical: vh(12)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allCategory}
          search={false}
          labelField="name"
          valueField="_id"
          placeholder="Category"
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search"
          value={product.category}
          onChange={item => {
            // setcategory(item);

            setProduct({
              ...product,
              category: item._id,
            });
          }}
        />
        <Dropdown
          style={[styles.input, {paddingVertical: vh(12)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allSubCategory}
          search
          labelField="name"
          valueField="_id"
          placeholder="Sub Category"
          searchPlaceholder="Search"
          value={product.subCategory}
          onChange={item => {
            // setsubCategory(item);
            setProduct({
              ...product,
              subCategory: item._id,
            });
          }}
        />
        <Dropdown
          style={[styles.input, {paddingVertical: vh(12)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allBrands}
          search
          labelField="name"
          valueField="_id"
          placeholder="Brand"
          searchPlaceholder="Search"
          value={product.brand}
          onChange={item => {
            setProduct({
              ...product,
              brand: item._id,
            });
          }}
        />
        <TextInput
          value={product.unit}
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
            setProduct({
              ...product,
              unit: text,
            });
          }}
        />
        <TextInput
          value={product.productDescription}
          style={[styles.input, {height: vh(110)}]}
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
            setProduct({
              ...product,
              productDescription: text,
            });
          }}
        />
        <TextInput
          value={product.additionalInformation}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Additional Information"
          placeholder="Additional Information"
          multiline={true}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setProduct({
              ...product,
              additionalInformation: text,
            });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setcustomField(!customField);
          }}>
          <Text style={styles.productExtraDetail}>+ Add Custom Field</Text>
        </TouchableOpacity>
        {customField ? (
          <>
            <TextInput
              value={product.customField}
              style={styles.input}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Custom Field"
              placeholder="Custom Field"
              multiline={true}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setProduct({
                  ...product,
                  customField: text,
                });
              }}
            />
            {/* <TextInput
              value={customFieldType}
              style={styles.input}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Add Custom Field Type"
              placeholder="Add Custom Field Type"
              multiline={true}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setcustomFieldType(text);
              }}
            /> */}
          </>
        ) : null}
      </Container>
      <CustomButton
        label={'SUBMIT'}
        onPress={handleSubmit}
        extraStyle={{marginTop: vh(50), marginBottom: vh(30)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Profile: {
    width: vw(135),
    height: vw(135),
    borderRadius: vw(135),
    marginHorizontal: vw(15),
    marginTop: vh(49),
  },
  camera: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    top: '70%',
  },
  cameraIcon: {
    width: vw(34),
    height: vw(34),
    borderRadius: vw(34),
  },
  AddImageTouch: {
    marginVertical: vh(100),
    marginHorizontal: vw(10),
  },
  AddImageTxt: {
    fontSize: normalize(14),
    color: theme.color.LightBlue,
    fontFamily: theme.font.semiBold,
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
  productExtraDetail: {
    marginHorizontal: vw(16),
    color: theme.color.LightBlue,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginTop: vh(20),
  },
});

export default RequestNewProduct;
