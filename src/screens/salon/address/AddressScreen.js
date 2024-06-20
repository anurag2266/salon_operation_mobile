import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../components/common/Container';
import {useDispatch, useSelector} from 'react-redux';
import {addSalonAddressAPI} from '../../../api/services/salonBasicService';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../components/common/CustomButton';
import {showMessage} from 'react-native-flash-message';
import {ValueChanged} from '../../../redux/actions/flightActions';

const AddressScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [location, setLocation] = useState({});
  const params = route.params;
  const [completeAddress, setCompleteAddress] = useState({
    building: salonDetails?.address1,
    addressLine1: salonDetails?.address2,
    addressLine2: salonDetails?.address3,
    city: salonDetails?.city,
    pincode: salonDetails?.pinCode,
    state: salonDetails?.state,
    country: salonDetails?.country,
    landmark: salonDetails?.landmark,
  });

  const handleSubmitAddress = async () => {
    if (!completeAddress.building || completeAddress.building == '') {
      showMessage({
        message: 'Building/Shop/Floor No. is required',
        type: 'danger',
      });
    } else if (
      !completeAddress.addressLine1 ||
      completeAddress.addressLine1 == ''
    ) {
      showMessage({
        message: 'Address Line 1 is required',
        type: 'danger',
      });
    } else if (
      !completeAddress.addressLine2 ||
      completeAddress.addressLine2 == ''
    ) {
      showMessage({
        message: 'Address Line 2 is required',
        type: 'danger',
      });
    } else if (!completeAddress.city || completeAddress.city == '') {
      showMessage({
        message: 'City is required',
        type: 'danger',
      });
    } else if (!completeAddress.state || completeAddress.state == '') {
      showMessage({
        message: 'State is required',
        type: 'danger',
      });
    } else if (!completeAddress.country || completeAddress.country == '') {
      showMessage({
        message: 'Country is required',
        type: 'danger',
      });
    } else {
      const {status, message, data} = await addSalonAddressAPI({
        salonId: salonDetails?._id,
        country: completeAddress.country,
        state: completeAddress.state,
        city: completeAddress.city,
        address1: completeAddress?.building,
        address2: completeAddress?.addressLine1,
        address3: completeAddress.addressLine2,
        landmark: completeAddress.landmark,
        pinCode: completeAddress.pincode,
        lattitude: location?.latitude.toString(),
        longitude: location?.longitude.toString(),
      });

      if (status) {
        dispatch(ValueChanged('salonDetails', data));
        showMessage({message: message, type: 'success'});

        // navigation.navigate('ChooseBuisnessCategory');
      } else {
        showMessage({message: message, type: 'danger'});
      }
    }
  };

  useEffect(() => {
    if (params.completeAddress) {
      setCompleteAddress(params.completeAddress);
      setLocation(params.location);
    } else {
    }
  }, []);

  return (
    <Container title="Your Address" onPressLeftIcon={() => navigation.goBack()}>
      <TextInput
        value={completeAddress.building}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Building/Shop/Floor No.*"
        placeholder="Building/Shop/Floor No.*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, building: text})
        }
      />
      <TextInput
        value={completeAddress.addressLine1}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Address Line 1*"
        placeholder="Address Line 1*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, addressLine1: text})
        }
      />
      <TextInput
        value={completeAddress.addressLine2}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Address Line 2"
        placeholder="Address Line 2"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, addressLine2: text})
        }
      />
      <TextInput
        value={completeAddress.landmark}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Landmark (Optional)"
        placeholder="Landmark"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, landmark: text})
        }
      />
      <TextInput
        value={completeAddress.city}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="City*"
        placeholder="City*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        editable={false}
        showIcon={false}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, city: text})
        }
      />
      <TextInput
        value={completeAddress.pincode}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Pincode*"
        placeholder="Pincode*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        editable={false}
        showIcon={false}
        keyboardType="number-pad"
        onChangeText={text =>
          setCompleteAddress({...completeAddress, pincode: text})
        }
      />
      <TextInput
        value={completeAddress.state}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="State*"
        placeholder="State*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        editable={false}
        showIcon={false}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, state: text})
        }
      />
      <TextInput
        value={completeAddress.country}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Country*"
        placeholder="Country*"
        placeholderTextColor={theme.color.darkGrey}
        focusColor={theme.color.black}
        editable={false}
        showIcon={false}
        onChangeText={text =>
          setCompleteAddress({...completeAddress, country: text})
        }
      />

      <CustomButton
        extraStyle={{marginTop: vh(30), marginBottom: vh(40)}}
        label={'Save'}
        onPress={handleSubmitAddress}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Text
          style={{
            color: theme.color.red,
            fontFamily: theme.font.semiBold,
            textAlign: 'center',
            fontSize: normalize(16),
          }}>
          Change Location
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  inputView: {
    position: 'absolute',
    flexDirection: 'row',
    borderWidth: vw(1),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(13),
    zIndex: 9999,
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  searchInput: {
    paddingHorizontal: vw(14),
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  input: {
    height: 55,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.grey,
    marginHorizontal: vw(16),
    marginTop: vh(30),
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: theme.color.black,
  },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    color: theme.color.dropdownColor,
  },
});
