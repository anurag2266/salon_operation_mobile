import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Modal,
  } from 'react-native';
  import React, {useState, useRef} from 'react';
  import theme from '../../theme/theme';
  import Container from '../../components/common/Container';
  import CustomButton from '../../components/common/CustomButton';
  import {normalize, vh, vw} from '../../utils/dimensions';
  import LocalImages from '../../utils/LocalImages';
  import {TextInput} from 'react-native-element-textinput';
  import Toggle from '../../components/common/Toggle';
  import {Dropdown} from 'react-native-element-dropdown';
  import RadioButton from '../../components/common/RadioButton';
  import AppIcon from '../../components/common/AppIcon';
  import OTPTextInput from 'react-native-otp-textinput';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import {useFocusEffect} from '@react-navigation/native';
  import moment from 'moment';
  import DatePicker from 'react-native-date-picker';

  import {showMessage} from 'react-native-flash-message';
  import {useCameraPermission} from '../../hooks/usePermissions';
  import {openSettings} from 'react-native-permissions';
  import ImageCropPicker from 'react-native-image-crop-picker';
import ApplicableOnService from '../../screens/manageOffers/memberShip/ApplicableOnService';

  import { useSelector } from 'react-redux';
  
  const ViewDiscountCard = ({navigation, route}) => {
    const {salonDetails}=useSelector(state=>state.flightReducer)
    const [file, setFile] = useState(null);
    const [appliedOnUniversal, setappliedOnUniversal] = useState(false);
    const [openSheet, setOpenSheet] = useState('Service');
    const [appliedOnCustomised, setappliedOnCustomised] = useState(false);
  
    const [selectedId, setSelectedId] = useState('');
    const [search, setSearch] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [redemptionType, setRedemptionType] = useState('starton');
    const [appliedOn, setappliedOn] = useState(false);
    const [clubing, setClubing] = useState(false);
  
    const [modalVisible, setModalVisible] = useState(false);
    const maximumCodeLength = 4;
    const [otp, setOtp] = useState('');
    const refRBSheet = useRef();
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState('');
    const [products,setProducts]=useState([])
    const [services,setServices]=useState([])
    const [date, setDate] = useState(new Date());
    const [datePicker, setDatePicker] = useState(new Date());
    const [datePicker2, setDatePicker2] = useState(new Date());
    const [dateEnds, setDateEnds] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [openPicker, setOpenPicker] = useState(false);
    const [openPicker2, setOpenPicker2] = useState(false);
    const [openDate, setOpenDate] = useState(false);
    const [selectService, setSelectService] = useState(false);
    const [selectProduct, setSelectProduct] = useState(false);
  
    const [myValidity, setmyValidity] = useState({
      expiration: '',
      enterNo: '',
      saleStartFrom: '',
      saleEndOn: '',
    });
  
    const [redemption, setRedemption] = useState({
      startDate: '',
      endDate: '',
    });
  
    const [membershipPlan, setmembershipPlan] = useState({
      planapplicablefor: '',
      name: '',
      membershipType: '',
      membershipTag: '',
      membercount: '',
      sacCode: '',
      applicableOn: '',
      validity: '',
      discountType: '',
      fixedAmount:'',
      allowFor: '',
      planPrice: '',
      valueWithTax: '',
      shortDescription: '',
      termandconditions: '',
      isAutoApply: '',
      isClubingwithoffers: '',
      isClubingwithpurchaseItems: '',
      imageUrl:
        'https://saints3bucket.s3.ap-south-1.amazonaws.com/salon/membershiptandCImages/1b69434104af9ba3.png',
    });
  
    const handleImagePicker = async () => {
      const result = await useCameraPermission();
      if (result) {
        ImageCropPicker.openPicker({
          width: vw(142),
          height: vw(142),
          cropping: true,
          mediaType: 'photo',
        })
          .then(res => {
            setFile(res);
          })
          .finally(close);
      } else {
        openSettings();
      }
    };
  
    const handleSubmit=()=>{
      const formData=new FormData()
  
      formData.append("salonId",salonDetails._id)
      formData.append("discountcardName",membershipPlan.name)
      formData.append("discountcardType",membershipPlan.membershipType)
      formData.append("tags",membershipPlan.membershipTag)
      formData.append("applicableOn",membershipPlan.planapplicablefor)
      formData.append("productIds",JSON.stringify())
      formData.append("serviceIds",)
      formData.append("productIds",)
      formData.append("totalServiceValue",)
      formData.append("discountType",)
      formData.append("fixedAmount",)
      formData.append("discountcardPrice",)
      formData.append("discountcardTotalPrice",)
      formData.append("expirationType",)
      formData.append("noOfDays",)
      formData.append("startFrom",)
      formData.append("endOn",)
      formData.append("shortDescription",)
      formData.append("redemptionSetting",)
      formData.append("termandconditions",)
      formData.append("isAutoApply",)
      formData.append("membersOnly",)
      formData.append("file",)
      formData.append("tandcfile")
  
  
    }
  
    return (
      <View style={{flex: 1, backgroundColor: theme.color.white}}>
        <Container
          title={'View Discount Card'}
          leftIconName={'arrow-left'}
          leftIconType={'MaterialCommunityIcons'}
          onPressLeftIcon={() => {
            navigation.goBack();
          }}>
          <Toggle
            onToggle={() => setIsActive(!isActive)}
            toggleValue={isActive}
            detail={'Manage Package Validity?'}
          />
          {file ? (
            <TouchableOpacity onPress={handleImagePicker}>
              <ImageBackground
                source={{
                  uri: Platform.OS == 'ios' ? file.sourceURL : file.path,
                }}
                style={styles.Profile}
                imageStyle={{borderRadius: vw(100)}}>
                <View style={styles.uploadTouch}>
                  <Image source={LocalImages.camera} style={styles.camera} />
                  <Text style={styles.uploadTxt}>Upload Image</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <ImageBackground source={LocalImages.Profile} style={styles.Profile}>
              <TouchableOpacity
                onPress={handleImagePicker}
                style={styles.uploadTouch}>
                <Image source={LocalImages.camera} style={styles.camera} />
                <Text style={styles.uploadTxt}>Upload Image</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
  
          <TextInput
            value={membershipPlan.name}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Discount Card Name'}
            placeholder={'Discount Card Name'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmembershipPlan({...membershipPlan, name: text});
            }}
          />
          <Dropdown
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            placeholder={'Discount Type'}
            labelField="label"
            valueField="value"
            maxHeight={300}
            data={[
              {label: 'Gold', value: '1'},
              {label: 'Silver', value: '2'},
              {label: 'Platinum', value: '3'},
            ]}
            value={{
              value: membershipPlan.membershipType,
              label: membershipPlan.membershipType,
            }}
            onChange={item => {
              setmembershipPlan({...membershipPlan, membershipType: item.label});
            }}
          />
          <TextInput
            value={membershipPlan.membershipTag}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Tags'}
            placeholder={'Tags'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmembershipPlan({...membershipPlan, membershipTag: text});
            }}
          />
                <TextInput
             // value={membershipPlan.membershipTag}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label={'SAC Code'}
              placeholder={'SAC Code'}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              // onChangeText={text => {
              //   setmembershipPlan({...membershipPlan, membershipTag: text});
              // }}
            />
          <Dropdown
            style={[styles.input, {paddingVertical: vh(14)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            placeholder={'Discount Card Applicable On'}
            labelField="label"
            valueField="value"
            maxHeight={300}
            onChange={(text) => {
              setmembershipPlan({...membershipPlan,planapplicablefor:text.label})
              refRBSheet.current.open();
            }}
            data={[
              {label: 'Services', value: '1'},
              {label: 'Products', value: '2'},
              {label: 'Both', value: '3'},
            ]}
          />
  
          <TextInput
            value={membershipPlan.serviceValue}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Total Service Value'}
            placeholder={'Total Service Value'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmembershipPlan({...membershipPlan, serviceValue: text});
            }}
            renderLeftIcon={() => <Text> ₹</Text>}
          />
  
          <TextInput
            value={membershipPlan.fixedAmount}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            placeholder="(RATE)"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmembershipPlan({...membershipPlan, fixedAmount: text});
            }}
            renderLeftIcon={() => (
              <Dropdown
                style={{width: '40%'}}
                inputStyle={styles.inputStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholder="Discount type"
                labelField="label"
                valueField="value"
                maxHeight={300}
                data={[
                  {label: 'Fixed', value: '1'},
                  {label: 'Percentage', value: '2'},
                ]}
                value={{
                  value: membershipPlan.discountType,
                  label: membershipPlan.discountType,
                }}
                onChange={item => {
                  setmembershipPlan({
                    ...membershipPlan,
                    discountType: item.label,
                  });
                }}
              />
            )}
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              value={membershipPlan.planPrice}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label={'Discount Card Price'}
              placeholder={'Discount Card Price'}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setmembershipPlan({...membershipPlan, planPrice: text});
              }}
            />
            <TextInput
              value={membershipPlan.valueWithTax}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label={'Total Price With Tax'}
              placeholder={'Total Price With Tax'}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setmembershipPlan({...membershipPlan, valueWithTax: text});
              }}
              onPressLeftIcon={() => <Text> ₹</Text>}
            />
          </View>
          <TextInput
            value={myValidity.enterNo}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            placeholder="(RATE)"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmyValidity({...myValidity, enterNo: text});
            }}
            renderLeftIcon={() => (
              <Dropdown
                style={{width: '40%'}}
                inputStyle={styles.inputStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={styles.placeholderStyle}
                placeholder="Expiration"
                labelField="label"
                valueField="value"
                maxHeight={300}
                data={[
                  {label: 'Fixed', value: '1'},
                  {label: 'Percentage', value: '2'},
                ]}
                value={{
                  value: myValidity.expiration,
                  label: myValidity.expiration,
                }}
                onChange={item => {
                  setmyValidity({...myValidity, expiration: item.label});
                }}
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
              label={'Sale Starts From'}
              placeholder={'Sale Starts From'}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
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
              label={'Sale Ends on'}
              placeholder={'Sale Ends on'}
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
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
            value={membershipPlan.shortDescription}
            style={[styles.input]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label={'Discount Card Description'}
            placeholder={'Discount Card Description'}
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setmembershipPlan({...membershipPlan, shortDescription: text});
            }}
          />
          <Text style={styles.textButton}>
            Above description will print on client bill
          </Text>
          <TextInput
            editable={false}
            value={membershipPlan.termandconditions}
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
              setmembershipPlan({...membershipPlan, termandconditions: text});
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
            style={styles.labelTouch}
            onPress={() => {
              setappliedOn(true);
              setClubing(false);
            }}>
            {appliedOn ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
            <Text style={styles.labelText}>Auto Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.labelTouch}
            onPress={() => {
              setappliedOn(false);
              setClubing(true);
            }}>
            {clubing ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
            <Text style={styles.labelText}>Members Only</Text>
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
        <Modal animationType={'slide'} visible={modalVisible}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <View style={styles.modalView}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.color.black,
                  fontFamily: theme.font.semiBold,
                  fontSize: normalize(24),
                }}>
                Enter Your Pin
              </Text>
              <View style={{marginTop: vh(40)}}>
                <OTPTextInput
                  style={styles.otpinput}
                  containerStyle={styles.inputContainer}
                  maximumLength={maximumCodeLength}
                  handleTextChange={text => setOtp(text)}
                />
              </View>
              <TouchableOpacity
                style={styles.btnTouch}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    color: theme.color.white,
                    fontFamily: theme.font.bold,
                    fontSize: normalize(18),
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <CustomButton
          label={'SAVE'}
          onPress={() => {
            handleSubmit()
            // setModalVisible(true);
          }}
          extraStyle={{marginTop: vh(50), marginBottom: vh(50)}}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    Profile: {
      width: vw(106),
      height: vw(106),
      borderRadius: vw(106),
      marginHorizontal: vw(24),
      marginTop: vh(25),
      alignSelf: 'center',
    },
    uploadTouch: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: vh(25),
    },
    camera: {
      width: vw(28),
      height: vw(28),
    },
    uploadTxt: {
      color: theme.color.white,
      fontFamily: theme.font.bold,
      fontSize: normalize(11),
      marginTop: vh(10),
    },
    applicableTxt: {
      color: theme.color.black,
      fontFamily: theme.font.medium,
      marginHorizontal: vw(24),
      marginTop: vh(35),
      fontSize: normalize(18),
    },
    labelTouch: {
      flexDirection: 'row',
      marginHorizontal: vw(21),
      marginTop: vh(21),
    },
    labelText: {
      marginHorizontal: vw(10),
      color: theme.color.black,
      fontFamily: theme.font.regular,
      fontSize: normalize(16),
    },
    checkimg: {
      width: vw(18),
      height: vw(18),
      color: theme.color.bottomWidth,
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
      fontSize: normalize(12),
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
    textButton: {
      marginHorizontal: vw(25),
      marginTop: vh(15),
      fontFamily: theme.font.regular,
      color: theme.color.LightBlue,
      fontWeight: '400',
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
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    otpinput: {
      height: vh(50),
      width: vw(55),
      textAlign: 'center',
      fontWeight: 'bold',
      marginHorizontal: vw(21),
      borderBottomWidth: 1,
      color: theme.color.primary,
    },
    modalView: {
      borderWidth: 1,
      paddingVertical: vh(63),
      backgroundColor: theme.color.white,
      borderRadius: vw(20),
      marginHorizontal: vw(10),
      borderColor: theme.color.white,
    },
    btnTouch: {
      alignItems: 'center',
      marginTop: vh(70),
      borderWidth: 1,
      alignSelf: 'center',
      paddingHorizontal: vw(70),
      paddingVertical: vh(17),
      borderRadius: vw(10),
      backgroundColor: theme.color.primary,
      borderColor: theme.color.primary,
    },
    labelTxt: {
      color: theme.color.black,
      fontFamily: theme.font.bold,
      textAlign: 'center',
    },
    filter: {
      marginLeft: vw(7),
      color: theme.color.Black_shadow,
      fontFamily: theme.font.regular,
      fontSize: normalize(14),
    },
    selectText: {
      marginHorizontal: vw(15),
      color: theme.color.Black_shadow,
      fontFamily: theme.font.medium,
      fontSize: normalize(16),
      marginBottom: vh(10),
    },
    TickImg: {
      width: vw(22),
      height: vh(22),
      marginRight: vw(12),
      marginVertical: vh(4),
    },
    row: {
      flexDirection: 'row',
      marginHorizontal: vw(15),
      marginBottom: vh(7),
    },
    itemTitleTxt: {
      color: theme.color.black,
      fontFamily: theme.font.semiBold,
      fontSize: normalize(16),
    },
    itemTxt: {
      color: theme.color.dropdownColor,
      fontFamily: theme.font.medium,
      fontSize: normalize(12),
    },
    boxWithShadow: {
      shadowColor: theme.color.shadow,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.6,
      shadowRadius: 2,
      elevation: 0,
    },
    labelImage: {
      borderWidth: 1,
      padding: vw(20),
      marginHorizontal: vw(5),
      marginBottom: vh(7),
      borderRadius: vw(60),
      borderColor: theme.color.white,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.color.white,
    },
    bottomWidth: {
      borderBottomWidth: 1,
      marginHorizontal: vw(21),
      marginVertical: vh(23),
      borderColor: theme.color.bottomWidth,
    },
  });
  
  export default ViewDiscountCard;
  