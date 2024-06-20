import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../components/common/AppIcon';

const ClientBilling = ({onPressLeft}) => {
  const [option, setOption] = useState('History');
  const [search, setSearch] = useState('');
  const data = [
    {
      id: 1,
      date: '12/01/23',
      service: '1223689596',
      discValue: '2000',
    },
  ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.white}}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setOption('History');
            }}
            style={[
              styles.mainTab,
              {backgroundColor: option == 'History' ? '#D2D2D2' : '#D2D2D24D'},
            ]}>
            <Text style={styles.mainTabText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOption('Advance Amount');
            }}
            style={[
              styles.mainTab,
              {
                backgroundColor:
                  option == 'Advance Amount' ? '#D2D2D2' : '#D2D2D24D',
              },
            ]}>
            <Text style={styles.mainTabText}>Advance Amount</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={search}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search for a service"
          placeholder="Search for a service"
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
        {option == 'History' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: vw(18),
                padding: vh(10),
                marginTop: vh(50),
              }}>
              <Text style={styles.txt}>Date</Text>
              <Text style={styles.txt}>Invoice</Text>
              <View>
                <Text style={styles.txt}>Bill Amt.</Text>
                <Text style={styles.txt}>(Rs.)</Text>
              </View>
              <Text style={styles.txt}>Invoice</Text>
            </View>
            {data.map(item => {
              return (
                <View
                  style={[
                    styles.mainview,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <Text style={styles.dataText}>{item.date}</Text>
                  <Text style={styles.dataText}>{item.service}</Text>
                  <Text style={styles.dataText}>{item.discValue}</Text>
                  <AppIcon
                    name={'file'}
                    type={'FontAwesome'}
                    size={15}
                    color={theme.color.black}
                  />
                </View>
              );
            })}
          </>
        ) : null}
        {option == 'Advance Amount' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: vw(18),
                padding: vh(10),
                marginTop: vh(50),
              }}>
              <Text style={styles.txt}>Date</Text>
              <Text style={styles.txt}>Invoice</Text>
              <View>
                <Text style={styles.txt}>Advance Amt.</Text>
                <Text style={styles.txt}>(Rs.)</Text>
              </View>
              <Text style={styles.txt}>Invoice</Text>
            </View>
            {data.map(item => {
              return (
                <View
                  style={[
                    styles.mainview,
                    {flexDirection: 'row', justifyContent: 'space-between'},
                  ]}>
                  <Text style={styles.dataText}>{item.date}</Text>
                  <Text style={styles.dataText}>{item.service}</Text>
                  <Text style={styles.dataText}>{item.discValue}</Text>
                  <AppIcon
                    name={'file'}
                    type={'FontAwesome'}
                    size={15}
                    color={theme.color.black}
                  />
                </View>
              );
            })}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientBilling;

const styles = StyleSheet.create({
  mainTab: {
    backgroundColor: '#D2D2D24D',
    paddingHorizontal: vw(60),
    paddingVertical: vh(17),
    alignItems: 'center',
  },
  mainTabText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
  },
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
  dataText: {
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  txt: {
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
    color: theme.color.black,
  },
  mainview: {
    marginTop: vh(20),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: theme.color.white,
    paddingVertical: vh(10),
    padding: vw(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
});
