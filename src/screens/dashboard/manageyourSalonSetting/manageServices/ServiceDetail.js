import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import {MultiSelect} from 'react-native-element-dropdown';
import AppIcon from '../../../../components/common/AppIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import ManageServicePrice from './ManageServicePrice';
import {useEffect} from 'react';
import {getAllMasterBrandAPI} from '../../../../api/brands/brandMasterService';
import {
  isActiveServiceAPI,
  updateSalonServiceGeneralSettingAPI,
} from '../../../../api/services/salonMap';
import ManageBrandPrice from '../../../salon/address/salonServices/ManageBrandPrice';
import {showMessage} from 'react-native-flash-message';
import CustomButton from '../../../../components/common/CustomButton';

const ServiceDetail = ({navigation, route}) => {
  const {serviceDetail} = route.params;
  const [isEnabledService, setIsEnabledService] = useState(false);
  const [isEnabledBooking, setIsEnabledBooking] = useState(false);
  const [serviceCode, setserviceCode] = useState('');

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
    formData.append('id', serviceDetail._id);
    formData.append(
      'isHomeServiceAvailable',
      serviceData.isHomeServiceAvailable,
    );
    formData.append('displayName', serviceData.displayName);
    formData.append('serviceName', serviceDetail.serviceName);
    formData.append('categoryId', serviceDetail.categoryId._id);
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

  const handleIsActive = async () => {
    const {data, message, status} = await isActiveServiceAPI(serviceDetail._id);
    if (status) {
      setIsEnabledService(!isEnabledService);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    setServiceData({
      isHomeServiceAvailable: serviceDetail.isHomeServiceAvailable
        ? serviceDetail.isHomeServiceAvailable
        : false,
      serviceDescription: serviceDetail.serviceDescription,
      displayName: serviceDetail.displayName,
      categoryId: serviceDetail.categoryId._id,
      subCategoryId: serviceDetail.subCategoryId._id,
    });
    setBrands(serviceDetail.brandWisePrice.map(i => i.brandId));
    setIsEnabledService(serviceDetail.isActive);

    handleGetBrands();
    // setBrandPricing(
    //   serviceDetail.brandWisePrice.map(i => {
    //     return {
    //       brandId: i.brandId,
    //       female: i.female,
    //       male: i.male,
    //     };
    //   }),
    // );
  }, []);

  useEffect(() => {
    handleAddBrandPricing();
  }, [brands]);

  return (
    <Container
      title={'Service Detail'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={updateSalonService}>
      <View style={styles.switchMainView}>
        <Text style={styles.serviceText}>
          Is the salon offering the service?
        </Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={handleIsActive}
          value={isEnabledService}
        />
      </View>
      {isEnabledService ? (
        <Text style={styles.yes}>YES</Text>
      ) : (
        <Text style={styles.yes}>NO</Text>
      )}
      <View style={styles.switchMainView}>
        <Text style={styles.serviceText}>
          Available for home service booking?
        </Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={setIsEnabledBooking}
          value={isEnabledBooking}
        />
      </View>
      {isEnabledBooking ? (
        <Text style={styles.yes}>YES</Text>
      ) : (
        <Text style={styles.yes}>NO</Text>
      )}
      <TextInput
        value={serviceDetail.serviceId.serviceName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Service Name"
        placeholder="Service Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        editable={false}
        showIcon={false}
      />
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
          setServiceData({...serviceData, displayName: text});
        }}
      />
      <TextInput
        value={serviceCode}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Service Code"
        placeholder="Service Code"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setserviceCode(text);
        }}
      />
      <TextInput
        value={serviceDetail.categoryId.name}
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
        value={serviceDetail.subCategoryId.name}
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
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        selectedStyle={{
          marginHorizontal: vw(15),
          borderRadius: vw(5),
        }}
        itemTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={allBrands}
        search
        labelField="name"
        valueField="_id"
        placeholder="Brands"
        searchPlaceholder="Search"
        value={brands}
        onChange={item => {
          setBrands(item);
        }}
      />
      <TextInput
        multiline
        value={serviceData.serviceDescription}
        style={[styles.input, {minHeight: vh(100)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Service Discription"
        placeholder="Service Discription"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setServiceData({...serviceData, serviceDescription: text});
        }}
      />
      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.open();
        }}
        style={styles.ManagePriceTouch}>
        <Text style={styles.ManagePriceTxt}>Manage Price & Duration</Text>
        <AppIcon
          type={'AntDesign'}
          name={'right'}
          color={theme.color.Black_shadow}
          size={15}
        />
      </TouchableOpacity>
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
              onPressAddBrand={() => {
                refRBSheet.current.close();
              }}
            />
          ))}
          <CustomButton
            label={'Save'}
            extraStyle={{marginTop: vh(40), marginBottom: vh(20)}}
            onPress={() => {
              refRBSheet.current.close();
            }}
          />
        </ScrollView>
      </RBSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  switchMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: vw(21),
    marginTop: vh(22),
  },
  serviceText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    color: theme.color.black,
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
  ManagePriceTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vh(28),
    paddingHorizontal: vw(21),
    backgroundColor: theme.color.backgroundColor,
    marginVertical: vh(31),
  },
  ManagePriceTxt: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    fontSize: normalize(16),
  },
  yes: {
    textAlign: 'right',
    marginHorizontal: vw(32),
    fontSize: normalize(11),
    color: theme.color.inputGrey,
    fontFamily: theme.font.semiBold,
  },
});

export default ServiceDetail;
