import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {useCameraPermission} from '../../../../hooks/usePermissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';

import React, {useEffect, useState} from 'react';
import {vw, vh, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';
import Container from '../../../../components/common/Container';
import CustomButton from '../../../../components/common/CustomButton';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import CustomClientButton from '../../../../components/common/CustomClientButton';

import {requestSalonService} from '../../../../api/services/salonService';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {getCategoryWithServicesAPI} from '../../../../api/services/getCategories';
import {getSubCategoriesByIdAPI} from '../../../../api/services/subCategoryService';
import AppIcon from '../../../../components/common/AppIcon';

const RequestNewService = ({navigation}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [btnShown, setbtnShown] = useState(false);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);

  const [customField, setcustomField] = useState('');
  const [service, setService] = useState({
    serviceName: '',
    displayName: '',
    category: '',
    subCategory: '',
    salonType: 'Unisex',
    serviceDescription: '',
    isHomeService: false,
    additionalInformation: '',
  });
  const [newFields, setNewFileds] = useState([]);
  const [malePrice, setMalePrice] = useState({cost: '', time: ''});
  const [femalePrice, setFemalePrice] = useState({cost: '', time: ''});

  const handleCameraPicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImagePicker.openCamera({
        width: 400,
        height: 200,
        // cropping: true,
        maxFiles: 4,
      });
    } else {
      openSettings();
    }
  };
  console.log(service);
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
    formData.append('isHomeServiceAvailable', service.isHomeService);
    formData.append('serviceName', service.serviceName);
    formData.append('serviceDisplayName', service.displayName);
    formData.append('serviceCategoryId', service.category);
    formData.append('subCategoryId', service.subCategory);
    formData.append('male', JSON.stringify(malePrice));
    formData.append('female', JSON.stringify(femalePrice));
    formData.append('newFields', JSON.stringify(newFields));

    formData.append('aboutService', service.serviceDescription);
    formData.append('images', {
      name: file?.filename,
      type: file?.mime,
      uri:
        Platform.OS === 'ios'
          ? file?.sourceURL.replace('file://', '')
          : file?.sourceURL,
    });
    // Object.keys(service).forEach(fieldName => {
    //   console.log(fieldName, service[fieldName]);
    //   formData.append(
    //     fieldName,
    //     typeof service[fieldName] == 'string'
    //       ? service[fieldName]
    //       : JSON.stringify(service[fieldName]),
    //   );
    // });

    const {data, message, status} = await requestSalonService(formData);
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
    const {data, status, message} = await getCategoryWithServicesAPI();
    if (status) {
      setAllCategory(data);
    } else {
      showMessage({message: message});
    }
  };

  const handleGetSubCategory = async () => {
    const {data, status, message} = await getSubCategoriesByIdAPI(
      service.category,
    );
    if (status) {
      setAllSubCategory(data);
    } else {
      showMessage({message: message});
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);
  useEffect(() => {
    handleGetSubCategory();
  }, [service.category]);

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        loading={loading}
        title={'Request New Service'}
        description={'Request for a new service to Salonesis'}
        leftIconName={'arrow-left'}
        leftIconColor={theme.color.dropdownColor}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={{flexDirection: 'row', marginHorizontal: vw(21)}}>
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
          value={service.serviceName}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Service Name"
          placeholder="Service Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            //setserviceName(text);
            setService({
              ...service,
              serviceName: text,
            });
          }}
        />
        <TextInput
          value={service.displayName}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Display Name"
          placeholder="Display Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            // setdisplayName(text);
            setService({
              ...service,
              displayName: text,
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
          value={service.category}
          onChange={item => {
            // setcategory(item);
            setService({
              ...service,
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
          value={service.subCategory}
          onChange={item => {
            // setsubCategory(item);
            setService({
              ...service,
              subCategory: item._id,
            });
          }}
        />
        <Text style={styles.serviceAvailable}>Service Available For</Text>
        <CustomClientButton
          selected={service.salonType}
          onSelect={item => setService({...service, salonType: item.name})}
        />
        {service.salonType == 'Male' || service.salonType == 'Unisex' ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              value={malePrice.cost}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Price Male"
              placeholder="Price Male"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setMalePrice({
                  ...malePrice,
                  cost: text,
                });
              }}
            />
            <TextInput
              value={malePrice.time}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Duration of Service"
              placeholder="Duration of Service"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setMalePrice({
                  ...malePrice,
                  time: text,
                });
              }}
            />
          </View>
        ) : null}
        {service.salonType == 'Female' || service.salonType == 'Unisex' ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              value={femalePrice.cost}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Price Female"
              placeholder="Price Female"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setFemalePrice({
                  ...femalePrice,
                  cost: text,
                });
              }}
            />
            <TextInput
              value={femalePrice.time}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Duration of Service"
              placeholder="Duration of Service"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setFemalePrice({
                  ...femalePrice,
                  time: text,
                });
              }}
            />
          </View>
        ) : null}
        <Text style={styles.aboutService}>About Service</Text>
        <TextInput
          value={service.serviceDescription}
          style={[styles.input, {height: vh(158)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Service Description"
          placeholder="Service Description"
          multiline={true}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            //setserviceDescription(text);
            setService({
              ...service,
              serviceDescription: text,
            });
          }}
        />
        <Text style={styles.homeService}>
          Is this service available for home?
        </Text>
        <View style={{flexDirection: 'row', marginTop: vh(22)}}>
          <TouchableOpacity
            onPress={() => {
              setService({...service, isHomeService: true});
            }}
            style={[
              styles.yesNoBtn,
              styles.boxWithShadow,
              {
                backgroundColor: service.isHomeService
                  ? theme.color.primary
                  : theme.color.white,
              },
            ]}>
            <Text
              style={[
                styles.yesNoTxt,
                {
                  color: service.isHomeService
                    ? theme.color.white
                    : theme.color.primary,
                },
              ]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setService({...service, isHomeService: false});
            }}
            style={[
              styles.yesNoBtn,
              styles.boxWithShadow,
              {
                backgroundColor: !service.isHomeService
                  ? theme.color.primary
                  : theme.color.white,
              },
            ]}>
            <Text
              style={[
                styles.yesNoTxt,
                {
                  color: !service.isHomeService
                    ? theme.color.white
                    : theme.color.primary,
                },
              ]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomWidth}></View>
        <TextInput
          value={service.additionalInformation}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          multiline={true}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Additional Information"
          placeholder="Additional Information"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setService({...service, additionalInformation: text});
          }}
        />
        {newFields.map((item, index) => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={item.value}
              style={{...styles.input, width: '80%'}}
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
                const newState = newFields.map((i, ind) => {
                  if (i.key == item.key) {
                    return {...i, value: text};
                  } else {
                    return i;
                  }
                });
              }}
            />
            <AppIcon
              onPress={() => {
                setNewFileds(newFields.filter((i, ind) => i.key != item.key));
              }}
              type="MaterialIcons"
              name="delete"
            />
          </View>
        ))}
        {newFields.length == 0 ? (
          <TouchableOpacity
            onPress={() => {
              setNewFileds([
                ...newFields,
                {key: `customFiled${newFields.length + 1}`, value: ''},
              ]);
            }}>
            <Text style={styles.customFieldTxt}>+ Add Custom Field</Text>
          </TouchableOpacity>
        ) : null}
      </Container>
      <CustomButton
        label={'SUBMIT'}
        onPress={handleSubmit}
        extraStyle={{marginTop: vh(70), marginBottom: vh(50)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    marginTop: vh(26),
    borderColor: theme.color.bottomWidth,
  },
  Profile: {
    width: vw(135),
    height: vw(135),
    borderRadius: vw(135),
    marginHorizontal: vw(15),
    backgroundColor: theme.color.TextGrey,
    overflow: 'hidden',
  },
  camera: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    top: '70%',
    zIndex: 100,
  },
  cameraIcon: {
    width: vw(34),
    height: vw(34),
    borderRadius: vw(34),
  },
  AddImageTouch: {
    marginHorizontal: vw(10),
    marginTop: vh(50),
  },
  AddImageTxt: {
    fontSize: normalize(14),
    color: theme.color.LightBlue,
    textAlign: 'center',
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
  aboutService: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    marginTop: vh(25),
    marginHorizontal: vw(15),
  },
  homeService: {
    color: theme.color.Black_shadow,
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
    marginHorizontal: vw(21),
    marginTop: vh(30),
  },
  yesNoBtn: {
    borderColor: theme.color.primary,
    borderWidth: 1,
    paddingHorizontal: vw(51),
    paddingVertical: vh(10),
    marginHorizontal: vw(21),
    borderRadius: vw(5),
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  yesNoTxt: {
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
  },
  customFieldTxt: {
    fontSize: normalize(16),
    marginTop: vh(22),
    fontFamily: theme.font.semiBold,
    color: theme.color.LightBlue,
    marginHorizontal: vw(16),
  },
  serviceAvailable: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    marginTop: vh(22),
    marginHorizontal: vw(15),
  },
});

export default RequestNewService;
