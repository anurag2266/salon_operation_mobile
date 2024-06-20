import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';

const ViewLocationLogHistory = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('Create');

  const data = [
    {
      id: 1,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      location: 'Retail Windows',
      Action: 'Create',
    },
    {
      id: 2,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      location: 'Retail Windows',
      Action: 'Create',
    },
    {
      id: 3,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      location: 'Retail Windows',
      Action: 'Edit',
    },
    {
      id: 4,
      date: '30/11/22',
      employee: 'Sanjana Singh',
      location: 'Retail Windows',
      Action: 'Create',
    },
  ];

  return (
    <Container
      title={'View Location Log History'}
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
        label="Search Locations"
        placeholder="Search Locations"
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(25),
          marginTop: vh(40),
        }}>
        <Text style={styles.dateText}>Date</Text>
        <Text style={styles.dateText}>Employee</Text>
        <Text style={styles.dateText}>Inv. Location</Text>
        <Text style={styles.dateText}>Action</Text>
      </View>
      {data.map(item => {
        return (
          <View style={[styles.dataview, styles.boxWithShadow]}>
            <Text style={[styles.dateText, {fontFamily: theme.font.regular}]}>
              {item.date}
            </Text>
            <Text style={[styles.dateText, {fontFamily: theme.font.regular}]}>
              {item.employee}
            </Text>
            <Text style={[styles.dateText, {fontFamily: theme.font.regular}]}>
              {item.location}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.dateText,
                  {
                    fontFamily: theme.font.medium,
                    color:
                      action == item.Action ? theme.color.primary : '#FFC305',
                  },
                ]}>
                {item.Action}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <TouchableOpacity style={styles.shareBtnView}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
        />
        <Text
          style={{
            color: theme.color.primary,
            fontSize: normalize(16),
            fontFamily: theme.font.bold,
            marginLeft: vw(15),
          }}>
          Share
        </Text>
      </TouchableOpacity>
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
  dateText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(14),
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 3.23,
    shadowRadius: 1.62,
    elevation: 4,
  },
  dataview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(15),
    borderWidth: 1,
    marginTop: vh(10),
    borderRadius: vw(10),
    paddingHorizontal: vw(10),
    paddingVertical: vh(12),
  },
  shareBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.primary,
    paddingHorizontal: vw(60),
    paddingVertical: vh(17),
    marginTop: '60%',
  },
});

export default ViewLocationLogHistory;
