import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../components/common/ScrollContainer';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import CheckBox from '@react-native-community/checkbox';
import AppIcon from '../../components/common/AppIcon';
import CustomButton from '../../components/common/CustomButton';
import CustomHeader from '../../components/common/CustomHeader';
import Container from '../../components/common/Container';
import {TextInput} from 'react-native-element-textinput';

const SelectYourLanguage = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState('English');

  const data = [
    {
      id: 1,
      name: 'English',
    },
    {
      id: 2,
      name: 'Hindi',
    },
    {
      id: 3,
      name: 'বাংলা',
    },
    {
      id: 4,
      name: 'తెలుగు',
    },
    {
      id: 5,
      name: 'മലയാളം',
    },
    {
      id: 6,
      name: 'ગુજરાતી',
    },
  ];
  return (
    <Container
      title={'Select Your Language'}
      leftIconName="arrow-left"
      scroll
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons">
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
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
      <View style={styles.selectedValue}>
        <AppIcon
          style={styles.globe}
          name="globe-outline"
          type="Ionicons"
          size={20}
          color={theme.color.dropdownColor}
        />
        <Text
          style={{
            color: '#A3A3A3',
            fontFamily: theme.font.regular,
            fontSize: normalize(12),
          }}>
          Select your preferred language
        </Text>
      </View>
      <View style={styles.languageBorder}>
        {data
          .filter(item => item.name.includes(search))
          .map((Language, index) => {
            return (
              <View key={Language.id}>
                <View
                  style={{
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: vw(30),
                  }}>
                  <CheckBox
                    onPress={() => {
                      setChecked(Language.name);
                    }}
                    tintColors={{
                      true: theme.color.primary,
                      false: theme.color.dropdownColor,
                    }}
                    disabled={false}
                    value={Language.name == checked}
                    onValueChange={() => setChecked(Language.name)}
                  />
                  <Text style={styles.Datatext}>{Language.name} </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: theme.color.borderGrey,
                    marginVertical: vh(15),
                  }}></View>
              </View>
            );
          })}
      </View>
      <CustomButton
        label={'Continue'}
        extraStyle={{marginTop: vh(70)}}
        onPress={() => {
          navigation.navigate('TermAndCondition');
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  BackBtn: {
    color: theme.color.lightBlack,
  },
  Datatext: {
    fontSize: normalize(14),
    color: theme.color.black,
    fontFamily: theme.font.regular,
  },
  selectedValue: {
    flexDirection: 'row',
    marginVertical: vh(30),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  globe: {
    marginHorizontal: vw(23),
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
  languageBorder: {
    shadowColor: theme.color.Black_shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingVertical: vh(15),
  },
});

export default SelectYourLanguage;
