import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ScrollContainer from '../../../components/common/ScrollContainer';
import CustomHeader from '../../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import theme from '../../../theme/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-reanimated-carousel';
import CustomButton from '../../../components/common/CustomButton';
import {
  useCameraPermission,
  useMediaPermission,
} from '../../../hooks/usePermissions';
import {openSettings} from 'react-native-permissions';
import {addSalonImagesAPI} from '../../../api/services/salonBasicService';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import Uploading from '../../../components/loader/Uploading';
import Container from '../../../components/common/Container';
import ProgressBar from '../../../components/common/ProgressBar';
import {getUserDetailsAPI} from '../../../api/services/authService';
import {useFocusEffect} from '@react-navigation/native';

const ShowYourWorkplace = ({navigation}) => {
  const takePictureRef = useRef();
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [picker, setPicker] = useState();
  const [indoorImages, setIndoorImages] = useState([]);
  const [outdoorImages, setOutdoorImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCameraPicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImagePicker.openCamera({
        width: 400,
        height: 200,
        // cropping: true,
        maxFiles: 5,
      })
        .then(res => {
          if (picker === 'Indoor') {
            setIndoorImages([...indoorImages, res]);
          } else {
            setOutdoorImages([...outdoorImages, res]);
          }
          takePictureRef.current.close();
        })
        .finally(close);
    } else {
      openSettings();
    }
  };
  const handleImagePicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImagePicker.openPicker({
        width: 400,
        height: 200,
        // cropping: true,
        multiple: true,
        maxFiles: 5,
        mediaType: 'photo',
      })
        .then(res => {
          if (picker === 'Indoor') {
            setIndoorImages(...indoorImages, res);
          } else {
            setOutdoorImages(...outdoorImages, res);
          }
          takePictureRef.current.close();
        })
        .finally(close);
    } else {
      openSettings();
    }
  };

  const handleSubmitImages = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('salonId', salonDetails._id);

    indoorImages.map(item =>
      formData.append('indoorImages', {
        name: item.filename,
        type: item.mime,
        uri:
          Platform.OS === 'ios'
            ? item.sourceURL.replace('file://', '')
            : item.sourceURL,
      }),
    );
    outdoorImages.map(item =>
      formData.append('outdoorImages', {
        name: item.filename,
        type: item.mime,
        uri:
          Platform.OS === 'ios'
            ? item.sourceURL.replace('file://', '')
            : item.sourceURL,
      }),
    );

    const {message, data, status} = await addSalonImagesAPI(formData);

    if (status) {
      showMessage({message: message, type: 'Success'});
      navigation.navigate('SalonSetupSteps');
      setLoading(false);
    } else {
      setLoading(false);
      showMessage({message: message, type: 'danger'});
    }
  };
  //   console.log(indoorImages);
  const handleGetSalonPhotoes = async () => {
    const {data, status, message} = await getUserDetailsAPI();

    if (status) {
      salonDetails(salonDetails.indoorImages) &&
        salonDetails(salonDetails.outdoorImages);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSalonPhotoes();
    }, []),
  );

  return (
    <>
      <Container
        loading={loading}
        title="Salon Pictures"
        leftIconName={'arrow-left'}
        leftIconType="MaterialCommunityIcons"
        onPressLeftIcon={() => navigation.goBack()}
        leftIconColor={theme.color.dropdownColor}
        progressBar={<ProgressBar progress={40} />}>
        <View style={styles.container}>
          <Text style={styles.title}>
            These images will be visible on your Salonesis business profile for
            the clients
          </Text>
          {indoorImages.length <= 0 ? (
            <TouchableOpacity
              onPress={() => {
                setPicker('Indoor');
                takePictureRef.current.open();
              }}
              style={styles.buttonContainer}>
              <View style={styles.iconWraper}>
                <AppIcon
                  color={theme.color.primary}
                  type="Entypo"
                  name="camera"
                  size={30}
                />
              </View>
              <Text style={styles.buttonTitle}>Add indoor salon image</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Carousel
                loop={false}
                style={{
                  width: vw(386),
                  height: vh(220),
                  marginHorizontal: vw(21),
                  marginVertical: vh(22),
                }}
                width={vw(386)}
                data={indoorImages}
                scrollAnimationDuration={1000}
                onSnapToItem={index => console.log('current index:', index)}
                renderItem={({item, index}) => (
                  <View style={styles.carouselContainer}>
                    <TouchableOpacity style={styles.deleteicon}>
                      <AppIcon
                        color={theme.color.white}
                        type="MaterialCommunityIcons"
                        name="delete"
                        size={20}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        position: 'absolute',
                        height: vh(57),
                        width: '100%',
                        backgroundColor: theme.color.black,
                        bottom: 0,
                        opacity: 0.7,
                        justifyContent: 'center',
                        padding: 5,
                      }}>
                      <Text style={{color: 'white'}}>{item.filename}</Text>
                    </View>
                    <Image
                      source={{
                        uri: Platform.OS == 'ios' ? item.sourceURL : item.path,
                      }}
                      resizeMode="cover"
                      style={{width: '100%', height: '100%', zIndex: -100}}
                    />
                  </View>
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  setPicker('Indoor');
                  takePictureRef.current.open();
                }}
                style={{marginHorizontal: vw(21)}}>
                <Text style={{color: theme.color.LightBlue}}>
                  +Add More Images
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {outdoorImages.length <= 0 ? (
            <TouchableOpacity
              onPress={() => {
                setPicker('Outdoor');
                takePictureRef.current.open();
              }}
              style={styles.buttonContainer}>
              <View style={styles.iconWraper}>
                <AppIcon
                  color={theme.color.primary}
                  type="Entypo"
                  name="camera"
                  size={30}
                />
              </View>
              <Text style={styles.buttonTitle}>Add outdoor salon image</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Carousel
                loop={false}
                style={{
                  width: vw(386),
                  height: vh(220),
                  marginHorizontal: vw(21),
                  marginVertical: vh(22),
                }}
                width={vw(386)}
                data={outdoorImages}
                scrollAnimationDuration={1000}
                onSnapToItem={index => console.log('current index:', index)}
                renderItem={({item, index}) => (
                  <View key={index} style={styles.carouselContainer}>
                    <TouchableOpacity style={styles.deleteicon}>
                      <AppIcon
                        color={theme.color.white}
                        type="MaterialCommunityIcons"
                        name="delete"
                        size={20}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        position: 'absolute',
                        height: vh(57),
                        width: '100%',
                        backgroundColor: theme.color.black,
                        bottom: 0,
                        opacity: 0.7,
                        justifyContent: 'center',
                        padding: 5,
                      }}>
                      <Text style={{color: 'white'}}>{item.filename}</Text>
                    </View>
                    <Image
                      source={{
                        uri: Platform.OS == 'ios' ? item.sourceURL : item.path,
                      }}
                      resizeMode="cover"
                      style={{width: '100%', height: '100%', zIndex: -100}}
                    />
                  </View>
                )}
              />
              <TouchableOpacity
                onPress={() => {
                  setPicker('Outdoor');
                  takePictureRef.current.open();
                }}
                style={{marginHorizontal: vw(21)}}>
                <Text style={{color: theme.color.LightBlue}}>
                  +Add More Images
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <CustomButton
            label={'Save'}
            extraStyle={{marginTop: vh(40)}}
            onPress={handleSubmitImages}
          />
        </View>

        <RBSheet
          customStyles={{
            container: {
              borderTopLeftRadius: vw(20),
              borderTopRightRadius: vw(20),
              paddingTop: vh(10),
              height: vh(288),
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}
          ref={takePictureRef}>
          <View>
            <TouchableOpacity
              onPress={handleCameraPicker}
              style={styles.outlineButton}>
              <Text style={styles.btntext}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={styles.outlineButton}>
              <Text style={styles.btntext}>Upload From Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => takePictureRef.current.close()}
              style={styles.outlineButton}>
              <Text style={styles.btntext}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginHorizontal: vw(37),
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  buttonContainer: {
    marginHorizontal: vw(21),
    marginTop: vh(22),
    backgroundColor: theme.color.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(15),
    paddingHorizontal: vw(22),
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconWraper: {
    height: 57,
    width: 57,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.grey,
    borderRadius: 28.5,
  },
  buttonTitle: {
    marginLeft: vw(15),
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    color: theme.color.primary,
  },
  outlineButton: {
    marginHorizontal: vw(21),
    alignItems: 'center',
    paddingVertical: vh(16),
    borderWidth: 2,
    borderColor: theme.color.primary,
    borderRadius: 10,
    marginVertical: vh(17),
  },
  btntext: {
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    textAlign: 'center',
    color: theme.color.primary,
  },
  carouselContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
    position: 'relative',
  },
  deleteicon: {
    position: 'absolute',
    height: 36,
    width: 36,
    backgroundColor: theme.color.grey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    right: 5,
    top: 5,
  },
});

export default ShowYourWorkplace;
