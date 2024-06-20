import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';

const ClientNotes = () => {
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.white}}>
      <ScrollView>
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
        <TouchableOpacity
          onPress={() => {
            setNotes(!notes);
          }}>
          <Text style={styles.notesText}>+ Notes</Text>
        </TouchableOpacity>
        {notes ? (
          <View style={styles.mainview}>
            <TextInput
              value={notes}
              style={[styles.input, {marginTop: vh(25)}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Add Note"
              placeholder="Add Note"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setNotes(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setNotes(!notes);
              }}>
              <Text
                style={{
                  alignSelf: 'flex-end',
                  marginVertical: vh(20),
                  marginHorizontal: vw(20),
                  fontSize: normalize(16),
                  fontFamily: theme.font.bold,
                  color: theme.color.LightBlue,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.mainview}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: vw(20),
            }}>
            <Text
              style={{
                fontFamily: theme.font.bold,
                color: theme.color.black,
                fontSize: normalize(16),
              }}>
              Note 1
            </Text>
            <Text
              style={{
                fontFamily: theme.font.regular,
                fontSize: normalize(13),
                color: '#5C5C5C',
              }}>
              01-01-2022 at 01:00 PM
            </Text>
          </View>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#D2D2D280',
              marginVertical: vh(10),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: vw(20),
              marginTop: vh(11),
            }}>
            <Text
              style={{
                fontFamily: theme.font.semiBold,
                fontSize: normalize(13),
                color: '#5C5C5C',
              }}>
              Created By: Tarun Sharma
            </Text>
            <Text
              style={{
                fontFamily: theme.font.semiBold,
                fontSize: normalize(13),
                color: '#5C5C5C',
              }}>
              at Salon Name{' '}
            </Text>
          </View>
          <Text
            style={{
              paddingHorizontal: vw(20),
              marginTop: vh(11),
              fontFamily: theme.font.semiBold,
              fontSize: normalize(13),
              color: theme.color.black,
            }}>
            Lorem Ipsum is dummy text
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientNotes;

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
  notesText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    marginHorizontal: vw(18),
    marginTop: vh(20),
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
    paddingVertical: vh(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
});
