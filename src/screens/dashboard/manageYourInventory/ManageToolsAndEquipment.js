import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';

const ManageToolsAndEquipment = ({navigation}) => {
  const [manageTool, setmanageTool] = useState([]);

  const Data = [
    {
      id: 1,
      imagePath: require('../../../assets/icons/ManagementTool.png'),
      name: 'Tool Name : Trim Scissor ',
      category: 'Category : Hair',
      brand: 'Brand : Cartini',
      quantity: 'Net Quantity : 50',
    },
  ];
  return (
    <Container
      title={'Manage Tools & Equipment'}
      leftIconName={'arrow-left'}
      description={'Select one category to add tools & equipment'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      {manageTool ? (
        <>
          <Image
            source={require('../../../assets/icons/manageInventoryTool.png')}
            style={styles.toolImg}
          />
          <Text style={styles.addedToolText}>
            No Tools & Equipments have been added yet Select one category to
            start adding your tools & equipments
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddTool');
            }}
            style={styles.addBtnTouch}>
            <Text style={styles.addBtnText}>+ ADD</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {Data.map(item => {
            return (
              <View
                key={item.id}
                style={[styles.dataView, styles.boxWithShadow]}>
                <View style={[styles.boxWithShadow, styles.toolImgView]}>
                  <Image
                    source={item.imagePath}
                    style={{width: vw(100), height: vh(100)}}
                  />
                </View>
                <View style={{marginRight: vw(55)}}>
                  <Text>{item.name}</Text>
                  <Text>{item.category}</Text>
                  <Text>{item.brand}</Text>
                  <Text>{item.quantity}</Text>
                </View>
                <AppIcon
                  name={'right'}
                  type={'AntDesign'}
                  size={15}
                  color={theme.color.dropdownColor}
                />
              </View>
            );
          })}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  toolImg: {
    width: vw(160),
    height: vh(175),
    alignSelf: 'center',
    marginTop: vh(95),
  },
  addedToolText: {
    textAlign: 'center',
    marginTop: vh(50),
    fontSize: normalize(16),
    marginHorizontal: vw(35),
    color: theme.color.dropdownColor,
    fontFamily: theme.font.semiBold,
  },
  addBtnTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    alignSelf: 'center',
    marginTop: vh(48),
    paddingHorizontal: vw(36),
    paddingVertical: vh(14),
    borderColor: theme.color.primary,
    backgroundColor: theme.color.primary,
  },
  addBtnText: {
    color: theme.color.white,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 3.23,
    shadowRadius: 1.62,
    elevation: 4,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    justifyContent: 'space-between',
    paddingLeft: vw(15),
    paddingRight: vw(20),
    paddingVertical: vh(15),
  },
  toolImgView: {
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    marginTop: vh(30),
  },
});

export default ManageToolsAndEquipment;
