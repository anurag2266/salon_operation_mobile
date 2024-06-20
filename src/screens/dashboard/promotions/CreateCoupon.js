import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
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
import {
  addCouponData,
  getCouponDataById,
  updateCouponData,
} from '../../../api/promotions/coupon';
import {useSelector} from 'react-redux';
import AddServices from '../../salon/address/salonServices/AddServices';
import ApplicableOnService from '../../manageOffers/memberShip/ApplicableOnService';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';

const CreateCoupon = ({navigation, route}) => {
  
  useEffect(() => {
    if (route.params?.id) {
      getCouponDataById(route.params.id)
        .then(res => {
          setSelectedId(res.data[0].couponapplicablefor);
          setcouponName(res.data[0].couponName);
          setcouponCode(res.data[0].couponCode);
          setcouponDescription(res.data[0].longDescription);
          setcustomerTags(res.data[0].custometTag);
          setappliedOn(res.data[0].appliedOn);
          setminValue(res.data[0].minBillValue);
          setpercentage(res.data[0].percentage);
          setmaxValue(res.data[0].maximumDiscountValue);
          setexpiration(res.data[0].expiration);
          setissuedFrom(res.data[0].issuefrom);
          setissuedTill(res.data[0].issueto);
          setRedemptionType(res.data[0].redemptionSetting.for);
          setstartOn(res.data[0].redemptionSetting.startDate);
          setendOn(res.data[0].redemptionSetting.endDate);
          settermsDescription(res.data[0].termandconditions);
          setIsMember(res.data[0].isMemberOnly);
          setIsAutoApply(res.data[0].isAutoApply);
          setIsAllowClubbingOffer(res.data[0].isAllowClubbingOffer);
          setIsAllowClubbingPurchaseItem(
            res.data[0].isAllowClubbingPurchaseItem,
          );
        })
        .catch(err => {
          console.log('Here Occurres error:', err);
        });
    }
  }, []);

  const [image, setImage] = useState(null);
  const [termsFile, setTermsFile] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [couponName, setcouponName] = useState('');
  const [couponCode, setcouponCode] = useState('');
  const [couponDescription, setcouponDescription] = useState('');
  const [customerTags, setcustomerTags] = useState('');
  const [sacCode,setSacCode]=useState('')
  const [minValue, setminValue] = useState('');
  const [percentage, setpercentage] = useState('');
  const [issuedFrom, setissuedFrom] = useState('');
  const [issuedTill, setissuedTill] = useState('');
  const [redemptionType, setRedemptionType] = useState('starton');
  const [startOn, setstartOn] = useState('');
  const [termsDescription, settermsDescription] = useState('');
  const [endOn, setendOn] = useState('');
  const [appliedOn, setappliedOn] = useState('');
  const refRBSheet = useRef();
  const [services, setservices] = useState([]);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState('');
  const [servicesShown, setservicesShown] = useState(false);
  const [tickSelect, settickSelect] = useState("Percentage %");
  const [point, setPoint] = useState("Expiration");
  const [selectAllCategory, setselectAllCategory] = useState(false);
  const [maxValue, setmaxValue] = useState('');
  const [expiration, setexpiration] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [isAutoApply, setIsAutoApply] = useState(false);
  const [isAllowClubbingOffer, setIsAllowClubbingOffer] = useState(false);
  const [isAllowClubbingPurchaseItem, setIsAllowClubbingPurchaseItem] =
    useState(false);

  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(new Date());
  const [datePicker2, setDatePicker2] = useState(new Date());
  const [dateEnds, setDateEnds] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [openPicker2, setOpenPicker2] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const maximumCodeLength = 4;

  const couponData = [
    {
      id: 1,
      couponName: 'Discount On bill Value',
      imagePath: require('../../../assets/icons/promotionCoupons.png'),
      discountPercentage: '10%',
      discount: 'Discount',
      validity: 'Validity: 12/02/2021 to 12/09/2021',
      itemDiscount: 'discount on following items',
    },
  ];

  const {flightReducer} = useSelector(state => ({...state}));

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('salonId', flightReducer.salonDetails._id);
    formData.append('couponName', couponName);
    formData.append('couponCode', couponCode);
    formData.append('couponapplicablefor', selectedId);
    formData.append('shortDescription', couponDescription);
    formData.append('file', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
    formData.append('longDescription', couponDescription);
    formData.append('minBillValue', minValue);
    formData.append('maximumDiscountValue', maxValue);
    formData.append('custometTag', JSON.stringify([customerTags]));
    formData.append('percentage', percentage);
    formData.append('issuefrom', datePicker);
    formData.append('issueto', datePicker2);
    formData.append('applicableOn', appliedOn),
    formData.append('sacCode',sacCode)
    formData.append('expiration',point)
    formData.append('enterNo',expiration)
      formData.append(
        'redemptionSetting',
        JSON.stringify({
          for: redemptionType,
          startDate: date,
          endDate: dateEnds,
          noofdays:"12"
        }),
      );
    formData.append('discountedOn', 'Bill');
    formData.append('tandcfile', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
    formData.append('serviceIds', JSON.stringify(services));
    formData.append('productIds', JSON.stringify(products));
    formData.append('isMemberOnly', isMember);
    formData.append('isAutoApply', isAutoApply);
    formData.append('isAllowClubbingOffer', isAllowClubbingOffer);
    formData.append('isAllowClubbingPurchaseItem', isAllowClubbingPurchaseItem);

   
    // console.log("Here is Issued From:",expiration)
    // await addCouponData(formData).then((res)=>{
    //       console.lof("Here is APi response:",res)
    //       // navigation.navigate('Coupons');
    //     })
    //     .then((err)=>{
    //       console.log("Here is error:",err)
    //     })
    if (route.params?.id) {
      const {statusCode,message,data}=await updateCouponData(formData)
      if (statusCode == 200) {
        navigation.navigate('Coupons');
        // setModalVisible(true);
      } else {
        // (formData._parts).map((item)=>{
          // for(let i=0;i<formData._parts.length;i++){
          //   if(formData._parts[i][1]==""){
          //     // console.log("Here is Value:",item[1])
          //     showMessage({message:`Kindly Provide Data for ${formData._parts[i][0]}`,type:'danger'})
          //     break;
          //   }
          showMessage({message: message, type: 'danger'});
      }
    } else {
      const {statusCode, data, message} = await addCouponData(formData);
      if (statusCode == 200) {
        navigation.navigate('Coupons');
      } else {
        showMessage({message: message, type: 'danger'});
      }
    }
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
        title={'Create Coupon'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>

        {image? <>
          <ImageBackground source={{
              uri: Platform.OS == 'ios' ? image.sourceURL : image.path,
            }} style={{...styles.Profile,overflow: 'hidden'}}>
            <TouchableOpacity
              style={styles.uploadTouch}
              onPress={() => SelectImage()}>
              <Image source={LocalImages.camera} style={styles.camera} />
            </TouchableOpacity>
          </ImageBackground>
          <Text style={styles.couponImg}>Add image of your coupon here</Text>
        </>:
         <>
         <ImageBackground source={LocalImages.Profile} style={styles.Profile}>
           <TouchableOpacity
             style={styles.uploadTouch}
             onPress={() => SelectImage()}>
             <Image source={LocalImages.camera} style={styles.camera} />
           </TouchableOpacity>
         </ImageBackground>
         <Text style={styles.couponImg}>Add image of your coupon here</Text>
       </>
        }
       

        <View style={{marginHorizontal: vw(15), marginTop: vh(43)}}>
          <RadioButton
            title="Plan Applicable for"
            selected={selectedId}
            value={selectedId}
            setSelected={item => setSelectedId(item)}
            options={['Home Service', 'Salon Service', 'Both']}
          />
        </View>
        <TextInput
          value={couponName}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Coupon Name'}
          placeholder={'Coupon Name'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setcouponName(text);
          }}
        />
        <TextInput
          value={couponCode}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Coupon Code'}
          placeholder={'Coupon Code'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setcouponCode(text);
          }}
        />
        <TextInput
          value={couponDescription}
          style={[styles.input, {height: vh(117)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          multiline={true}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Coupon Description'}
          placeholder={'Coupon Description'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setcouponDescription(text);
          }}
        />
        <TextInput
          value={customerTags}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Customer tags'}
          placeholder={'Customer tags'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setcustomerTags(text);
          }}
        />
        <TextInput
          value={sacCode}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'SAC Code'}
          placeholder={'SAC Code'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setSacCode(text);
          }}
        />

        <Dropdown
          style={[styles.input, {paddingVertical: vh(14)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholder={'Coupon Applicable On'}
          labelField="label"
          valueField="value"
          maxHeight={300}
          value={appliedOn}
          onChange={item => {
            setappliedOn(item.label);
            refRBSheet.current.open();
          }}
          data={[
            {label: 'Services', value: '1'},
            {label: 'Products', value: '2'},
            {label: 'Both', value: '3'},
          ]}
        />
        <View
          style={{
            marginHorizontal: vw(15),
            marginTop: vh(43),
          }}>
          <RadioButton
            title="Discount On"
            selected={selectedId}
            setSelected={item => setSelectedId(item)}
            options={['Bill Value', 'Service Value', 'Product Value']}
          />
        </View>
        <TextInput
          value={minValue}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Minimum Bill Value'}
          placeholder={'Minimum Bill Value'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setminValue(text);
          }}
        />
        <TextInput
          value={percentage}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder="10"
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
              placeholder={tickSelect}
              labelField="label"
              valueField="value"
              value={tickSelect}
              maxHeight={300}
              onChange={text => settickSelect(text.label)}
              data={[
                {label: 'Fixed', value: '1'},
                {label: 'Percentage', value: '2'},
              ]}
            />
          )}
        />
        <TextInput
          value={maxValue}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Maximun Discounted Value'}
          placeholder={'Maximun Discounted Value'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setmaxValue(text);
          }}
        />
        <TextInput
          value={expiration}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          placeholder="Number Of Days"
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
              placeholder={point}
              labelField="label"
              valueField="value"
              value={point}
              maxHeight={300}
              onChange={text => setPoint(text.label)}
              data={[
                {label: 'Fixed', value: '1'},
                {label: 'Percentage', value: '2'},
              ]}
            />
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <DatePicker
            modal
            mode="date"
            open={openPicker}
            date={new Date()}
            onConfirm={date => {
              setOpenPicker(false);

              setDatePicker(moment(date).format('DD-MM-YYYY'));
            }}
            onCancel={() => {
              setOpenPicker(false);
            }}
          />
          <DatePicker
            modal
            mode="date"
            open={openPicker2}
            date={new Date()}
            onConfirm={date => {
              setOpenPicker2(false);
              setDatePicker2(moment(date).format('DD-MM-YYYY'));
            }}
            onCancel={() => {
              setOpenPicker2(false);
            }}
          />
          <TextInput
            value={datePicker}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Issued From '}
            placeholder={'Issued From '}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setissuedFrom(text);
            }}
            renderRightIcon={() => (
              <AppIcon
                name={'calendar'}
                type={'AntDesign'}
                size={20}
                color={theme.color.dropdownColor}
                onPress={() => setOpenPicker(true)}
              />
            )}
          />
          <TextInput
            value={datePicker2}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Issued Till '}
            placeholder={'Issued Till '}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setissuedTill(text);
            }}
            renderRightIcon={() => (
              <AppIcon
                name={'calendar'}
                type={'AntDesign'}
                size={20}
                color={theme.color.dropdownColor}
                onPress={() => setOpenPicker2(true)}
              />
            )}
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
            <TouchableOpacity onPress={() => selectTermsAndConditions}>
              <AppIcon
                name={'cloudupload'}
                type={'AntDesign'}
                size={22}
                color={theme.color.primary}
              />
            </TouchableOpacity>
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
            title={'List of Items included in Coupon'}
            leftIconName={'arrow-left'}
            leftIconType={'MaterialCommunityIcons'}
            onPressLeftIcon={() => refRBSheet.current.close()}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: vw(18),
                marginTop: vh(20),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setservices(!services);
                }}
                style={[
                  styles.btnTouch,
                  {
                    backgroundColor: services
                      ? theme.color.primary
                      : theme.color.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.btnText,
                    {color: services ? theme.color.white : theme.color.primary},
                  ]}>
                  Services
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setproducts(!products);
                }}
                style={[
                  styles.btnTouch,
                  {
                    backgroundColor: products
                      ? theme.color.primary
                      : theme.color.white,
                  },
                ]}>
                <Text
                  style={[
                    styles.btnText,
                    {color: products ? theme.color.white : theme.color.primary},
                  ]}>
                  Products
                </Text>
              </TouchableOpacity>
            </View>

            <AddServices />
          </Container>
          <CustomButton
            label={'APPLY'}
            onPress={() => refRBSheet.current.close()}
            extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
          />
        </RBSheet>
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
          <ApplicableOnService
            products={products}
            setProducts={setProducts}
            onPressApply={() => {
              refRBSheet.current.close();
            }}
          />
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
                setModalVisible(!modalVisible), navigation.navigate('Coupons');
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
    borderRadius: vw(60),
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
    borderRadius: vw(60),
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
  itemTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(24),
    marginTop: vh(22),
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: vh(17),
    borderColor: theme.color.bottomWidth,
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
});

export default CreateCoupon;
