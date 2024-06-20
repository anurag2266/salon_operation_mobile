import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import LocalImages from '../../utils/LocalImages';
import AppIcon from '../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';
import {Dropdown} from 'react-native-element-dropdown';
import {Rating, AirbnbRating} from 'react-native-ratings';
import * as Progress from 'react-native-progress';

const ClientOverview = ({
  onPressAppointment,
  onPressBilling,
  onPressCommunications,
  onPressConsentForm,
  onPressNotes,
  route,
}) => {
  const [onSelect, setonSelect] = useState(false);
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [emailId, setemailId] = useState('');
  const [contactNo, setcontactNo] = useState('');
  const [mobileNo, setmobileNo] = useState('');
  const [DOB, setDOB] = useState('');
  const [anniversary, setAnniversary] = useState('');
  const [additionalContactNo, setadditionalContactNo] = useState('');
  const [additionalDetail, setadditionalDetail] = useState(false);
  const [down, setDown] = useState(false);

  const Data = [
    {
      id: 1,
      name: 'John K.',
      duration: '10 Months ago',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
      imageUrl: require('../../assets/pic1.png'),
    },
  ];

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
        <Text style={styles.labelTextGender}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.mainView}>
        <Text style={styles.loginText}>Last Login: 03/02/2023 | 5:00PM</Text>
      </View>
      <Text style={styles.basicInfoText}>Basic Information</Text>
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
      <TouchableOpacity style={styles.touchView} onPress={onPressAppointment}>
        <Text style={styles.touchText}>Appointments</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchView} onPress={onPressBilling}>
        <Text style={styles.touchText}>Billing</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchView} onPress={onPressConsentForm}>
        <Text style={styles.touchText}>Consent Form</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchView} onPress={onPressNotes}>
        <Text style={styles.touchText}>Notes</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchView}
        onPress={onPressCommunications}>
        <Text style={styles.touchText}>Communications</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
      <Text style={styles.reviewRatingText}>Reviews & Rating</Text>
      <View style={styles.mainview}>
        <View style={styles.mainview1}>
          <Text
            style={{
              fontSize: normalize(36),
              fontFamily: theme.font.medium,
              alignSelf: 'center',
            }}>
            4.0
          </Text>

          <AirbnbRating
            count={5}
            defaultRating={11}
            isDisabled={true}
            size={15}
            ratingContainerStyle={{alignItems: 'flex-start'}}
          />
          <Text
            style={{
              fontSize: normalize(12),
              alignSelf: 'center',
              color: theme.color.LightBlue,
            }}>
            (893 Reviews)
          </Text>
        </View>
        <View style={{padding: vw(8)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>5</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.8}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>4</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.6}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>3</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.4}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>2</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.2}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>1</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.0}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
        </View>
      </View>
      <View style={styles.viewAllView}>
        <Text style={styles.reviewText}>Reviews (90)</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      {Data.map(item => {
        return (
          <View style={{marginVertical: vw(25), marginHorizontal: vw(22)}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: vw(47), height: vw(47)}}
                source={item.imageUrl}
              />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                color={'grey'}
                onPress={() => {
                  setDown(!down);
                }}
                style={{marginLeft: vw(230)}}
              />
            </View>
            {down ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  {DATA.map(item => {
                    return (
                      <>
                        <Text style={styles.labelText}>{item.label}</Text>

                        <View style={styles.numberView}>
                          <AppIcon
                            name={'star'}
                            type={'AntDesign'}
                            color={'#FFB630'}
                            size={14}
                          />
                          <Text style={styles.numberText}>4</Text>
                        </View>
                      </>
                    );
                  })}
                </View>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </>
            ) : null}
          </View>
        );
      })}
    </>
  );
};

export default ClientOverview;

const styles = StyleSheet.create({
  mainView: {
    marginTop: vh(30),
    backgroundColor: '#E8E8E8',
    paddingHorizontal: vw(32),
    paddingVertical: vh(10),
  },
  loginText: {
    color: theme.color.black,
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
  },
  basicInfoText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginTop: vh(30),
    marginLeft: vw(23),
  },
  selectgender: {
    marginHorizontal: vw(27),
    marginTop: vh(20),
    fontFamily: theme.font.regular,
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
  labelTextGender: {
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
  touchView: {
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    marginHorizontal: vw(12),
    marginTop: vh(30),
    paddingVertical: vh(20),
    paddingHorizontal: vw(30),
    borderRadius: vw(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  reviewRatingText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(15),
    marginTop: vh(30),
    marginHorizontal: vw(20),
  },
  text: {
    fontFamily: theme.font.medium,
    fontSize: normalize(15),
    color: theme.color.black,
  },
  mainview: {
    marginTop: vh(30),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(10),
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  mainview1: {
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    width: vw(126),
    height: vh(120),

    margin: vw(5),
    borderRadius: vw(15),
  },
  viewAllView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginTop: vh(20),
  },
  reviewText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(15),
  },
  viewAllText: {
    fontSize: normalize(15),
    fontFamily: theme.font.bold,
    color: theme.color.LightBlue,
  },
  descriptionText: {
    fontFamily: theme.font.medium,
    fontSize: normalize(11),
    color: theme.color.black,
  },
  numberText: {
    marginHorizontal: vw(5),
    fontSize: normalize(10),
    alignSelf: 'center',
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },
  labelText: {
    fontFamily: theme.font.medium,
    fontSize: normalize(10),
    marginTop: vh(15),
    marginLeft: vw(20),
    color: theme.color.black,
  },
  numberView: {
    borderWidth: 0.25,
    borderRadius: vw(10),
    padding: vw(4),
    flexDirection: 'row',
    margin: vw(10),
  },
  durationText: {
    marginHorizontal: vw(13),
    color: theme.color.grey,
    fontFamily: theme.font.medium,
    fontSize: normalize(8),
  },
  name: {
    marginHorizontal: vw(13),
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    color: theme.color.black,
  },
});
