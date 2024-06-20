import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppIcon from './AppIcon';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';

const Tags = ({onPress, title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <AppIcon
        onPress={onPress}
        style={styles.icon}
        type="Entypo"
        name="cross"
        color={theme.color.LightBlue}
        size={15}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontFamily: theme.font.medium,
    fontSize: normalize(14),
    textAlign: 'left',
    marginHorizontal: vw(14),
    marginVertical: vh(12),
    color: theme.color.dropdownColor,
  },
  icon: {
    marginHorizontal: vw(10),
    marginVertical: vh(12),
  },
});
