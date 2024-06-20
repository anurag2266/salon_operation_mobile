import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';
import CountryPicker from 'react-native-country-picker-modal';
import {Dropdown} from 'react-native-element-dropdown';
import {Country, State, City} from 'country-state-city';
import Container from '../../../../components/common/Container';
import {useCameraPermission} from '../../../../hooks/usePermissions';
import {openSettings} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import AppIcon from '../../../../components/common/AppIcon';
import {addStylistAPI} from '../../../../api/services/stylistService';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import ProgressBar from '../../../../components/common/ProgressBar';
import {
  getAddressByPincode,
  getAllCities,
  getAllCountries,
  getAllSates,
} from '../../../../api/services/locationService';

const StartAddingStylist = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [permanentAddCheckBox, setpermanentAddCheckBox] = useState(false);
  const [currentAddCheckBox, setcurrentAddCheckBox] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const {salonDetails} = useSelector(state => state.flightReducer);
  const [stylistDetail, setStylistDetail] = useState({
    salonId: salonDetails._id,
    isHomeServiceGiven: false,
    firstName: '',
    lastName: '',
    nicName: '',
    phoneNumber: [
      {
        countryCode: '91',
        primaryPhone: '',
      },
    ],
    primaryEmail: '',
    gender: 'Female',
    currentAddress: {
      address1: '',
      address2: '',
      address3: '',
      city: '',
      country: 'India',
      landmark: '',
      pinCode: '',
      state: '',
    },

    correspondenceAddress: {
      address1: '',
      address2: '',
      address3: '',
      city: '',
      country: '',
      landmark: '',
      pinCode: '',
      state: '',
    },
    nationality: '',
    type: '',
  });

  useEffect(() => {
    setPermanentAddress({
      address1: stylistDetail.currentAddress?.address1,
      address2: stylistDetail.currentAddress?.address2,
      address3: stylistDetail.currentAddress?.address3,
      city: stylistDetail.currentAddress?.city,
      country: stylistDetail.currentAddress?.country,
      landmark: stylistDetail.currentAddress?.landmark,
      pinCode: stylistDetail.currentAddress?.pinCode,
      state: stylistDetail.currentAddress?.state,
    });

    // if (toggleCheckBox) {
    //   setStylistDetail({
    //     ...salonDetails,
    //     permanentAddress: {
    //       address1: stylistDetail.currentAddress?.address1,
    //       address2: stylistDetail.currentAddress?.address2,
    //       address3: stylistDetail.currentAddress?.address3,
    //       city: stylistDetail.currentAddress?.city,
    //       country: stylistDetail.currentAddress?.country,
    //       landmark: stylistDetail.currentAddress?.landmark,
    //       pinCode: stylistDetail.currentAddress?.pinCode,
    //       state: stylistDetail.currentAddress?.state,
    //     },
    //   });
    // } else {
    //   setStylistDetail({
    //     ...salonDetails,
    //     permanentAddress: {
    //       address1: '',
    //       address2: '',
    //       address3: '',
    //       city: '',
    //       country: '',
    //       landmark: '',
    //       pinCode: '',
    //       state: '',
    //     },
    //   });
    // }
  }, [toggleCheckBox]);

  const [file, setFile] = useState(null);
  const [phoneNo, setPhoneNo] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [permanentAddress, setPermanentAddress] = useState({
    address1: '',
    address2: '',
    address3: '',
    city: '',
    country: '',
    landmark: '',
    pinCode: '',
    state: '',
  });

  const [visible, setVisible] = useState(false);
  const [btnShown, setbtnShown] = useState(true);
  const [additionalPhoneNo, setadditionalPhoneNo] = useState('');

  const [country, setCountry] = useState();
  const [state, setState] = useState();

  const onButtonClick = () => {
    setbtnShown(!btnShown);
  };

  const [allCountry, setAllCountry] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);

  const handleGetCountry = async () => {
    const {data, message, status} = await getAllCountries();

    if (status) {
      setAllCountry(data);
    } else {
    }
  };
  const handleGetState = async () => {
    const {data, message, status} = await getAllSates(country);

    if (status) {
      setAllStates(data);
    } else {
    }
  };
  const handleGetCities = async () => {
    const {data, message, status} = await getAllCities(state);

    if (status) {
      setAllCities(data);
    } else {
    }
  };
  // const handleGetAddressByPincode = async () => {
  //   const {data, message, status} = await getAddressByPincode(pinCode);

  //   if (status) {
  //     console.log(data);
  //     setStylistDetail({
  //       ...stylistDetail,
  //       currentAddress: {
  //         ...stylistDetail.currentAddress,
  //         city: data[0].city,
  //         state: data[0].state,
  //         country: data[0].country,
  //       },
  //     });
  //   } else {
  //     console.log(data);
  //   }
  // };

  useEffect(() => {
    handleGetCountry();
  }, []);

  useEffect(() => {
    handleGetState();
  }, [country]);
  useEffect(() => {
    handleGetCities();
  }, [state]);
  // useEffect(() => {
  //   handleGetAddressByPincode();
  // }, []);

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
    Object.keys(stylistDetail).forEach(fieldName => {
      console.log(fieldName, stylistDetail[fieldName]);
      formData.append(
        fieldName,
        typeof stylistDetail[fieldName] == 'string'
          ? stylistDetail[fieldName]
          : JSON.stringify(stylistDetail[fieldName]),
      );
    });
    formData.append('permanentAddress', JSON.stringify(permanentAddress));

    if (file) {
      formData.append('file', {
        name: file?.filename,
        type: file.mime,
        uri:
          Platform.OS === 'ios'
            ? file?.sourceURL.replace('file://', '')
            : file?.sourceURL,
      });
    } else {
    }

    const {data, message, status} = await addStylistAPI(formData);
    if (status) {
      setLoading(false);
      showMessage({message: message, type: 'Success'});
      navigation.navigate('StylistJobProfile', {stylistId: data._id});
    } else {
      setLoading(false);
      showMessage({message: message, type: 'danger'});
    }
  };
  const GenderData = [
    {
      id: 1,
      label: 'Female',
    },
    {
      id: 2,
      label: 'Male',
    },
    {
      id: 3,
      label: 'Other',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setStylistDetail({...stylistDetail, gender: item.label});
        }}>
        {item.label == stylistDetail.gender ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      loading={loading}
      title=" Add Employee"
      description="Add at least one employee to continue on Salonesis and later you can edit, delete, and add more"
      leftIconColor={theme.color.dropdownColor}
      bottomButtonTitle="Next"
      onPressBottomButton={() => {
        handleSubmit();
      }}
      onPressLeftIcon={() => navigation.goBack()}
      progressBar={<ProgressBar progress={50} />}>
      <View style={styles.row}>
        <Text style={styles.serviceHomeTxt}>
          Available for home service booking?
        </Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={() =>
            setStylistDetail({
              ...stylistDetail,
              isHomeServiceGiven: !stylistDetail.isHomeServiceGiven,
            })
          }
          value={stylistDetail.isHomeServiceGiven}
        />
      </View>
      {stylistDetail.isHomeServiceGiven ? (
        <Text style={styles.YesNo}>Yes</Text>
      ) : (
        <Text style={styles.YesNo}>No</Text>
      )}
      {file ? (
        <TouchableOpacity onPress={handleImagePicker} style={styles.Profile}>
          <ImageBackground
            style={{...styles.Profile, overflow: 'hidden'}}
            source={{
              uri: Platform.OS == 'ios' ? file.sourceURL : file.path,
            }}></ImageBackground>
          <Image style={styles.cameraIcon} source={LocalImages.camera} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleImagePicker} style={styles.Profile}>
          <AppIcon
            color={theme.color.darkGrey}
            size={60}
            type="Ionicons"
            name="person-circle-outline"
          />
          <Image style={styles.cameraIcon} source={LocalImages.camera} />
        </TouchableOpacity>
      )}

      <Text style={styles.genderText}>Select Gender</Text>
      <FlatList
        data={GenderData}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <View style={styles.bottomWidth}></View>
      <TextInput
        value={stylistDetail.firstName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="First Name"
        placeholder="First Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            firstName: text,
          });
        }}
      />
      <TextInput
        value={stylistDetail.lastName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Last Name"
        placeholder="Last Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            lastName: text,
          });
        }}
      />
      <TextInput
        value={stylistDetail.nicName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Nick Name"
        placeholder="Nick Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            nicName: text,
          });
        }}
      />
      <TextInput
        value={phoneNo}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Mobile Number"
        placeholder="Your Mobile Number"
        placeholderTextColor={theme.color.darkGrey}
        autoFocus
        maxLength={10}
        keyboardType="number-pad"
        renderLeftIcon={() => (
          <CountryPicker
            withFilter
            withFlag
            withFlagButton
            withCallingCodeButton
            withCallingCode
            withEmoji
            withModal
            countryCode={countryCode}
            visible={visible}
            onClose={() => setVisible(false)}
            containerButtonStyle={{paddingRight: 5, borderRightWidth: 1.5}}
            onSelect={e => {
              setCountryCode(e.cca2);
              setDailCode(e.callingCode);
            }}
          />
        )}
        onChangeText={text => {
          setPhoneNo(text);
        }}
      />
      <Text onPress={onButtonClick} style={styles.additionalText}>
        + Add additional contact number
      </Text>
      {btnShown == false ? (
        <TextInput
          value={additionalPhoneNo}
          style={styles.input}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          labelStyle={styles.labelStyle}
          label="Additional Contact Number"
          placeholder="Additional Contact Number"
          placeholderTextColor={theme.color.TextGrey}
          maxLength={10}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setadditionalPhoneNo(text);
          }}
        />
      ) : null}
      <TextInput
        value={stylistDetail.primaryEmail}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Email ID"
        placeholder="Email ID"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            primaryEmail: text,
          });
        }}
      />
      <Dropdown
        style={[styles.input, {paddingVertical: vh(12), marginBottom: vh(30)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[{name: 'stylist'}, {name: 'staff'}]}
        labelField="name"
        valueField="name"
        itemTextStyle={{color: theme.color.black}}
        placeholder="Employee Department"
        value={stylistDetail.type}
        onChange={item => {
          setStylistDetail({...stylistDetail, type: item.name});
        }}
      />
      <Text style={styles.currentAddTxt}>Current Address</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={stylistDetail.currentAddress?.pinCode}
          style={[styles.input, {width: vw(185)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          labelStyle={styles.labelStyle}
          label="Pincode"
          placeholder="Pincode"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          // onEndEditing={handleGetAddressByPincode}
          maxLength={6}
          onChangeText={text => {
            setStylistDetail({
              ...stylistDetail,
              currentAddress: {...stylistDetail.currentAddress, pinCode: text},
            });
          }}
        />
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allCountry}
          search
          maxHeight={300}
          labelField="name"
          itemTextStyle={{color: theme.color.black}}
          valueField="name"
          placeholder={'Country'}
          searchPlaceholder="Search..."
          value={stylistDetail.currentAddress?.country}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.name);
            setStylistDetail({
              ...stylistDetail,
              currentAddress: {
                ...stylistDetail.currentAddress,
                country: item.name,
              },
            });
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allStates}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'State'}
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search..."
          value={stylistDetail.currentAddress?.state}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setState(item.name);
            setStylistDetail({
              ...stylistDetail,
              currentAddress: {
                ...stylistDetail.currentAddress,
                state: item.name,
              },
            });
          }}
        />
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allCities}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'City'}
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search..."
          value={stylistDetail.currentAddress?.city}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setStylistDetail({
              ...stylistDetail,
              currentAddress: {
                ...stylistDetail.currentAddress,
                city: item.name,
              },
            });
          }}
        />
      </View>
      <TextInput
        value={stylistDetail.currentAddress?.address1}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="House no./Flat no./Building no."
        placeholder="House no./Flat no./Building no."
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            currentAddress: {...stylistDetail.currentAddress, address1: text},
          });
        }}
      />
      <TextInput
        value={stylistDetail.currentAddress?.address2}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Address Line 1"
        placeholder="Address Line 1"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            currentAddress: {...stylistDetail.currentAddress, address2: text},
          });
        }}
      />
      <TextInput
        value={stylistDetail.currentAddress?.address3}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Address Line 2"
        placeholder="Address Line 2"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            currentAddress: {...stylistDetail.currentAddress, address3: text},
          });
        }}
      />
      <TextInput
        value={stylistDetail.currentAddress?.landmark}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Landmark"
        placeholder="Landmark"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setStylistDetail({
            ...stylistDetail,
            currentAddress: {...stylistDetail.currentAddress, landmark: text},
          });
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: vw(15),
          marginTop: vh(40),
        }}>
        <Text
          style={{
            fontSize: normalize(16),
            fontFamily: theme.font.regular,
            color: theme.color.black,
          }}>
          Permanent Address
        </Text>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          tintColors={{
            true: theme.color.primary,
            false: theme.color.dropdownColor,
          }}
          onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
          style={{
            marginLeft: vw(30),
            marginRight: vw(5),
            marginTop: vh(5),
            transform: [{scaleX: 0.8}, {scaleY: 0.8}],
          }}
        />
        <Text
          style={{
            fontSize: normalize(12),
            fontFamily: theme.font.regular,
            color: theme.color.black,
          }}>
          Same as Current Address
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={permanentAddress?.pinCode}
          style={[styles.input, {width: vw(185)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          labelStyle={styles.labelStyle}
          label="Pincode"
          placeholder="Pincode"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          maxLength={6}
          onChangeText={text => {
            setPermanentAddress({
              ...permanentAddress,
              pinCode: text,
            });
          }}
        />
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allCountry}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Country'}
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search..."
          value={permanentAddress?.country}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setCountry(item.name);
            setPermanentAddress({
              ...permanentAddress,
              country: item.name,
            });
          }}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allStates}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'State'}
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search..."
          value={permanentAddress?.state}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setState(item.name);
            setPermanentAddress({
              ...permanentAddress,
              state: item.name,
            });
          }}
        />
        <Dropdown
          style={[styles.input, {width: vw(185), height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={allCities}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'City'}
          itemTextStyle={{color: theme.color.black}}
          searchPlaceholder="Search..."
          value={permanentAddress?.city}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setPermanentAddress({
              ...permanentAddress,
              pinCode: item.name,
            });
          }}
        />
      </View>
      <TextInput
        value={permanentAddress?.address1}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="House no./Flat no./Building no."
        placeholder="House no./Flat no./Building no."
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setPermanentAddress({
            ...permanentAddress,
            address1: text,
          });
        }}
      />
      <TextInput
        value={permanentAddress?.address2}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Address Line 1"
        placeholder="Address Line 1"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setPermanentAddress({
            ...permanentAddress,
            address2: text,
          });
        }}
      />
      <TextInput
        value={permanentAddress?.address3}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Address Line 2"
        placeholder="Address Line 2"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setPermanentAddress({
            ...permanentAddress,
            address3: text,
          });
        }}
      />
      <TextInput
        value={permanentAddress?.landmark}
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        labelStyle={styles.labelStyle}
        label="Landmark"
        placeholder="Landmark"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setPermanentAddress({
            ...permanentAddress,
            landmark: text,
          });
        }}
      />
      <Text
        style={{
          marginHorizontal: vw(15),
          marginTop: vh(30),
          fontFamily: theme.font.medium,
          color: theme.color.black,
          fontSize: normalize(16),
        }}>
        Correspondence Address
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(10),
          marginTop: vh(21),
          alignItems: 'center',
        }}>
        <CheckBox
          disabled={false}
          value={permanentAddCheckBox}
          tintColors={{
            true: theme.color.primary,
            false: theme.color.dropdownColor,
          }}
          onValueChange={newValue => setpermanentAddCheckBox(newValue)}
          style={{
            marginTop: vh(5),
            transform: [{scaleX: 0.8}, {scaleY: 0.8}],
          }}
        />
        <Text
          style={{
            fontSize: normalize(12),
            fontFamily: theme.font.medium,
            color: theme.color.black,
          }}>
          Same as Permanent Address
        </Text>
        <CheckBox
          disabled={false}
          tintColors={{
            true: theme.color.primary,
            false: theme.color.dropdownColor,
          }}
          value={currentAddCheckBox}
          onValueChange={newValue => setcurrentAddCheckBox(newValue)}
          style={{
            marginTop: vh(5),
            transform: [{scaleX: 0.8}, {scaleY: 0.8}],
            marginLeft: vw(5),
          }}
        />
        <Text
          style={{
            fontSize: normalize(12),
            fontFamily: theme.font.medium,
            color: theme.color.black,
          }}>
          Same as Current Address
        </Text>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          setadditionalAddress(!additionalAddress);
        }}>
        <Text
          style={{
            marginTop: vh(20),
            marginHorizontal: vw(15),
            color: theme.color.LightBlue,
            fontFamily: theme.font.semiBold,
            fontSize: normalize(12),
          }}>
          + Add additional address
        </Text>
      </TouchableOpacity> */}
      {/* {additionalAddress ? (
        <>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={stylistDetail.currentAddress.pinCode}
              style={[styles.input, {width: vw(185)}]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelStyle={styles.labelStyle}
              label="Pincode"
              placeholder="Pincode"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              maxLength={6}
              onChangeText={text => {
                setStylistDetail({
                  ...stylistDetail,
                  currentAddress: {
                    ...stylistDetail.currentAddress,
                    pinCode: text,
                  },
                });
              }}
            />
            <Dropdown
              style={[styles.input, {width: vw(185), height: vh(55)}]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={{color: theme.color.black}}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allCountry}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Country'}
              searchPlaceholder="Search..."
              itemTextStyle={{color: theme.color.black}}
              value={stylistDetail.currentAddress.country}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                setCountry(item);
                setStylistDetail({
                  ...stylistDetail,
                  currentAddress: {
                    ...stylistDetail.currentAddress,
                    country: item.name,
                  },
                });
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Dropdown
              style={[styles.input, {width: vw(185), height: vh(55)}]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={{color: theme.color.black}}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allStates}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              itemTextStyle={{color: theme.color.black}}
              placeholder={'State'}
              searchPlaceholder="Search..."
              value={stylistDetail.currentAddress.state}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
                setState(item);
                setStylistDetail({
                  ...stylistDetail,
                  currentAddress: {
                    ...stylistDetail.currentAddress,
                    state: item.name,
                  },
                });
              }}
            />
            <Dropdown
              style={[styles.input, {width: vw(185), height: vh(55)}]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={{color: theme.color.black}}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allCities}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'City'}
              itemTextStyle={{color: theme.color.black}}
              searchPlaceholder="Search..."
              value={stylistDetail.currentAddress.city}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={item => {
               
                setStylistDetail({
                  ...stylistDetail,
                  currentAddress: {
                    ...stylistDetail.currentAddress,
                    city: item.name,
                  },
                });
              }}
            />
          </View>
          <TextInput
            value={stylistDetail.correspondenceAddress.address1}
            style={styles.input}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelStyle={styles.labelStyle}
            label="House no./Flat no./Building no."
            placeholder="House no./Flat no./Building no."
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setStylistDetail({
                ...stylistDetail,
                correspondenceAddress: {
                  ...stylistDetail.correspondenceAddress,
                  address1: text,
                },
              });
            }}
          />
          <TextInput
            value={stylistDetail.correspondenceAddress.address2}
            style={styles.input}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelStyle={styles.labelStyle}
            label="Address Line 1"
            placeholder="Address Line 1"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setStylistDetail({
                ...stylistDetail,
                correspondenceAddress: {
                  ...stylistDetail.correspondenceAddress,
                  address2: text,
                },
              });
            }}
          />
          <TextInput
            value={stylistDetail.correspondenceAddress.address3}
            style={styles.input}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelStyle={styles.labelStyle}
            label="Address Line 2"
            placeholder="Address Line 2"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setStylistDetail({
                ...stylistDetail,
                correspondenceAddress: {
                  ...stylistDetail.correspondenceAddress,
                  address3: text,
                },
              });
            }}
          />
          <TextInput
            value={stylistDetail.correspondenceAddress.landmark}
            style={styles.input}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelStyle={styles.labelStyle}
            label="Landmark"
            placeholder="Landmark"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setStylistDetail({
                ...stylistDetail,
                correspondenceAddress: {
                  ...stylistDetail.correspondenceAddress,
                  landmark: text,
                },
              });
            }}
          />
        </>
      ) : null} */}
      <Dropdown
        style={[styles.input, {paddingVertical: vh(12), marginBottom: vh(30)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[{name: 'Indian'}]}
        labelField="name"
        valueField="name"
        placeholder="Nationality"
        itemTextStyle={{color: theme.color.black}}
        value={stylistDetail.nationality}
        onChange={item => {
          setStylistDetail({
            ...stylistDetail,
            nationality: item,
          });
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginVertical: vh(22),
  },
  YesNo: {
    textAlign: 'right',
    marginHorizontal: vw(40),
    marginTop: vh(-10),
    fontSize: normalize(11),
    color: theme.color.inputGrey,
    fontFamily: theme.font.regular,
  },
  serviceHomeTxt: {
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    marginVertical: vh(5),
    color: theme.color.black,
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  Profile: {
    alignSelf: 'center',
    width: vw(128),
    height: vh(128),
    zIndex: 0,
    borderRadius: vw(64),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    backgroundColor: theme.color.grey,
  },
  camera: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
    bottom: 0,
    right: 10,
  },
  genderText: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
    marginHorizontal: vw(27),
    marginVertical: vh(18),
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
  },
  labelText: {
    marginHorizontal: vw(10),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(23),
    paddingVertical: vh(12),
    borderColor: theme.color.bottomWidth,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: normalize(14),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.medium,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  additionalText: {
    color: theme.color.LightBlue,
    marginHorizontal: vw(15),
    marginTop: vh(6),
  },
  currentAddTxt: {
    color: theme.color.black,
    marginTop: vh(34),
    marginHorizontal: vw(15),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
});

export default StartAddingStylist;
