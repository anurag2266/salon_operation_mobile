import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {vw, vh, normalize} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import LocalImages from '../../../utils/LocalImages';
import CustomButton from '../../../components/common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import VerificationScreen from '../../VerificationScreen';
import Container from '../../../components/common/Container';
import {getSalonStepsStatusAPI} from '../../../api/services/salonBasicService';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import AppIcon from '../../../components/common/AppIcon';
import ProgressBar from '../../../components/common/ProgressBar';

const SalonSetupSteps = ({navigation}) => {
  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [steps, setSteps] = useState({
    addProduct: false,
    addServices: false,
    addStylist: false,
    businessHours: false,
    createProfile: false,
    salonOperations: false,
    setupPaymentMethod: false,
    showWorkplace: false,
  });

  const handleGetSalonStepStatus = async () => {
    setLoading(true);
    const {data, status, message} = await getSalonStepsStatusAPI(
      salonDetails._id,
    );
    if (status) {
      setSteps(data);
      setLoading(false);
    } else {
      setLoading(false);
      // showMessage({message: message, type: 'danger'});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSalonStepStatus();
    }, []),
  );

  return (
    <Container
      loading={loading}
      title="Salon Set-Up Steps"
      description="Follow us till the end through the steps"
      leftIconName="arrow-left"
      leftIconType={'MaterialCommunityIcons'}
      leftIconColor={theme.color.dropdownColor}
      bottomButtonTitle="Continue"
      onPressBottomButton={() => navigation.navigate('Tabs')}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      scroll={false}
      progressBar={<ProgressBar progress={20} />}>
      <View>
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MapViewScreen');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color: !steps.createProfile
                  ? theme.color.LightBlue
                  : theme.color.black,
              }}>
              Create Your Salon Profile
            </Text>

            <AppIcon
              type={steps.createProfile ? 'AntDesign' : 'Feather'}
              name={steps.createProfile ? 'checkcircle' : 'circle'}
              color={
                steps.createProfile ? theme.color.switchOn : theme.color.black
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.createProfile}
            onPress={() => {
              navigation.navigate('BuisnessHours');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.createProfile && !steps.businessHours
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Setup Business Hours
            </Text>

            <AppIcon
              type={steps.businessHours ? 'AntDesign' : 'Feather'}
              name={steps.businessHours ? 'checkcircle' : 'circle'}
              color={
                steps.businessHours ? theme.color.switchOn : theme.color.grey
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.businessHours}
            onPress={() => {
              navigation.navigate('ShowYourWorkplace');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.businessHours && !steps.showWorkplace
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Show Your Workplace
            </Text>

            <AppIcon
              type={steps.showWorkplace ? 'AntDesign' : 'Feather'}
              name={steps.showWorkplace ? 'checkcircle' : 'circle'}
              color={
                steps.showWorkplace ? theme.color.switchOn : theme.color.grey
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.showWorkplace}
            onPress={() => {
              navigation.navigate('AddSalonDetailForm');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.showWorkplace && !steps.salonOperations
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Salon Operations
            </Text>

            <AppIcon
              type={steps.salonOperations ? 'AntDesign' : 'Feather'}
              name={steps.salonOperations ? 'checkcircle' : 'circle'}
              color={
                steps.salonOperations ? theme.color.switchOn : theme.color.grey
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>

        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.salonOperations}
            onPress={() => {
              navigation.navigate('AddServices');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.salonOperations && !steps.addServices
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Add Services
            </Text>

            <AppIcon
              type={steps.addServices ? 'AntDesign' : 'Feather'}
              name={steps.addServices ? 'checkcircle' : 'circle'}
              color={
                steps.addServices ? theme.color.switchOn : theme.color.grey
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.addServices}
            onPress={() => {
              navigation.navigate('StartAddingStylist');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.addServices && !steps.addStylist
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Add Employee
            </Text>

            <AppIcon
              type={steps.addStylist ? 'AntDesign' : 'Feather'}
              name={steps.addStylist ? 'checkcircle' : 'circle'}
              color={steps.addStylist ? theme.color.switchOn : theme.color.grey}
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        {/* {steps.isSalonSellProducts ? ( */}
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.addStylist}
            onPress={() => {
              navigation.navigate('AddProduct');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.addStylist && !steps.addProduct
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Add Products
            </Text>

            <AppIcon
              type={steps.addProduct ? 'AntDesign' : 'Feather'}
              name={steps.addProduct ? 'checkcircle' : 'circle'}
              color={steps.addProduct ? theme.color.switchOn : theme.color.grey}
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
        {/* ) : null} */}
        <View style={{marginHorizontal: vw(56)}}>
          <TouchableOpacity
            disabled={!steps.addProduct}
            onPress={() => {
              navigation.navigate('SetupPaymentMethod');
            }}
            style={styles.touchView}>
            <Text
              style={{
                ...styles.valueText,
                color:
                  steps.addProduct && !steps.setupPaymentMethod
                    ? theme.color.LightBlue
                    : theme.color.black,
              }}>
              Setup Payment Method
            </Text>

            <AppIcon
              type={steps.setupPaymentMethod ? 'AntDesign' : 'Feather'}
              name={steps.setupPaymentMethod ? 'checkcircle' : 'circle'}
              color={
                steps.setupPaymentMethod
                  ? theme.color.switchOn
                  : theme.color.grey
              }
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.bottomWidth}></View>
        </View>
      </View>
      {/* <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(733),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <VerificationScreen />
      </RBSheet>
      <CustomButton
        label={'Continue'}
        onPress={() => {
          refRBSheet.current.open();
          navigation.navigate('');
        }}
        extraStyle={{marginTop: vh(120)}}
      /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  touchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: vh(42),
    alignItems: 'center',
  },
  valueText: {
    color: theme.color.valueText,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
});

export default SalonSetupSteps;
