import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ScrollContainer from '../../../../components/common/ScrollContainer';
import CustomHeader from '../../../../components/common/CustomHeader';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import AppIcon from '../../../../components/common/AppIcon';
import CustomButton from '../../../../components/common/CustomButton';
import RBSheet from 'react-native-raw-bottom-sheet';
import AddUPI from './AddUPI';
import AddBankAccountDetail from './AddBankAccountDetail';
import {useSelector} from 'react-redux';

const AddingPaymentDetail = ({navigation}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const refRBSheet = useRef();
  const refRBSheetBank = useRef();
  const [selectedId, setSelectedId] = useState([]);
  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.payment,
      value: 'Cash',
      navigation: '',
    },
    {
      id: 2,
      imagePath: LocalImages.payment,
      value: 'UPI',
      navigation: '',
    },
    {
      id: 3,
      imagePath: LocalImages.payment,
      value: 'CreditCard',
      navigation: '',
    },
    {
      id: 4,
      imagePath: LocalImages.payment,
      value: 'Add Bank Account Details',
      navigation: '',
    },
  ];
  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            //refRBSheet.current.open();
            if (item == 'Bank Account') {
              refRBSheetBank.current.open();
            } else {
            }

            // navigation.navigate(item.navigation);
          }}
          style={styles.itemTouch}>
          {/* <Image source={item.imagePath} style={styles.itemImage} /> */}
          <Text style={styles.itemValue}>{item}</Text>
          {/* <AppIcon
            type={'AntDesign'}
            name={'right'}
            size={15}
            style={styles.righticon}
          /> */}
        </TouchableOpacity>
      </>
    );
  };
  return (
    <ScrollContainer>
      <CustomHeader
        heading={'Payment Details'}
        extraHeadingStyle={{marginHorizontal: vw(10)}}
        iconName="arrow-left"
        iconType="MaterialCommunityIcons"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image
        source={LocalImages.paymentPic}
        resizeMode="contain"
        style={styles.paymentPic}
      />
      <FlatList
        data={salonDetails.acceptedPaymentMethods}
        renderItem={renderItem}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(428),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <AddUPI
          onPress={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetBank}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: vw(20),
            borderTopRightRadius: vw(20),
            height: vh(668),
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <AddBankAccountDetail
          onPress={() => {
            refRBSheetBank.current.close();
          }}
        />
      </RBSheet>
      {/* <CustomButton
        label={'Continue'}
        onPress={() => {
          navigation.navigate('SalonSetupSteps');
        }}
        extraStyle={{marginTop: vh(70), marginBottom: vh(20)}}
      /> */}
    </ScrollContainer>
  );
};

const styles = StyleSheet.create({
  paymentPic: {
    width: vw(428),
    height: vh(243),
  },
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(11),
    marginTop: vh(26),
    borderBottomWidth: 0.5,
    paddingBottom: vh(5),
  },
  itemImage: {
    width: vw(20),
    height: vh(20),
    marginLeft: vw(11),
  },
  itemValue: {
    marginRight: '10%',
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
    textTransform: 'uppercase',
  },
  righticon: {
    marginRight: vw(20),
    color: theme.color.dropdownColor,
  },
});

export default AddingPaymentDetail;
