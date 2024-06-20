import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import Container from '../../../../components/common/Container';
import BrandPriceTextInput from '../../../../components/common/BrandPriceTextInput';

const ManageServicePrice = ({navigation, onPress}) => {
  return (
    <Container
      title={'Manage Pricing'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={onPress}
      bottomButtonTitle={'Save'}
      onPressBottomButton={''}>
      <Text style={styles.BrandTxt}>L’Oreal</Text>
      <Text style={styles.text}>For Female</Text>
      <BrandPriceTextInput />
      <Text style={styles.text}>For Male</Text>
      <BrandPriceTextInput />
      <View style={styles.bottomWidth}></View>
      <Text style={styles.BrandTxt}>Forest Essentials</Text>
      <Text style={styles.text}>For Female</Text>
      <BrandPriceTextInput />
      <Text style={styles.text}>For Male</Text>
      <BrandPriceTextInput />
    </Container>
  );
};

const styles = StyleSheet.create({
  BrandTxt: {
    marginTop: vh(15),
    textAlign: 'center',
    color: theme.color.Black_shadow,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    borderColor: theme.color.bottomWidth,
  },
  text: {
    color: theme.color.lightBlack,
    marginTop: vh(13),
    marginHorizontal: vw(21),
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
  },
});

export default ManageServicePrice;
