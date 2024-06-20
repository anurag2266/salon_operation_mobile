import {View, Text, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';

const SalonDetailedinfo = ({
  detail,
  extraStyle,
  detailExtraStyle,
  toggleValue = false,
  onToggle,
}) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={[styles.detailText, detailExtraStyle]}>{detail}</Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={onToggle}
          value={toggleValue}
        />
      </View>
      {/* <View style={[styles.bottomWidth, extraStyle]}></View> */}
    </>
  );
};

const styles = StyleSheet.create({
  clientTypeTxt: {
    fontSize: normalize(16),
    color: theme.color.black,
    marginHorizontal: vw(21),
    fontFamily: theme.font.medium,
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    borderColor: theme.color.bottomWidth,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginVertical: vh(25),
  },
  detailText: {
    fontSize: normalize(16),
    fontFamily: theme.font.medium,
    color: theme.color.black,
    textAlign: 'center',
    marginVertical: vh(5),
  },
});

export default SalonDetailedinfo;
