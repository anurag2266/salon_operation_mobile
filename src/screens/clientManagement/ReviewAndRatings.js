import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import {Rating, AirbnbRating} from 'react-native-ratings';
import * as Progress from 'react-native-progress';
const Data = [
  {
    id: 1,
    name: 'John K.',
    duration: '10 Months ago',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    imageUrl: require('../../assets/pic1.png'),
  },
  {
    id: 2,
    name: 'Alex K.',
    duration: '26 Dec 2022',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    imageUrl: require('../../assets/pic2.png'),
  },
  {
    id: 3,
    name: 'John K.',
    duration: '11 Months ago',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text",
    imageUrl: require('../../assets/pic3.png'),
  },
];
const DATA = [
  {
    id: 1,
    label: 'Rebacca Stylist: ',
  },
  {
    id: 2,
    label: 'Service: ',
  },
  {
    id: 3,
    label: 'Salon: ',
  },
];

const ReviewAndRatings = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.mainview}>
        <View style={styles.mainview1}>
          <Text
            style={{
              fontSize: normalize(36),
              fontFamily: theme.font.medium,
              alignSelf: 'center',
            }}>
            4.0
          </Text>

          <AirbnbRating
            count={5}
            defaultRating={11}
            isDisabled={true}
            size={15}
            ratingContainerStyle={{alignItems: 'flex-start'}}
          />
          <Text
            style={{
              fontSize: normalize(12),
              alignSelf: 'center',
              color: theme.color.LightBlue,
            }}>
            (893 Reviews)
          </Text>
        </View>
        <View style={{padding: vw(8)}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>5</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.8}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>4</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.6}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>3</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.4}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>2</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.2}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>1</Text>
            <Progress.Bar
              style={{margin: vw(5)}}
              color={theme.color.primary}
              progress={0.0}
              height={8}
              width={200}
              borderRadius={6}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.mainview,
          {justifyContent: 'space-between', height: vw(40)},
        ]}>
        <Text style={{fontFamily: theme.font.bold, fontSize: normalize(14)}}>
          Sort By
        </Text>
        <AppIcon name={'down'} type={'AntDesign'} size={15} color={'grey'} />
      </View>

      <Text
        style={{
          padding: vh(20),
          fontSize: normalize(15),
          fontFamily: theme.font.bold,
        }}>
        Reviews(90)
      </Text>
      {Data.map(item => {
        return (
          <View style={{margin: vw(15)}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: vw(47), height: vw(47)}}
                source={item.imageUrl}
              />
              <View>
                <Text
                  style={{
                    marginHorizontal: vw(13),
                    fontFamily: theme.font.medium,
                    fontSize: normalize(14),
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    marginHorizontal: vw(13),
                    color: theme.color.grey,
                    fontFamily: theme.font.medium,
                    fontSize: normalize(8),
                  }}>
                  {item.duration}
                </Text>
              </View>
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                color={'grey'}
                style={{marginLeft: vw(230)}}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              {DATA.map(item => {
                return (
                  <>
                    <Text
                      style={{
                        fontFamily: theme.font.medium,
                        fontSize: normalize(10),
                        marginTop: vh(15),
                        marginLeft: vw(20),
                      }}>
                      {item.label}
                    </Text>

                    <View
                      style={{
                        borderWidth: 0.25,
                        borderRadius: vw(10),
                        padding: vw(4),
                        flexDirection: 'row',
                        margin: vw(10),
                      }}>
                      <AppIcon
                        name={'star'}
                        type={'AntDesign'}
                        color={'#FFB630'}
                        size={14}
                      />
                      <Text
                        style={{
                          marginHorizontal: vw(5),
                          fontSize: normalize(10),
                          alignSelf: 'center',
                        }}>
                        4
                      </Text>
                    </View>
                  </>
                );
              })}
            </View>
            <Text
              style={{fontFamily: theme.font.medium, fontSize: normalize(11)}}>
              {item.description}
            </Text>
          </View>
        );
      })}

      <TouchableOpacity style={styles.shareBtn}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
          style={{marginRight: vw(15)}}
        />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReviewAndRatings;

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.font.medium,
    fontSize: normalize(15),
    color: theme.color.black,
  },
  mainview: {
    marginTop: vh(30),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'row',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(10),
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  mainview1: {
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    width: vw(126),
    height: vh(120),

    margin: vw(5),
    borderRadius: vw(15),
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginVertical: '20%',

    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
});
