import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ScrollContainer from '../../../../components/common/ScrollContainer';
import CustomHeader from '../../../../components/common/CustomHeader';
import {vw, vh, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import CustomButton from '../../../../components/common/CustomButton';
import Container from '../../../../components/common/Container';
import Tags from '../../../../components/common/Tags';
import {updatePaymentMethodsAPI} from '../../../../api/services/salonBasicService';
import {useSelector} from 'react-redux';
import {showMessage} from 'react-native-flash-message';
import ProgressBar from '../../../../components/common/ProgressBar';

const SetupPaymentMethod = ({navigation}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [selected, setSelected] = useState([]);
  const DATA = [
    {
      id: 1,
      name: 'Cash',
      value: 'cash',
    },
    {
      id: 2,
      name: 'Cheque',
      value: 'cheque',
    },
    {
      id: 3,
      name: 'UPI',
      value: 'upi',
    },
    {
      id: 4,
      name: 'Debit Card',
      value: 'debit-card',
    },
    {
      id: 5,
      name: 'Credit Card',
      value: 'credit-card',
    },
    {
      id: 6,
      name: 'On Credit',
      value: 'on-credit',
    },
    {
      id: 7,
      name: 'Credit Wallet',
      value: 'credit-wallet',
    },
  ];

  const handleUpdatePaymentMethod = async () => {
    const {data, status, message} = await updatePaymentMethodsAPI({
      salonId: salonDetails._id,
      acceptedPaymentMethods: selected,
    });

    if (status) {
      showMessage({message: message, type: 'Success'});
      navigation.goBack();
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          disabled={selected.some(val => val === item.value)}
          onPress={() => {
            setSelected([...selected, item.value]);
          }}
          style={styles.touchView}>
          <Text style={styles.valueText}>{item.name}</Text>
          {selected.some(val => val === item.value) ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Container
      scroll={false}
      title="Setup Payment  Method"
      description={
        'Choose how your clients can pay here. It will be available as the payment method for the clients at checkout'
      }
      onPressLeftIcon={() => navigation.goBack()}
      bottomButtonTitle="Save"
      onPressBottomButton={handleUpdatePaymentMethod}
      progressBar={<ProgressBar progress={70} />}>
      {/* <Text style={styles.payment}>
        Use mobile payment to streamline your checkout precess, collect
        prepayments and protect yourself against no-shows.
      </Text> */}
      <View style={styles.tagContainer}>
        {selected.map(item => (
          <Tags
            title={item}
            onPress={() => setSelected(selected.filter(i => i !== item))}
          />
        ))}
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <CustomButton
        onPress={() => {
          navigation.navigate('AddingPaymentDetail');
        }}
        label={'Save'}
        extraStyle={{marginTop: vh(60), marginBottom: vh(20)}}
      /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  payment: {
    marginHorizontal: vw(19),
    fontSize: normalize(16),
    fontFamily: theme.font.medium,
    color: theme.color.Black_shadow,
    textAlign: 'center',
    marginTop: vh(16),
  },
  touchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: vh(42),
    marginHorizontal: vw(26),
    borderBottomWidth: 1,
    paddingBottom: vh(26),
    borderColor: theme.color.bottomWidth,
  },
  valueText: {
    color: theme.color.valueText,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(15),
    marginTop: vh(26),
    borderColor: theme.color.bottomWidth,
  },
  tagContainer: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    flexWrap: 'wrap',
  },
});

export default SetupPaymentMethod;
