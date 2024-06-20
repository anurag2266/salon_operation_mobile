import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import CustomButton from '../../../../components/common/CustomButton';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import {Dropdown} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-element-textinput';
import RBSheet from 'react-native-raw-bottom-sheet';
import TargetTypeServices from './TargetTypeServices';

const TargetPayroll = ({navigation}) => {
  const refRBSheet = useRef();
  const [salaryBasis, setsalryBasis] = useState('');
  const [salaryAmount, setsalaryAmount] = useState('');
  const [additionalAmount, setadditionalAmount] = useState('');
  const [xTimes, setxTimes] = useState('');
  const [targetAmount, settargetAmount] = useState('');
  const [targetPeriod, settargetPeriod] = useState('');
  const [amount, setAmount] = useState(false);
  const [services, setServices] = useState(false);
  const [accountHolderName, setaccountHolderName] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [confirmAccountNumber, setconfirmAccountNumber] = useState('');
  const [ifscCode, setifscCode] = useState('');
  const [bankName, setbankName] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Target & Payrolls'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={styles.row}>
          <Image
            source={LocalImages.Profile}
            style={{width: vw(72), height: vh(72), borderRadius: vw(72)}}
          />
          <View style={{marginTop: vh(15), marginHorizontal: vw(20)}}>
            <Text style={styles.name}>Sunaina Singh</Text>
            <Text style={styles.expert}>Beautician & Hair Stylist Expert</Text>
          </View>
        </View>
        <Text style={styles.text}>Set Salary Amount</Text>
        <Dropdown
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          // data={}
          search
          labelField="name"
          valueField="name"
          placeholder={'Salary basis'}
          searchPlaceholder="Search..."
          value={salaryBasis}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setsalryBasis(item);
          }}
        />
        <TextInput
          value={salaryAmount}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Enter salary amount"
          placeholder="Enter salary amount"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setsalaryAmount(text);
          }}
        />
        <TextInput
          value={additionalAmount}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Enter additional amount"
          placeholder="Enter additional amount"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setadditionalAmount(text);
          }}
        />
        <Text style={styles.text}>Set Target Type</Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={() => {
              setAmount(!amount);
            }}>
            {amount == true ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
            <Text style={styles.choiceText}>Amount</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.choiceTouch}
            onPress={() => {
              setServices(!services);
            }}>
            {services == true ? (
              <Image style={styles.checkimg} source={LocalImages.checked} />
            ) : (
              <Image style={styles.checkimg} source={LocalImages.unchecked} />
            )}
            <Text style={styles.choiceText}>No. of Services</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={xTimes}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="X Times"
          placeholder="X Times"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setxTimes(text);
          }}
        />
        <TextInput
          value={targetAmount}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Target Amount"
          placeholder="Target Amount"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            settargetAmount(text);
          }}
        />
        <TextInput
          value={targetPeriod}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Target Period"
          placeholder="Target Period"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            settargetPeriod(text);
          }}
        />
        <TouchableOpacity>
          <Text style={styles.targetStatus}>View Target Status</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Set Bank Account Details</Text>
        <TextInput
          value={accountHolderName}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Account holder’s name"
          placeholder="Account holder’s name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setaccountHolderName(text);
          }}
        />
        <TextInput
          value={accountNumber}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Account Number"
          placeholder="Account Number"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setaccountNumber(text);
          }}
        />
        <TextInput
          value={confirmAccountNumber}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Confirm Account Number"
          placeholder="Confirm Account Number"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setconfirmAccountNumber(text);
          }}
        />
        <TextInput
          value={bankName}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Bank Name"
          placeholder="Bank Name"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setbankName(text);
          }}
        />
        <TextInput
          value={ifscCode}
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="IFSC Code"
          placeholder="IFSC Code"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setifscCode(text);
          }}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            container: {
              borderTopLeftRadius: vw(20),
              borderTopRightRadius: vw(20),
              height: '80%',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <TargetTypeServices
            onPress={() => {
              refRBSheet.current.close();
              navigation.navigate('ManageEmployeeStylistProfile');
            }}
          />
        </RBSheet>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          refRBSheet.current.open();
          navigation.navigate('');
        }}
        extraStyle={{marginBottom: vh(50), marginTop: vh(40)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: vh(30),
    marginHorizontal: vw(23),
  },
  name: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
  },
  expert: {
    color: theme.color.dropdownColor,
    fontSize: normalize(12),
    marginTop: vh(5),
    fontFamily: theme.font.regular,
  },
  text: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    marginTop: vh(40),
    marginHorizontal: vw(15),
    fontSize: normalize(16),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: normalize(14),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.medium,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  choiceTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    marginTop: vh(25),
  },
  choiceText: {
    marginHorizontal: vw(10),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  targetStatus: {
    marginHorizontal: vw(15),
    marginTop: vh(15),
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
  },
});

export default TargetPayroll;
