import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import LocalImages from '../../../utils/LocalImages';

const AddingClient = ({navigation}) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [onSelect, setonSelect] = useState(false);

  const DATA = [
    {
      id: 1,
      label: 'Female',
    },
    {
      id: 2,
      label: 'Male',
    },
    {
      id: 3,
      label: 'Other',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setonSelect(item.label);
        }}>
        {item.label == onSelect ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Container
      title={'Adding Client'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <Text style={styles.clientNameText}>
        Type your client name here to add new appointment
      </Text>
      <Text style={styles.selectgender}>Select Gender</Text>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: vh(20),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TextInput
        value={firstName}
        style={[styles.input, {marginTop: vh(20)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="First Name"
        placeholder="First Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setfirstName(text);
        }}
      />
      <TextInput
        value={lastName}
        style={[styles.input, {marginTop: vh(20)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Last Name"
        placeholder="Last Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setlastName(text);
        }}
      />
    </Container>
  );
};

export default AddingClient;

const styles = StyleSheet.create({
  clientNameText: {
    textAlign: 'center',
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(14),
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
});
