import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../../../components/common/ScrollContainer';
import CustomHeader from '../../../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import BrandPriceTextInput from '../../../../components/common/BrandPriceTextInput';
import CustomButton from '../../../../components/common/CustomButton';

const ManageBrandPrice = ({
  onPressAddBrand,
  onPressBackBtn,
  onPress,
  brand,
  amountMale,
  durationMale,
  setAmountMale,
  setDurationMale,
  amountFemale,
  durationFemale,
  setAmountFemale,
  setDurationFemale,
}) => {
  return (
    <>
      <CustomHeader
        heading={brand}
        extraHeadingStyle={{marginHorizontal: vw(30)}}
        iconName="close"
        iconType="MaterialCommunityIcons"
        iconColor={theme.color.dropdownColor}
        onPress={onPressBackBtn}
      />
      <Text style={styles.BrandTxt}>{brand}</Text>
      <Text style={styles.text}>For Female</Text>
      <BrandPriceTextInput
        amount={amountMale}
        duration={durationMale}
        setAmount={setAmountMale}
        setDuration={setDurationMale}
      />
      <Text style={styles.text}>For Male</Text>
      <BrandPriceTextInput
        amount={amountFemale}
        duration={durationFemale}
        setAmount={setAmountFemale}
        setDuration={setDurationFemale}
      />

      {/* <TouchableOpacity onPress={onPressAddBrand}>
        <Text
          style={{
            color: theme.color.LightBlue,
            fontFamily: theme.font.bold,
            fontSize: normalize(16),
            marginHorizontal: vw(21),
          }}>
          + Add More Brands
        </Text>
      </TouchableOpacity> */}
    </>
  );
};

const styles = StyleSheet.create({
  BrandTxt: {
    textAlign: 'center',
    color: theme.color.Black_shadow,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    marginBottom: vh(29),
    marginTop: vh(41),
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

export default ManageBrandPrice;
