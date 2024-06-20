import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../../utils/dimensions';
import AppIcon from './AppIcon';
import theme from '../../theme/theme';
import CustomButton from './CustomButton';

const NotCompleted = ({
  onPress,
  onPressBtnText,
  btnText,
  label,
  heading,
  description,
  onPressLabel,
}) => {
  return (
    <View>
      <AppIcon
        name={'close'}
        type={'AntDesign'}
        size={15}
        color={theme.color.black}
        onPress={onPress}
        style={{alignSelf: 'flex-end', margin: vw(21)}}
      />
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomButton
          label={label}
          onPress={onPressLabel}
          extraStyle={{
            marginTop: vh(30),
            marginBottom: vh(30),
            width: '40%',
            borderColor: theme.color.primary,
            borderWidth: 1,
            backgroundColor: theme.color.white,
          }}
          labelExtraStyle={{color: theme.color.primary}}
        />
        <CustomButton
          label={btnText}
          onPress={onPressBtnText}
          extraStyle={{marginTop: vh(30), marginBottom: vh(30), width: '40%'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginHorizontal: vw(40),
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
    color: theme.color.black,
  },
  description: {
    textAlign: 'center',
    marginTop: vh(20),
    fontFamily: theme.font.regular,
    marginHorizontal: vw(16),
    fontSize: normalize(16),
    color: theme.color.black,
  },
});

export default NotCompleted;
