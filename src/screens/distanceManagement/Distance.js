import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import ScrollContainer from '../../components/common/ScrollContainer';
import theme from '../../theme/theme';
import LocalImages from '../../utils/LocalImages';
import CustomButton from '../../components/common/CustomButton';
import AppIcon from '../../components/common/AppIcon';
import {Dropdown} from 'react-native-element-dropdown';

const Distance = ({navigation}) => {
  const [distance, setdistance] = useState('');
  const [price, setprice] = useState('');
  const [invoice, setinvoice] = useState('');
  const [service, setservice] = useState('');

  return (
    <ScrollContainer>
      <CustomHeader
        heading={'Define Home service fee charges'}
        extraHeadingStyle={{marginHorizontal: vw(40)}}
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Text
        style={{
          fontSize: normalize(16),
          marginHorizontal: vw(21),
          color: theme.color.Black_shadow,
          fontFamily: theme.font.semiBold,
        }}>
        Distance
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          value={distance}
          style={[styles.input, {width: vw(219)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="max"
          placeholder="max"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setdistance(text);
          }}
          renderLeftIcon={() => (
            <Text
              style={{
                borderColor: theme.color.black,
                borderRightWidth: 1.5,
                paddingRight: vw(10),
              }}>
              km
            </Text>
          )}
          renderRightIcon={() => (
            <Dropdown
              selectedTextStyle={styles.selectedTextStyle}
              data={[1, 2, 3, 4, 5, 6, 7, 8]}
              renderItem={item => (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item}</Text>
                </View>
              )}
            />
          )}
        />
        <TextInput
          value={price}
          style={[styles.input, {width: vw(149)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Price"
          placeholder="Price"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setprice(text);
          }}
          renderLeftIcon={() => (
            <Text
              style={{
                borderColor: theme.color.black,
                borderRightWidth: 1.5,
                paddingRight: vw(10),
              }}>
              Rs.
            </Text>
          )}
        />
      </View>
      <Text
        onPress={() => {
          '';
        }}
        style={{
          color: theme.color.LightBlue,
          marginHorizontal: vw(21),
          fontFamily: theme.font.semiBold,
          fontSize: normalize(13),
        }}>
        + Add more distance information
      </Text>
      <View style={styles.bottomWidth}></View>
      <Text
        style={{
          fontSize: normalize(16),
          marginHorizontal: vw(21),
          color: theme.color.Black_shadow,
          fontFamily: theme.font.semiBold,
        }}>
        Percentage
      </Text>
      <TextInput
        value={invoice}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Percentage on Invoice"
        placeholder="Percentage on Invoice"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setinvoice(text);
        }}
        renderLeftIcon={() => (
          <Text
            style={{
              borderColor: theme.color.black,
              borderRightWidth: 1.5,
              paddingRight: vw(10),
            }}>
            %
          </Text>
        )}
      />
      <TextInput
        value={service}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Percentage on Service"
        placeholder="Percentage on Service"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setservice(text);
        }}
        renderLeftIcon={() => (
          <Text
            style={{
              borderColor: theme.color.black,
              borderRightWidth: 1.5,
              paddingRight: vw(10),
            }}>
            %
          </Text>
        )}
      />
      <CustomButton
        label={'SAVE AND CONTINUE'}
        onPress={() => {
          navigation.navigate('SalonSetupSteps');
        }}
        extraStyle={{marginTop: vh(40)}}
      />
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(21),
    marginTop: vh(24),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    marginBottom: vh(23),
    marginTop: vh(43),
    borderColor: theme.color.bottomWidth,
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

export default Distance;
