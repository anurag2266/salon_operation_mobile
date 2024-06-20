import {View} from 'react-native';
import React from 'react';
import theme from '../../theme/theme';

const ProgressBar = ({
  height = 10,
  activeColor = theme.color.primary,
  inActiveColor = theme.color.grey,
  progress = 10,
}) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: inActiveColor,
        position: 'relative',
        borderRadius: 5,
      }}>
      <View
        style={{
          height: 10,
          position: 'absolute',
          width: `${progress}%`,
          zIndex: 999,
          backgroundColor: activeColor,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default ProgressBar;
