import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import Container from '../../components/common/Container';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import BillingRBSheetComponent from '../../components/common/BillingRBSheetComponent';

const BillingPaymentMethod = ({navigation}) => {
  const refRBSheet = useRef();
  const DATA = [
    {
      id: 1,
      imagePath: require('../../assets/icons/billingCash.png'),
      text: 'Cash',
      navigation: '',
    },
    {
      id: 2,
      imagePath: require('../../assets/icons/billingGiftCard.png'),
      text: 'Gift Card',
      navigation: '',
    },
    {
      id: 3,
      imagePath: require('../../assets/icons/billingMembership.png'),
      text: 'Membership',
      navigation: '',
    },
    {
      id: 4,
      imagePath: require('../../assets/icons/billingDiscountCard.png'),
      text: 'Discount Card',
      navigation: '',
    },
    {
      id: 5,
      imagePath: require('../../assets/icons/billingCreditCard.png'),
      text: 'Credit Card',
      navigation: '',
    },
    {
      id: 6,
      imagePath: require('../../assets/icons/billingDebitCard.png'),
      text: 'Debit Card',
      navigation: '',
    },
    {
      id: 7,
      imagePath: require('../../assets/icons/billingUPI.png'),
      text: 'UPI',
      navigation: '',
    },
    {
      id: 8,
      imagePath: require('../../assets/icons/billingOnCredit.png'),
      text: 'On Credit',
      navigation: '',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        <Image source={item.imagePath} style={styles.itemImg} />
        <Text style={styles.itemTxt}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Payment Method'}
      description={'Select Payment Method'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginVertical: vh(30)}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalView}>
        <Text style={styles.totalAmtText}>Total Amount</Text>
        <Text style={styles.totalAmtText}>Rs 5600</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={[styles.totalAmtText, {color: theme.color.red}]}>
          Pending Amount
        </Text>
        <Text style={[styles.totalAmtText, {color: theme.color.red}]}>
          Rs 600
        </Text>
      </View>
      <View style={styles.totalView}>
        <Text style={[styles.totalAmtText, {color: theme.color.black}]}>
          Bill on hold
        </Text>
        <TouchableOpacity
          onPress={() => {
            refRBSheet.current.open();
          }}
          style={styles.btnTouch}>
          <Text style={styles.btnText}>Finalise</Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: vh(350),
          },
        }}>
        <BillingRBSheetComponent
          heading={'Overpaying by:Rs. 600/-'}
          description={
            'Go back to re-enter the amount.Finalise to keep the difference as an advance.'
          }
          label={'Go Back'}
          onPressLabel={''}
          btnText={'Finalise'}
          onPress={() => {
            refRBSheet.current.close();
          }}
          onPressBtnText={() => {
            refRBSheet.current.close(), navigation.navigate('EnterPin');
          }}
        />
      </RBSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  itemTouch: {
    flexDirection: 'row',
    borderWidth: 1,
    marginVertical: vh(10),
    marginHorizontal: vw(12),
    paddingHorizontal: vw(20),
    paddingVertical: vh(12),
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemImg: {
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
  },
  itemTxt: {
    textAlign: 'center',
    marginHorizontal: vw(30),
    paddingVertical: vh(7),
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: vw(28),
    marginTop: vh(13),
  },
  totalAmtText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  btnTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    paddingHorizontal: vw(57),
    paddingVertical: vh(16),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
  },
  btnText: {
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
    color: theme.color.white,
  },
});

export default BillingPaymentMethod;
