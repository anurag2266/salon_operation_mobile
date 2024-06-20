import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import theme from '../theme/theme';
import {normalize, vh, vw} from '../utils/dimensions';

const VerificationScreen = () => {
  return (
    <View>
      <Text style={styles.verificationTxt}>Verification In Process</Text>
      <Text style={styles.settingSalon}>
        Please wait while we are setting up your salon
      </Text>
      <View style={{alignSelf: 'center', marginTop: '40%'}}>
        <ActivityIndicator size={'large'} color={theme.color.LightBlue} />
      </View>
      <Text style={styles.loading}>LOADING...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  verificationTxt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    fontSize: normalize(24),
    marginTop: vh(80),
  },
  settingSalon: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    textAlign: 'center',
    fontSize: normalize(13),
    marginTop: vh(8),
    marginHorizontal: vw(100),
  },
  loading: {
    textAlign: 'center',
    marginTop: vh(40),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.bold,
    fontSize: normalize(25),
  },
});

export default VerificationScreen;
