import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/common/CustomButton';
import AppIcon from '../../components/common/AppIcon';

const TermAndCondition = ({navigation}) => {
  return (
    <SafeAreaView>
      <AppIcon
        style={{position: 'absolute', top: vh(80), zIndex: 5555, left: vw(5)}}
        type="Ionicons"
        name="arrow-back"
        color={theme.color.white}
        onPress={() => navigation.goBack()}
      />
      <Image
        resizeMode="cover"
        style={styles.salonImg}
        source={LocalImages.Salon}
      />
      <AppIcon
        type="MaterialCommunityIcons"
        name="arrow-left"
        style={styles.BackBtn}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image source={LocalImages.Logo} style={styles.logo} />
      <Text style={styles.bodyText}>
        Click on “Agree and Continue” to accept the
        <TouchableOpacity
          onPress={() => navigation.navigate('TermAndConditionDescription')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={styles.linkText}>
            {' '}
            Terms & Condition{' '}
            <Text style={{color: theme.color.black}}>and</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermAndConditionDescription')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.linkText}> Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
      <CustomButton
        onPress={() => {
          navigation.navigate('MobileNumber');
        }}
        extraStyle={{marginTop: vh(97)}}
        label={'AGREE AND CONTINUE'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  salonImg: {
    width: vw(428),
    height: vh(441),
  },
  logo: {
    width: vw(190),
    height: vh(49),
    tintColor: theme.color.primary,
    alignSelf: 'center',
    marginTop: vh(48),
  },
  bodyText: {
    marginTop: vh(32),
    textAlign: 'center',
    color: theme.color.black,
    marginHorizontal: vw(26),
    fontSize: normalize(13),
    fontFamily: theme.font.medium,
    lineHeight: 20,
  },
  btnText: {
    textAlign: 'center',
    // marginTop: vh(30),
    color: theme.color.TextGrey,
    fontSize: normalize(10),
    fontFamily: theme.font.regular,
  },
  BackBtn: {
    color: theme.color.white,
    marginTop: vh(7),
    position: 'absolute',
    marginLeft: vw(16),
  },
  linkText: {
    color: theme.color.LightBlue,
    textAlign: 'center',
    fontSize: normalize(13),
    fontFamily: theme.font.medium,
  },
});

export default TermAndCondition;
