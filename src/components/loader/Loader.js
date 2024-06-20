import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import theme from '../../theme/theme';
import {normalize, vh} from '../../utils/dimensions';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('screen').height;

const Loader = ({visible}) => {
  const state = useSelector(state => state.flightReducer);
  return visible ? (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        zIndex: 999999,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        width: '100%',
      }}>
      <ActivityIndicator color={theme.color.white} size="large" />
      <Text
        style={{
          textAlign: 'center',
          marginTop: 20,
          color: theme.color.white,
          fontFamily: theme.font.semiBold,
          fontSize: normalize(18),
        }}>
        Please Wait...
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginTop: vh(5),
          color: theme.color.white,
          fontFamily: theme.font.regular,
          fontSize: normalize(14),
        }}>
        {state?.uploadPercent == '100.00'
          ? 'Almost Done'
          : `${state?.uploadPercent} %`}
      </Text>
    </View>
  ) : null;
};

export default Loader;

const styles = StyleSheet.create({});
