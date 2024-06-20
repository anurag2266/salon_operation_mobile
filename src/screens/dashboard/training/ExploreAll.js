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

const ExploreAll = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [activeIndexNumber, setActiveIndexNumber] = useState(Number);
  const [btnTouchDresser, setbtnTouchDresser] = useState(false);
  const [btnTouchArtist, setbtnTouchArtist] = useState(false);

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
    {
      id: 3,
      image: LocalImages.training,
      label: 'Lorem Ipsum',

      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 4,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 5,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 6,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 7,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
    {
      id: 8,
      image: LocalImages.training,
      label: 'Lorem Ipsum',
      course: '445 Course',
      time: '2 Hours',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={[styles.boxWithShadow, styles.exploreView]}>
        <Image source={item.image} style={{width: vw(181), height: vh(120)}} />
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.course}>{item.course}</Text>
      </View>
    );
  };

  return (
    <Container
      title={'Explore All'}
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

      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default ExploreAll;

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
    marginVertical: vh(15),
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    alignItems: 'center',
    paddingBottom: vh(10),
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
