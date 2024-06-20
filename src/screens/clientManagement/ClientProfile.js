import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import theme from '../../theme/theme';
import {normalize, vw, vh} from '../../utils/dimensions';
import LocalImages from '../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';
import {Dropdown} from 'react-native-element-dropdown';
import {Country, State, City} from 'country-state-city';
import CustomButton from '../../components/common/CustomButton';
import {getAllCountries} from '../../api/services/locationService';
import {useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';

const ClientProfile = ({navigation}) => {
  const [onSelect, setonSelect] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [emailId, setemailId] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [DOB, setDOB] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [fullName, setfullName] = useState('');
  const [additionalContactNo, setadditionalContactNo] = useState('');
  const [additionalDetail, setadditionalDetail] = useState(false);
  const [additionalAddress, setadditionalAddress] = useState(false);
  const [houseNo, sethouseNo] = useState('');
  const [addressLine1, setaddressLine1] = useState('');
  const [addressLine2, setaddressLine2] = useState('');
  const [landmark, setlandmark] = useState('');
  const [pinCode, setpinCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const allCountries = Country.getAllCountries('');
  const allState = State.getStatesOfCountry(country?.isoCode);
  const allCities = City.getCitiesOfState(country?.isoCode, state?.isoCode);
  const [tags, setTags] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [primaryEmployee, setprimaryEmployee] = useState('');
  const [panNo, setpanNo] = useState('');
  const [reason, setReason] = useState('');
  const [GST, setGST] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const DATA = [
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
          setonSelect(item.label);
        }}>
        {item.label == onSelect ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Container header={false}>
      <Text style={styles.selectgender}>Select Gender</Text>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: vh(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TextInput
        value={firstName}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="First Name"
        placeholder="First Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setfirstName(text);
        }}
      />
      <TextInput
        value={lastName}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Last Name"
        placeholder="Last Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setlastName(text);
        }}
      />
      <TextInput
        value={emailId}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Email ID"
        placeholder="Email ID"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setemailId(text);
        }}
      />
      <Dropdown
        style={[styles.input, {paddingVertical: vh(12)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.textErrorStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[
          {label: 'Mobile No.', value: '1'},
          {label: 'What’s app No.', value: '2'},
          {label: 'Other', value: '3'},
        ]}
        labelField="label"
        valueField="value"
        placeholder="Contact No."
        value={contactNo}
        onChange={item => {
          setcontactNo(item.value);
        }}
      />
      <TextInput
        value={mobileNo}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Mobile No."
        placeholder="Mobile No."
        maxLength={10}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setmobileNo(text);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setadditionalDetail(!additionalDetail);
        }}>
        <Text style={styles.additionalNo}>
          + Add additional contact details
        </Text>
      </TouchableOpacity>
      {additionalDetail ? (
        <>
          <TextInput
            value={additionalContactNo}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Additional Contact No."
            placeholder="Additional Contact No."
            maxLength={10}
            keyboardType={'numeric'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setadditionalContactNo(text);
            }}
          />
        </>
      ) : null}
      <TextInput
        value={DOB}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Date of Birth"
        placeholder="Date of Birth"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setDOB(text);
        }}
        renderRightIcon={() => (
          <AppIcon
            name={'calendar-alt'}
            type={'FontAwesome5'}
            size={15}
            color={theme.color.bottomWidth}
          />
        )}
      />
      <TextInput
        value={anniversary}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Anniversary"
        placeholder="Anniversary"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setAnniversary(text);
        }}
        renderRightIcon={() => (
          <AppIcon
            name={'calendar-alt'}
            type={'FontAwesome5'}
            size={15}
            color={theme.color.bottomWidth}
          />
        )}
      />
      <Text style={styles.addinfo}>Address Information</Text>
      <View
        style={{
          marginHorizontal: vw(17),
          marginTop: vh(10),
          borderRadius: vw(10),
          paddingHorizontal: vw(20),
          paddingVertical: vh(20),
          backgroundColor: '#F2F2F2',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={[styles.addressText, {fontSize: normalize(18)}]}>
            Default :{' '}
          </Text>
          <AppIcon
            name={'edit'}
            type={'Feather'}
            size={20}
            style={{marginLeft: vw(180)}}
            onPress={() => {
              setadditionalAddress(!additionalAddress);
            }}
            color={theme.color.LightBlue}
          />
          <AppIcon
            name={'delete'}
            type={'AntDesign'}
            size={20}
            style={{marginLeft: vw(20)}}
            color={theme.color.red}
          />
        </View>
        <Text style={styles.addressText}>Vinit</Text>
        <Text style={styles.addressText}>45 F Block</Text>
        <Text style={styles.addressText}>Sushant lok phase 3</Text>
        <Text style={styles.addressText}>Gurugram, 122002</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: vh(10),
          }}>
          <AppIcon
            name={'location'}
            type={'Ionicons'}
            size={20}
            color={theme.color.LightBlue}
          />
          <Text
            style={{
              fontFamily: theme.font.semiBold,
              fontSize: normalize(14),
              color: theme.color.LightBlue,
              marginLeft: vw(5),
            }}>
            Update Location
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setadditionalAddress(!additionalAddress);
        }}>
        <Text style={styles.additionalNo}>
          + Add additional Address Information
        </Text>
      </TouchableOpacity>
      {additionalAddress ? (
        <>
          <TextInput
            value={fullName}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Full Name"
            placeholder="Full Name"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setfullName(text);
            }}
          />
          <TextInput
            value={houseNo}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="House no.,Flat no.,Building no."
            placeholder="House no.,Flat no.,Building no."
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              sethouseNo(text);
            }}
          />
          <TextInput
            value={addressLine1}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Address Line 1"
            placeholder="Address Line 1"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setaddressLine1(text);
            }}
          />
          <TextInput
            value={addressLine2}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Address Line 2"
            placeholder="Address Line 2"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setaddressLine2(text);
            }}
          />
          <TextInput
            value={landmark}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Landmark"
            placeholder="Landmark"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setlandmark(text);
            }}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown
              style={[
                styles.input,
                {marginTop: vh(25), width: vw(185), height: vh(55)},
              ]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allCountries}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'Country'}
              searchPlaceholder="Search..."
              value={country}
              onChange={item => {
                setCountry(item);
              }}
            />
            <TextInput
              value={pinCode}
              style={[
                styles.input,
                {marginTop: vh(25), width: vw(185), height: vh(55)},
              ]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="PIN Code"
              placeholder="PIN Code"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setpinCode(text);
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Dropdown
              style={[
                styles.input,
                {marginTop: vh(25), width: vw(185), height: vh(55)},
              ]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allState}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'State'}
              searchPlaceholder="Search..."
              value={state}
              onChange={item => {
                setState(item);
              }}
            />
            <Dropdown
              style={[
                styles.input,
                {marginTop: vh(25), width: vw(185), height: vh(55)},
              ]}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              data={allCities}
              search
              maxHeight={300}
              labelField="name"
              valueField="name"
              placeholder={'City'}
              searchPlaceholder="Search..."
              value={city}
              onChange={item => {
                setCity(item);
              }}
            />
          </View>
        </>
      ) : null}
      <Text style={styles.addinfo}>Additional Information</Text>
      <TextInput
        value={tags}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Tags"
        placeholder="Tags"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setTags(text);
        }}
      />
      <TextInput
        value={companyName}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Company Name"
        placeholder="Company Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setcompanyName(text);
        }}
      />
      <TextInput
        value={primaryEmployee}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Primary Employee"
        placeholder="Primary Employee"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setprimaryEmployee(text);
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          value={panNo}
          style={[styles.input, {marginTop: vh(25), width: vw(185)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="PAN No."
          placeholder="PAN No."
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setpanNo(text);
          }}
        />
        <TextInput
          value={GST}
          style={[styles.input, {marginTop: vh(25), width: vw(185)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="GST"
          placeholder="GST"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setGST(text);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: vh(30),
          marginHorizontal: vw(15),
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: theme.color.black,
            fontFamily: theme.font.semiBold,
            fontSize: normalize(14),
          }}>
          Do You Want to Blacklist Tarun sharma ?
        </Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TextInput
        value={reason}
        style={[styles.input, {marginTop: vh(25), height: vh(118)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Write Reason"
        placeholder="Write Reason"
        multiline={true}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setReason(text);
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  selectgender: {
    marginHorizontal: vw(27),
    marginTop: vh(30),
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    color: theme.color.black,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(26),
    justifyContent: 'space-between',
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  labelText: {
    marginLeft: vw(10),
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
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
  additionalNo: {
    color: theme.color.LightBlue,
    margin: 15,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  addinfo: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    marginTop: vh(20),
    marginHorizontal: vw(21),
  },
  defaultAddressView: {
    flexDirection: 'row',
    marginTop: vh(20),
    alignItems: 'center',
    marginHorizontal: vw(20),
  },
  defaultAddressText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  addressText: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(13),
    marginTop: vh(5),
  },
});

export default ClientProfile;
