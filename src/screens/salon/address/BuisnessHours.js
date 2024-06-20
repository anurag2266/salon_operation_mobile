import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../../components/common/ScrollContainer';
import CustomHeader from '../../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../../utils/dimensions';
import LocalImages from '../../../utils/LocalImages';
import ToggleSwitch from 'toggle-switch-react-native';
import theme from '../../../theme/theme';
import CustomButton from '../../../components/common/CustomButton';
import Container from '../../../components/common/Container';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSalonBussinesHrsAPI,
  updateBusinessHrsAPI,
} from '../../../api/services/salonBasicService';
import {ValueChanged} from '../../../redux/actions/flightActions';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import ProgressBar from '../../../components/common/ProgressBar';

const BuisnessHours = ({navigation}) => {
  const dispatch = useDispatch();

  const {salonTimings, salonDetails} = useSelector(
    state => state.flightReducer,
  );

  const handleGetBusinesshrs = async () => {
    const {data, status, message} = await getSalonBussinesHrsAPI(
      salonDetails._id,
    );
    if (status) {
      dispatch(ValueChanged('salonTimings', data));
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleUpdateDayTimings = async item => {
    const {data, message, status} = await updateBusinessHrsAPI({
      salonId: salonDetails._id,
      day: item.day,
      opened: item.opened ? item.opened : '',
      closed: item.closed ? item.closed : '',
      break_timings: item.break_timings,
      isOpen: !item.isOpen,
      isBreakTimingSame: false,
    });
    if (status) {
      console.log(data);
      dispatch(ValueChanged('salonTimings', data));
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetBusinesshrs();
    }, []),
  );

  const renderItem = ({item, index}) => {
    return (
      <>
        <View style={styles.mainView}>
          <ToggleSwitch
            isOn={item.isOpen}
            onColor={theme.color.switchOn}
            offColor={theme.color.switchOff}
            size="large"
            onToggle={() => handleUpdateDayTimings(item)}
          />
          <Text style={styles.titleText}>
            {item.day == 'mon'
              ? 'Monday'
              : item.day == 'tue'
              ? 'Tuesday'
              : item.day == 'wed'
              ? 'Wednesday'
              : item.day == 'thur'
              ? 'Thursday'
              : item.day == 'fri'
              ? 'Friday'
              : item.day == 'sat'
              ? 'Saturday'
              : item.day == 'sun'
              ? 'Sunday'
              : null}
          </Text>
          {item.isOpen ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SelectYourTiming', {daytime: item})
              }
              style={{flexDirection: 'row', marginRight: vw(13)}}>
              <Text style={styles.setYourTiming}>
                {item.opened && item.opened != ''
                  ? `${item.opened} - ${item.closed}`
                  : 'Set Your Timing'}
              </Text>
              <Image
                source={LocalImages.rightArrow}
                style={styles.rightArrow}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.closed}> Closed</Text>
          )}
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: theme.color.bottomWidth,
            marginLeft: vw(110),
          }}></View>
      </>
    );
  };
  return (
    <Container
      title="Business Hours"
      description="Select when you are open for bookings"
      bottomButtonTitle="Next"
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      scroll
      // disableRightButton={selectedCategory.length == 0}
      onPressBottomButton={() => {
        navigation.navigate('SalonSetupSteps');
      }}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons"
      progressBar={<ProgressBar progress={20} />}>
      <FlatList
        data={salonTimings}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(26),
    paddingVertical: vh(18),
  },
  titleText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    marginRight: vw(22),
    marginVertical: vh(8),
  },
  closed: {
    color: theme.color.DarkGrey,
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
    marginRight: vw(80),
    marginVertical: vh(10),
  },
  setYourTiming: {
    color: theme.color.LightBlue,
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
    marginRight: vw(20),
    marginVertical: vh(10),
  },
  rightArrow: {
    color: theme.color.rightArrow,
    marginVertical: vh(11),
    width: vw(16),
    height: vh(13),
  },
});

export default BuisnessHours;
