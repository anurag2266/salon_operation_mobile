import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../../../components/common/Container';
import {vh, vw, normalize} from '../../../utils/dimensions';
import theme from '../../../theme/theme';

const ManageInventory = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: require('../../../assets/images/receipt.png'),
      text: 'Receipt',
      navigation: 'ReceiptStockItem',
    },
    {
      id: 2,
      imagePath: require('../../../assets/images/issue.png'),
      text: 'Issue',
      navigation: 'IssueStockItem',
    },
    {
      id: 3,
      imagePath: require('../../../assets/images/return.png'),
      text: 'Return',
      navigation: 'ReceiptStockItem',
    },
    {
      id: 4,
      imagePath: require('../../../assets/images/adjustStock.png'),
      text: 'Adjust Stock Items',
      navigation: 'ReceiptStockItem',
    },
    {
      id: 5,
      imagePath: require('../../../assets/images/audit.png'),
      text: 'Inventory Audit',
      navigation: 'ReceiptStockItem',
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
      title={'Manage Inventory'}
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

export default ManageInventory;
