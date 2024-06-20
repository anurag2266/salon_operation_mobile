import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ScrollContainer from '../../../../components/common/ScrollContainer';
import CustomHeader from '../../../../components/common/CustomHeader';
import {useFocusEffect} from '@react-navigation/native';
import {vw, vh, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../../../theme/theme';
import CustomButton from '../../../../components/common/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import AppIcon from '../../../../components/common/AppIcon';
import ManageBrandPrice from '../../../salon/address/salonServices/ManageBrandPrice';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  getSalonMapAPI,
  updateSalonServiceGeneralSettingAPI,
} from '../../../../api/services/salonMap';
import {getCategoryWithServicesAPI} from '../../../../api/services/getCategories';
import {getSubCategoriesByIdAPI} from '../../../../api/services/subCategoryService';
import {useEffect} from 'react';
import {getAllMasterBrandAPI} from '../../../../api/brands/brandMasterService';
import {showMessage} from 'react-native-flash-message';
import Container from '../../../../components/common/Container';

const AccordingGender = ({navigation, route}) => {
  const {item} = route.params;
  const refRBSheet = useRef();
  const [allBrands, setAllBrands] = useState([]);

  const [brands, setBrands] = useState([]);

  const [brandPricing, setBrandPricing] = useState([]);

  const [serviceData, setServiceData] = useState({
    isHomeServiceAvailable: false,
    serviceDescription: '',
    displayName: '',
    categoryId: '',
    subCategoryId: '',
  });

  // const handleGetCategories = async () => {
  //   const {data, status, message} = await getCategoryWithServicesAPI();
  //   if (status) {
  //     setAllCategory(data);
  //   } else {
  //     showMessage({message: message});
  //   }
  // };

  // const handleGetSubCategory = async () => {
  //   const {data, status, message} = await getSubCategoriesByIdAPI(
  //     serviceData.subCategoryId,
  //   );
  //   if (status) {
  //     setAllSubCategory(data);
  //   } else {
  //     showMessage({message: message});
  //   }
  // };
  const handleGetBrands = async () => {
    const {data, status, message} = await getAllMasterBrandAPI();
    if (status) {
      setAllBrands(data);
    } else {
      showMessage({message: message});
    }
  };

  const handleAddBrandPricing = () => {
    const data = allBrands.filter(item => brands.includes(item._id));
    const finalData = data.map(item => {
      return {
        brandId: item._id,
        female: {price: '', duration: ''},
        male: {price: '', duration: ''},
      };
    });

    setBrandPricing(finalData);
  };

  const updateSalonService = async () => {
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append(
      'isHomeServiceAvailable',
      serviceData.isHomeServiceAvailable,
    );
    formData.append('displayName', serviceData.displayName);
    formData.append('serviceName', item.serviceName);
    formData.append('categoryId', item.categoryId._id);
    formData.append('subCategoryId', serviceData.subCategoryId);
    formData.append('serviceDescription', serviceData.serviceDescription);
    formData.append('brandWisePrice', JSON.stringify(brandPricing));

    const {status, message, data} = await updateSalonServiceGeneralSettingAPI(
      formData,
    );
    if (status) {
      showMessage({message: message, type: 'success'});
    } else {
      showMessage({
        message: message ? message : 'Something Went Wrong',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    setServiceData({
      isHomeServiceAvailable: item.isHomeServiceAvailable
        ? item.isHomeServiceAvailable
        : false,
      serviceDescription: item.serviceDescription,
      displayName: item.displayName,
      categoryId: item.categoryId._id,
      subCategoryId: item.subCategoryId._id,
    });
    setBrands(item.brandWisePrice.map(i => i.brandId));

    handleGetBrands();
    setBrandPricing(
      item.brandWisePrice.map(i => {
        return {
          brandId: i.brandId,
          female: i.female,
          male: i.male,
        };
      }),
    );
  }, []);

  useEffect(() => {
    handleAddBrandPricing();
  }, [brands]);

  return (
    <Container
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle="Save"
      onPressBottomButton={updateSalonService}
      title={item.serviceId.serviceName}>
      <View style={styles.row}>
        <Text style={styles.serviceHomeTxt}>Service available for home?</Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={() =>
            setServiceData({
              ...serviceData,
              isHomeServiceAvailable: !serviceData.isHomeServiceAvailable,
            })
          }
          value={serviceData.isHomeServiceAvailable}
        />
      </View>
      {serviceData.isHomeServiceAvailable ? (
        <Text style={styles.YesNo}>Yes</Text>
      ) : (
        <Text style={styles.YesNo}>No</Text>
      )}
      <TextInput
        value={serviceData.displayName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Service Display Name"
        placeholder="Service Display Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setServiceData({
            ...serviceData,
            displayName: text,
          });
        }}
      />
      <TextInput
        value={item.categoryId.name}
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
        value={item.subCategoryId.name}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Sub-Category"
        placeholder="Sub-Category"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        editable={false}
        showIcon={false}
      />
      <MultiSelect
        style={[styles.input, {paddingVertical: vh(12)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={{marginHorizontal: vw(15), borderRadius: vw(5)}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={allBrands}
        search
        labelField="name"
        valueField="_id"
        placeholder={`Brands (${brands.length})`}
        searchPlaceholder="Search"
        value={brands}
        onChange={item => {
          setBrands(item);
          handleAddBrandPricing();
        }}
      />

      <View
        style={[
          styles.input,
          {
            paddingVertical: vh(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={styles.textErrorStyle}>Manage Brand Pricing</Text>
        <AppIcon
          name={'chevron-right'}
          type={'Feather'}
          size={20}
          onPress={() => {
            refRBSheet.current.open();
          }}
          color={theme.color.dropdownColor}
        />
      </View>

      <TextInput
        value={serviceData.serviceDescription}
        style={[styles.input, {height: vh(120)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        multiline={true}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Service Description"
        placeholder="Service Description"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setServiceData({
            ...serviceData,
            serviceDescription: text,
          });
        }}
      />
      <RBSheet
        ref={refRBSheet}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: vh(704),
            borderTopLeftRadius: vw(10),
            borderTopRightRadius: vw(10),
          },
        }}>
        <ScrollView>
          {brandPricing.map((item, index) => (
            <ManageBrandPrice
              amountFemale={item.female.price}
              amountMale={item.male.price}
              durationFemale={item.female.duration}
              durationMale={item.male.duration}
              setAmountFemale={text => {
                const newState = brandPricing.map((i, ind) => {
                  if (ind == index) {
                    return {...i, female: {...i.female, price: text}};
                  } else {
                    return i;
                  }
                });
                setBrandPricing(newState);
              }}
              setAmountMale={text => {
                const newState = brandPricing.map((i, ind) => {
                  if (ind == index) {
                    return {...i, male: {...i.male, price: text}};
                  } else {
                    return i;
                  }
                });
                setBrandPricing(newState);
              }}
              setDurationFemale={text => {
                const newState = brandPricing.map((i, ind) => {
                  if (ind == index) {
                    return {...i, female: {...i.female, duration: text}};
                  } else {
                    return i;
                  }
                });
                setBrandPricing(newState);
              }}
              setDurationMale={text => {
                const newState = brandPricing.map((i, ind) => {
                  if (ind == index) {
                    return {...i, male: {...i.male, duration: text}};
                  } else {
                    return i;
                  }
                });
                setBrandPricing(newState);
              }}
              brand={item.name}
              onPressBackBtn={() => {
                refRBSheet.current.close();
              }}
              onPress={() => {
                refRBSheet.current.close();
              }}
              onPressAddBrand={() => {
                refRBSheet.current.close();
              }}
            />
          ))}
        </ScrollView>
      </RBSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
  },
  YesNo: {
    textAlign: 'right',
    marginHorizontal: vw(40),
    marginTop: vh(4),
    fontSize: normalize(11),
    color: theme.color.inputGrey,
    fontFamily: theme.font.regular,
  },
  serviceHomeTxt: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    marginVertical: vh(5),
    color: theme.color.black,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(21),
    marginTop: vh(24),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
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
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AccordingGender;
