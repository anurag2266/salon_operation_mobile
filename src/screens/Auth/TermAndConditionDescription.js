import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContainerBasic from '../../components/common/BasicContainer';
import CustomHeader from '../../components/common/CustomHeader';
import {vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import CustomButton from '../../components/common/CustomButton';

const TermAndConditionDescription = ({navigation}) => {
  return (
    <ContainerBasic>
      <CustomHeader
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        iconColor={theme.color.dropdownColor}
        extraHeadingStyle={{marginLeft: vw(20)}}
        heading={' & Condition and Privacy policy'}
        onPress={() => navigation.goBack()}
        extraDescriptionStyle={{marginLeft: vw(25)}}
        description={'Last updated on August 2022'}
      />
      <View
        style={{
          height: 1,
          backgroundColor: theme.color.black,
          marginVertical: vh(29),
        }}
      />
      <View style={{marginTop: vh(500)}}></View>
      <CustomButton
        onPress={() => {
          navigation.navigate('MobileNumber');
        }}
        extraStyle={{marginTop: vh(79)}}
        label={'AGREE AND CONTINUE'}
      />
    </ContainerBasic>
  );
};

export default TermAndConditionDescription;

const styles = StyleSheet.create({});
