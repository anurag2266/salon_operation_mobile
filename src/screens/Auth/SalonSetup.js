import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/common/CustomButton';
import AppIcon from '../../components/common/AppIcon';
import Container from '../../components/common/Container';

const SalonSetup = ({navigation}) => {
  return (
    <Container scroll={false} header={false}>
      <Image
        resizeMode="cover"
        style={styles.salonImg}
        source={LocalImages.Salon}
      />
      {/* <AppIcon
        type="MaterialCommunityIcons"
        name="arrow-left"
        style={styles.BackBtn}
        onPress={() => {
          navigation.goBack();
        }}
      /> */}
      <Text style={styles.headText}>Quickly Set-up your Salon</Text>
      <Text style={styles.bodyText}>
        Make it easy to be found on Salonesis and streamline your approach
      </Text>
      <CustomButton
        onPress={() => {
          navigation.navigate('SalonSetupSteps');
        }}
        extraStyle={{marginTop: vh(97)}}
        label={'Continue'}
      />
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity>
        <Text style={styles.setupVideoText}>Watch A Setup Video</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  salonImg: {
    width: vw(428),
    height: vh(441),
  },
  headText: {
    fontFamily: theme.font.bold,
    color: theme.color.black,
    fontSize: normalize(18),
    textAlign: 'center',
    marginTop: vh(32),
  },
  bodyText: {
    marginTop: vh(16),
    textAlign: 'center',
    marginHorizontal: vw(40),
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  btnText: {
    textAlign: 'center',
    marginTop: vh(28),
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
  orText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    marginTop: vh(16),
    fontSize: normalize(18),
  },
  setupVideoText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(18),
  },
});

export default SalonSetup;
