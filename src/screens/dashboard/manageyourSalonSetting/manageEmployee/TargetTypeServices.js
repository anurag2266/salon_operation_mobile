import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import CustomButton from '../../../../components/common/CustomButton';

const TargetTypeServices = ({onPress}) => {
  const [count, setCount] = useState(1);
  const inc = () => {
    setCount(count + 1);
  };
  const dec = () => {
    if (count > 0) setCount(count - 1);
  };

  const DATA = [
    {
      id: 1,
      label: 'Bleach Feet & Hand',
      time: '40 min',
      price: 'Rs 550',
    },
    {
      id: 2,
      label: 'Bleach Feet & Hand',
      time: '40 min',
      price: 'Rs 550',
    },
    {
      id: 3,
      label: 'Bleach Feet & Hand',
      time: '40 min',
      price: 'Rs 550',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.mainView}>
        <View>
          <Text style={styles.itemLabel}>{item.label}</Text>
          <View style={{flexDirection: 'row', marginTop: vh(7)}}>
            <Text style={styles.itemDetail}>{item.time}</Text>
            <View style={styles.leftWidth}></View>
            <Text style={styles.itemDetail}>{item.price}</Text>
          </View>
        </View>
        <View style={styles.countView}>
          <TouchableOpacity onPress={inc}>
            <Text style={[styles.countValue, {marginRight: vw(15)}]}>+</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity onPress={dec}>
            <Text style={[styles.countValue, {marginLeft: vw(15)}]}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.serviceText}>
        Target type based on no. of services
      </Text>
      <Text style={styles.servicesAssign}>
        List of services assign to Sunaina Singh
      </Text>
      <Text style={styles.category}>
        Category : <Text style={{fontFamily: theme.font.bold}}>Skin</Text>
      </Text>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <CustomButton
        label={'SAVE'}
        onPress={onPress}
        extraStyle={{marginBottom: vh(40)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  serviceText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    marginTop: vh(30),
    fontSize: normalize(18),
  },
  servicesAssign: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    textAlign: 'center',
    marginTop: vh(12),
    fontSize: normalize(16),
  },
  category: {
    color: theme.color.primary,
    fontSize: normalize(16),
    marginHorizontal: vw(15),
    marginTop: vh(40),
    fontFamily: theme.font.regular,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginTop: vh(20),
    borderBottomWidth: 1,
    paddingBottom: vh(15),
    borderColor: theme.color.dropdownColor,
  },
  countView: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingVertical: vh(10),
    paddingHorizontal: vw(15),
    borderColor: theme.color.primary,
    borderRadius: vw(5),
    backgroundColor: theme.color.primary,
  },
  countValue: {
    color: theme.color.white,
    fontSize: normalize(22),
    textAlign: 'center',
    fontFamily: theme.font.regular,
  },
  countText: {
    color: theme.color.white,
    fontSize: normalize(16),
    textAlign: 'center',
    marginTop: vh(3),
    fontFamily: theme.font.regular,
  },
  leftWidth: {
    borderLeftWidth: 1,
    marginHorizontal: vw(20),
    borderColor: theme.color.dropdownColor,
  },
  itemDetail: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },
  itemLabel: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
  },
});

export default TargetTypeServices;
