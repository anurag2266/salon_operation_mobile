import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Container from '../../../components/common/Container';
import { TextInput } from 'react-native-element-textinput';
import { vh, vw, normalize } from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import { ValueChanged } from '../../../redux/actions/flightActions'
import InventoryLocationCard from '../../../components/inventory/InventoryLocationCard';
import { getInventoryMaster } from '../../../api/inventory/addInventoryMasterData';
import { useIsFocused } from '@react-navigation/native';

const InventoryLocation = ({ navigation }) => {
  const isFocused = useIsFocused()
  const [search, setSearch] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [DATA, setDATA] = useState([])
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let mainStoreCard = {
    name: 'Main Store',
    description: `This main store location is created by defult for all the salon and can’t be deactive. All Purchase Items will automatically liein main store for furder Process`
  }


  useEffect(() => {
    if (isFocused)
      getData()
  }, [isFocused])

  const getData = async () => {
    let payload = {
      type: 'station'
    }
    const { data, status, message } = await getInventoryMaster(payload)
    if (status) {
      console.log('api hitted', data);
      let temp = [...data]
      temp?.unshift(mainStoreCard)
      setDATA(temp)
      dispatch(ValueChanged('inventoryLocationArray', temp ?? []));
    } else {
      showMessage({ message: message, type: 'danger' });
      console.log('not api hitted', message);
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <InventoryLocationCard item={item} index={index} />
    )
  }

  const keyExtractor = (item) => item => item.id

  return (
    <Container
      title={'Inventory Location'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <TextInput
        value={search}
        style={[styles.input, { marginTop: vh(25) }]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search Locations"
        placeholder="Search Locations"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSearch(text);
        }}
        renderLeftIcon={() => (
          <AppIcon
            name={'search1'}
            type={'AntDesign'}
            size={20}
            color={theme.color.bottomWidth}
            style={{ marginRight: vw(15) }}
          />
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginHorizontal: vw(15),
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'filter'}
            type={'AntDesign'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(7),
            marginTop: vh(9),
          }}>
          <AppIcon
            name={'swap-vertical'}
            type={'Ionicons'}
            size={15}
            color={theme.color.LightBlue}
          />
          <Text style={styles.filter}>Sort By</Text>
        </TouchableOpacity>
      </View>
      {/* <InventoryLocationCard/> */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        removeClippedSubviews={true}
        nestedScrollEnabled
        contentContainerStyle={{ paddingBottom: vh(20) }}
      />
      <TouchableOpacity
        style={[styles.addInventoryLocation, styles.boxWithShadow]}
        onPress={() => {
          navigation.navigate('CreateLocation', { isInventoryLocation: true });
        }}>
        <Image
          source={require('../../../assets/icons/InventoryLocation.png')}
          style={{
            width: vw(130),
            height: vh(130),
          }}
        />
        <Text style={styles.addInventoryLocationText}>+ Create Location</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
  },
  inputStyle: { fontSize: 13 },
  labelStyle: {
    fontSize: normalize(13),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 3.23,
    shadowRadius: 1.62,
    elevation: 6,
  },
  addInventoryLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: vw(16),
    marginTop: vh(45),
    borderRadius: vw(10),
    paddingVertical: vh(33),
  },
  addInventoryLocationText: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    marginTop: vh(40),
    fontSize: normalize(18),
  },
  mainStoreView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginHorizontal: vw(15),
    paddingHorizontal: vw(10),
    paddingVertical: vh(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    marginTop: vh(40),
  },
});

export default InventoryLocation;
