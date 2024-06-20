import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import SelectDateAndTime from '../../SelectDateAndTime';
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
import CustomButton from '../../../components/common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import OTPTextInput from 'react-native-otp-textinput';
import ApplicableOnService from '../../manageOffers/memberShip/ApplicableOnService';
import {useSelector} from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  addHappyHoursData,
  updateHappyHoursData,
} from '../../../api/promotions/happyHours';

const CreateHappyHours = ({navigation,route}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [startfrom, setstartfrom] = useState('');
  const [endfrom, setendfrom] = useState('');
  const [promotionName, setpromotionName] = useState('');
  const [description, setDescription] = useState('');
  const [dayTime, setDayTime] = useState([]);
  const [discountType, setDiscountType] = useState('Discount %');
  const [percentage, setpercentage] = useState('');
  const [redemptionType, setRedemptionType] = useState('starton');
  const [termsDescription, settermsDescription] = useState('');
  const [appliedOn, setappliedOn] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateEnds, setDateEnds] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [discountedOn, setDiscountedOn] = useState({
    onBillValue: false,
    onServiceProduct: false,
  });
  const [products, setProducts] = useState('');
  const [search, setSearch] = useState('');
  const [expiration, setexpiration] = useState('Expiration');
  const [noOfDays, setNoOfDays] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [termsFile, setTermsFile] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [isAutoApply, setIsAutoApply] = useState(false);
  const [isAllowClubbingOffer, setIsAllowClubbingOffer] = useState(false);
  const maximumCodeLength = 4;
  const refRBSheet = useRef();
  const ref2RBSheet = useRef();

  const DataApplicable = [
    {
      id: 1,
      label: 'Services',
    },
    {
      id: 1,
      label: 'Products',
    },
    {
      id: 1,
      label: 'Both',
    },
  ];

  const HandleSave = async () => {
    const formData = new FormData();
    formData.append('salonId', salonDetails._id);
    formData.append('happyHourName', promotionName);
    formData.append('selectDayAndTime', JSON.stringify(dayTime));
    formData.append('discounttype', discountType);
    formData.append('buyproductIds', JSON.stringify(products));
    formData.append('buyserviceIds', JSON.stringify(''));
    formData.append('discountedvalue', percentage);
    formData.append('applicableOn', appliedOn);
    formData.append(
      'discountedOn',
      discountedOn.onBillValue == true ? 'OnBillValue' : 'onServiceProducts',
    );
    formData.append('startFrom', startfrom);
    formData.append('endOn', endfrom);
    formData.append(
      'redemptionSetting',
      JSON.stringify({
        for: redemptionType,
        startDate: date,
        endDate: dateEnds,
        noofdays: noOfDays,
      }),
    );
    formData.append('shortDescription', description);
    formData.append('longDescription', description);
    formData.append(
      'termandconditions',
      termsDescription.length > 0 ? termsDescription : 'Aggreed',
    );
    formData.append('isMemberOnly', isMember);
    formData.append('isAutoApply', isAutoApply);
    formData.append('isAllowClubbingOffer', isAllowClubbingOffer);
    formData.append('file', {
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
    if (route.params?.id) {
      const {statusCode, message, data} = await updateHappyHoursData(formData);
      if (statusCode == 200) {
        navigation.navigate('HappyHours');
      } else {
        showMessage({message: message, type: 'danger'});
      }
    } else {
      const {statusCode, data, message} = await addHappyHoursData(formData);
      if (statusCode == 200) {
        navigation.navigate('HappyHours');
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
        title={'Create Happy Hours'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        // bottomButtonTitle={"SAVE"}
      >
        {image ? (
          <>
            <ImageBackground
              source={{
                uri: Platform.OS == 'ios' ? image.sourceURL : image.path,
              }}
              style={{...styles.Profile, overflow: 'hidden'}}>
              <TouchableOpacity
                style={styles.uploadTouch}
                onPress={() => SelectImage()}>
                <Image source={LocalImages.camera} style={styles.camera} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.couponImg}>Add image of your coupon here</Text>
          </>
        ) : (
          <>
            <ImageBackground
              source={LocalImages.Profile}
              style={styles.Profile}>
              <TouchableOpacity
                style={styles.uploadTouch}
                onPress={() => SelectImage()}>
                <Image source={LocalImages.camera} style={styles.camera} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.couponImg}>Add image of your coupon here</Text>
          </>
        )}

        <TextInput
          value={promotionName}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label={'Name'}
          placeholder={'Name'}
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setpromotionName(text);
          }}
        />

        <TextInput
          value={description}
          style={[styles.input]}
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
            dayTime={dayTime}
            setDayTime={setDayTime}
            onPressApply={() => {
              ref2RBSheet.current.close();
            }}
          />
        </RBSheet>

        <Text
          style={{
            fontFamily: theme.font.medium,
            marginHorizontal: vw(20),
            marginTop: vh(15),
          }}>
          Applicable on
        </Text>

        {DataApplicable.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.labelTouch]}
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
          <Text style={{fontFamily: theme.font.light}}>
            Select Services/Products
          </Text>
          <AppIcon name={'right'} type={'AntDesign'} size={18} />
        </TouchableOpacity>

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
              placeholder={discountType}
              labelField="label"
              valueField="value"
              value={discountType}
              maxHeight={300}
              onChange={text => setDiscountType(text.label)}
              data={[
                {label: 'Flat(₹)', value: '1'},
                {label: 'Percentage%', value: '2'},
              ]}
            />
          )}
        />
        <View style={{marginRight: vw(70), flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setDiscountedOn({
                  ...discountedOn,
                  onBillValue: !discountedOn.onBillValue,
                  onServiceProduct: false,
                });
              }}
              style={{
                marginLeft: vw(10),
                marginTop: vh(10),
                paddingLeft: vw(12),
              }}>
              {discountedOn.onBillValue == true ? (
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
              On Bill Value
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setDiscountedOn({
                  ...discountedOn,
                  onServiceProduct: !discountedOn.onServiceProduct,
                  onBillValue: false,
                });
              }}
              style={{
                marginLeft: vw(10),
                marginTop: vh(10),
                paddingLeft: vw(12),
              }}>
              {discountedOn.onServiceProduct == true ? (
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
              on Service/Products
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            value={startfrom}
            style={[styles.input, {width: '40%'}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Sale Start From'}
            placeholder={'Sale Start From'}
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
            label={'Sale Ends on'}
            placeholder={'Sale Ends on'}
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
        {/* <Text>{moment(date).format("DD-MM-YYYY")}</Text> */}
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
            <ApplicableOnService
              products={products}
              setProducts={setProducts}
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
        onPress={() => HandleSave()}
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
                setModalVisible(!modalVisible), navigation.navigate('Discount');
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

export default CreateHappyHours;
