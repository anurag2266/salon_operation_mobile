import {SafeAreaView, StyleSheet, Platform, StatusBar} from 'react-native';
import React from 'react';
import theme from '../../theme/theme';

const ContainerBasic = ({children}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

export default ContainerBasic;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: theme.color.white,
  },
  scrollview: {flex: 1, paddingBottom: 50},
  keyboardavoidingview: {flex: 1},
});
