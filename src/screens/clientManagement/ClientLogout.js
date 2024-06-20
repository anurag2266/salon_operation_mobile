import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';

const ClientLogout = () => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.loginText}>Last Login: 03/02/2023 | 5:00PM</Text>
    </View>
  );
};

export default ClientLogout;

const styles = StyleSheet.create({
  mainView: {
    marginTop: vh(40),
    backgroundColor: '#E8E8E8',
    paddingHorizontal: vw(32),
    paddingVertical: vh(42),
  },
  loginText: {
    color: theme.color.black,
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
  },
});
