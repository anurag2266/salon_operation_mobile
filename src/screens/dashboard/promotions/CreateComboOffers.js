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
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import SelectDateAndTime from '../../SelectDateAndTime';
import React, {useState, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
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
import ApplicableOnService from '../../manageOffers/memberShip/ApplicableOnService';
import SelectYourTiming from '../../salon/address/SelectYourTiming';
import {useSelector} from 'react-redux';
import { addComboOffersData } from '../../../api/comboOffers/addComboOffers';
import { showMessage } from 'react-native-flash-message';
import ImageCropPicker from 'react-native-image-crop-picker';

const CreateComboOffers = ({navigation, route}) => {
  const {salonDetails}=useSelector(state=>state.flightReducer)
  const [image, setImage] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [promotionName, setpromotionName] = useState('');
  const [description, setDescription] = useState('');
  const [couponDescription, setcouponDescription] = useState('');
  const [customerTags, setcustomerTags] = useState('');
  const [minValue, setminValue] = useState('');
  const [percentage, setpercentage] = useState('');
  const [issuedFrom, setissuedFrom] = useState('');
  const [issuedTill, setissuedTill] = useState('');
  const [redemptionType, setRedemptionType] = useState('starton');
  const [startOn, setstartOn] = useState('');
  const [termsDescription, settermsDescription] = useState('');
  const [endOn, setendOn] = useState('');
  const [appliedOn, setappliedOn] = useState('Applicable On');
  const [appliedcardOn, setcarappliedOn] = useState([]);
  const [startfrom, setstartfrom] = useState('');
  const [endfrom, setendfrom] = useState('');
  const [buycount, setbuycount] = useState('');
  const [benefitCount,setBenefitCount]=useState('')
  const refRBSheet = useRef();
  const [services, setservices] = useState('');
  const [products, setProducts] = useState('');
  const [search, setSearch] = useState('');
  const [servicesShown, setservicesShown] = useState(false);
  const [tickSelect, settickSelect] = useState(false);
  const [selectAllCategory, setselectAllCategory] = useState(false);
  const [maxValue, setmaxValue] = useState('');
  const [expiration, setexpiration] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [minbillamount, setminbillamount] = useState('');
  const [spent, setSpent] = useState('');
  const [pointearned, setPointearned] = useState('');
  const [selectedServices, setSelectedServices] = useState(false);
  const [selectedBenifits,setSelectedBenifits]=useState(false)
  const [selectfree, setselectfree] = useState(false);
  const [selectdiscount, setselectdiscount] = useState(false);
  const [benefitAppliedOn,setBenefitAppliedOn]=useState('Applicable On')
  const [isMember, setIsMember] = useState(false);
  const [isAutoApply, setIsAutoApply] = useState(false);
  const [isAllowClubbingOffer, setIsAllowClubbingOffer] = useState(false);
  const [isAllowClubbingPurchaseItem, setIsAllowClubbingPurchaseItem] =
    useState(false);
  const [date, setDate] = useState(new Date());
  const [dateEnds, setDateEnds] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dayTime,setDayTime]=useState([])
  const [isSameTiming, setIsSameTiming] = useState(false);
  const maximumCodeLength = 4;

  const ref1RBSheet = useRef();
  const ref2RBSheet = useRef();
  const ref3RBSheet = useRef();
  const ref4RBSheet = useRef();



  const DataEarn = [
    {
      id: 1,
      imagePath: require('../../../assets/icons/membership-icon.png'),
      text: 'Services',
    },
    {
      id: 2,
      imagePath: require('../../../assets/icons/package-icon.png'),
      text: 'Members',
    },
    {
      id: 3,
      imagePath: require('../../../assets/icons/valuecard-icon.png'),
      text: 'Package',
    },
    {
      id: 4,
      imagePath: require('../../../assets/icons/giftcard-icon.png'),
      text: 'Gift Card',
    },
    {
      id: 5,
      imagePath: require('../../../assets/icons/giftcard-icon.png'),
      text: 'Discount Cards',
    },
    {
      id: 6,
      imagePath: require('../../../assets/icons/giftcard-icon.png'),
      text: 'Products',
    },
  ];

  const Data = [
    {
      id: 1,
      label: 'Members Only',
    },
    {
      id: 2,
      label: 'Auto apply',
    },
    {
      id: 3,
      label: 'Allow clubing with other offers',
    },
    {
      id: 4,
      label: 'Allow clubing with other purchased items',
    },
  ];

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('salonId', salonDetails._id);
    formData.append('offerName',promotionName);
    formData.append('selectDayAndTime',JSON.stringify(dayTime))
    formData.append('buyapplicableOn',appliedOn);
    formData.append('buycount', buycount);
    formData.append('buyproductIds', JSON.stringify(products));
    formData.append("buyserviceIds",JSON.stringify([]))
    formData.append('buyOnAnyselectedService', selectedServices);
    formData.append('buyOnAnyselectedProduct', selectedServices);
    formData.append('benifitType', selectfree==true?'Free':'Discount');
    formData.append('benifitapplicableOn', benefitAppliedOn);
    formData.append('benifitCount',benefitCount);
    formData.append('benifitproductIds', JSON.stringify(products));
    formData.append('benifitserviceIds', JSON.stringify([]));
    formData.append('benifitOnAnyselectedService', selectedBenifits),
    formData.append('benifitOnAnyselectedProduct',selectedBenifits)
    formData.append('startFrom', startfrom);
    formData.append('endOn', endfrom);
    formData.append(
      'redemptionSetting',
      JSON.stringify({
        for: redemptionType,
        startDate: date,
        endDate: dateEnds,
        noofdays:'1'
      }),
    );
    formData.append('shortDescription',description)
    formData.append('longDescription',description)
    formData.append('termandconditions',termsDescription.length>0?termsDescription:"Aggreed")
    formData.append('isMemberOnly', isMember)
    formData.append('isAutoApply', isAutoApply)
    formData.append('isAllowClubbingOffer', isAllowClubbingOffer)
    formData.append('isAllowClubbingPurchaseItem', isAllowClubbingPurchaseItem)
    formData.append("file", {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
    formData.append('tandCfile', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
   
    // console.log("Here is Form Data:",formData)
    // await addComboOffersData(formData).then((res)=>{
      navigation.navigate('ComboOffers');
    //   console.log('Here is response:',res.data)
    // })
    // if (route.params?.id) {
    //   const {statusCode,message,data}=await updateCouponData(formData)
    //   if (statusCode == 200) {
    //     navigation.navigate('ComboOffers');
    //     // setModalVisible(true);
    //   } else {
    //       showMessage({message: message, type: 'danger'});
    //   }
    // } else {
    //   const {statusCode, data, message} = await addComboOffersData(formData);
    //   console.log(statusCode,data,message)
    //   if (statusCode == 200) {
    //     navigation.navigate('ComboOffers')
    //   } else {
    //     showMessage({message: message, type: 'danger'});
    //   }
    // }
  };
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: vw(15),
        }}>
        {appliedOn.includes(item.label) ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <TouchableOpacity
          onPress={() => {
            if (appliedOn.includes(item.label)) {
              let temp = appliedOn.filter(element => element != item.label);
              setappliedOn(temp);
            } else setappliedOn(appliedOn.concat(item.label));
          }}
          style={[styles.itemTouch, styles.boxWithShadow]}>
          <Image
            source={item.imagePath}
            style={[styles.itemImg, {marginHorizontal: vw(10)}]}
          />
          <Text style={styles.itemTxt}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Create Combo Offers'}
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
        <TextInput
          value={promotionName}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Offer Name'}
          placeholder={'Promotion Name'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setpromotionName(text);
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
              }}
            />

     
          </RBSheet>


        <RBSheet
          ref={ref3RBSheet}
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

        <Text
          style={{
            fontFamily: theme.font.bold,
            color: theme.color.primary,
            paddingHorizontal: vw(20),
            marginTop: vh(15),
          }}>
          Buy Details
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
            ref3RBSheet.current.open();
          }}
          data={[
            {label: 'Services', value: '1'},
            {label: 'Products', value: '2'},
            {label: 'Both', value: '3'},
          ]}
        />
        <TextInput
          value={buycount}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Buy Count'}
          placeholder={'Buy Count'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setbuycount(text);
          }}
        />
        <View style={{flexDirection: 'row', marginTop: vh(15)}}>
          <TouchableOpacity
            onPress={() => setSelectedServices(!selectedServices)}
            style={{
              marginLeft: vw(10),
              marginTop: vh(10),
              paddingLeft: vw(12),
            }}>
            {selectedServices == true ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
          </TouchableOpacity>

          <Text
            style={{
              marginHorizontal: vw(20),
              marginTop: vh(10),
              fontFamily: theme.font.medium,
              fontSize: normalize(16),
            }}>
            On Any Selected Service
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: theme.font.bold,
              color: theme.color.primary,
              paddingHorizontal: vw(20),
              marginTop: vh(45),
            }}>
            Get Benefits Details
          </Text>
          <View style={{marginRight: vw(70), flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {setselectfree(!selectfree)
                  setselectdiscount(false)
                }
                }
                style={{
                  marginLeft: vw(10),
                  marginTop: vh(10),
                  paddingLeft: vw(12),
                }}>
                {selectfree == true ? (
                  <Image style={styles.checkimg} source={LocalImages.checked} />
                ) : (
                  <Image
                    style={styles.checkimg}
                    source={LocalImages.unchecked}
                  />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  marginHorizontal: vw(20),
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  fontSize: normalize(16),
                }}>
                Free
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {setselectdiscount(!selectdiscount)
                setselectfree(false)
                }
                }
                style={{
                  marginLeft: vw(10),
                  marginTop: vh(10),
                  paddingLeft: vw(12),
                }}>
                {selectdiscount == true ? (
                  <Image style={styles.checkimg} source={LocalImages.checked} />
                ) : (
                  <Image
                    style={styles.checkimg}
                    source={LocalImages.unchecked}
                  />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  marginHorizontal: vw(20),
                  marginTop: vh(10),
                  fontFamily: theme.font.medium,
                  fontSize: normalize(16),
                }}>
                Discount
              </Text>
            </View>
          </View>
        </View>
        <Dropdown
          style={[styles.input, {paddingVertical: vh(14)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholder={benefitAppliedOn}
          labelField="label"
          valueField="value"
          maxHeight={300}
          value={benefitAppliedOn}
          onChange={item => {
            setBenefitAppliedOn(item.label)
            ref3RBSheet.current.open();
          }}
          data={[
            {label: 'Services', value: '1'},
            {label: 'Products', value: '2'},
            {label: 'Both', value: '3'},
          ]}
        />
        <TextInput
          value={benefitCount}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Benefit Count'}
          placeholder={'Benefit Count'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setBenefitCount(text);
          }}
        />

        <View style={{flexDirection: 'row', marginTop: vh(15)}}>
          <TouchableOpacity
            onPress={() => setSelectedBenifits(!selectedBenifits)}
            style={{
              marginLeft: vw(10),
              marginTop: vh(10),
              paddingLeft: vw(12),
            }}>
            {selectedBenifits == true ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
          </TouchableOpacity>

          <Text
            style={{
              marginHorizontal: vw(20),
              marginTop: vh(10),
              fontFamily: theme.font.medium,
              fontSize: normalize(16),
            }}>
            On Any Selected Service
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={startfrom}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Start From'}
            placeholder={'Start From'}
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
            label={'End on'}
            placeholder={'Start From'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setendfrom(text);
            }}
          />
        </View>

        <Text
          style={{
            paddingHorizontal: vw(20),
            marginTop: vh(25),
            marginHorizontal: vw(15),
            fontFamily: theme.font.medium,
          }}>
          Redemption Settings
        </Text>
        <View style={{marginHorizontal: vw(25), marginVertical: vh(25)}}>
          <Text
            style={{
              color: theme.color.black,
              fontSize: normalize(18),
              fontFamily: theme.font.regular,
            }}>
            Redemption Duration
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
    {
        redemptionType == 'starton' ? 
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
        :
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
        renderRightIcon={() =>
          
            <AppIcon
              type="MaterialCommunityIcons"
              name="calendar-month"
              size={20}
              onPress={() => setOpenDate(true)}
            />
        
        }
      />
        </>  
      }
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
            setDescription(text);
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
              onPress={()=>selectTermsAndConditions()}
            />
          )}
        />
        <Text style={styles.textButton}>
          Above T&C will be shareable at checkout
        </Text>
        <Text style={styles.appliedText}>Applied on</Text>
        {Data.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.labelTouch}
              onPress={() => {
                if (appliedOn.includes(item.label)) {
                  let temp = appliedOn.filter(element => element != item.label);
                  setappliedOn(temp);
                } else setappliedOn(appliedOn.concat(item.label));
              }}>
              {appliedOn.includes(item.label) ? (
                <Image style={styles.checkimg} source={LocalImages.checked} />
              ) : (
                <Image style={styles.checkimg} source={LocalImages.unchecked} />
              )}
              <Text style={styles.labelText}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
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
      

          <CustomButton
            label={'APPLY'}
            onPress={() => refRBSheet.current.close()}
            extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
          />
        </RBSheet>
        <RBSheet
          ref={ref1RBSheet}
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
            title={'Loyalty Points Earned On'}
            onPressLeftIcon={() => ref1RBSheet.current.close()}>
            <FlatList
              data={DataEarn}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginTop: vh(30)}}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </Container>

          <CustomButton
            label={'APPLY'}
            onPress={() => refRBSheet.current.close()}
            extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
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
                setModalVisible(!modalVisible),
                  navigation.navigate('ComboOffers', {type: type});
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
});

export default CreateComboOffers;
