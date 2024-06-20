import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AppIcon from './AppIcon';
import theme from '../../theme/theme';
import {normalize, vh} from '../../utils/dimensions';

const RadioButton = ({
  options = [],
  selected = [options[0]],
  setSelected,
  title,
  containerStyles,
}) => {
  return (
    <View style={containerStyles}>
      <Text
        style={{
          fontFamily: theme.font.medium,
          fontSize: normalize(18),
          color: theme.color.black,
        }}>
        {title}
      </Text>
      {options.map(item => (
        <TouchableOpacity
          onPress={() => setSelected(item)}
          activeOpacity={0.7}
          style={{
            marginTop: vh(18),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: normalize(15),
              fontFamily: theme.font.regular,
            }}>
            {item}
          </Text>
          <AppIcon
            type="Ionicons"
            name={selected == item ? 'radio-button-on' : 'radio-button-off'}
            color={theme.color.primary}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
