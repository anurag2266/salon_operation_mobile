import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Switch,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import React, {useState, useRef} from 'react';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../../utils/dimensions';
import RadioButton from '../../../components/common/RadioButton';
import CustomButton from '../../../components/common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import OTPTextInput from 'react-native-otp-textinput';
import moment from 'moment';
import ApplicableOnService from '../../manageOffers/memberShip/ApplicableOnService';
import { useSelector } from 'react-redux';
import SelectDateAndTime from '../../SelectDateAndTime';
import ImageCropPicker from 'react-native-image-crop-picker';
import { addCashbackData } from '../../../api/promotions/cashback';
import { showMessage } from 'react-native-flash-message';

const CreateCashback = ({navigation}) => {

  const {salonDetails}=useSelector((state)=>state.flightReducer)

  const [image,setImage]=useState(null)
  const [startfrom, setstartfrom] = useState('');
  const [endfrom, setendfrom] = useState('');
  const [promotionName, setpromotionName] = useState('');
  const [description, setDescription] = useState('');
  const [percentage, setpercentage] = useState('');
  const [rateType,setRateType]=useState("Rate")
  const [redemptionType, setRedemptionType] = useState('starton');
  const [termsDescription, settermsDescription] = useState('');
  const [appliedOn, setappliedOn] = useState('Coupon Applicable On');
  const [products,setProducts]=useState([])
  const [minbillValue, setminbillValue] = useState('');
  const [minimumCashBackAmount,setMinimumCashBackAmount]=useState('')
  const [maximumCashBackAmount,setMaximumCashBackAmount]=useState('')
  const [date, setDate] = useState(new Date());
  const [dateEnds, setDateEnds] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [validityType,setValidityType]=useState("Validity Type")
  const [expiration, setexpiration] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [dayTime,setDayTime]=useState([])
  const [isMember, setIsMember] = useState(false);
  const [isAutoApply, setIsAutoApply] = useState(false);
  const [isAllowClubbingOffer, setIsAllowClubbingOffer] = useState(false);
  const [isAllowClubbingPurchaseItem, setIsAllowClubbingPurchaseItem] =
    useState(false);
  const maximumCodeLength = 4;
  const refRBSheet = useRef();
  const ref2RBSheet = useRef();


  const handleSubmit = async () => {

    const formData = new FormData();
    
    formData.append('salonId',salonDetails._id);
    formData.append('cashbackName', promotionName);
    formData.append('selectDayAndTime', JSON.stringify(dayTime));
    formData.append('applicableOn', appliedOn);
    formData.append('shortDescription', description);
    formData.append('longDescription', description);
    formData.append('minBillValue', minbillValue);
    formData.append('cashbackValue', percentage);
    formData.append('cashbackType', rateType);
    formData.append('percentage', percentage);
    formData.append('minimumCashbackAmount', minimumCashBackAmount);
    formData.append('maximumCashbackAmount', maximumCashBackAmount);
    formData.append('maximumCashbackRedeemPercentage',maximumCashBackAmount)
    formData.append('validitytype', validityType),
    formData.append('validitynoOfDays',expiration );
    formData.append('serviceIds', JSON.stringify(products));
    formData.append('productIds', JSON.stringify(products));
    formData.append('applicableFrom',startfrom)
    formData.append('applicableTill',endfrom)
    formData.append('expiration',redemptionType)
    formData.append('enterNo',redemptionType=='starton'? "0":date)
    formData.append('startFrom',date)
    formData.append('endOn',dateEnds)
    formData.append('termandconditions',termsDescription)
    formData.append('isMemberOnly', isMember);
    formData.append('isAutoApply', isAutoApply);
    formData.append('isAllowClubbingOffer', isAllowClubbingOffer);
    formData.append('isAllowClubbingPurchaseItem', isAllowClubbingPurchaseItem);
     formData.append(
      'redemptionSetting',
      JSON.stringify({
        for: redemptionType,
        startDate: date,
        endDate: dateEnds,
        noofDays:0
      }),
    );
    formData.append('file', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
    // formData.append(
    //   'redemptionSetting',
    //   JSON.stringify({
    //     for: redemptionType,
    //     startDate: date,
    //     endDate: dateEnds,
    //   }),
    // );
    // formData.append('tandCfile', {
    //   uri:
    //     Platform.OS === 'ios'
    //       ? image?.sourceURL.replace('file://', '')
    //       : image?.path,
    //   name: image?.filename,
    //   type: image?.mime,
    // });
    // navigation.navigate('CashbackOffers')
    // const {status,message,data}=await addCashbackData(formData)
    // if(status==200){
    //   navigation.navigate('CashbackOffers')
    // }
    // else{
    //   showMessage({message:message,type:'danger'})
    // }
    await addCashbackData(formData).then((res)=>{
          console.log("Here is APi respinse:",res)
        })
        .then((err)=>{
          console.log("Here is error:",err)
        })
    // if (route.params?.id) {
    //   const {status,message,data}=await updateCouponData(formData)
    //   if (status == 200) {
    //     navigation.navigate('Coupons');
    //     // setModalVisible(true);
    //   } else {
    //     // (formData._parts).map((item)=>{
    //       // for(let i=0;i<formData._parts.length;i++){
    //       //   if(formData._parts[i][1]==""){
    //       //     // console.log("Here is Value:",item[1])
    //       //     showMessage({message:`Kindly Provide Data for ${formData._parts[i][0]}`,type:'danger'})
    //       //     break;
    //       //   }
    //       showMessage({message: message, type: 'danger'});
    //   }
    // } else {
    //   const {status, data, message} = await addCouponData(formData);
    //   if (status == 200) {
    //     navigation.navigate('Coupons');
    //   } else {
    //     showMessage({message: message, type: 'danger'});
    //   }
    // }
  };

  const SelectImage = async () => {
    await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image);
    });
  };
  const selectTermsAndConditions = async () => {
    await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setTermsFile(image);
    });
  };


  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Add Cashback Offers'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <>
          <ImageBackground source={LocalImages.Profile} style={styles.Profile}>
            <TouchableOpacity style={styles.uploadTouch} onPress={() => SelectImage()}>
              <Image source={LocalImages.camera} style={styles.camera} />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={styles.couponImg}>
            Add image of your cash back offers here
          </Text>
        </>

        <TextInput
          value={promotionName}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Cashback Name'}
          placeholder={'Cashback Name'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setpromotionName(text);
          }}
        />

        <TextInput
          value={description}
          style={[styles.input, {height: '8%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Add Description'}
          placeholder={'Add Description'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setDescription(text);
          }}
        />

        <TouchableOpacity
          style={[
            styles.input,
            {
              paddingVertical: vh(14),
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => ref2RBSheet.current.open()}>
          <Text style={{fontFamily: theme.font.light}}>Select Day & Time</Text>
          <AppIcon name={'right'} type={'AntDesign'} size={18} />
        </TouchableOpacity>
        <RBSheet
          ref={ref2RBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: vw(20),
              borderTopRightRadius: vw(20),
              height: '80%',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
         <SelectDateAndTime
          date={dayTime}
          setDayTime={setDayTime}
           onPressApply={() => {
            refRBSheet.current.close();
          }}/>
        </RBSheet>

        <Text
          style={{
            fontFamily: theme.font.medium,
            marginHorizontal: vw(20),
            marginTop: vh(15),
          }}>
          Applicable on
        </Text>
        <Dropdown
          style={[styles.input, {paddingVertical: vh(14)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholder={appliedOn}
          labelField="label"
          valueField="value"
          maxHeight={300}
          value={appliedOn}
          onChange={item => {
            setappliedOn(item.label)
            refRBSheet.current.open();
          }}
          data={[
            {label: 'Services', value: '1'},
            {label: 'Products', value: '2'},
            {label: 'Both', value: '3'},
          ]}
        />

        <TextInput
          value={minbillValue}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Minimum Bill Value'}
          placeholder={'Minimum Bill Value'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setminbillValue(text);
          }}
        />

        <TextInput
          value={percentage}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder="(Rate)"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setpercentage(text);
          }}
          renderLeftIcon={() => (
            <Dropdown
              style={{width: '60%'}}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              placeholder={rateType}
              labelField="label"
              valueField="value"
              maxHeight={300}
              value={rateType}
              onChange={(item)=>setRateType(item.label)}
              data={[
                {label: 'Flat(₹)', value: '1'},
                {label: 'Percentage%', value: '2'},
              ]}
            />
          )}
        />
        <TextInput
          value={minimumCashBackAmount}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Calculated Minimum Cashback Amount'}
          placeholder={'Calculated Minimum Cashback Amount'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setMinimumCashBackAmount(text);
          }}
        />
        <TextInput
          value={maximumCashBackAmount}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Maxmimum Cashback Redeem % Per Transaction'}
          placeholder={'Maxmimum Cashback Redeem % Per Transaction'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setMaximumCashBackAmount(text);
          }}
        />

        <TextInput
          value={expiration}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder="Validity Period of Cashback Earned"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setexpiration(text);
          }}
          renderLeftIcon={() => (
            <Dropdown
              style={{width: '60%'}}
              inputStyle={styles.inputStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              placeholder={validityType}
              labelField="label"
              valueField="value"
              onChange={(item)=>setValidityType(item.label)}
              maxHeight={300}
              data={[
                {label: 'Quaterly', value: '1'},
                {label: 'Monthly', value: '2'},
              ]}
            />
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={startfrom}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Applicable From'}
            placeholder={'Applicable From'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setstartfrom(text);
            }}
          />
          <TextInput
            value={endfrom}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Applicable Till'}
            placeholder={'Applicable Till'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setendfrom(text);
            }}
          />
        </View>

        <View style={{marginHorizontal: vw(25), marginVertical: vh(25)}}>
          <Text
            style={{
              color: theme.color.black,
              fontSize: normalize(18),
              fontFamily: theme.font.regular,
            }}>
            Redemption Settings
          </Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setRedemptionType('starton')}
              style={{
                ...styles.tabButton,
                backgroundColor:
                  redemptionType == 'starton'
                    ? theme.color.primary
                    : theme.color.TextGrey,
              }}>
              <Text style={styles.tabText}>Start On</Text>
            </TouchableOpacity>
            <Text>or</Text>
            <TouchableOpacity
              onPress={() => setRedemptionType('xday')}
              style={{
                ...styles.tabButton,
                backgroundColor:
                  redemptionType == 'xday'
                    ? theme.color.primary
                    : theme.color.TextGrey,
              }}>
              <Text style={styles.tabText}>x days after purchase</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date()}
          onConfirm={date => {
            setOpen(false);

            setDate(moment(date).format('DD-MM-YYYY'));
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={new Date()}
          onConfirm={date => {
            setOpenDate(false);
            setDateEnds(moment(date).format('DD-MM-YYYY'));
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
        {redemptionType == 'starton' ? (
          <>
            <TextInput
              value={date}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Starts on"
              placeholder="Starts on"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              renderRightIcon={() =>
                redemptionType == 'starton' ? (
                  <AppIcon
                    type="MaterialCommunityIcons"
                    name="calendar-month"
                    size={20}
                    onPress={() => setOpen(true)}
                  />
                ) : null
              }
            />
            <TextInput
              value={dateEnds}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Ends On"
              placeholder="Ends On"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              renderRightIcon={() =>
                redemptionType == 'starton' ? (
                  <AppIcon
                    type="MaterialCommunityIcons"
                    name="calendar-month"
                    size={20}
                    onPress={() => setOpenDate(true)}
                  />
                ) : null
              }
            />
          </>
        ) : (
          <>
            <TextInput
              value={date}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="No. Of Days"
              placeholder="No. Of Days"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              renderRightIcon={() =>
                redemptionType == 'starton' ? (
                  <AppIcon
                    type="MaterialCommunityIcons"
                    name="calendar-month"
                    size={20}
                    onPress={() => setOpen(true)}
                  />
                ) : null
              }
            />
            <TextInput
              value={dateEnds}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="End Date"
              placeholder="Ends Date"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              renderRightIcon={() => (
                <AppIcon
                  type="MaterialCommunityIcons"
                  name="calendar-month"
                  size={20}
                  onPress={() => setOpenDate(true)}
                />
              )}
            />
          </>
        )}
        <TextInput
          style={[styles.input]}
          value={description}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Add Description"
          placeholder="Add Description"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setDescription({text});
          }}
        />
        <Text
          style={{
            marginHorizontal: vw(20),
            marginTop: vh(20),
            fontFamily: theme.font.bold,
          }}>
          Terms and Conditions
        </Text>
        <TextInput
          editable={true}
          value={termsDescription}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="T&C"
          placeholder="Add T&C"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            settermsDescription(text);
          }}
          renderRightIcon={() => (
            <AppIcon
              name={'cloudupload'}
              type={'AntDesign'}
              size={22}
              color={theme.color.primary}
            />
          )}
        />
        <Text style={styles.textButton}>
          Above T&C will be shareable at checkout
        </Text>
        <Text style={styles.appliedText}>Applied on</Text>
        <TouchableOpacity
          value={isMember}
          style={styles.labelTouch}
          onPress={() => {
            setIsMember(!isMember);
          }}>
          {isMember == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.labelText}>Member Only</Text>
        </TouchableOpacity>

        <TouchableOpacity
          value={isAutoApply}
          style={styles.labelTouch}
          onPress={() => {
            setIsAutoApply(!isAutoApply);
          }}>
          {isAutoApply == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.labelText}>Auto Appply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          value={isAllowClubbingOffer}
          style={styles.labelTouch}
          onPress={() => {
            setIsAllowClubbingOffer(!isAllowClubbingOffer);
          }}>
          {isAllowClubbingOffer == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.labelText}>Allow clubing with other offers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          value={isAllowClubbingPurchaseItem}
          style={styles.labelTouch}
          onPress={() => {
            setIsAllowClubbingPurchaseItem(!isAllowClubbingPurchaseItem);
          }}>
          {isAllowClubbingPurchaseItem == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.labelText}>
            Allow clubbing with other purchased items
          </Text>
        </TouchableOpacity>

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: vw(20),
              borderTopRightRadius: vw(20),
              height: '80%',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Container
            title={'Add Services/Products'}
            onPressLeftIcon={() => refRBSheet.current.close()}>
            <ApplicableOnService products={products} setProducts={setProducts} />
          </Container>
        </RBSheet>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => handleSubmit()}
        extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <View style={styles.modalView}>
            <Text
              style={{
                color: theme.color.black,
                fontFamily: theme.font.semiBold,
                textAlign: 'center',
                fontSize: normalize(24),
              }}>
              Enter Your PIN
            </Text>
            <View style={styles.inputPin}>
              <OTPTextInput
                style={styles.otpinput}
                containerStyle={styles.inputContainer}
                maximumLength={maximumCodeLength}
                handleTextChange={text => setPin(text)}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.btnTouch,
                {marginTop: vh(70), backgroundColor: theme.color.primary},
              ]}
              onPress={() => {
                setModalVisible(!modalVisible), navigation.navigate('Cashback');
              }}>
              <Text style={[styles.btnText, {color: theme.color.white}]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Profile: {
    width: vw(106),
    height: vh(106),
    borderRadius: vw(106),
    marginHorizontal: vw(24),
    marginTop: vh(25),
    alignSelf: 'center',
  },
  uploadTouch: {
    alignItems: 'flex-end',
    top: vh(70),
  },
  camera: {
    width: vw(28),
    height: vh(28),
  },
  couponImg: {
    textAlign: 'center',
    marginTop: vh(15),
    fontSize: normalize(14),
    fontFamily: theme.font.semiBold,
    color: theme.color.black,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(25),
    marginHorizontal: vw(15),
    height: vh(55),
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
  tabButton: {
    paddingVertical: vh(14),
    paddingHorizontal: vw(30),
    borderRadius: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vh(20),
  },
  tabText: {
    fontFamily: theme.font.regular,
    color: theme.color.white,
    fontWeight: '500',
  },
  textButton: {
    marginHorizontal: vw(25),
    marginTop: vh(15),
    fontFamily: theme.font.regular,
    color: theme.color.LightBlue,
    fontWeight: '400',
  },
  appliedText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(24),
    marginHorizontal: vw(12),
    marginTop: vh(30),
  },
  checkimg: {
    width: vw(22),
    height: vw(22),
    color: theme.color.bottomWidth,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    alignItems: 'center',
    marginTop: vh(21),
  },
  labelText: {
    marginHorizontal: vw(20),
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  btnTouch: {
    borderWidth: 1,
    borderRadius: vw(5),
    alignItems: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(11),
    borderColor: theme.color.primary,
  },
  btnText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  serviceView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginHorizontal: vw(18),
    paddingVertical: vh(13),
    marginTop: vh(20),
    borderColor: theme.color.searchColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
  },
  TickImg: {
    width: vw(22),
    height: vh(22),
    marginRight: vw(12),
    marginVertical: vh(4),
  },
  itemName: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  itemText: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },
  categoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(20),
    marginHorizontal: vw(24),
  },
  selectAlltext: {
    marginRight: vw(20),
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    color: theme.color.dropdownColor,
  },
  categoryText: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  itemImg: {
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
  },
  modalView: {
    marginHorizontal: vw(12),
    backgroundColor: 'white',
    borderRadius: vw(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingVertical: vh(63),
  },
  inputPin: {
    marginTop: vh(80),
    marginHorizontal: vw(25),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  otpinput: {
    width: vw(35),
    height: vh(25),
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: vw(21),
    borderBottomWidth: 1,
    color: theme.color.primary,
  },
  itemDiscount: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(20),
  },
  discountView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh(15),
  },
  validity: {
    textAlign: 'center',
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginTop: vh(30),
  },
  headerLeftView: {
    backgroundColor: theme.color.primary,
    paddingVertical: vh(17),
    borderTopLeftRadius: vw(20),
    borderBottomLeftRadius: vw(20),
    paddingLeft: vw(25),
    width: '65%',
  },
  itemTouch: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: vh(10),
    marginLeft: vw(15),
    width: '80%',
    paddingHorizontal: vw(20),
    paddingVertical: vh(12),
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemImg: {
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
  },
  itemTxt: {
    textAlign: 'center',
    marginHorizontal: vw(30),
    paddingVertical: vh(7),
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default CreateCashback;
