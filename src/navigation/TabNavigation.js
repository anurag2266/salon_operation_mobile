import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import AppIcon from '../components/common/AppIcon';
import Billing from '../screens/billing/Billing';
import Appointment from '../screens/dashboard/appointment/Appointment';
import ManageAnalytics from '../screens/dashboard/manageAnalytics/ManageAnalytics';
import Profiledashboard from '../screens/dashboard/Profiledashboard';
import theme from '../theme/theme';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.color.primary,
        tabBarInactiveTintColor: '#A1A1A1',
        tabBarLabelStyle: {
          fontFamily: theme.font.medium,
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          height: 100,
          backgroundColor: theme.color.white,
          paddingVertical: 13,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          overflow: 'hidden',
        },

        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Appointment') {
            iconName = focused ? 'calendar-month' : 'calendar-month';
          } else if (route.name === 'Billing') {
            return (
              <AppIcon
                type="FontAwesome5"
                name={'receipt'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Analytics') {
            iconName = focused
              ? 'chart-areaspline-variant'
              : 'chart-areaspline-variant';
          } else if (route.name === 'Profile') {
            return (
              <AppIcon
                type="Ionicons"
                name={'person-circle'}
                size={size}
                color={color}
              />
            );
          }
          return (
            <AppIcon
              type="MaterialCommunityIcons"
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={() => (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Home Screen</Text>
            <Text>Work in Progress...</Text>
          </View>
        )}
      />
      <Tab.Screen name="Appointment" component={Appointment} />
      <Tab.Screen name="Billing" component={Billing} />
      <Tab.Screen name="Analytics" component={ManageAnalytics} />
      <Tab.Screen name="Profile" component={Profiledashboard} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
