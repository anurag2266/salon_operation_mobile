import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import CustomButton from '../../components/common/CustomButton';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';

const SelectLocation = ({navigation, onPress}) => {
  return (
    <View
      style={{
        borderTopWidth: 1,
        borderTopLeftRadius: vw(20),
        borderTopRightRadius: 20,
        paddingTop: vh(52),
        borderColor: theme.color.white,
      }}>
      <Text style={{marginHorizontal: vw(30), color: theme.color.lightBlack}}>
        Select Location
      </Text>
      <CustomButton
        onPress={onPress}
        extraStyle={{marginTop: vh(60)}}
        label={'Confirm Location'}
      />
    </View>
  );
};

export default SelectLocation;
