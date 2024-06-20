import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import CheckBox from '@react-native-community/checkbox';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CameraAccess = ({navigation}) => {
  const [checked, setChecked] = useState(false);
  const [touchNotNow, setTouchNotNow] = useState(false);
  const [touchContinue, setTouchContinue] = useState(false);

  return (
    <View
      style={{
        borderColor: theme.color.White,
      }}>
      <Text style={styles.allowAccessTxt}>
        Allow camera access to scan items or products
      </Text>
      <Text style={styles.scanTxt}>
        You can use your camera to scan barcodes, to find beauty items or
        products
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: vw(20),
          marginVertical: vh(30),
        }}>
        <CheckBox
          onCheckColor={theme.color.white}
          onFillColor={theme.color.primary}
          onPress={() => {
            setChecked();
          }}
          style={styles.checkbox}
          boxType={'square'}
          disabled={false}
          value={checked}
          onValueChange={newValue => setChecked(newValue)}
        />
        <Text style={styles.allowTxt}>
          Allow SALONESIS app to access your camera and skip this step in the
          future.
        </Text>
      </View>
      <Text style={styles.manageTxt}>
        You can manage this access at any time in
        <Text style={{color: theme.color}}> permission settings.</Text>
      </Text>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setTouchNotNow(!touchNotNow);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor:
                touchNotNow == true ? theme.color.primary : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.btnTxt,
              {
                color:
                  touchNotNow == true ? theme.color.white : theme.color.primary,
              },
            ]}>
            Not now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setTouchContinue(!touchContinue);
            refRBSheet.current.close();
            navigation.navigate('FiltersModal');
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor:
                touchContinue == true ? theme.color.white : theme.color.primary,
            },
          ]}>
          <Text
            style={[
              styles.btnTxt,
              {
                color:
                  touchContinue == true
                    ? theme.color.primary
                    : theme.color.white,
              },
            ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  allowAccessTxt: {
    color: theme.color.black,
    fontSize: normalize(16),
    marginVertical: vh(20),
    marginHorizontal: vw(15),
    fontFamily: theme.font.bold,
  },
  scanTxt: {
    color: theme.color.black,
    fontSize: normalize(16),
    marginHorizontal: vw(15),
    fontFamily: theme.font.medium,
  },
  checkbox: {
    width: vw(29),
    height: vh(29),
  },
  allowTxt: {
    fontSize: normalize(13),
    marginHorizontal: vw(15),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
  },
  manageTxt: {
    marginHorizontal: vw(14),
    fontSize: normalize(13),
    fontFamily: theme.font.medium,
  },
  btnTouch: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    marginHorizontal: vw(19),
    paddingVertical: vh(19),
    paddingHorizontal: vw(48),
    marginTop: vh(40),
    borderRadius: vw(10),
  },
  btnTxt: {
    fontSize: normalize(18),
    fontFamily: theme.font.medium,
  },
});

export default CameraAccess;
