import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';
import LocalImages from '../../../utils/LocalImages';
import RBSheet from 'react-native-raw-bottom-sheet';
import {FloatingAction} from 'react-native-floating-action';

const Training = ({navigation}) => {
  const refRBSheet = useRef();
  const [search, setSearch] = useState('');
  const [activeIndexNumber, setActiveIndexNumber] = useState(Number);
  const [btnTouchDresser, setbtnTouchDresser] = useState(false);
  const [btnTouchArtist, setbtnTouchArtist] = useState(false);
  const [yourName, setyourName] = useState('');
  const [trainingName, settrainingName] = useState('');
  const [description, setdescription] = useState('');

  const actions = [
    {
      text: 'Training Calender',
      position: 2,
      name: 'TrainingCalender',
    },
    {
      text: 'Request New Training',
      position: 1,
      name: 'RequestNewTraining',
    },
  ];

  const data = [
    {
      id: 1,
      imagepath: LocalImages.trainingBackground,
      title: 'Hair Stylist',
      seats: 'Limited Seats',
    },
    {
      id: 2,
      imagepath: LocalImages.trainingBackground,
      title: 'Hair Stylist',
      seats: 'Limited Seats',
    },
    {
      id: 3,
      imagepath: LocalImages.trainingBackground,
      title: 'Hair Stylist',
      seats: 'Limited Seats',
    },
    {
      id: 4,
      imagepath: LocalImages.trainingBackground,
      title: 'Hair Stylist',
      seats: 'Limited Seats',
    },
  ];

  const DATA = [
    {
      id: 1,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 2,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Training'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: vw(20),
              borderTopRightRadius: vw(20),
              height: vh(480),
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                marginVertical: vh(30),
                fontSize: normalize(20),
                fontFamily: theme.font.bold,
                color: theme.color.black,
              }}>
              Training Request
            </Text>
            <TextInput
              value={yourName}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Your Name"
              placeholder="Your Name"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setyourName(text);
              }}
            />
            <TextInput
              value={trainingName}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Training Name"
              placeholder="Training Name"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                settrainingName(text);
              }}
            />
            <TextInput
              value={description}
              style={[styles.input]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              multiline={true}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Description"
              placeholder="Description"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setdescription(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.close();
              }}
              style={styles.submitBtn}>
              <Text
                style={{
                  color: theme.color.white,
                  fontFamily: theme.font.bold,
                  fontSize: normalize(18),
                }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <TextInput
          value={search}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search"
          placeholder="Search"
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
            onPress={() => {
              setShowModal(true);
            }}
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
        <View style={styles.headView}>
          <Text style={styles.continue}>Continue Watching</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.boxWithShadow, styles.boxView]}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={LocalImages.training}
              style={{width: vw(112), height: vh(126)}}
            />
            <View style={{marginHorizontal: vw(11)}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.completed, {fontSize: normalize(18)}]}>
                  Lorem Ipsum
                </Text>
                <Text style={[styles.completed, {marginLeft: vw(25)}]}>
                  1 day ago
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: vh(4),
                }}>
                <Text style={styles.completed}>67% Complete</Text>
                <AppIcon
                  name={'clockcircle'}
                  type={'AntDesign'}
                  size={15}
                  color={theme.color.black}
                  style={{marginLeft: vw(15)}}
                />
                <Text style={[styles.completed, {marginLeft: vw(7)}]}>
                  2 Hrs
                </Text>
              </View>
              <Text
                style={[styles.completed, {width: '45%', marginTop: vh(4)}]}>
                Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam
                imperdiet mi
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ViewContinueLearning');
                }}>
                <Text style={styles.continueBtn}>Continue </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          style={{marginTop: vh(30)}}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={200}
          decelerationRate="fast"
          pagingEnabled
          onScroll={e => {
            let slide = Math.round(
              e.nativeEvent.contentOffset.x,
              e.nativeEvent.layoutMeasurement.width,
            );
            if (slide !== activeIndexNumber) {
              setActiveIndexNumber(slide); //here we will set our active index num
            }
          }}>
          {data.map(item => {
            return (
              <ImageBackground
                source={item.imagepath}
                style={{width: vw(428), height: vh(281)}}
                resizeMode="cover">
                <View style={{marginHorizontal: vw(20)}}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.seats}>{item.seats}</Text>
                  <TouchableOpacity style={styles.enrollNowBtn}>
                    <Text style={styles.enrollNowTxt}>Enroll Now</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            );
          })}
        </ScrollView>
        <View style={{flexDirection: 'column'}}>
          {/* //this view contain the dots */}
          <View style={styles.dotContainer}>
            {data
              .slice(0, activeIndexNumber < 5 ? 5 : data.length)
              .map((item, index) => {
                if (data.length !== 1) {
                  // if data array length not 1
                  if (activeIndexNumber < 5) {
                    //if activeindex lower than five
                    return (
                      <View
                        key={index}
                        style={[
                          index == activeIndexNumber
                            ? [
                                styles.dot,
                                {backgroundColor: theme.color.primary},
                              ]
                            : styles.dot,
                        ]}></View>
                    );
                  } else {
                    //if activeindex higher than five
                    return (
                      <View
                        key={index}
                        style={[
                          index == activeIndexNumber - 5
                            ? [
                                styles.dot,
                                {backgroundColor: theme.color.primary},
                              ]
                            : styles.dot,
                        ]}></View>
                    );
                  }
                }
              })}
          </View>
        </View>
        <View style={styles.headView}>
          <Text style={styles.continue}>Explore All </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ExploreAll')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          style={{marginTop: vh(30)}}
          showsHorizontalScrollIndicator={false}>
          {DATA.map(item => {
            return (
              <View style={[styles.boxWithShadow, styles.exploreView]}>
                <Image
                  source={item.image}
                  style={{width: vw(181), height: vh(120)}}
                />
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.course}>{item.course}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            marginTop: vh(30),
            backgroundColor: theme.color.primary,
            paddingHorizontal: vw(24),
            paddingVertical: vh(15),
          }}>
          <Text
            style={{
              color: theme.color.white,
              fontFamily: theme.font.bold,
              fontSize: normalize(18),
            }}>
            Refer and Earn a Permium Course worth Rs. 1500/-
          </Text>
          <TouchableOpacity style={styles.referNowView}>
            <Text
              style={{
                color: theme.color.primary,
                fontFamily: theme.font.bold,
                fontSize: normalize(15),
              }}>
              Refer Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headView}>
          <Text style={styles.continue}>My Career Path</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyCarrierTraining');
            }}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(30),
            marginVertical: vh(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              setbtnTouchDresser(!btnTouchDresser);
            }}
            style={{
              borderColor: theme.color.primary,
              borderBottomWidth: btnTouchDresser ? 1 : null,
            }}>
            <Text
              style={[
                styles.careerpathText,
                {
                  color: btnTouchDresser
                    ? theme.color.primary
                    : theme.color.black,
                },
              ]}>
              Hair Dresser
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setbtnTouchArtist(!btnTouchArtist);
            }}
            style={{
              borderColor: theme.color.primary,
              borderBottomWidth: btnTouchArtist ? 1 : null,
            }}>
            <Text
              style={[
                styles.careerpathText,
                {
                  color: btnTouchArtist
                    ? theme.color.primary
                    : theme.color.black,
                },
              ]}>
              Hair Artist
            </Text>
          </TouchableOpacity>
        </View>
        {btnTouchDresser ? (
          <ScrollView
            horizontal={true}
            style={{marginBottom: vh(30)}}
            showsHorizontalScrollIndicator={false}>
            {DATA.map(item => {
              return (
                <View style={[styles.boxWithShadow, styles.exploreView]}>
                  <Image
                    source={item.image}
                    style={{width: vw(181), height: vh(120)}}
                  />
                  <Text style={styles.label}>{item.label}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: vh(10),
                    }}>
                    <AppIcon
                      name={'clockcircle'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.black}
                      style={{marginRight: vw(7)}}
                    />
                    <Text
                      style={{
                        fontSize: normalize(12),
                        fontFamily: theme.font.regular,
                        color: theme.color.black,
                      }}>
                      {item.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      marginHorizontal: vw(10),
                      marginTop: vh(10),
                      borderRadius: vw(4),
                      paddingHorizontal: vw(14),
                      paddingVertical: vh(3),
                      backgroundColor: theme.color.switchOn,
                    }}>
                    <Text
                      style={{
                        color: theme.color.white,
                        fontFamily: theme.font.bold,
                        fontSize: normalize(11),
                      }}>
                      Active
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : null}
      </Container>
      <View
        style={{
          position: 'relative',
          bottom: vh(60),
          right: vw(15),
        }}>
        <FloatingAction
          buttonSize={60}
          tintColor={theme.color.black}
          color={theme.color.primary}
          actions={actions}
          onPressItem={name => {
            name == 'RequestNewTraining'
              ? refRBSheet.current.open()
              : navigation.navigate(name);
            // alert(name);
          }}
        />
      </View>
    </View>
  );
};

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
  headView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(33),
    marginTop: vh(30),
    alignItems: 'center',
  },
  continue: {
    fontSize: normalize(20),
    fontFamily: theme.font.semiBold,
    color: theme.color.black,
  },
  viewAll: {
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
    color: theme.color.LightBlue,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  boxView: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    marginHorizontal: vw(24),
    marginTop: vh(30),
    paddingHorizontal: vw(10),
    paddingVertical: vh(10),
    borderColor: theme.color.white,
  },
  completed: {
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(14),
  },
  continueBtn: {
    color: theme.color.LightBlue,
    marginTop: vh(8),
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 8,
    elevation: 8,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  dot: {
    aspectRatio: 3,
    width: vw(18),
    marginHorizontal: 2,
    marginVertical: 2,
    backgroundColor: theme.color.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.color.primary,
    position: 'relative',
    zIndex: 8,
    elevation: 8,
  },
  exploreView: {
    borderWidth: 1,
    marginHorizontal: vw(10),
    paddingBottom: vh(20),
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    alignItems: 'center',
  },
  label: {
    color: theme.color.black,
    fontSize: normalize(16),
    marginTop: vh(8),
    fontFamily: theme.font.semiBold,
  },
  course: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(10),
    marginTop: vh(4),
  },
  referNowView: {
    borderRadius: vw(10),
    alignSelf: 'flex-start',
    marginVertical: vh(10),
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(30),
    paddingVertical: vh(10),
  },
  enrollNowBtn: {
    backgroundColor: theme.color.white,
    alignSelf: 'flex-end',
    paddingHorizontal: vw(30),
    paddingVertical: vh(10),
    marginTop: vh(15),
    borderRadius: vw(10),
  },
  enrollNowTxt: {
    color: theme.color.primary,
    fontFamily: theme.font.regular,
    fontSize: normalize(15),
  },
  title: {
    alignSelf: 'flex-end',
    marginTop: vh(25),
    marginRight: vw(25),
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(34),
  },
  seats: {
    alignSelf: 'flex-end',
    marginTop: vh(100),
    color: theme.color.white,
    fontFamily: theme.color.bold,
    fontSize: normalize(20),
  },
  careerpathText: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    marginRight: vw(40),
  },
  submitBtn: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    paddingHorizontal: vw(45),
    paddingVertical: vh(14),
    marginTop: vh(20),
    borderRadius: vw(10),
    backgroundColor: theme.color.primary,
  },
});

export default Training;
