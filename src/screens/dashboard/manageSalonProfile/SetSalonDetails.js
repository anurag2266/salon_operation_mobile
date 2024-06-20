import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import CountryPicker from 'react-native-country-picker-modal';
import {addSalonDetailsAPI} from '../../../api/services/salonBasicService';
import {showMessage} from 'react-native-flash-message';
import validator from 'validator';
import Container from '../../../components/common/Container';
import {useDispatch, useSelector} from 'react-redux';
import AppIcon from '../../../components/common/AppIcon';
import {Dropdown} from 'react-native-element-dropdown';
import ProgressBar from '../../../components/common/ProgressBar';
import {useFocusEffect} from '@react-navigation/native';
import {getUserDetailsAPI} from '../../../api/services/authService';
import {ValueChanged} from '../../../redux/actions/flightActions';

const SetSalonDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const [companyType, setCompanyType] = useState([]);
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [salonDetail, setSalonDetail] = useState({
    salonId: salonDetails?._id,
    name: '',
    companyName: '',
    phoneNumber: [
      {
        countryCode: '91',
        number: '',
      },
    ],
    landline: [
      {
        countryCode: '91',
        stdCode: '',
        number: '',
      },
    ],
    panNo: '',
    adharNo: '',
    gstNo: '',
    companyType: 'Limited',
  });

  const [isAdditionalContact, setIsAdditionalContact] = useState(false);
  const [isAdditionalSTD, setIsAdditionalSTD] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleSubmitSalonDetails = async () => {
    if (salonDetail.name.length < 2) {
      console.warn('type', companyType);
      showMessage({
        message: 'Salon Name is required',
        type: 'danger',
      });
    } else if (salonDetail.phoneNumber.number < 10) {
      showMessage({
        message: 'Please Enter a valid Salon Mobile Number',
        type: 'danger',
      });
    } else if (salonDetail.panNo.length < 5) {
      showMessage({
        message: 'Enter a valid Pan No.',
        type: 'danger',
      });
    } else {
      const {data, message, status} = await addSalonDetailsAPI({
        salonId: salonDetails?._id,
        name: salonDetail.name,
        companyName: salonDetail.companyName,
        phoneNumber: salonDetail.phoneNumber.map(i => {
          return {countryCode: i.countryCode, number: i.number};
        }),
        landline: salonDetail.landline.map(i => {
          return {
            countryCode: i.countryCode,
            number: i.number,
            stdCode: i.stdCode,
          };
        }),
        panNo: salonDetail.panNo,
        adharNo: salonDetail.adharNo,
        gstNo: salonDetail.gstNo,
        companyType: salonDetail.companyType,
      });
      if (status) {
        showMessage({message: message, type: 'Success'});
        // navigation.navigate('SalonSetupSteps');
      } else {
        showMessage({message: message, type: 'danger'});
      }
    }
  };

  const getUserDetails = async () => {
    const {data, status, message} = await getUserDetailsAPI();

    if (status) {
      setSalonDetail(data.salons[0]);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, []),
  );

  return (
    <Container
      title="Manage Salon Details"
      description="Tell us more about your salon"
      bottomButtonTitle="Save"
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      scroll
      onPressBottomButton={handleSubmitSalonDetails}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <TextInput
        value={salonDetail.name}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Salon Name*"
        placeholder="Salon Name*"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSalonDetail({...salonDetail, name: text});
        }}
      />
      <Dropdown
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[
          {name: 'pvt'},
          {name: 'limited'},
          {name: 'proprietorship'},
          {name: 'individual'},
          {name: 'partnership'},
          {name: 'llc'},
        ]}
        itemTextStyle={{color: theme.color.black}}
        maxHeight={300}
        labelField="name"
        labelStyle={{color: theme.color.black}}
        valueField="name"
        placeholder={"Salon's Company Type*"}
        value={{name: salonDetail.companyType}}
        onChange={item => {
          setSalonDetail({...salonDetail, companyType: item.name});
        }}
      />
      <TextInput
        value={salonDetail.companyName}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Salon’s Company Name*"
        placeholder="Salon’s Company Name*"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSalonDetail({...salonDetail, companyName: text});
        }}
      />
      <Text
        style={{
          fontSize: normalize(11),
          fontFamily: theme.font.bold,
          color: theme.color.darkGrey,
          marginHorizontal: vw(16),
          marginTop: vh(2),
        }}>
        For billing purposes only
      </Text>
      {salonDetail?.phoneNumber?.map((item, index) => (
        <TextInput
          value={item.number}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          label={`${
            index > 0
              ? 'Salon’s Additional Mobile Number ' + (index + 1)
              : 'Salon’s  Mobile Number*'
          } `}
          placeholder="Salon’s Mobile Number*"
          placeholderTextColor={theme.color.darkGrey}
          focusColor={theme.color.black}
          maxLength={10}
          keyboardType="number-pad"
          renderRightIcon={() =>
            index > 0 ? (
              <AppIcon
                onPress={() => {
                  const newState = salonDetail.phoneNumber.filter(
                    (i, indx) => index != indx,
                  );
                  setSalonDetail({...salonDetail, phoneNumber: newState});
                }}
                type="MaterialCommunityIcons"
                name="delete"
                color="red"
              />
            ) : null
          }
          renderLeftIcon={() => (
            <CountryPicker
              withFilter
              withFlag
              withFlagButton
              withCallingCodeButton
              withCallingCode
              withEmoji
              countryCode={'IN'}
              visible={visible}
              onSelect={e => {
                const newState = salonDetail?.phoneNumber?.map((i, indx) => {
                  if (index === indx) {
                    return {...i, countryCode: e.callingCode};
                  }

                  return i;
                });
                setSalonDetail({
                  ...salonDetail,
                  phoneNumber: newState,
                });
              }}
              onClose={() => setVisible(false)}
              containerButtonStyle={{
                paddingRight: 5,
                marginRight: 5,
                borderRightWidth: 1.5,
                borderColor: theme.color.borderGrey,
              }}
            />
          )}
          onChangeText={text => {
            const newState = salonDetail?.phoneNumber?.map((i, indx) => {
              if (index === indx) {
                return {...i, number: text};
              }

              return i;
            });
            setSalonDetail({
              ...salonDetail,
              phoneNumber: newState,
            });
          }}
        />
      ))}

      <TouchableOpacity
        onPress={() =>
          setSalonDetail({
            ...salonDetail,
            phoneNumber: [
              ...salonDetail.phoneNumber,
              {
                countryCode: '91',
                number: '',
              },
            ],
          })
        }>
        <Text style={styles.addBtnText}>Add additional phone number +</Text>
      </TouchableOpacity>

      {salonDetail?.landline?.map((item, index) => (
        <TextInput
          value={item.number}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          label={`${
            index > 0
              ? 'Salon’s Additional Landline Number  ' + (index + 1)
              : 'Salon’s Landline Number'
          } `}
          // placeholder="Salon’s Landline Number"
          placeholderTextColor={theme.color.darkGrey}
          focusColor={theme.color.black}
          maxLength={10}
          keyboardType="number-pad"
          onChangeText={text => {
            const newState = salonDetail?.landline?.map((i, indx) => {
              if (index === indx) {
                return {...i, number: text};
              }

              return i;
            });
            setSalonDetail({
              ...salonDetail,
              landline: newState,
            });
          }}
          renderRightIcon={() =>
            index > 0 ? (
              <AppIcon
                onPress={() => {
                  const newState = salonDetail.landline.filter((i, indx) => {
                    return index != indx;
                  });
                  setSalonDetail({...salonDetail, landline: newState});
                }}
                type="MaterialCommunityIcons"
                name="delete"
                color="red"
              />
            ) : null
          }
          renderLeftIcon={() => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CountryPicker
                withFilter
                withFlag
                withFlagButton
                withCallingCodeButton
                withCallingCode
                withEmoji
                countryCode={'IN'}
                onSelect={e => {
                  const newState = salonDetail?.landline?.map((i, indx) => {
                    if (index === indx) {
                      return {...i, countryCode: e.callingCode};
                    }

                    return i;
                  });
                  setSalonDetail({
                    ...salonDetail,
                    landline: newState,
                  });
                }}
                visible={visible}
                onClose={() => setVisible(false)}
                containerButtonStyle={{
                  paddingRight: 5,
                  marginRight: 5,
                  borderRightWidth: 1.5,
                  borderColor: theme.color.borderGrey,
                }}
              />
              <TextInput
                style={{
                  width: vw(72),
                  borderRightWidth: 1.5,
                  paddingRight: 5,
                  marginRight: 5,
                  borderColor: theme.color.borderGrey,
                  height: vh(52),
                }}
                value={item.stdCode}
                placeholderStyle={styles.placeholderStyle}
                inputStyle={styles.inputStyle}
                placeholder="STD"
                onChangeText={text => {
                  const newState = salonDetail?.landline?.map((i, indx) => {
                    if (index === indx) {
                      return {...i, stdCode: text};
                    }

                    return i;
                  });
                  setSalonDetail({
                    ...salonDetail,
                    landline: newState,
                  });
                }}
              />
            </View>
          )}
        />
      ))}

      <TouchableOpacity
        onPress={() =>
          setSalonDetail({
            ...salonDetail,
            landline: [
              ...salonDetail.landline,
              {
                countryCode: '91',
                stdCode: '',
                number: '',
              },
            ],
          })
        }>
        <Text style={styles.addBtnText}>Add additional Std number +</Text>
      </TouchableOpacity>

      {salonDetail.companyType === 'individual' ? (
        <TextInput
          value={salonDetail.adharNo}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="AADHAR No."
          maxLength={12}
          disabled={false}
          placeholder="AADHAR number"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setSalonDetail({...salonDetail, adharNo: text});
          }}
        />
      ) : null}
      <TextInput
        value={salonDetail.panNo}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="PAN No. *"
        maxLength={10}
        disabled={false}
        placeholder="PAN number *"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSalonDetail({...salonDetail, panNo: text});
        }}
      />

      <TextInput
        value={salonDetail.gstNo}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="GST No. (Optional)"
        placeholder="GST number"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSalonDetail({...salonDetail, gstNo: text});
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(20),
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
    fontFamily: theme.font.bold,
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
  addBtnText: {
    marginHorizontal: vw(16),
    marginTop: vh(7),
    color: theme.color.LightBlue,
    fontSize: normalize(11),
    fontFamily: theme.font.semiBold,
  },
});

export default SetSalonDetails;
