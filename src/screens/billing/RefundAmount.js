import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';

const RefundAmount = ({navigation}) => {
  const [onBtnSelect, setonBtnSelect] = useState(false);
  const [refund, setrefund] = useState('');
  DATA = [
    {
      id: 1,
      duration: '25th Jun 2022 at 11:30PM',
      time: '11:30 AM to 1:15 PM',
      imagePath: LocalImages.Profile,
      category: 'Hair Colour',
      stylist: 'Stylist Update: ',
      stylistUpdate: 'Rebecca Beck',
      timeTaken: '120 min',
      price: 'Rs 1550/-',
    },
  ];
  return (
    <Container
      title={'Refund Amount'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={[styles.profileView, styles.boxWithShadow]}>
        <View style={styles.usericon}>
          <AppIcon
            name={'user'}
            type={'FontAwesome'}
            size={30}
            color={theme.color.dropdownColor}
          />
        </View>
        <View style={{marginLeft: vw(30)}}>
          <Text style={styles.name}>Shivani Singh</Text>
          <Text style={styles.number}>+91 9876543219</Text>
        </View>
      </View>
      <Text style={styles.refundText}>Select services to refund</Text>
      {DATA.map((item, index) => {
        return (
          <View key={item.id} style={[styles.mainView, styles.boxWithShadow]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.time}>{item.duration}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: vh(23),
              }}>
              <Image
                source={item.imagePath}
                style={{
                  width: vw(86),
                  height: vh(86),
                  borderRadius: vw(80),
                }}
              />
              <View style={{marginLeft: vw(16)}}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.stylist}>
                  {item.stylist}
                  <Text
                    style={{
                      color: theme.color.black,
                      fontFamily: theme.font.semiBold,
                    }}>
                    {item.stylistUpdate}
                  </Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: vh(9)}}>
                  <Text style={styles.timeTaken}>{item.timeTaken}</Text>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      marginHorizontal: vw(15),
                      borderColor: theme.color.dropdownColor,
                    }}></View>
                  <Text style={styles.timeTaken}>{item.price}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setonBtnSelect(!onBtnSelect);
              }}
              style={[
                styles.btnTouch,
                {
                  backgroundColor: onBtnSelect
                    ? theme.color.primary
                    : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.btnText,
                  {
                    color: onBtnSelect
                      ? theme.color.white
                      : theme.color.primary,
                  },
                ]}>
                Make Refund
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      {onBtnSelect ? (
        <>
          <TextInput
            value={refund}
            style={[styles.input, {marginTop: vh(25), height: vh(94)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Add Reason For Refund"
            placeholder="Add Reason For Refund"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setrefund(text);
            }}
          />
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: vh(23),
              marginHorizontal: vw(16),
              borderColor: theme.color.dropdownColor,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: vh(16),
            }}>
            <Text style={styles.totalRefundTxt}>Total Amount to Refund</Text>
            <Text style={styles.totalRefundTxt}>Rs. 15500</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: vw(20),
              marginTop: vh(25),
            }}>
            <TouchableOpacity style={styles.btnTouch}>
              <Text style={styles.btnText}>Add to Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EnterPin');
              }}
              style={styles.btnTouch}>
              <Text style={styles.btnText}>Refund Amount</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  usericon: {
    borderWidth: 1,
    borderColor: theme.color.searchColor,
    borderRadius: vw(35),
    paddingVertical: vw(17),
    paddingHorizontal: vw(20),
    backgroundColor: theme.color.searchColor,
  },
  name: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  number: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    marginTop: vh(6),
  },
  profileView: {
    flexDirection: 'row',
    marginTop: vh(25),
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: vw(32),
    paddingVertical: vh(23),
    borderColor: theme.color.white,
    alignItems: 'center',
    backgroundColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 4,
  },
  refundText: {
    textAlign: 'center',
    marginVertical: vh(30),
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    color: theme.color.black,
  },
  mainView: {
    borderWidth: 1,
    borderRadius: vw(20),
    marginHorizontal: vw(16),
    paddingHorizontal: vw(13),
    paddingVertical: vh(20),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
  },
  time: {
    color: theme.color.primary,
    fontFamily: theme.font.medium,
    fontSize: normalize(12),
  },
  itemCategory: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
  },
  stylist: {
    color: theme.color.primary,
    marginTop: vh(9),
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  timeTaken: {
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    color: theme.color.dropdownColor,
  },
  btnTouch: {
    borderWidth: 1,
    marginTop: vh(20),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: vw(27),
    paddingVertical: vh(10),
    borderRadius: vw(5),
    borderColor: theme.color.primary,
  },
  btnText: {
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
    color: theme.color.primary,
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
  totalRefundTxt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
});

export default RefundAmount;
