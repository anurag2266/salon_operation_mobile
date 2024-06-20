import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {normalize, vh} from '../../../utils/dimensions';

const LogDetail = ({navigation}) => {
  return (
    <Container
      title={'Log Details'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <Text style={styles.couponNameText}>Coupon Name</Text>
      <Text style={styles.couponNameText}>
        Code : <Text>XTZ1234New</Text>
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  couponNameText: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
    fontSize: normalize(20),
  },
});

export default LogDetail;
