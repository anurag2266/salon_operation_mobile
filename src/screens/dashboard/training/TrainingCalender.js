import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';
import LocalImages from '../../../utils/LocalImages';
import {FlatList} from 'react-native-gesture-handler';
const TrainingCalender = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [activeIndexNumber, setActiveIndexNumber] = useState(Number);
  const [btnTouchDresser, setbtnTouchDresser] = useState(false);
  const [btnTouchArtist, setbtnTouchArtist] = useState(false);

  const DATA = [
    {
      id: 1,
      courseName: 'Lorem Ipsum',
      imagePath: require('../../../assets/dummy.png'),
    },
    {
      id: 2,
      courseName: 'Lorem Ipsum',
      imagePath: require('../../../assets/dummy.png'),
    },
    {
      id: 3,
      courseName: 'Lorem Ipsum',
      imagePath: require('../../../assets/dummy.png'),
    },
    {
      id: 4,
      courseName: 'Lorem Ipsum',
      imagePath: require('../../../assets/dummy.png'),
    },
  ];

  const CourseData = [
    {
      id: 1,
      courseName: 'Lorem Ipsum',
      duration: '2 Hrs',
      status: '78% Complete',
      description:
        ' Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam imperdiet mi',
    },
    {
      id: 2,
      courseName: 'Lorem Ipsum',
      duration: '4 Hrs',
      status: '68% Complete',
      description:
        ' Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam imperdiet mi',
    },
    {
      id: 3,
      courseName: 'Lorem Ipsum',
      duration: '3 Hrs',
      status: '38% Complete',
      description:
        ' Lorem ipsum dolor sit amet consectetur. Ultrices quam aliquam imperdiet mi',
    },
  ];

  const renderItemCourse = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          padding: vw(3),
          marginTop: vh(25),
          alignItems: 'center',
          marginHorizontal: vw(21),
        }}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              width: vw(70),
              height: vh(70),
            },
          ]}>
          <Image
            source={item.imagePath}
            style={{width: vw(80), height: vh(80)}}
          />
        </View>
        <Text
          style={{
            fontFamily: theme.font.medium,
            color: theme.color.black,
            fontSize: normalize(11),
            marginTop: vh(15),
          }}>
          {item.courseName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={[styles.boxWithShadow, styles.boxView]}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          <Image
            source={LocalImages.training}
            style={{width: vw(112), height: vh(126)}}
          />
          <View style={{marginHorizontal: vw(11)}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.completed,
                  {fontSize: normalize(18), fontFamily: theme.font.medium},
                ]}>
                {item.courseName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(4),
              }}>
              <Text style={styles.completed}>{item.status}</Text>
              <AppIcon
                name={'clockcircle'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                style={{marginLeft: vw(15)}}
              />
              <Text style={[styles.completed, {marginLeft: vw(7)}]}>
                {item.duration}
              </Text>
            </View>
            <Text style={[styles.completed, {width: '45%', marginTop: vh(4)}]}>
              {item.description}
            </Text>
            <TouchableOpacity>
              <Text style={styles.continueBtn}>Start </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Container
      title={'Training Calender'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
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
        <Text style={styles.continue}>Choose Course</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItemCourse}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.headView}>
        <Text style={styles.continue}>Available Slots</Text>
      </View>

  <View style={{alignItems:"center"}}>
  <View style={{flexDirection: 'row',}}>
        <TouchableOpacity
          style={{
            width: '25%',
            height: vh(50),
            backgroundColor: theme.color.primary,
            borderWidth: 1,
            borderRadius: 5,
            margin: 10,
            borderColor: theme.color.primary,
          }}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              fontFamily: theme.font.medium,
              color: theme.color.white,
             
            }}>
            Morning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slots}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              fontFamily: theme.font.medium,
            }}>
            Afternoon
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slots}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              fontFamily: theme.font.medium,
            }}>
            Evening
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              color: '#57BE92',
              padding: vh(10),
              fontFamily: theme.font.medium,
            }}>
            12:00 PM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              color: '#57BE92',
              padding: vh(10),
              fontFamily: theme.font.medium,
            }}>
            12:30 PM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              color: '#57BE92',
              padding: vh(10),
              fontFamily: theme.font.medium,
            }}>
            01:00 PM
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              color: '#57BE92',
              fontFamily: theme.font.medium,
            }}>
            01:30 PM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              color: '#57BE92',
              fontFamily: theme.font.medium,
            }}>
            03:00 PM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.slotTime}>
          <Text
            style={{
              textAlign: 'center',
              padding: vh(10),
              color: '#57BE92',
              fontFamily: theme.font.medium,
            }}>
            07:00 PM
          </Text>
        </TouchableOpacity>
      </View>

  </View>
      <View style={styles.headView}>
        <Text style={styles.continue}>Available Course</Text>
      </View>

      <FlatList
        data={CourseData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

export default TrainingCalender;

const styles = StyleSheet.create({
  slots: {
    width: '25%',
    height: vh(50),
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    borderColor: theme.color.primary,
  },

  slotTime: {
    width: '25%',
    height: vh(50),
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    borderColor: theme.color.primary,
    backgroundColor: '#E9F2EE',
  },

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
});
