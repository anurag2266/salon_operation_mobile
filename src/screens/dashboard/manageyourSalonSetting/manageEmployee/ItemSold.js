import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import AppIcon from '../../../../components/common/AppIcon';
import {Dropdown} from 'react-native-element-dropdown';

const ItemSold = ({navigation}) => {
  const [commission, setcommission] = useState(false);
  const [incentive, setincentive] = useState(false);
  const [month, setmonth] = useState('');
  const [year, setyear] = useState('');

  const DATA = [
    {
      id: 1,
      name: 'Item Name',
      client: 'Client Name',
      type: 'Item Type',
      commissionType: 'Commission Value',
      value: '20,000',
      date: '30 November 2022',
    },
    {
      id: 2,
      name: 'Item Name',
      client: 'Client Name',
      type: 'Item Type',
      commissionType: 'Commission Value',
      value: '20,000',
      date: '30 November 2022',
    },
  ];
  const data = [
    {
      id: 1,
      name: 'Service Name',
      client: 'Client Name',
      type: 'Service Type',
      incentiveType: 'Incentive Value',
      value: '20,000',
      date: '30 November 2022',
    },
  ];

  const renderItemCommission = ({item}) => {
    return (
      <View style={[styles.itemView, styles.boxWithShadow]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.client}>{item.client}</Text>
        <Text style={styles.name}>{item.type}</Text>
        <View style={{flexDirection: 'row', marginTop: vh(7)}}>
          <Text style={styles.value}>{item.commissionType}</Text>
          <View style={styles.leftWidth}></View>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      </View>
    );
  };

  const renderItemIncentive = ({item}) => {
    return (
      <View style={[styles.itemView, styles.boxWithShadow]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.client}>{item.client}</Text>
        <Text style={styles.name}>{item.type}</Text>
        <View style={{flexDirection: 'row', marginTop: vh(7)}}>
          <Text style={styles.value}>{item.incentiveType}</Text>
          <View style={styles.leftWidth}></View>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      </View>
    );
  };

  return (
    <Container
      title={'Items Sold'}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: vh(50),
          marginHorizontal: vw(21),
        }}>
        <TouchableOpacity
          onPress={() => {
            setcommission(!commission);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor: commission
                ? theme.color.primary
                : theme.color.searchColor,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {color: commission ? theme.color.white : theme.color.black},
            ]}>
            Commission
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setincentive(!incentive);
          }}
          style={[
            styles.btnTouch,
            {
              backgroundColor: incentive
                ? theme.color.primary
                : theme.color.searchColor,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {color: incentive ? theme.color.white : theme.color.black},
            ]}>
            Incentive
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filter}>
        <TouchableOpacity style={styles.filterTouch}>
          <AppIcon
            name={'filter'}
            type={'Feather'}
            size={15}
            color={theme.color.LightBlue}
            style={{marginHorizontal: vw(10)}}
          />
          <Text style={styles.feather}>Feather</Text>
          <Text style={styles.all}>All</Text>
        </TouchableOpacity>
        <Dropdown
          style={[styles.input, {height: vh(45), width: '30%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          // data={}
          search
          labelField="name"
          valueField="name"
          placeholder={'Month'}
          searchPlaceholder="Search..."
          value={month}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setmonth(item);
          }}
        />
        <Dropdown
          style={[styles.input, {height: vh(45), width: '25%'}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          // data={}
          search
          labelField="name"
          valueField="name"
          placeholder={'Year'}
          searchPlaceholder="Search..."
          value={year}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
          onChange={item => {
            setyear(item);
          }}
        />
      </View>
      {commission ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: vh(40),
              marginHorizontal: vw(26),
            }}>
            <Text style={styles.incentive}>Total Commission</Text>
            <Text style={styles.incentive}>Rs. 58000</Text>
          </View>
          <FlatList
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderItem={renderItemCommission}
            keyExtractor={item => item.id}
          />
        </>
      ) : null}
      {incentive ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: vh(40),
              marginHorizontal: vw(26),
            }}>
            <Text style={styles.incentive}>Total Incentive</Text>
            <Text style={styles.incentive}>Rs. 58000</Text>
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={renderItemIncentive}
            keyExtractor={item => item.id}
          />
        </>
      ) : null}
    </Container>
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
  btnTouch: {
    paddingHorizontal: vw(40),
    paddingVertical: vh(20),
    borderRadius: vw(10),
  },
  btnText: {
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
    textAlign: 'center',
  },
  input: {
    borderRadius: vw(5),
    borderWidth: 1,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
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
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginTop: vh(20),
  },
  filterTouch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw(5),
    borderColor: theme.color.borderGrey,
    alignItems: 'center',
  },
  feather: {
    color: theme.color.Black_shadow,
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
  },
  all: {
    color: theme.color.Black_shadow,
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
    marginHorizontal: vw(10),
  },
  incentive: {
    color: theme.color.Black_shadow,
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  itemView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(16),
    marginTop: vh(14),
    borderColor: theme.color.white,
    paddingHorizontal: vw(10),
    paddingTop: vh(18),
    paddingBottom: vh(10),
  },
  name: {
    color: theme.color.black,
    fontSize: normalize(14),
    fontFamily: theme.font.semiBold,
    marginTop: vh(2),
  },
  client: {
    color: theme.color.dropdownColor,
    fontSize: normalize(14),
    fontFamily: theme.font.semiBold,
    marginTop: vh(2),
  },
  value: {
    color: theme.color.dropdownColor,
    fontSize: normalize(12),
    fontFamily: theme.font.semiBold,
    marginTop: vh(2),
  },
  leftWidth: {
    borderLeftWidth: 1,
    borderColor: theme.color.dropdownColor,
    marginHorizontal: vw(20),
  },
  date: {
    color: theme.color.black,
    fontSize: normalize(10),
    fontFamily: theme.font.semiBold,
  },
});

export default ItemSold;
