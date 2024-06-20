import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/Container';
import { TextInput } from 'react-native-element-textinput';
import theme from '../../../theme/theme';
import { vh, vw, normalize } from '../../../utils/dimensions';
import { Dropdown } from 'react-native-element-dropdown';
import { addInventoryMaster } from '../../../api/inventory/addInventoryMasterData';

const CreateLocation = ({ navigation, route }) => {
  const [chooseLocationCategory, setchooseLocationCategory] = useState([]);
  const [btnCancelTouch, setBtnCancelTouch] = useState(false);
  const [btnSaveTouch, setBtnSaveTouch] = useState(false);
  const [locationName, setlocationName] = useState('');
  const [description, setdescription] = useState('');

  useEffect(() => {
    if (chooseLocationCategory?.label?.length && locationName?.length && description?.length)
      setBtnSaveTouch(true)
    else {
      if (btnSaveTouch) {
        setBtnSaveTouch(false)
      }
    }
  }, [chooseLocationCategory, locationName, description])

  const onPressSave = async () => {
    let payload = {
      name: locationName,
      description: description,
      salonId: "639d6bd580e6c0adf45e0cd2",
      type: chooseLocationCategory?.label?.toLowerCase()
    }
    const { data, status, message } = await addInventoryMaster(payload)
    if (status) {
      console.log('api hitted', data);
      navigation?.goBack()
    } else {
      showMessage({ message: message, type: 'danger' });
      console.log('not api hitted', message);
    }
  }

  return (
    <Container
      title={'Create Location'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <Dropdown
        style={[styles.input, { paddingVertical: vh(15) }]}
        inputStyle={styles.inputStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        placeholder={'Choose Location Category'}
        labelField="label"
        valueField="value"
        maxHeight={300}
        data={[
          { label: 'Room', value: '1' },
          { label: 'Station', value: '2' },
          { label: 'Retail Window', value: '3' },
          { label: 'Store', value: '4' },
        ]}
        value={chooseLocationCategory}
        onChange={item => {
          setchooseLocationCategory(item);
        }}
      />
      <TextInput
        // value={locationName}
        style={[styles.input, { marginTop: vh(25) }]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Location Name"
        placeholder="Location Name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setlocationName(text);
        }}
      />
      <TextInput
        // value={description}
        style={[styles.input, { marginTop: vh(25) }]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        multiline={true}
        label="Description"
        placeholder="Description"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setdescription(text);
        }}
      />
      {
        !route?.params?.isInventoryLocation ?
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OpeningStockItems');
              }}>
              <Text style={styles.stockItemText}>+ Add Opening Stock Items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('OpeningStockItems');
              }}
            >
              <Text style={styles.stockItemText}>+ Add Stock Items</Text>
            </TouchableOpacity>
          </> : null
      }
      <View style={styles.btnView}>
        <TouchableOpacity
          onPress={() => {
            setBtnCancelTouch(!btnCancelTouch);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor: btnCancelTouch
                ? theme.color.primary
                : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {
                color: btnCancelTouch ? theme.color.white : theme.color.primary,
              },
            ]}>
            CANCEL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressSave}
          disabled={!btnSaveTouch}
          style={[
            styles.btnTouch,
            {
              backgroundColor: btnSaveTouch
                ? theme.color.primary
                : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {
                color: btnSaveTouch ? theme.color.white : theme.color.primary,
              },
            ]}>
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
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
  inputStyle: { fontSize: 13 },
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
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(30),
    marginTop: vh(300),
  },
  btnText: {
    fontSize: normalize(20),
    fontFamily: theme.font.semiBold,
  },
  btnTouch: {
    borderRadius: vw(10),
    borderColor: theme.color.primary,
    width: '40%',
    alignItems: 'center',
    paddingVertical: vh(20),
    borderWidth: 1,
  },
  stockItemText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    marginHorizontal: vw(21),
    marginTop: vh(23),
  },
});

export default CreateLocation;
