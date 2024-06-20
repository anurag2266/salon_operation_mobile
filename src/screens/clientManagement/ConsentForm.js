import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';
import CheckBox from '@react-native-community/checkbox';
import {useCameraPermission} from '../../hooks/usePermissions';
import {openSettings} from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';

const ConsentForm = () => {
  const [search, setSearch] = useState('');
  const [right, setRight] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [file, setFile] = useState(null);

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

  const DATA = [
    {
      id: 1,
      name: 'Hair Colour',
      stylist: 'Rebecca Beck + Erica',
      time: '120 min',
      duration: '11:30 AM to 1:15 PM',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.white}}>
      <ScrollView>
        <TextInput
          value={search}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search for a service"
          placeholder="Search for a service"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setSearch(text);
          }}
          renderLeftIcon={() => (
            <AppIcon
              name={'search1'}
              type={'AntDesign'}
              size={20}
              color={theme.color.bottomWidth}
              style={{marginRight: vw(15)}}
            />
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginHorizontal: vw(15),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: vw(7),
              marginTop: vh(9),
            }}>
            <AppIcon
              name={'filter'}
              type={'AntDesign'}
              size={15}
              color={theme.color.LightBlue}
            />
            <Text style={styles.filter}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginHorizontal: vw(7),
              marginTop: vh(9),
            }}>
            <AppIcon
              name={'swap-vertical'}
              type={'Ionicons'}
              size={15}
              color={theme.color.LightBlue}
            />
            <Text style={styles.filter}>Sort By</Text>
          </TouchableOpacity>
        </View>
        {right == false ? (
          <>
            {DATA.map(item => {
              return (
                <View
                  style={[
                    styles.mainview,
                    {flexDirection: 'row', alignItems: 'center'},
                  ]}>
                  <Image
                    source={LocalImages.Profile}
                    style={{
                      width: vw(86),
                      height: vw(86),
                      borderRadius: vw(100),
                    }}
                  />
                  <View style={{marginLeft: vw(15)}}>
                    <Text
                      style={{
                        fontFamily: theme.font.semiBold,
                        fontSize: normalize(18),
                        color: theme.color.primary,
                      }}>
                      {item.name}
                    </Text>
                    <Text style={styles.stylist}>Stylist {item.stylist}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.time}>{item.time}</Text>
                      <View style={styles.durationView} />
                      <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                  </View>
                  <AppIcon
                    name={'right'}
                    type={'AntDesign'}
                    size={15}
                    color={theme.color.dropdownColor}
                    onPress={() => {
                      setRight(!right);
                    }}
                    style={{marginLeft: vw(35)}}
                  />
                </View>
              );
            })}
          </>
        ) : null}
        {right == true ? (
          <>
            <View style={styles.mainview}>
              <AppIcon
                name={'arrowleft'}
                type={'AntDesign'}
                size={20}
                color={theme.color.black}
                onPress={() => {
                  setRight(!right);
                }}
              />
              {DATA.map(item => {
                return (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: vh(10),
                      }}>
                      <Image
                        source={LocalImages.Profile}
                        style={{
                          width: vw(86),
                          height: vw(86),
                          borderRadius: vw(100),
                        }}
                      />
                      <View style={{marginLeft: vw(15)}}>
                        <Text
                          style={{
                            fontFamily: theme.font.semiBold,
                            fontSize: normalize(18),
                            color: theme.color.primary,
                          }}>
                          {item.name}
                        </Text>
                        <Text style={styles.stylist}>
                          Stylist {item.stylist}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.time}>{item.time}</Text>
                          <View style={styles.durationView} />
                          <Text style={styles.duration}>{item.duration}</Text>
                        </View>
                      </View>
                    </View>
                    <Text
                      style={{
                        marginHorizontal: vw(14),
                        fontFamily: theme.font.regular,
                        fontSize: normalize(14),
                        color: theme.color.primary,
                        marginTop: vh(30),
                      }}>
                      Lorem ipsum dolor sit amet consectetur. Fringilla est
                      suscipit eget tincidunt. Aliquet quam est id scelerisque
                      sit. Aliquam scelerisque leo non etiam vestibulum risus
                      facilisi egestas netus. In tempor nunc phasellus sit eget
                      at. Aliquam blandit purus adipiscing scelerisque.
                      Tincidunt ultricies elementum sed elementum at. Maecenas
                      hendrerit tempus bibendum dui morbi mattis eget fermentum.
                      Tristique integer sed quis leo dignissim tempus amet nulla
                      in. Gravida id interdum proin cursus vestibulum non sed
                      dignissim orci. Odio et nisl est ac non. Egestas vel cras
                      purus nulla massa. Feugiat leo dignissim hendrerit nulla
                      integer lectus magna pellentesque. Fames fusce massa nulla
                      feugiat.
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: vw(18),
                        marginTop: vh(20),
                      }}>
                      <CheckBox
                        style={{
                          width: vw(17),
                          height: vh(18),
                          marginTop: vh(10),
                          marginBottom: vh(10),
                        }}
                        value={checkbox}
                        boxType={'square'}
                        onCheckColor="white"
                        onTintColor={theme.color.primary}
                        onFillColor={theme.color.primary}
                        // rightTextStyle={{fontSize: normalize(14)}}
                        onValueChange={() => setCheckbox(!checkbox)}
                      />
                      <Text
                        style={{
                          color: theme.color.primary,
                          fontFamily: theme.font.medium,
                          fontSize: normalize(14),
                          marginLeft: vw(10),
                        }}>
                        Lorem ipsum dolor sit amet consectetur. Fringilla est{' '}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: theme.color.primary,
                        fontFamily: theme.font.medium,
                        fontSize: normalize(14),
                        marginTop: vh(24),
                      }}>
                      Digital Sign Here
                    </Text>

                    {file ? (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: vw(10),
                          borderColor: '#D2D2D2',
                          paddingVertical: vh(7),
                          paddingHorizontal: vw(24),
                          alignItems: 'center',
                          marginTop: vh(10),
                        }}>
                        <ImageBackground
                          source={{
                            uri:
                              Platform.OS == 'ios' ? file.sourceURL : file.path,
                          }}
                          style={{
                            width: vw(50),
                            height: vw(90),
                          }}></ImageBackground>
                        <AppIcon
                          name={'cloudupload'}
                          type={'AntDesign'}
                          size={20}
                          onPress={handleImagePicker}
                          color={theme.color.primary}
                          style={{alignSelf: 'flex-end'}}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          borderWidth: 1,
                          borderRadius: vw(10),
                          borderColor: '#D2D2D2',
                          paddingVertical: vh(7),
                          paddingHorizontal: vw(24),
                          alignItems: 'center',
                          marginTop: vh(10),
                        }}>
                        <ImageBackground
                          source={LocalImages.billing}
                          style={{
                            width: vw(50),
                            height: vw(90),
                          }}></ImageBackground>
                        <AppIcon
                          name={'cloudupload'}
                          type={'AntDesign'}
                          size={20}
                          onPress={handleImagePicker}
                          color={theme.color.primary}
                          style={{alignSelf: 'flex-end'}}
                        />
                      </View>
                    )}
                  </>
                );
              })}
            </View>
          </>
        ) : null}
        <View
          style={[styles.btnView, {marginTop: right == true ? '20%' : '70%'}]}>
          <TouchableOpacity style={styles.btnTouch}>
            <AppIcon
              name={'share'}
              type={'Entypo'}
              size={15}
              color={theme.color.primary}
              style={{marginRight: vw(15)}}
            />
            <Text style={styles.btnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnTouch, {backgroundColor: theme.color.primary}]}>
            <AppIcon
              name={'download'}
              type={'Ionicons'}
              size={15}
              color={theme.color.white}
              style={{marginRight: vw(15)}}
            />
            <Text style={[styles.btnText, {color: theme.color.white}]}>
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConsentForm;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 13},
  labelStyle: {
    fontSize: normalize(13),
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
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  mainview: {
    marginTop: vh(20),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(10),
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(16),
  },
  btnTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(30),
    paddingVertical: vh(16),
    borderRadius: vw(10),
    borderWidth: 1,
    borderColor: theme.color.primary,
  },
  btnText: {
    fontFamily: theme.font.semiBold,
    fontSize: normalize(20),
    color: theme.color.primary,
  },
  duration: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    marginTop: vh(4),
  },
  stylist: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    marginTop: vh(4),
  },
  durationView: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    marginHorizontal: vw(10),
    marginTop: vh(4),
    borderColor: theme.color.dropdownColor,
  },
  time: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    marginTop: vh(4),
  },
});
