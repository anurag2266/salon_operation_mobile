import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme/theme';
import {normalize, vw, vh} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';

const AddUPI = ({onPress}) => {
  const [selectedId, setSelectedId] = useState([]);
  const [upiID, setupiId] = useState('');

  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.pay,
      value: 'BHIM',
    },
    {
      id: 2,
      imagePath: LocalImages.pay,
      value: 'Google Pay',
    },
    {
      id: 3,
      imagePath: LocalImages.pay,
      value: 'Phone Pay',
    },
    {
      id: 4,
      imagePath: LocalImages.pay,
      value: 'PayTm',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.itemTouch}>
        <Image
          style={{width: vw(68), height: vh(68)}}
          source={item.imagePath}
        />
        <Text style={styles.itemTxt}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.headerView}>
        <Text style={styles.UPIText}>Add UPI Details</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.UPIText, {color: theme.color.LightBlue}]}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: theme.color.dropdownColor,
          marginVertical: vh(13),
          marginTop: vw(15),
          marginBottom: vh(44),
        }}></View>
      <Text style={[styles.UPIText, {marginHorizontal: vw(15)}]}>
        Select your UPI app
      </Text>
      <View>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
        <TextInput
          value={upiID}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Enter your UPI ID"
          placeholder="Enter your UPI ID"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setupiId(text);
          }}
          renderRightIcon={() => <Text style={styles.upi}>@upi</Text>}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    marginTop: vh(30),
  },
  UPIText: {
    fontSize: normalize(16),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
  },
  itemTouch: {
    borderRadius: vw(68),
    marginHorizontal: vw(15),
    marginVertical: vh(15),
  },
  itemTxt: {
    textAlign: 'center',
    fontSize: normalize(11),
    fontFamily: theme.font.medium,
    color: theme.color.inputGrey,
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(5),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 13, paddingHorizontal: 8},
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
    color: theme.color.inputGrey,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  upi: {
    color: theme.color.inputGrey,
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
  },
});

export default AddUPI;
