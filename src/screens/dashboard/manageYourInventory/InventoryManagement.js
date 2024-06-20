import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import {vh, vw, normalize} from '../../../utils/dimensions';

const InventoryManagement = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: require('../../../assets/icons/locationInventory.png'),
      text: 'Manage Location',
      navigation: 'InventoryLocation',
    },
    {
      id: 2,
      imagePath: require('../../../assets/icons/vendorInventory.png'),
      text: 'Manage Inventory',
      navigation: 'ManageInventory',
    },
    {
      id: 3,
      imagePath: require('../../../assets/icons/vendorInventory.png'),
      text: 'Manage Vendors',
      navigation: '',
    },
    {
      id: 4,
      imagePath: require('../../../assets/icons/toolInventory.png'),
      text: 'Manage Tools & Equipments',
      navigation: 'ManageToolsAndEquipment',
    },
    {
      id: 5,
      imagePath: require('../../../assets/icons/transactionHistoryInventory.png'),
      text: 'View Transcation History',
      navigation: 'ViewTransactionHistory',
    },
    {
      id: 6,
      imagePath: require('../../../assets/icons/logHistoryInventory.png'),
      text: 'View Location Log History',
      navigation: 'ViewLocationLogHistory',
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
      title={'Inventory Management'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: vh(30)}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
});

export default InventoryManagement;
