import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LocalImages from '../../utils/LocalImages';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';

const CheckoutComplete = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.background}>
        <Image
          source={LocalImages.completeCheckout}
          style={{width: vw(106), height: vh(106)}}
        />
        <Text style={styles.CheckoutCompleteText}>Checkout Complete</Text>
      </View>
      <View style={{marginTop: vh(60)}}>
        <TouchableOpacity style={styles.btnTouch}>
          <Text style={styles.btnText}>Send Receipt & Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTouch}>
          <Text style={styles.btnText}>Print Receipt & Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Billing');
          }}
          style={styles.btnTouch}>
          <Text style={styles.btnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(504),
    width: '100%',
  },
  CheckoutCompleteText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    marginTop: vh(40),
    fontSize: normalize(24),
    textAlign: 'center',
  },
  btnTouch: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: vw(10),
    paddingHorizontal: vw(80),
    paddingVertical: vh(18),
    marginHorizontal: vw(21),
    marginVertical: vh(17),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
  },
  btnText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
});

export default CheckoutComplete;
