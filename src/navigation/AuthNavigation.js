import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AboutUs from '../screens/Auth/AboutUs';
import CreateNewPwd from '../screens/Auth/CreateNewPwd';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import GettingStarted from '../screens/Auth/GettingStarted';
import Login from '../screens/Auth/Login';
import MobileNumber from '../screens/Auth/MobileNumber';
import OtpScreen from '../screens/Auth/OtpScreen';
import ResetPassword from '../screens/Auth/ResetPassword';

import SelectYourLanguage from '../screens/Auth/SelectYourLanguage';
import TermAndCondition from '../screens/Auth/TermAndCondition';
import TermAndConditionDescription from '../screens/Auth/TermAndConditionDescription';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="SelectYourLanguage" component={SelectYourLanguage} />
      <Stack.Screen name="TermAndCondition" component={TermAndCondition} />
      <Stack.Screen
        options={{gestureEnabled: true}}
        name="TermAndConditionDescription"
        component={TermAndConditionDescription}
      />
      <Stack.Screen name="MobileNumber" component={MobileNumber} />

      <Stack.Screen
        options={{gestureEnabled: false}}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="CreateNewPwd" component={CreateNewPwd} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
