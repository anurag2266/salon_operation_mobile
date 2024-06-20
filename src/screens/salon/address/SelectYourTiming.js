import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Switch,
  StyleSheet,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {normalize, vh, vw} from '../../../utils/dimensions';
import {Picker} from '@react-native-picker/picker';
import theme from '../../../theme/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import LocalImages from '../../../utils/LocalImages';
import CustomButton from '../../../components/common/CustomButton';
import BreakTiming from './BreakTiming';
import Container from '../../../components/common/Container';
import {useDispatch, useSelector} from 'react-redux';
import AppIcon from '../../../components/common/AppIcon';
import {updateBusinessHrsAPI} from '../../../api/services/salonBasicService';
import {useEffect} from 'react';
import {ValueChanged} from '../../../redux/actions/flightActions';
import ProgressBar from '../../../components/common/ProgressBar';
import {useFocusEffect} from '@react-navigation/native';
import {getUserDetailsAPI} from '../../../api/services/authService';
import {showMessage} from 'react-native-flash-message';

let data = Array.from({length: 12}, (_, i) => i + 1)
  .map(String)
  .map(item => item + ':00');
data = [...data]
  .map(item => item + ' AM')
  .concat([...data].map(item => item + ' PM'));

const SelectYourTiming = ({navigation, route}) => {
  const refRBSheet = useRef();
  const {daytime} = route.params;
  const dispatch = useDispatch();
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [isSameTiming, setIsSameTiming] = useState(false);
  const [timingData, setTimingData] = useState([]);

  const [dayTimings, setDayTimings] = useState({
    salonId: salonDetails._id,
    day: daytime.day,
    opened: daytime.opened,
    closed: daytime.closed,
    break_timings: daytime.break_timings,
    isOpen: daytime.isOpen,
    isBreakTimingSame: false,
  });
  const [breakTiming, setBreakTiming] = useState({startTime: '', endTime: ''});

  useEffect(() => {
    if (isSameTiming) {
      setDayTimings({...dayTimings, day: 'all'});
    } else {
      setDayTimings({...dayTimings, day: daytime.day});
    }
  }, [isSameTiming]);

  const handleUpdateDayTimings = async () => {
    const {data, message, status} = await updateBusinessHrsAPI(dayTimings);
    if (status) {
      showMessage({message: message, type: 'success'});
      dispatch(ValueChanged('userDetails', data));
      dispatch(ValueChanged('salonDetails', data.salons[0]));
      navigation.goBack();
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  // const handleGetUserInfo = async () => {
  //   const {status, message, data} = await getUserDetailsAPI();
  //   console.log('User data--->', data.salons[0].timings);

  //   if (status) {
  //     setDayTimings(data.salons[0].timings.filter(i => i.));
  //   } else {
  //     showMessage({message: message, type: 'danger'});
  //   }
  // };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     handleGetUserInfo();
  //   }, []),
  // );

  return (
    <Container
      title={
        daytime.day == 'mon'
          ? 'Monday'
          : daytime.day == 'tue'
          ? 'Tuesday'
          : daytime.day == 'wed'
          ? 'Wednesday'
          : daytime.day == 'thur'
          ? 'Thursday'
          : daytime.day == 'fri'
          ? 'Friday'
          : daytime.day == 'sat'
          ? 'Saturday'
          : daytime.day == 'sun'
          ? 'Sunday'
          : null
      }
      description="Select when you are open for bookings"
      leftIconName="arrow-left"
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconColor={theme.color.dropdownColor}
      leftIconType="MaterialCommunityIcons"
      progressBar={<ProgressBar progress={20} />}>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: vh(21),
          backgroundColor: 'rgba(0, 120, 253, 0.05)',
        }}>
        <Picker
          selectedValue={dayTimings.opened}
          dropdownIconColor={theme.color.black}
          onValueChange={val => setDayTimings({...dayTimings, opened: val})}
          style={{width: 150, marginHorizontal: 14}}>
          {data?.map(item => (
            <Picker.Item label={item} value={item} color={theme.color.black} />
          ))}
        </Picker>
        <Picker
          dropdownIconColor={theme.color.black}
          selectedValue={dayTimings.closed}
          onValueChange={val => setDayTimings({...dayTimings, closed: val})}
          style={{width: 150, marginHorizontal: 14}}>
          {data?.map(item => (
            <Picker.Item label={item} value={item} color={theme.color.black} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={styles.otherDays}>Set it same for all the days</Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={() => setIsSameTiming(!isSameTiming)}
          value={isSameTiming}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        dragFromTopOnly
        customStyles={{
          // wrapper: {
          //   backgroundColor: 'transparent',
          // },
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(566),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <BreakTiming
          breakEnd={breakTiming.endTime}
          breakStart={breakTiming.startTime}
          setBreakEnd={val => setBreakTiming({...breakTiming, endTime: val})}
          setBreakStart={val =>
            setBreakTiming({...breakTiming, startTime: val})
          }
          isSameBreakTiming={dayTimings.isBreakTimingSame}
          onPressSave={() => {
            setDayTimings({
              ...dayTimings,
              break_timings: [
                ...dayTimings.break_timings,
                {
                  start_break: breakTiming.startTime,
                  end_break: breakTiming.endTime,
                },
              ],
            });
            refRBSheet.current.close();
          }}
          setIsSameBreakTiming={() =>
            setDayTimings({
              ...dayTimings,
              isBreakTimingSame: !dayTimings.isBreakTimingSame,
            })
          }
        />
      </RBSheet>
      <Text style={styles.breakTimimgs}>Break Time</Text>
      <Text style={styles.breakTime}>Set when you are on a break </Text>

      {dayTimings?.break_timings?.length > 0 ? (
        <View>
          {dayTimings.break_timings.map((item, index) => (
            <View
              style={{
                backgroundColor: 'rgba(0, 120, 253, 0.05)',
                padding: vh(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: normalize(14),
                  color: theme.color.black,
                  fontFamily: theme.font.semiBold,
                }}>
                {item.start_break + ' - ' + item.end_break}
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppIcon
                  name={'pencil'}
                  type={'Ionicons'}
                  size={18}
                  style={{marginRight: vw(10)}}
                  color={theme.color.LightBlue}
                  onPress={() =>
                    setDayTimings({
                      ...dayTimings,
                      break_timings: dayTimings.break_timings.filter(
                        (val, ind) => index != ind,
                        refRBSheet.current.open(),
                      ),
                    })
                  }
                />
                <AppIcon
                  onPress={() =>
                    setDayTimings({
                      ...dayTimings,
                      break_timings: dayTimings.break_timings.filter(
                        (val, ind) => index != ind,
                      ),
                    })
                  }
                  color="red"
                  type="MaterialCommunityIcons"
                  name="delete"
                />
              </View>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open();
            }}>
            <Text
              style={{
                color: theme.color.LightBlue,
                marginHorizontal: vw(25),
                marginTop: vh(10),
              }}>
              + Add multiple breaks
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}
          style={styles.setBreakTimeTouch}>
          <Text style={styles.setBreakTime}>Add your break hours here</Text>
          <Image
            source={LocalImages.rightArrow}
            style={{width: vw(16), height: vh(13), marginRight: vw(21)}}
          />
        </TouchableOpacity>
      )}

      <CustomButton
        label={'Save'}
        onPress={handleUpdateDayTimings}
        extraStyle={{marginTop: vh(100)}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  },
  otherDays: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.darkGrey,
  },
  breakTimimgs: {
    marginTop: vh(41),
    textAlign: 'center',
    fontSize: normalize(24),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  breakTime: {
    marginVertical: vh(9),
    textAlign: 'center',
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.darkGrey,
  },
  setBreakTime: {
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
    color: theme.color.LightBlue,
    marginLeft: vw(29),
  },
  setBreakTimeTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 120, 253, 0.05)',
    padding: vw(20),
  },
});

export default SelectYourTiming;
