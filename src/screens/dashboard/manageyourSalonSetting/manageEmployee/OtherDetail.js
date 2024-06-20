import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../../../../components/common/Container';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import AppIcon from '../../../../components/common/AppIcon';

const OtherDetail = ({navigation}) => {
  const data = [
    {
      id: 1,
      label: 'Insurance',
      navigation: '',
    },
    {
      id: 2,
      label: 'Loan',
      navigation: '',
    },
    {
      id: 3,
      label: 'Leave Request',
      navigation: '',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={[styles.itemView, styles.boxWithShadow]}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Other Details'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={data}
        style={{marginTop: vh(30)}}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  itemView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(14),
    paddingHorizontal: vw(20),
    paddingVertical: vh(25),
    alignItems: 'center',
    borderColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.5,
    shadowRadius: 1,
    elevation: 2,
  },
  itemLabel: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
  },
});

export default OtherDetail;
