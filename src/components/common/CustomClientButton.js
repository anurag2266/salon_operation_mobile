import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const CustomClientButton = ({onSelect, selected}) => {
  const data = [
    {
      id: 1,
      imagePath: LocalImages.male,
      name: 'Male',
    },
    {
      id: 2,
      imagePath: LocalImages.female,
      name: 'Female',
    },
    {
      id: 3,
      imagePath: LocalImages.unisex,
      name: 'Unisex',
    },
  ];
  return (
    <View style={{flexDirection: 'row'}}>
      {data.map(item => {
        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[
              styles.itemMainView,
              {
                backgroundColor:
                  item.name == selected
                    ? theme.color.primary
                    : theme.color.white,
              },
            ]}>
            <LinearGradient
              colors={
                item.name == selected
                  ? ['#456277', '#50A7D9']
                  : ['#E1E1E1', '#E1E1E1']
              }
              style={[styles.customBtnGradient]}>
              <View style={styles.imgView}>
                <Image style={styles.image} source={item.imagePath} />
              </View>
              <Text
                style={[
                  styles.itemname,
                  {
                    color:
                      item.name == selected
                        ? theme.color.white
                        : theme.color.primary,
                  },
                ]}>
                {item.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  itemMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: vw(500),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginHorizontal: vw(15),
    marginTop: vh(13),
  },
  image: {
    width: vw(20),
    height: vw(20),
  },
  imgView: {
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    borderRadius: vw(20),
    padding: vw(7),
  },
  itemname: {
    textAlign: 'center',
    paddingRight: vw(14),
    marginVertical: vh(8),
    marginLeft: vh(5),
    color: theme.color.Black_shadow,
    fontSize: normalize(13),
    fontFamily: theme.font.bold,
  },
  customBtnGradient: {
    flexDirection: 'row',
    borderRadius: vw(500),
    padding: vw(7),
  },
});

export default CustomClientButton;
