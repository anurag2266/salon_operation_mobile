import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../common/AppIcon';

const MembershipPurchaseHistoryCard = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={{position: 'relative', width: '60%'}}>
        <Text style={styles.title}>Gold Plan</Text>
        <Text style={styles.name}>Sanjana Singh</Text>
        <Text style={styles.payment}>Payment Complete</Text>
        <View
          style={{
            position: 'absolute',
            right: 0,
            top: vh(10),
            height: vh(21),
            backgroundColor: 'red',
            paddingVertical: vh(4),
            paddingHorizontal: vw(11),
            borderRadius: vw(4),
          }}>
          <Text
            style={{
              fontSize: normalize(10),
              color: theme.color.white,
              fontFamily: theme.font.regular,
              fontWeight: '500',
            }}>
            Expired
          </Text>
        </View>
      </View>
      <AppIcon type="Ionicons" name="chevron-forward" />
      <Text style={styles.date}>30 November 2022</Text>
    </TouchableOpacity>
  );
};

export default MembershipPurchaseHistoryCard;

const styles = StyleSheet.create({
  container: {
    height: vh(106),
    paddingVertical: vh(18),
    paddingHorizontal: vw(10),
    borderRadius: vw(10),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    backgroundColor: theme.color.white,
    marginTop: vh(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  date: {
    position: 'absolute',
    top: vh(14),
    right: vw(11),
    fontFamily: theme.font.regular,
    fontWeight: '400',
    fontSize: normalize(10),
  },
  title: {
    fontFamily: theme.font.regular,
    fontWeight: '600',
    fontSize: normalize(14),
  },
  name: {
    fontFamily: theme.font.regular,
    fontWeight: '500',
    fontSize: normalize(14),
    color: theme.color.TextGrey,
    marginTop: vh(4),
    marginBottom: vh(10),
  },
  payment: {
    fontFamily: theme.font.regular,
    fontWeight: '400',
    fontSize: normalize(12),
    color: theme.color.primary,
  },
});
