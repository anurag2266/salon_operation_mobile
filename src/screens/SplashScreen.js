import {SafeAreaView, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import ContainerBasic from '../components/common/BasicContainer';
import LocalImages from '../utils/LocalImages';
import theme from '../theme/theme';

export default function SplashScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={LocalImages.Logo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
  },
});
