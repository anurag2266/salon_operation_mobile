import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import theme from '../../theme/theme';

const AccountCreated = ({visible, ref}) => {
  return visible ? (
    <View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        flex: 1,
        zIndex: 999999,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 10,
        backgroundColor: theme.color.white,
        opacity: 0.9,
        width: '100%',
      }}>
      <Lottie
        ref={ref}
        style={{
          height: 200,
          width: 200,
        }}
        source={require('../../assets/lottie/thankyou.json')}
        autoPlay
      />
    </View>
  ) : null;
};

export default AccountCreated;

const styles = StyleSheet.create({});
