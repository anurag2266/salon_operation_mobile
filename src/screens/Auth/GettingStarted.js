import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import React from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import {vw, vh, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import LocalImages from '../../utils/LocalImages';
import CustomButton from '../../components/common/CustomButton';
import AppIcon from '../../components/common/AppIcon';

const GettingStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{position: 'relative'}}>
      <AppIcon
        style={{position: 'absolute', top: vh(80), zIndex: 5555, left: vw(5)}}
        type="Ionicons"
        name="arrow-back"
        color={theme.color.white}
        onPress={() => navigation.goBack()}
      />
      <Image
        resizeMode="cover"
        style={styles.CreatingAccount}
        source={LocalImages.CreatingAccount}
      />
      <Text style={styles.mainText}>Welcome to Salonesis!</Text>
      <Text style={styles.subText}>
        Find the best salons and stylists for your beauty appointments easily
        with us and enjoy the pampering.
      </Text>
      <CustomButton
        label={'Get Started'}
        onPress={() => {
          navigation.navigate('SelectYourLanguage');
        }}
      />
    </SafeAreaView>
  );
};

export default GettingStarted;

const styles = StyleSheet.create({
  CreatingAccount: {
    width: vw(428),
    height: vh(428),
  },
  mainText: {
    fontSize: normalize(18),
    textAlign: 'center',
    color: theme.color.black,
    marginVertical: vh(16),
    fontFamily: theme.font.bold,
  },
  subText: {
    textAlign: 'center',
    marginHorizontal: vw(24),
    color: theme.color.darkGrey,
    fontFamily: theme.font.medium,
    fontSize: normalize(13),
  },
});
