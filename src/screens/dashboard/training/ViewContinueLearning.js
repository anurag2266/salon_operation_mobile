import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React from 'react';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import {normalize, vh, vw} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import theme from '../../../theme/theme';
import ProgressBar from '../../../components/common/ProgressBar';
import CustomButton from '../../../components/common/CustomButton';

const ViewContinueLearning = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      image: LocalImages.training,
    },
    {
      id: 2,
      image: LocalImages.training,
    },
    {
      id: 3,
      image: LocalImages.training,
    },
    {
      id: 4,
      image: LocalImages.training,
    },
  ];

  const data = [
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

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          marginTop: vh(30),
          marginHorizontal: vw(15),
        }}>
        <Image source={item.image} style={{width: vw(177), height: vh(126)}} />
      </View>
    );
  };

  return (
    <Container header={false}>
      <ImageBackground
        source={LocalImages.training}
        style={{width: vw(441), height: vh(377)}}
        resizeMode="cover">
        <AppIcon
          name={'arrow-left'}
          type={'MaterialCommunityIcons'}
          size={21}
          color={'#494949'}
          style={{margin: 21}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <AppIcon
          name={'youtube'}
          type={'AntDesign'}
          size={60}
          color={theme.color.red}
          style={{
            alignSelf: 'center',
            marginTop: '20%',
          }}
        />
      </ImageBackground>
      <View style={styles.mainView}>
        <View style={styles.headView}>
          <Text style={styles.text}>Lorem Ipsum</Text>
          <Text style={styles.days}>2 Days Ago</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(24),
            alignItems: 'center',
          }}>
          <AppIcon
            name={'star-rate'}
            type={'MaterialIcons'}
            size={30}
            color={'#FFC305'}
            style={{marginTop: vh(12)}}
          />
          <AppIcon
            name={'star-rate'}
            type={'MaterialIcons'}
            size={30}
            color={'#FFC305'}
            style={{marginTop: vh(12)}}
          />
          <AppIcon
            name={'star-rate'}
            type={'MaterialIcons'}
            size={30}
            color={'#FFC305'}
            style={{marginTop: vh(12)}}
          />
          <AppIcon
            name={'star-outlined'}
            type={'Entypo'}
            size={30}
            color={'#FFC305'}
            style={{marginTop: vh(12)}}
          />
          <AppIcon
            name={'star-outlined'}
            type={'Entypo'}
            size={30}
            color={'#FFC305'}
            style={{marginTop: vh(12)}}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: vh(12),
              marginLeft: vw(24),
            }}>
            <AppIcon
              name={'clockcircle'}
              type={'AntDesign'}
              size={15}
              color={theme.color.black}
              style={{marginRight: vw(15)}}
            />
            <Text>2 hrs</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: vh(20),
            marginHorizontal: vw(24),
          }}>
          <Text
            style={{
              fontSize: normalize(14),
              fontFamily: theme.font.semiBold,
              color: theme.color.black,
            }}>
            Complete
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              fontFamily: theme.font.semiBold,
              color: theme.color.black,
            }}>
            67%
          </Text>
        </View>
        <View style={{marginHorizontal: vw(25), marginTop: vh(10)}}>
          <ProgressBar progress={67} />
        </View>
        <Text
          style={{
            marginHorizontal: vw(25),
            marginTop: vh(35),
            color: theme.color.black,
            fontFamily: theme.font.regular,
            fontSize: normalize(16),
          }}>
          Lorem ipsum dolor sit amet consectetur. Scelerisque purus est velit
          velit morbi amet. Venenatis vestibulum fermentum nibh erat phasellus.
        </Text>
        <View style={styles.innerView}>
          <Text style={styles.screenshot}>Screenshot</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.innerView}>
          <Text style={styles.screenshot}>Suggestions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          style={{marginTop: vh(30)}}
          showsHorizontalScrollIndicator={false}>
          {data.map(item => {
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
      </View>
      <CustomButton
        label={'Start'}
        onPress={() => {
          navigation.navigate('');
        }}
        extraStyle={{marginTop: vh(50), marginBottom: vh(30)}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    borderTopRightRadius: vw(20),
    borderTopLeftRadius: vw(20),
    borderColor: theme.color.white,
    flex: 1,
    backgroundColor: theme.color.white,
  },
  headView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(29),
    marginHorizontal: vw(24),
    alignItems: 'center',
  },
  text: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(20),
  },
  days: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(33),
    marginTop: vh(30),
    alignItems: 'center',
  },
  screenshot: {
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
});

export default ViewContinueLearning;
