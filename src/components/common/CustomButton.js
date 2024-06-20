import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import theme from '../../theme/theme';
import {vw, vh, normalize} from '../../utils/dimensions';

const CustomButton = ({
  onPress,
  label,
  extraStyle = {},
  labelExtraStyle = {},
  disabled = false,
  linearGradient = false,
  colorArray = [],
  styleGradient = {},
  imageSource,
  imageStyle = {},
}) => {
  if (linearGradient) {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colorArray}
        style={styleGradient}>
        <TouchableOpacity onPress={() => onPress()} style={styles.imageButton}>
          <Image source={imageSource} style={imageStyle} />
          <Text
            style={[
              disabled ? styles.fadedText : styles.labelStyle,
              labelExtraStyle,
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  } else {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[disabled ? styles.fadedButton : styles.container, extraStyle]}
        onPress={onPress}>
        <Image source={imageSource} style={imageStyle} />
        <Text
          style={[
            disabled ? styles.fadedText : styles.labelStyle,
            labelExtraStyle,
          ]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: vw(10),
    marginTop: vh(207),
    marginHorizontal: vw(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.primary,
    paddingVertical: vw(16),
  },
  labelStyle: {
    fontSize: vw(18),
    color: theme.color.white,
    fontFamily: theme.font.bold,
  },
  fadedText: {
    fontSize: vw(18),
    color: theme.color.white,
    fontFamily: theme.font.bold,
  },
  fadedButton: {
    flexDirection: 'row',
    borderRadius: vw(10),
    marginTop: vh(70),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.grey,
    padding: vw(10),
    paddingHorizontal: vw(30),
    paddingVertical: vh(17),
    marginHorizontal: vw(19),
  },
});

export default CustomButton;
