import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';

const ComboOfferViewLog= ({navigation}) => {
  const [search, setSearch] = useState('');

  employeDATA = [
    {
      id: 1,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      action: 'Created',
    },
    {
      id: 2,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      action: 'Edited',
    },
    {
      id: 3,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      action: 'Inactive',
    },
    {
      id: 4,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      action: 'Active',
    },
  ];

  return (
    <Container
      title={'View Log History'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
     
      <TextInput
        value={search}
        style={[styles.input]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search"
        placeholder="Search"
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
          onPress={() => {
            setShowModal(true);
          }}
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: vh(30),
          justifyContent: 'space-around',
        }}>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Date
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Employee
        </Text>
        <Text style={[styles.header, {fontFamily: theme.font.semiBold}]}>
          Action
        </Text>
      </View>
      {employeDATA.map((item, index) => {
        return (
          <View
            key={item.id}
            style={[styles.boxWithShadow, styles.employeeDataView]}>
            <Text style={styles.header}>{item.date}</Text>
            <Text style={styles.header}>{item.employee}</Text>
            <Text style={styles.header}>{item.action}</Text>
            <AppIcon
              name={'right'}
              type={'AntDesign'}
              size={15}
              onPress={() => {
                navigation.navigate('LogDetail');
              }}
              color={theme.color.dropdownColor}
            />
          </View>
        );
      })}
      <TouchableOpacity style={styles.shareBtn}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
          style={{marginRight: vw(15)}}
        />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  planText: {
    textAlign: 'center',
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(20),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(25),
    marginHorizontal: vw(15),
    height: vh(55),
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
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginTop: '70%',
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
  header: {
    fontSize: normalize(14),
    color: theme.color.black,
    fontFamily: theme.font.regular,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  employeeDataView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.color.white,
    borderWidth: 1,
    borderColor: theme.color.white,
    marginTop: vh(17),
    marginHorizontal: vw(16),
    paddingVertical: vh(11),
    borderRadius: vw(10),
    alignItems: 'center',
  },
});

export default ComboOfferViewLog;
