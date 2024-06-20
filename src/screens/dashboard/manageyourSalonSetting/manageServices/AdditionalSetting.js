import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {MultiSelect} from 'react-native-element-dropdown';
import AppIcon from '../../../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';
import {
  getSalonServicesBySalonID,
  updateSalonServiceAdditionalSettingAPI,
} from '../../../../api/services/salonMap';
import {showMessage} from 'react-native-flash-message';
import {getAllServiceTag} from '../../../../api/searchTag/searchTagMasterService';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getSalonProduct} from '../../../../api/products/productMapService';
import {getStylistAPI} from '../../../../api/services/stylistService';

const AdditionalSetting = ({navigation, route}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const {serviceDetail} = route.params;
  const [paddingTime, setpaddingTime] = useState('');
  const [duringService, setduringService] = useState('');
  const [afterService, setafterService] = useState('');
  const [intervals, setintervals] = useState('');
  const [frequency, setfrequency] = useState('');
  const [totalSession, settotalSession] = useState('');
  const [sessionGap, setsessionGap] = useState('');
  const [isadditionalDetail, setisAdditionalDetail] = useState(true);
  const [searchTags, setsearchTags] = useState([]);
  const [relatedServices, setRelatedServices] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [suggestedStylists, setsuggestedStylists] = useState([]);
  const [addMemberships, setaddMemberships] = useState([]);
  const [addPackages, setaddPackages] = useState([]);

  ///
  const [allServiceTags, setAllServiceTags] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allStylist, setAllStylist] = useState([]);

  const data = [
    {
      id: 1,
      label: '1',
    },
    {
      id: 2,
      label: '2',
    },
    {
      id: 3,
      label: '3',
    },
    {
      id: 4,
      label: '4',
    },
    {
      id: 5,
      label: '5',
    },
  ];

  const handleSubmit = async () => {
    const dataa = {
      id: serviceDetail._id,
      // serviceTime: '15 min',
      intervalInMin: intervals,
      frequencyOfService: frequency,
      totalSessionRequired: totalSession,
      sessionGap: sessionGap,
      paddingTimeInMin: paddingTime,
      processingTimeAfterService: afterService,
      processingTimeduringService: duringService,
      // parallelClient: '2',
      searchTag: searchTags,
      suggestedStylistTag: suggestedStylists,
      similarService: relatedServices,
      relatedMemberShipTag: addMemberships,
      relatedPackage: addPackages,
      suggestedProduct: relatedProducts,
      // included: 'Testing',
    };
    const {status, data, message} =
      await updateSalonServiceAdditionalSettingAPI(dataa);
    if (status) {
      showMessage({message: message, type: 'success'});
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleGetSearchTags = async () => {
    const {data, status, message} = await getAllServiceTag();
    if (status) {
      setAllServiceTags(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };
  const handleGetSalonServices = async () => {
    const {data, status, message} = await getSalonServicesBySalonID(
      salonDetails._id,
    );
    if (status) {
      setAllServices(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };
  const handleGetSalonProducts = async () => {
    const {data, status, message} = await getSalonProduct(salonDetails._id);
    if (status) {
      setAllProducts(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleGetStylist = async () => {
    const {data, status, message} = await getStylistAPI(
      salonDetails._id,
      'stylist',
    );
    if (status) {
      setAllStylist(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSearchTags();
      handleGetSalonServices();
      handleGetSalonProducts();
      handleGetStylist();
    }, []),
  );

  return (
    <Container
      title={'Additional Settings'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={handleSubmit}>
      <Text style={styles.serviceName}>Service Name</Text>
      <Text style={styles.service}>{serviceDetail.serviceId.serviceName}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          marginTop: vh(8),
          borderColor: theme.color.bottomWidth,
          marginHorizontal: vw(22),
        }}></View>
      <MultiSelect
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        search
        labelField="label"
        valueField="lablel"
        placeholder="Padding Time (in mins)"
        searchPlaceholder="Search"
        value={paddingTime}
        onChange={item => {
          setpaddingTime(item);
        }}
      />
      <Text
        style={{
          color: theme.color.black,
          fontFamily: theme.font.bold,
          marginTop: vh(30),
          marginHorizontal: vw(21),
          fontSize: normalize(16),
        }}>
        Processing Time (in mins)
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          value={duringService}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          label="During the service"
          placeholder="During the service"
          multiline={true}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setduringService(text);
          }}
        />
        <TextInput
          value={afterService}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          label="After the service"
          placeholder="After the service"
          multiline={true}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setafterService(text);
          }}
        />
      </View>
      <MultiSelect
        style={[styles.input, {height: vh(55)}]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={data}
        search
        labelField="label"
        valueField="lablel"
        placeholder="Interval (in mins)"
        searchPlaceholder="Search"
        value={intervals}
        onChange={item => {
          setintervals(item);
        }}
      />
      <TextInput
        value={frequency}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Frequency of the service"
        placeholder="Frequency of the service"
        multiline={true}
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setfrequency(text);
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <MultiSelect
          style={[styles.input, {height: vh(55), width: '50%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={data}
          search
          labelField="label"
          valueField="lablel"
          placeholder="Total sessions required"
          searchPlaceholder="Search"
          value={totalSession}
          onChange={item => {
            settotalSession(item);
          }}
        />
        <MultiSelect
          style={[styles.input, {height: vh(55), width: '35%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={data}
          search
          labelField="label"
          valueField="lablel"
          placeholder="Session Gap"
          searchPlaceholder="Search"
          value={sessionGap}
          onChange={item => {
            setsessionGap(item);
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: vh(35),
          marginHorizontal: vw(21),
        }}>
        <Text style={styles.serviceTagsTxt}>
          Recommended Tags For The Service
        </Text>
        {!isadditionalDetail ? (
          <AppIcon
            name={'down'}
            type={'AntDesign'}
            size={15}
            color={theme.color.dropdownColor}
            onPress={() => {
              setisAdditionalDetail(!isadditionalDetail);
            }}
          />
        ) : (
          <AppIcon
            name={'up'}
            type={'AntDesign'}
            size={15}
            color={theme.color.dropdownColor}
            onPress={() => {
              setisAdditionalDetail(!isadditionalDetail);
            }}
          />
        )}
      </View>
      {isadditionalDetail ? (
        <>
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            data={allServiceTags}
            search
            labelField="name"
            valueField="_id"
            placeholder="Add Search Tags"
            searchPlaceholder="Search"
            value={searchTags}
            onChange={item => {
              setsearchTags(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            data={allServices}
            search
            labelField="displayName"
            valueField="_id"
            placeholder="Add Related Services"
            searchPlaceholder="Search"
            value={relatedServices}
            onChange={item => {
              setRelatedServices(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            data={allProducts}
            search
            labelField="displayName"
            valueField="_id"
            placeholder="Add Related Products"
            searchPlaceholder="Search"
            value={relatedProducts}
            onChange={item => {
              setrelatedProducts(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Add suggested Stylists"
            searchPlaceholder="Search"
            value={suggestedStylists}
            onChange={item => {
              setsuggestedStylists(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Add Memberships"
            searchPlaceholder="Search"
            value={addMemberships}
            onChange={item => {
              setaddMemberships(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Add Packages"
            searchPlaceholder="Search"
            value={addPackages}
            onChange={item => {
              setaddPackages(item);
            }}
          />
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  serviceName: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    textAlign: 'center',
    marginTop: vh(15),
    fontSize: normalize(14),
  },
  service: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
    marginTop: vh(2),
    fontSize: normalize(16),
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
  serviceTagsTxt: {
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
});

export default AdditionalSetting;
