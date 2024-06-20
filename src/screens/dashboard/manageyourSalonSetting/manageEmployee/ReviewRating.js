import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-gesture-handler';
import AppIcon from '../../../../components/common/AppIcon';
import LocalImages from '../../../../utils/LocalImages';

const ReviewRating = ({navigation}) => {
  const [viewRating, setviewRating] = useState(false);
  const data = [
    {
      id: 1,
      name: 'Anajali Sharma',
      imagepath: LocalImages.Profile,
      date: '09/03/2022',
      dataText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      reply: 'Reply',
    },
    {
      id: 2,
      name: 'Anajali Sharma',
      date: '09/03/2022',
      imagepath: LocalImages.Profile,
      dataText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      reply: 'Reply',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={[styles.boxWithShadow, styles.ReviewView]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={item.imagepath}
            style={{width: vw(47), height: vh(47), margin: vw(14)}}
          />
          <View style={{margin: vh(14)}}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        </View>
        <Text style={styles.reviewText}>{item.dataText}</Text>
        <Text style={styles.reply}>{item.reply}</Text>
      </View>
    );
  };

  const [review, setreview] = useState('');
  return (
    <Container
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={[styles.innerView, styles.boxWithShadow]}>
        <LinearGradient
          colors={['#000000', '#000000']}
          style={styles.LinearGradient}>
          <Image
            source={{uri: 'https://picsum.photos/300/500'}}
            style={{width: vw(381), height: vh(217)}}
            resizeMode={'cover'}
          />
        </LinearGradient>
        <Text style={styles.name}>Hair Colour</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.stylistRate}>Rate The Stylist</Text>
        <AppIcon
          name={'star-rate'}
          type={'MaterialIcons'}
          size={30}
          color={'#FFC305'}
          style={{marginTop: vh(30)}}
        />
        <AppIcon
          name={'star-rate'}
          type={'MaterialIcons'}
          size={30}
          color={'#FFC305'}
          style={{marginTop: vh(30)}}
        />
        <AppIcon
          name={'star-rate'}
          type={'MaterialIcons'}
          size={30}
          color={'#FFC305'}
          style={{marginTop: vh(30)}}
        />
        <AppIcon
          name={'star-outlined'}
          type={'Entypo'}
          size={30}
          color={'#FFC305'}
          style={{marginTop: vh(30)}}
        />
        <AppIcon
          name={'star-outlined'}
          type={'Entypo'}
          size={30}
          color={'#FFC305'}
          style={{marginTop: vh(30)}}
        />
      </View>
      <TextInput
        value={review}
        style={[styles.input, {height: vh(125)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        multiline={true}
        label="Write a review"
        placeholder="Write a review"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setreview(text);
        }}
      />
      <TouchableOpacity style={styles.uploadReviewTouch}>
        <Text style={styles.uploadReviewText}>Upload Review</Text>
      </TouchableOpacity>
      <View style={[styles.ratingTouch, styles.boxWithShadow]}>
        <Text style={styles.ratingText}>View Ratings & Reviews</Text>
        {viewRating ? (
          <AppIcon
            name={'up'}
            type={'AntDesign'}
            size={15}
            onPress={() => {
              setviewRating(!viewRating);
            }}
            color={theme.color.dropdownColor}
          />
        ) : (
          <AppIcon
            name={'down'}
            type={'AntDesign'}
            size={15}
            onPress={() => {
              setviewRating(!viewRating);
            }}
            color={theme.color.dropdownColor}
          />
        )}
      </View>
      {viewRating ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  LinearGradient: {
    borderRadius: vw(20),
  },
  innerView: {
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
    borderWidth: 1,
    paddingBottom: 12,
    marginHorizontal: vw(24),
    borderRadius: vw(20),
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  name: {
    color: theme.color.black,
    marginHorizontal: vw(21),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
   
  },
  stylistRate: {
    color: theme.color.black,
    fontSize: normalize(18),
    marginTop: vh(40),
    marginHorizontal: vw(24),
    fontFamily: theme.font.semiBold,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: normalize(14),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.medium,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  uploadReviewTouch: {
    borderWidth: 1,
    marginTop: vh(22),
    alignSelf: 'center',
    borderRadius: vw(5),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
    paddingVertical: vh(11),
    paddingHorizontal: vw(25),
  },
  uploadReviewText: {
    textAlign: 'center',
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  ratingTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(24),
    marginTop: vh(30),
    borderWidth: 1,
    borderColor: theme.color.white,
    paddingVertical: vh(26),
    alignItems: 'center',
  },
  ratingText: {
    color: theme.color.LightBlue,
    fontSize: normalize(18),
    fontFamily: theme.font.semiBold,
  },
  ReviewView: {
    borderWidth: 1,
    borderColor: theme.color.white,
    marginTop: vh(20),
    marginHorizontal: vw(24),
    borderRadius: vw(10),
  },
  name: {
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
    color: theme.color.black,
  },
  date: {
    color: theme.color.inputGrey,
    fontFamily: theme.font.regular,
    fontSize: normalize(10),
    marginTop: vh(4),
  },
  reviewText: {
    color: theme.color.dropdownColor,
    marginHorizontal: vw(18),
    fontSize: normalize(11),
  },
  reply: {
    fontSize: normalize(10),
    color: theme.color.LightBlue,
    alignSelf: 'flex-end',
    marginHorizontal: vw(24),
    marginTop: vh(11),
    marginBottom: vh(20),
  },
});

export default ReviewRating;
