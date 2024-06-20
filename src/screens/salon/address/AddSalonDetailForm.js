import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {normalize, vh, vw} from '../../../utils/dimensions';
import CustomClientButton from '../../../components/common/CustomClientButton';
import theme from '../../../theme/theme';
import CustomButtom from '../../../components/common/CustomButton';
import SalonDetailedinfo from '../../../components/common/Toggle';
import Container from '../../../components/common/Container';
import {updateBusinesSetupAPI} from '../../../api/services/salonBasicService';
import {getUserDetailsAPI} from '../../../api/services/authService';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import ProgressBar from '../../../components/common/ProgressBar';
import {useFocusEffect} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {ValueChanged} from '../../../redux/actions/flightActions';

const AddSalonDetailForm = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [sellProduct, setsellProduct] = useState(false);
  const [homeService, setHomeService] = useState(false);
  const [stylistAttendance, setstylistAttendance] = useState(false);
  const [autoBooking, setautoBooking] = useState(false);
  const [homeServiceRange, setHomeServiceRange] = useState('5');
  const [extraServicecharge, setextraServicecharge] = useState(false);
  const [distanceRate, setdistanceRate] = useState(false);

  const [salonType, setSalonType] = useState('Unisex');
  const [data, setData] = useState([]);

  const handleGetUserInfo = async () => {
    const {status, message, data} = await getUserDetailsAPI();
    console.log('User data--->', data);

    if (status) {
      dispatch(ValueChanged('salonDetails', data.salons[0]));
      setData(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    setHomeService(salonDetails.isHomeService);
    setsellProduct(salonDetails.isSalonSellProducts);
    setextraServicecharge(salonDetails.isExtraFeesForHomeService);
    setstylistAttendance(salonDetails.manageStylistAttendance);
    setautoBooking(salonDetails.autoAccept);
    setSalonType(salonDetails.clientType);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetUserInfo();
    }, []),
  );

  const handleUpdateSalonOperations = async () => {
    const {data, message, status} = await updateBusinesSetupAPI({
      salonId: salonDetails._id,
      isHomeService: homeService,
      isHomeServiceChargeble: false,
      clientType: salonType,
      isSalonSellProducts: sellProduct,
      autoAccept: autoBooking,
      manageStylistAttendance: stylistAttendance,
      HomeServiceRange: homeServiceRange,
      isExtraFeesForHomeService: false,
    });

    if (status) {
      showMessage({message: message, type: 'success'});
      navigation.goBack();
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  return (
    <Container
      title={'Salon Operations'}
      description={'Select your salon operations'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      progressBar={<ProgressBar progress={40} />}>
      <Text style={styles.clientTypeTxt}>Select your client type</Text>
      <CustomClientButton
        selected={salonType}
        onSelect={item => setSalonType(item.name)}
      />
      <View style={styles.bottomWidth}></View>
      <SalonDetailedinfo
        detail={'Does your salon sell products?'}
        toggleValue={sellProduct}
        onToggle={() => setsellProduct(!sellProduct)}
      />
      <SalonDetailedinfo
        detail={"Do you want to manage your staff's attendance with Salonesis?"}
        detailExtraStyle={{width: vw(242), textAlign: 'left'}}
        toggleValue={stylistAttendance}
        onToggle={() => {
          setstylistAttendance(!stylistAttendance);
        }}
      />
      <SalonDetailedinfo
        detail={'Do you want to auto-accept the client’s booking on Salonesis?'}
        detailExtraStyle={{width: vw(277), textAlign: 'left'}}
        toggleValue={autoBooking}
        onToggle={() => {
          setautoBooking(!autoBooking);
        }}
      />
      <SalonDetailedinfo
        toggleValue={homeService}
        onToggle={() => setHomeService(!homeService)}
        detail={'Does your salon offer Home Services?'}
        extraStyle={{borderBottomWidth: 0}}
      />
      {homeService == true ? (
        <View>
          <View
            style={!homeService ? styles.bottomWidth : {bottomWidth: 0}}></View>
          <View>
            <Text style={styles.HomeService}>
              What is the maximum travel distance?{' '}
              <Text style={{color: theme.color.darkGrey}}>in km</Text>
            </Text>
            <TextInput
              value={homeServiceRange}
              style={styles.input}
              inputStyle={[styles.inputStyle, {marginLeft: vw(10)}]}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              placeholder="Enter maximum travel distance here"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setHomeServiceRange(text);
              }}
              renderLeftIcon={() => (
                <Text
                  style={{
                    borderColor: theme.color.black,
                    borderRightWidth: 1.5,

                    paddingRight: vw(10),
                    color: theme.color.black,
                  }}>
                  km
                </Text>
              )}
            />
          </View>
          <SalonDetailedinfo
            detail={'Do you charge any extra fee for home services?'}
            detailExtraStyle={{width: vw(291), textAlign: 'left'}}
            toggleValue={extraServicecharge}
            onToggle={() => {
              setextraServicecharge(!extraServicecharge);
            }}
            extraStyle={{borderBottomWidth: 0}}
          />
          {route?.params?.fromScreen === 'ManageSalonSetting' ? (
            <>
              {extraServicecharge ? (
                <TextInput
                  value={distanceRate}
                  style={[styles.input]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  textErrorStyle={styles.textErrorStyle}
                  placeholder="(RATE)"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  onChangeText={text => {
                    setdistanceRate(text);
                  }}
                  renderLeftIcon={() => (
                    <Dropdown
                      style={{width: '40%'}}
                      inputStyle={styles.inputStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      placeholderStyle={styles.placeholderStyle}
                      placeholder="Distance/km"
                      labelField="label"
                      valueField="value"
                      maxHeight={300}
                      data={[
                        {label: 'Percentage %', value: '1'},
                        {label: 'Flat (Rs)', value: '2'},
                      ]}
                    />
                  )}
                />
              ) : null}
            </>
          ) : null}
        </View>
      ) : null}
      <CustomButtom
        onPress={handleUpdateSalonOperations}
        extraStyle={{marginTop: vh(40)}}
        label="Save"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  clientTypeTxt: {
    fontSize: normalize(16),
    color: theme.color.black,
    marginHorizontal: vw(21),
    fontFamily: theme.font.medium,
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    marginTop: vh(15),
    borderColor: theme.color.bottomWidth,
  },
  HomeService: {
    marginHorizontal: vw(21),
    fontSize: normalize(13),
    fontFamily: theme.font.medium,
    color: theme.color.distanceTxt,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
    marginBottom: vh(24),
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
  row: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    justifyContent: 'space-around',
    marginTop: vh(17),
  },
  feeChargeText: {
    fontSize: normalize(13),
    marginHorizontal: vw(10),
    paddingVertical: vh(20),
    paddingRight: vw(30),
    fontFamily: theme.font.semiBold,
    color: theme.color.Black_shadow,
    textAlign: 'center',
  },
  feeChargeTouch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw(500),
    backgroundColor: theme.color.clientBorder,
    borderColor: theme.color.clientBorder,
  },
  image: {
    borderWidth: 5,
    paddingVertical: vw(14),
    paddingHorizontal: vw(14),
    borderColor: theme.color.white,
    borderRadius: vw(500),
    backgroundColor: theme.color.white,
    marginLeft: vw(7),
    marginVertical: vh(10),
  },
});

export default AddSalonDetailForm;
