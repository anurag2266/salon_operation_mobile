import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import AppIcon from '../../components/common/AppIcon';
import {normalize, vh, vw} from '../../utils/dimensions';
import CheckBox from '@react-native-community/checkbox';
import theme from '../../theme/theme';
import {MultiSelect} from 'react-native-element-dropdown';
import CustomButton from '../../components/common/CustomButton';

const BillingModal = ({visible = false, setVisible, navigation}) => {
  const [billingDownArrow, setbillingDownArrow] = useState(false);
  const [billedDownArrow, setbilledDownArrow] = useState(false);
  const [appointmentsDownArrow, setappointmentsDownArrow] = useState(false);
  const [checked, setChecked] = useState([]);

  const data = [
    {
      id: 1,
      name: 'Select All',
    },
    {
      id: 2,
      name: 'Completed Bills',
    },
    {
      id: 3,
      name: 'Zero Billing',
    },
    {
      id: 4,
      name: 'Refund Billing',
    },
    {
      id: 5,
      name: 'On Hold',
    },
  ];
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={setVisible}>
      <View
        style={{
          width: '90%',
          height: '100%',
          backgroundColor: theme.color.white,
          marginTop: vh(50),
        }}>
        <ScrollView>
          <View style={styles.headerView}>
            <Text style={styles.filterTxt}>Filters</Text>
            <TouchableOpacity>
              <Text style={styles.clearAllTxt}>Clear All</Text>
            </TouchableOpacity>
            <AppIcon
              onPress={setVisible}
              name={'close'}
              type={'AntDesign'}
              size={15}
              style={styles.close}
            />
          </View>
          <View style={styles.bottomWidth}></View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Billing</Text>
            {billingDownArrow ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setbillingDownArrow(!billingDownArrow);
                }}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setbillingDownArrow(!billingDownArrow);
                }}
              />
            )}
          </View>
          <View style={styles.bottomWidth}></View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Billed</Text>
            {billedDownArrow ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setbilledDownArrow(!billedDownArrow);
                }}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setbilledDownArrow(!billedDownArrow);
                }}
              />
            )}
          </View>
          {billedDownArrow ? (
            <>
              {data.map((item, index) => {
                return (
                  <View key={item.id} style={styles.mainView}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <CheckBox
                        onPress={() => {
                          setChecked(item.name);
                        }}
                        style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                        disabled={false}
                        value={item.name == checked}
                        onValueChange={() => setChecked(item.name)}
                      />
                      <Text style={styles.Datatext}>{item.name} </Text>
                    </View>
                  </View>
                );
              })}
            </>
          ) : null}
          <View style={styles.bottomWidth}></View>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Appointments</Text>
            {appointmentsDownArrow ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setappointmentsDownArrow(!appointmentsDownArrow);
                }}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                onPress={() => {
                  setappointmentsDownArrow(!appointmentsDownArrow);
                }}
              />
            )}
          </View>
        </ScrollView>
        <CustomButton
          label={'View Results'}
          onPress={() => {
            navigation.navigate();
          }}
          extraStyle={{marginBottom: '30%', marginTop: vh(30)}}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    marginHorizontal: vw(34),
    marginTop: vh(30),
  },
  filterTxt: {
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    color: theme.color.black,
  },
  clearAllTxt: {
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    color: theme.color.black,
    marginHorizontal: vw(18),
    marginVertical: vh(2),
  },
  close: {
    marginLeft: vw(149),
    marginVertical: vh(8),
    color: theme.color.dropdownColor,
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginLeft: vw(28),
    marginVertical: vh(15),
    borderColor: theme.color.bottomWidth,
  },
  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(30),
    marginTop: vh(20),
  },
  headingText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  mainView: {
    marginHorizontal: vw(35),
    marginTop: vh(18),
  },
  Datatext: {
    fontSize: normalize(14),
    color: theme.color.inputGrey,
    fontFamily: theme.font.regular,
    textAlign: 'center',
  },
});

export default BillingModal;
