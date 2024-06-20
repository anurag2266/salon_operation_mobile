import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import ContainerBasic from '../../../components/common/BasicContainer';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import useCurrentLocation from '../../../hooks/useCurrentLocation';
import {vh, vw, normalize} from '../../../utils/dimensions';
import CustomButton from '../../../components/common/CustomButton';
import AppIcon from '../../../components/common/AppIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextInput} from 'react-native-element-textinput';
import {addSalonAddressAPI} from '../../../api/services/salonBasicService';
import {useDispatch, useSelector} from 'react-redux';
import theme from '../../../theme/theme';
import {showMessage} from 'react-native-flash-message';
import Container from '../../../components/common/Container';
import {ValueChanged} from '../../../redux/actions/flightActions';

const mapKey = 'AIzaSyCa2UU39SqehkAxIO7X7iMmBkqZjt4GzuQ';

const MapViewScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const currentLocation = useCurrentLocation();
  const addressFormRef = useRef();
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);

  const [location, setLocation] = useState({});
  const [address, setAddress] = useState(null);
  const [completeAddress, setCompleteAddress] = useState({
    building: salonDetails?.address1,
    addressLine1: salonDetails?.address2,
    addressLine2: salonDetails?.address3,
    city: salonDetails?.city,
    pincode: salonDetails?.pinCode,
    state: salonDetails?.state,
    country: salonDetails?.country,
    landmark: salonDetails?.landmark,
  });

  useEffect(() => {
    handleChangeLocation();
  }, [location]);

  useEffect(() => {
    addressFormRef.current.open();
    if (salonDetails.lattitude) {
      setLocation({
        latitude: salonDetails.lattitude,
        longitude: salonDetails.longitude,
      });
    } else {
    }
  }, []);

  const handleChangeLocation = async () => {
    try {
      Geocoder.init(mapKey);
      Geocoder.from({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000921,
      })
        .then(json => {
          var currentAddress = json.results[0].formatted_address;
          var result = json.results[0].address_components;
          const state = result.find(c =>
            c.types.includes('administrative_area_level_1'),
          );
          const country = result.find(c => c.types.includes('country'));
          const sublocality1 = result.find(c =>
            c.types.includes('sublocality_level_1'),
          );
          const sublocality2 = result.find(c =>
            c.types.includes('sublocality_level_2'),
          );
          const route = result.find(c => c.types.includes('route'));
          const street = result.find(c => c.types.includes('street_number'));
          const locality = result.find(c => c.types.includes('locality'));
          const pincode = result.find(c => c.types.includes('postal_code'));

          setCompleteAddress({
            building: street?.long_name,
            addressLine1: route?.long_name,
            addressLine2: sublocality1?.long_name,
            city: locality?.long_name,
            pincode: pincode?.long_name,
            state: state?.long_name,
            country: country?.long_name,
            landmark: '',
          });

          setAddress(currentAddress);
        })
        .catch(error => console.warn(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container
        title={'Your Address'}
        description={'Where can your clients find you?'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        leftIconColor={theme.color.dropdownColor}
        onPressLeftIcon={() => navigation.goBack()}
        bottomButtonTitle={'Confirm'}
        onPressBottomButton={() => addressFormRef.current.open()}>
        <MapView
          style={{
            zIndex: -999,
            height: Dimensions.get('screen').height,
            width: '100%',
          }}
          provider="google"
          followsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass
          showsBuildings
          showsScale={true}
          showsUserLocation={true}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.000921,
            longitudeDelta: 0.000921,
          }}
          focusable
          onPress={e =>
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }>
          <Marker
            coordinate={location}
            draggable
            onDragEnd={e =>
              setLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }>
            <Callout>
              <Text>I am here</Text>
            </Callout>
          </Marker>
        </MapView>
        <TouchableOpacity
          onPress={() => setLocation(currentLocation)}
          style={{
            backgroundColor: theme.color.primary,
            position: 'absolute',
            zIndex: 99999999,
            bottom: vh(250),
            right: vw(20),
            height: vh(50),
            width: vh(50),
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AppIcon
            color={theme.color.white}
            type="Ionicons"
            name="locate-sharp"
          />
        </TouchableOpacity>
        <View style={[styles.inputView]}>
          <GooglePlacesAutocomplete
            styles={{
              textInputContainer: {
                backgroundColor: 'white',
                borderWidth: 0.5,
                paddingHorizontal: vw(15),
                borderColor: theme.color.TextGrey,
                borderRadius: 10,
                marginVertical: vh(10),
              },

              textInput: {
                color: '#5d5d5d',
                fontSize: normalize(16),
              },

              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            GooglePlacesSearchQuery={{rankby: 'distance'}}
            setAddressText={address}
            placeholder={address ? address : 'Search Your Address'}
            textInputProps={{placeholderTextColor: theme.color.dropdownColor}}
            onFail={err => console.log(err)}
            enableHighAccuracyLocation={true}
            onPress={(data, details = null) =>
              setLocation({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              })
            }
            fetchDetails={true}
            query={{
              key: mapKey,
              language: 'en',
              components: 'country:in',
              types: 'address',
              radius: 3000,
              location: `${location?.latitude}, ${location?.longitude}`,
            }}
            renderLeftButton={() => (
              <AppIcon
                style={{alignSelf: 'center'}}
                type="MaterialIcons"
                name="search"
                color={theme.color.grey}
              />
            )}
          />
        </View>

        <RBSheet height={vh(300)} ref={addressFormRef}>
          <View style={{marginHorizontal: vw(15), marginVertical: vh(20)}}>
            {address ? (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  paddingBottom: vh(30),
                }}>
                <Text>{address}</Text>
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.color.primary,
                      padding: vh(15),
                      borderRadius: vw(10),
                      marginTop: vh(20),
                    }}
                    onPress={() => {
                      addressFormRef.current.close();
                      navigation.navigate('AddressScreen', {
                        completeAddress,
                        location,
                      });
                    }}>
                    <Text
                      style={{
                        color: theme.color.white,
                        fontFamily: theme.font.semiBold,
                        textAlign: 'center',
                        fontSize: normalize(16),
                      }}>
                      Confirm Address
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.color.white,
                      padding: vh(15),
                      borderRadius: vw(10),
                      borderWidth: 1,
                      borderColor: theme.color.primary,
                      marginTop: vh(20),
                    }}
                    onPress={() => {
                      addressFormRef.current.close();
                    }}>
                    <Text
                      style={{
                        color: theme.color.primary,
                        fontFamily: theme.font.semiBold,
                        textAlign: 'center',
                        fontSize: normalize(16),
                      }}>
                      Choose Another Address
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.color.primary,
                    padding: vh(15),
                    borderRadius: vw(10),
                    marginTop: vh(20),
                  }}
                  onPress={() => {
                    setLocation(currentLocation);
                    addressFormRef.current.close();
                  }}>
                  <Text
                    style={{
                      color: theme.color.white,
                      fontFamily: theme.font.semiBold,
                      textAlign: 'center',
                      fontSize: normalize(16),
                    }}>
                    Use Current Location
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.color.white,
                    padding: vh(15),
                    borderRadius: vw(10),
                    borderWidth: 1,
                    borderColor: theme.color.primary,
                    marginTop: vh(20),
                  }}
                  onPress={() => {
                    addressFormRef.current.close();
                  }}>
                  <Text
                    style={{
                      color: theme.color.primary,
                      fontFamily: theme.font.semiBold,
                      textAlign: 'center',
                      fontSize: normalize(16),
                    }}>
                    Enter Your Location Manually
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* <ScrollView style={{padding: 10, paddingBottom: 80}}>
            <View
              style={{
                borderTopWidth: 1,
                borderTopLeftRadius: vw(20),
                borderTopRightRadius: 20,
                paddingTop: vh(52),
                paddingBottom: vh(200),
                borderColor: theme.color.white,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../../../assets/icons/map-icon.png')} />
                <View>
                  <Text
                    style={{
                      marginHorizontal: vw(10),
                      color: theme.color.lightBlack,
                    }}>
                    Select Location
                  </Text>
                  <Text
                    style={{
                      marginHorizontal: vw(10),
                      color: theme.color.lightBlack,
                    }}>
                    {address}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: normalize(12),
                  textAlign: 'center',
                  marginVertical: vh(20),
                  fontFamily: theme.font.regular,
                  color: theme.color.Black_shadow,
                  marginHorizontal: vw(67),
                }}>
                Add a detailed address for your clients and assist them in
                reaching to your doorsteps
              </Text>
              <TextInput
                value={completeAddress.building}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Building/Shop/Floor No.*"
                placeholder="Building/Shop/Floor No.*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, building: text})
                }
              />
              <TextInput
                value={completeAddress.addressLine1}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Address Line 1*"
                placeholder="Address Line 1*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, addressLine1: text})
                }
              />
              <TextInput
                value={completeAddress.addressLine2}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Address Line 2"
                placeholder="Address Line 2"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, addressLine2: text})
                }
              />
              <TextInput
                value={completeAddress.landmark}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Landmark (Optional)"
                placeholder="Landmark"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, landmark: text})
                }
              />
              <TextInput
                value={completeAddress.city}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="City*"
                placeholder="City*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, city: text})
                }
              />
              <TextInput
                value={completeAddress.pincode}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Pincode*"
                placeholder="Pincode*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                // editable={false}
                keyboardType="number-pad"
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, pincode: text})
                }
              />
              <TextInput
                value={completeAddress.state}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="State*"
                placeholder="State*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                editable={false}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, state: text})
                }
              />
              <TextInput
                value={completeAddress.country}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                textErrorStyle={styles.textErrorStyle}
                label="Country*"
                placeholder="Country*"
                placeholderTextColor={theme.color.darkGrey}
                focusColor={theme.color.black}
                editable={false}
                onChangeText={text =>
                  setCompleteAddress({...completeAddress, country: text})
                }
              />

              <CustomButton
                extraStyle={{marginTop: vh(30), marginBottom: vh(40)}}
                label={'Save'}
                onPress={handleSubmitAddress}
              />
              <TouchableOpacity
                onPress={() => {
                  addressFormRef.current.close();
                }}>
                <Text
                  style={{
                    color: theme.color.red,
                    fontFamily: theme.font.semiBold,
                    textAlign: 'center',
                    fontSize: normalize(16),
                  }}>
                  Change Location
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView> */}
        </RBSheet>
      </Container>
    </>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    paddingHorizontal: 8,
    color: theme.color.darkGrey,
  },
  inputView: {
    position: 'absolute',
    flexDirection: 'row',
    borderWidth: vw(1),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(13),
    zIndex: 9999,
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  searchInput: {
    paddingHorizontal: vw(14),
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  input: {
    height: 55,
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: theme.color.grey,
    marginHorizontal: vw(16),
    marginTop: vh(30),
  },
  inputStyle: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    color: theme.color.dropdownColor,
  },
});
