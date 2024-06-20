import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import theme from '../../../../theme/theme';
import Container from '../../../../components/common/Container';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getSalonServicesBySalonID} from '../../../../api/services/salonMap';

const ServiceSetup = ({navigation, route}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetSalonServiceData = async () => {
    setLoading(true);
    const {status, data, message} = await getSalonServicesBySalonID(
      salonDetails._id,
    );

    if (status) {
      setServices(data);
      setLoading(false);
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSalonServiceData();
    }, []),
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SelectedServicesDetails', {serviceDetail: item});
        }}
        style={styles.itemTouch}>
        <Text style={styles.value}>{item?.serviceId?.serviceName}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          color={theme.color.dropdownColor}
          size={15}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Service Setup'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      loading={loading}
      leftIconType={'MaterialCommunityIcons'}>
      {/* <Text style={styles.selectedServiceText}>
        List of your Selected Services
      </Text> */}
      <View
        style={{
          height: vh(270),
          marginHorizontal: vw(15),
          borderRadius: vw(20),
          overflow: 'hidden',
          backgroundColor: theme.color.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
          marginVertical: vh(20),
          borderWidth: 0.1,
          borderColor: theme.color.primary,
          alignItems: 'center',

          // justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: theme.color.primary,
            height: vh(217),
            borderRadius: vw(20),
            width: '100%',
            position: 'relative',
            padding: vw(25),
          }}>
          <Text style={styles.cardTitle}>Manage Services</Text>
          <Text
            style={{
              ...styles.cardTitle,
              fontSize: normalize(16),
              fontWeight: '400',
            }}>
            List of your selected services
          </Text>
          <Image
            style={{position: 'absolute', bottom: 2, right: 2}}
            source={require('../../../../assets/images/maintence.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddServices');
          }}>
          <Text style={{marginTop: vh(15), color: theme.color.LightBlue}}>
            + Add New Service
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: vh(20)}}>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  selectedServiceText: {
    marginVertical: vh(24),
    marginHorizontal: vw(24),
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(21),
  },
  border: {
    borderBottomWidth: 1,
    marginHorizontal: vw(24),
    borderColor: theme.color.Black_shadow,
  },
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(15),
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: vh(10),
    borderColor: theme.color.bottomWidth,
    paddingVertical: vh(23),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: vw(14),
    backgroundColor: 'white',
  },
  value: {
    fontSize: normalize(16),
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
  },
  addNew: {
    color: theme.color.LightBlue,
    marginVertical: vh(10),
    marginHorizontal: vw(24),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  cardTitle: {
    fontFamily: theme.font.regular,
    fontWeight: '600',
    fontSize: normalize(24),
    color: theme.color.white,
  },
});

export default ServiceSetup;
