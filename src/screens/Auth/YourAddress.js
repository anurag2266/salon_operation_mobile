import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ContainerBasic from '../../components/common/BasicContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import LocalImages from '../../utils/LocalImages';
import AppIcon from '../../components/common/AppIcon';
import CustomButton from '../../components/common/CustomButton';

import RBSheet from 'react-native-raw-bottom-sheet';
import SelectLocation from './SelectLocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const YourAddress = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const refRBSheet = useRef();

  return (
    <ContainerBasic>
      <CustomHeader
        iconName="arrow-left"
        heading="Your Address"
        extraHeadingStyle={{marginLeft: vw(70)}}
        iconType="MaterialCommunityIcons"
        onPress={() => {
          navigation.goBack();
        }}
        description="Where can your clients find you?"
      />
      <View style={[styles.inputView, styles.boxWithShadow]}>
        <Image style={styles.searchIcon} source={LocalImages.Search} />
        <GooglePlacesAutocomplete
          listViewDisplayed
          keepResultsAfterBlur
          placeholder="Search your location"
          onPress={(data, details) => {
            // 'details' is provided when fetchDetails = true
            console.log('data', data);
            console.log('details', details);
            setLocation(data.description);
          }}
          fetchDetails
          query={{
            // key: 'AIzaSyAncp3Y7sQ19y_-J-i-QtkpioIZDEGhMW8',
            key: 'AIzaSyA2wjeYBVvcGkZhiLdfRwM-yown6rX1RSI',
            language: 'en',
          }}
          styles={styles.searchInput}
        />
      </View>
      <View style={styles.mylocationView}>
        <AppIcon
          name={'my-location'}
          type={'MaterialIcons'}
          style={styles.mylocation}
        />
        <TouchableOpacity
          onPress={() => {
            '';
          }}>
          <Text style={styles.mylocationText}>Current location</Text>
        </TouchableOpacity>
      </View>
      <CustomButton
        label={'Enter Your Location Manually'}
        onPress={() => {
          refRBSheet.current.open();
        }}
        extraStyle={{marginTop: vh(481)}}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          // wrapper: {
          //   backgroundColor: 'transparent',
          // },
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
          },
          draggableIcon: {
            backgroundColor: theme.color.white,
          },
        }}>
        <SelectLocation
          onPress={() => {
            refRBSheet.current.close();
            navigation.navigate('');
          }}
        />
      </RBSheet>
    </ContainerBasic>
  );
};

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    marginVertical: vh(22),
    borderWidth: vw(1),
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(13),
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  searchIcon: {
    width: vw(15),
    height: vh(16),
    marginVertical: vh(17),
  },
  searchInput: {
    paddingHorizontal: vw(14),
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
  },
  mylocationView: {
    flexDirection: 'row',
  },
  mylocation: {
    color: theme.color.LightBlue,
    marginLeft: vw(44),
  },
  mylocationText: {
    textAlign: 'center',
    marginVertical: vh(4),
    marginHorizontal: vw(9),
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
    color: theme.color.LightBlue,
  },
});

export default YourAddress;
