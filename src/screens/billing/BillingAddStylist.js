import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';

const BillingAddStylist = ({navigation}) => {
  const [search, setSearch] = useState('');
  const data = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      name: 'Aaditya Sharma',
      stylist: 'Hair Stylist',
      expert: 'Expert',
    },
  ];
  return (
    <Container
      title={'Add Stylist'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search Stylists"
        placeholder="Search Stylists"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSearch(text);
        }}
        renderLeftIcon={() => (
          <AppIcon
            name={'search1'}
            type={'AntDesign'}
            size={20}
            color={theme.color.bottomWidth}
            style={{marginRight: vw(15)}}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: vw(15),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'filter'}
            type={'AntDesign'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'swap-vertical'}
            type={'Ionicons'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Sort By</Text>
        </TouchableOpacity>
      </View>
      {data.map((item, index) => {
        return (
          <View key={item.id} style={styles.itemView}>
            <View style={styles.imgView}>
              <Image
                source={item.imagePath}
                resizeMode={'contain'}
                style={{width: vw(64), height: vh(64)}}
              />
            </View>
            <View style={{marginRight: '15%'}}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemSubText}>{item.stylist}</Text>
              <Text style={styles.itemSubText}>{item.expert}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SelectStepsForStylist');
              }}>
              <Text style={styles.addStylist}>+Add Stylist</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 13},
  labelStyle: {
    fontSize: normalize(13),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(25),
    marginTop: vh(30),
    borderBottomWidth: 1,
    paddingBottom: vh(20),
    borderColor: theme.color.bottomWidth,
    alignItems: 'center',
  },
  itemText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  itemSubText: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  imgView: {
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.black,
    backgroundColor: theme.color.black,
  },
  addStylist: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
});

export default BillingAddStylist;
