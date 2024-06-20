import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUserDetailsAPI} from '../api/services/authService';
import {ValueChanged} from '../redux/actions/flightActions';
import SplashScreen from '../screens/SplashScreen';
import {clearStorage} from '../utils/localStorage';
import AuthNavigation from './AuthNavigation';
import SalonSetupNavigation from './SalonSetupNavigation';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {isLogin, userDetails} = useSelector(state => state.flightReducer);

  const handleGetUserDetails = async () => {
    setLoading(true);
    const {status, message, data} = await getUserDetailsAPI();
    if (status) {
      dispatch(ValueChanged('isLogin', true));
      dispatch(ValueChanged('userDetails', data));
      dispatch(ValueChanged('salonDetails', data.salons[0]));
      dispatch(ValueChanged('salonTimings', data.salons[0].salonTimings));
      setLoading(false);
    } else {
      dispatch(ValueChanged('isLogin', false));
      dispatch(ValueChanged('userDetails', {}));
      dispatch(ValueChanged('salonDetails', {}));
      dispatch(ValueChanged('salonTimings', []));

      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserDetails();
    // clearStorage();
    // dispatch(ValueChanged('isLogin', false));
    // dispatch(ValueChanged('userDetails', {}));
    // dispatch(ValueChanged('salonDetails', {}));
  }, []);

  return loading ? (
    <SplashScreen />
  ) : (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="AuthNavigation">
      {!isLogin ? (
        <Stack.Screen
          options={{gestureEnabled: false}}
          name="Auth"
          component={AuthNavigation}
        />
      ) : (
        <Stack.Screen
          options={{gestureEnabled: false}}
          name="SalonSetup"
          component={SalonSetupNavigation}
        />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
