import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AppIcon from './AppIcon';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';

const CustomHeader = ({
  heading,
  description,
  iconName,
  iconType,
  iconColor,
  onPress,
  extraHeadingStyle,
  extraDescriptionStyle,
}) => {
  return (
    <>
      <View style={styles.mainHeader}>
        <AppIcon
          onPress={onPress}
          name={iconName}
          type={iconType}
          color={iconColor}
          style={{marginRight: 10}}
        />
        <Text style={[styles.heading, extraHeadingStyle]}>{heading}</Text>
      </View>
      <Text style={[styles.description, extraDescriptionStyle]}>
        {description}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    marginTop: vh(20),
  },
  heading: {
    color: theme.color.black,
    fontSize: normalize(24),
    textAlign: 'center',
    fontFamily: theme.font.bold,
  },
  description: {
    color: theme.color.darkGrey,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: vh(8),
    fontSize: normalize(13),
    fontFamily: theme.font.semiBold,
  },
});

export default CustomHeader;
