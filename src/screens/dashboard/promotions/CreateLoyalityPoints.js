import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
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

import {useSelector} from 'react-redux';
import {addLoyaltypointData} from '../../../api/promotions/loyalityPoints';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showMessage} from 'react-native-flash-message';

import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const CreateLoyalityPoints = ({navigation}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
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
  const [appliedOn, setappliedOn] = useState([]);
  const [appliedcardOn, setcarappliedOn] = useState([]);

  const [image, setImage] = useState(null);
  const [termsFile, setTermsFile] = useState(null);

  const [date, setDate] = useState(new Date());
  const [dateEnds, setDateEnds] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const refRBSheet = useRef();
  const [services, setservices] = useState('');
  const [products, setproducts] = useState('');
  const [search, setSearch] = useState('');
  const [servicesShown, setservicesShown] = useState(false);
  const [tickSelect, settickSelect] = useState(false);
  const [selectAllCategory, setselectAllCategory] = useState(false);
  const [maxValue, setmaxValue] = useState('');
  const [expirationType, setExpirationType] = useState('Expiration');
  const [expiration, setexpiration] = useState('');
  const [sacCode,setSacCode]=useState('')
  const [earnedOn, setEarnedOn] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [isAutoApply, setIsAutoApply] = useState(false);
  const [isAllowClubbingOffer, setIsAllowClubbingOffer] = useState(false);
  const [isAllowClubbingPurchaseItem, setIsAllowClubbingPurchaseItem] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [minbillamount, setminbillamount] = useState({
    minbillAmount: '',
    pointsEarned: '',
  });
  const [spent, setSpent] = useState({
    everySpent: '',
    pointsEarned: '',
  });
  const [unitPointValue, setUnitPointValue] = useState('');
  const [redemptionSetting, setRedemptionSetting] = useState('Points Redeem on');
  const maximumCodeLength = 4;

  const ref1RBSheet = useRef();

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

  const DataApplicable = [
    {
      id: 1,
      label: 'Purchase',
      name: 'shopping-cart',
      type: 'Feather',
      description:
        'Every time you shop online or in store, you’ll earn points. Rs. 50.00 = 1 Points.',
      description2:
        ' From time to time, you can earn extra points on your purchase -- so keep an eye out!',
    },
    {
      id: 2,
      label: 'Invite a Friend',
      name: 'adduser',
      type: 'AntDesign',
      description:
        ' Invite a friend to become a member and earn 50 points when they complete their setup process.',
    },
    {
      id: 3,
      label: 'Submit review',
      name: 'rate-review',
      type: 'MaterialIcons',
      description: 'Review your latest service and earn 2 points.',
    },
    {
      id: 4,
      label: 'Other',
      name: 'ellipsis-horizontal-circle',
      type: 'Ionicons',
      description:
        'When you receive points for corrections, post- registration, or similar activities.',
    },
  ];

  const SelectImage = async () => {
    await ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Here is Image:', image);
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

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('salonId', salonDetails._id);
    formData.append('loyaltyName', promotionName);
    formData.append('applicablefor', JSON.stringify(appliedOn));
    formData.append('shortDescription', description);
    formData.append('longDescription', description);
    formData.append('minbillamount', minbillamount.minbillAmount);
    formData.append('minbillEarnpoint', minbillamount.pointsEarned);
    formData.append('everySpentamount', spent.everySpent);
    formData.append('spentbillEarnpoint', spent.pointsEarned);
    formData.append('perPointValue', unitPointValue);
    formData.append('pointEarnOn', JSON.stringify(earnedOn));
    formData.append('Noofday', expiration);
    formData.append('expirationType', expirationType);
    formData.append('pointRedemedOn', JSON.stringify([redemptionSetting]));
    formData.append(
      'redemptionSetting',
      JSON.stringify({for: redemptionType, startDate: startOn, endDate: endOn,noofdays:"1"}),
    );
    formData.append('minbillamountforredme', minValue);
    // redemptionType,
    formData.append('termandconditions', termsDescription);
    formData.append('isMemberOnly', isMember);
    formData.append('isAutoApply', isAutoApply);
    formData.append('isAllowClubbingOffer', isAllowClubbingOffer);
    formData.append('isAllowClubbingPurchaseItem', isAllowClubbingPurchaseItem);
    formData.append('sacCode',sacCode);
    formData.append('file', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });
    formData.append('tandcfile', {
      uri:
        Platform.OS === 'ios'
          ? image?.sourceURL.replace('file://', '')
          : image?.path,
      name: image?.filename,
      type: image?.mime,
    });

    const {statusCode, data, message} = await addLoyaltypointData(formData);
    if (statusCode == 200) {
      navigation.navigate('LoyalityPoints');
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (earnedOn.includes(item.text)) {
            let temp = earnedOn.filter(element => element != item.text);
            setEarnedOn(temp);
          } else setEarnedOn(earnedOn.concat(item.text));
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        {earnedOn.includes(item.text) ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Image
          source={item.imagePath}
          style={[styles.itemImg, {marginHorizontal: vw(10)}]}
        />
        <Text style={styles.itemTxt}>{item.text}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Create Loyality Points'}
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
          label={'Promotion Name'}
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
          onPress={() => refRBSheet.current.open()}>
          <Text style={{fontFamily: theme.font.light}}>Applicable on</Text>
          <AppIcon name={'down'} type={'AntDesign'} size={18} />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={minbillamount.minbillAmount}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Min. Bill Amount'}
            placeholder={'Min. Bill Amount'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setminbillamount({
                ...minbillamount,
                minbillAmount: text,
              });
            }}
          />
          <TextInput
            value={minbillamount.pointsEarned}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Points earned'}
            placeholder={'Points earned'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setminbillamount({...minbillamount, pointsEarned: text});
            }}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={spent.everySpent}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'For Every Spent'}
            placeholder={'For Every Spent'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSpent({...spent, everySpent: text});
            }}
          />
          <TextInput
            value={spent.pointsEarned}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Points earned'}
            placeholder={'Points earned'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setSpent({...spent, pointsEarned: text});
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              marginHorizontal: vw(10),
              marginTop: vh(30),
              fontFamily: theme.font.regular,
              fontSize: normalize(30),
            }}>
            1 Point Value ={' '}
          </Text>
          <TextInput
            value={unitPointValue}
            style={[styles.input, {width: '30%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            onChangeText={text => {
              setUnitPointValue(text);
            }}
            renderLeftIcon={() => (
              <Text style={{fontFamily: theme.font.light}}>Rs.</Text>
            )}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.input,
            {
              paddingVertical: vh(14),
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => ref1RBSheet.current.open()}>
          <Text style={{fontFamily: theme.font.light}}>Points earned on</Text>
          <AppIcon name={'down'} type={'AntDesign'} size={18} />
        </TouchableOpacity>

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
              placeholder={expirationType}
              labelField="label"
              valueField="value"
              maxHeight={300}
              value={expirationType}
              onChange={text => setExpirationType(text.label)}
              data={[
                {label: 'Fixed', value: '1'},
                {label: 'Percentage', value: '2'},
              ]}
            />
          )}
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
        <Text
          style={{
            paddingHorizontal: vw(20),
            marginTop: vh(25),
            marginHorizontal: vw(15),
            fontFamily: theme.font.medium,
          }}>
          Redemption Settings
        </Text>

        <Dropdown
          style={[styles.input, {paddingVertical: vh(14)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          placeholder={redemptionSetting}
          labelField="label"
          valueField="value"
          maxHeight={300}
          onChange={text => setRedemptionSetting(text.label)}
          data={[
            {label: 'Fixed', value: '1'},
            {label: 'Percentage', value: '2'},
          ]}
        />
        <TextInput
          value={minValue}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Minimum Bill Amount'}
          placeholder={'Minimum Bill  Amount'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setminValue(text);
          }}
        />

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
          label="Loyality point Description"
          placeholder="Loyality point Description"
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
            title={'Loyalty points applicable on'}
            onPressLeftIcon={() => refRBSheet.current.close()}>
            {DataApplicable.map((item, index) => {
              return (
                <>
                  <TouchableOpacity
                    key={item.id}
                    style={styles.labelTouch}
                    onPress={() => {
                      if (appliedOn.includes(item.label)) {
                        let temp = appliedOn.filter(
                          element => element != item.label,
                        );
                        setappliedOn(temp);
                      } else setappliedOn(appliedOn.concat(item.label));
                    }}>
                    {appliedOn.includes(item.label) ? (
                      <Image
                        style={styles.checkimg}
                        source={LocalImages.checked}
                      />
                    ) : (
                      <Image
                        style={styles.checkimg}
                        source={LocalImages.unchecked}
                      />
                    )}
                    <AppIcon
                      name={item.name}
                      type={item.type}
                      size={25}
                      style={{marginHorizontal: vw(15)}}
                      color={theme.color.primary}
                    />
                    <Text style={[styles.labelText]}>{item.label}</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: theme.font.medium,
                      color: theme.color.darkGrey,
                      marginLeft: vw(79),
                      marginRight: vw(30),
                      marginVertical: vh(10),
                      fontSize: normalize(14),
                    }}>
                    {item.description}
                  </Text>
                  <Text
                    style={{
                      fontFamily: theme.font.medium,
                      color: theme.color.darkGrey,
                      marginLeft: vw(79),
                      marginRight: vw(30),
                      fontSize: normalize(14),
                    }}>
                    {item.description2}
                  </Text>
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      color: theme.color.darkGrey,
                      marginHorizontal: 30,
                      marginTop: vh(15),
                    }}
                  />
                </>
              );
            })}
          </Container>


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
              // keyExtractor={item => console.log("Item Value:",item.id)}
            />
          </Container>

          <CustomButton
            label={'APPLY'}
            onPress={() => ref1RBSheet.current.close()}
            extraStyle={{marginTop: vh(30), marginBottom: vh(30)}}
          />
        </RBSheet>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          handleSave();
          // route.params.fromScreen === 'Coupons'
          //   ? navigation.navigate('Coupons', {type: type})
          //   : setModalVisible(true);
        }}
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
                  navigation.navigate('Coupons', {type: type});
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
    marginHorizontal: vw(12),
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

export default CreateLoyalityPoints;
