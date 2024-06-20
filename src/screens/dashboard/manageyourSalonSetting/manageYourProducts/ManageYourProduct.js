import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import LocalImages from '../../../../utils/LocalImages';

const ManageYourProduct = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [select, setSelect] = useState([]);

  const data = [
    {
      id: 1,
      title: 'Shampoo',
      price: 'Rs.1000',
      quantity: '1L',
      imagePath: LocalImages.product,
    },
    {
      id: 2,
      title: 'Conditioner',
      price: 'Rs.750',
      quantity: '750ml',
      imagePath: LocalImages.product,
    },
    {
      id: 3,
      title: 'Hair Mask',
      price: 'Rs.750',
      quantity: '100g',
      imagePath: LocalImages.product,
    },
  ];

  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.AllCategory,
      label: 'All',
    },
    {
      id: 2,
      imagePath: LocalImages.AllCategory,
      label: 'Hair',
    },
    {
      id: 3,
      imagePath: LocalImages.AllCategory,
      label: 'Skin',
    },
  ];

  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.label);
          navigation.navigate('');
        }}>
        <View style={[styles.labelImage, styles.boxWithShadow]}>
          <Image
            source={item.imagePath}
            style={{width: vw(26), height: vw(26)}}
          />
        </View>
        <Text style={styles.labelTxt}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSubCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.label);
          navigation.navigate('');
        }}>
        <View style={[styles.labelImage, styles.boxWithShadow]}>
          <Image
            source={item.imagePath}
            style={{width: vw(26), height: vw(26)}}
          />
        </View>
        <Text style={styles.labelTxt}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemProduct = ({item}) => {
    return (
      <View style={{marginTop: vh(40)}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: vw(21),
          }}
          onPress={() => {
            setSelect(item.title);
            navigation.navigate('ManageProduct');
          }}>
          {item.title == select ? (
            <Image style={styles.TickImg} source={LocalImages.TickService} />
          ) : (
            <Image style={styles.TickImg} source={LocalImages.UntickService} />
          )}
          <Text style={styles.itemTitleTxt}>{item.title}</Text>
          <Image
            source={item.imagePath}
            style={{width: vw(84), height: vh(63)}}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: vw(70),
            position: 'absolute',
            top: vh(30),
          }}>
          <Text style={styles.itemTxt}>{item.price}</Text>
          <View
            style={{
              borderLeftWidth: 1,
              marginHorizontal: vw(20),
              borderColor: theme.color.dropdownColor,
            }}></View>
          <Text style={styles.itemTxt}>{item.quantity}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginHorizontal: vw(25),
            marginTop: vh(9),
            borderColor: theme.color.bottomWidth,
          }}></View>
      </View>
    );
  };

  return (
    <Container
      title={'Selected Product'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <TextInput
        value={search}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search for stylists..."
        placeholder="Search for stylists..."
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setSearch(text);
        }}
        renderLeftIcon={() => (
          <AppIcon
            name={'search'}
            type={'MaterialIcons'}
            size={20}
            color={theme.color.inputGrey}
            style={{marginRight: vw(12)}}
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
          }}
          onPress={() => {
            '';
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
      <Text style={styles.selectedbrands}>Selected Brands</Text>
      <FlatList
        data={DATA}
        renderItem={renderItemCategory}
        horizontal={true}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <Text style={styles.categoryTxt}>Select Categories</Text>
      <FlatList
        data={DATA}
        renderItem={renderItemSubCategory}
        horizontal={true}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <FlatList
        data={data}
        renderItem={renderItemProduct}
        keyExtractor={item => item.id}
        extraData={select}
      />
      <TouchableOpacity>
        <Text style={styles.addProduct}>+ Add more products</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  selectedbrands: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    marginHorizontal: vw(15),
    fontSize: normalize(16),
    marginTop: vh(40),
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    paddingVertical: vh(20),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 13},
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
  categoryTxt: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    marginHorizontal: vw(15),
    marginTop: vh(40),
  },
  labelImage: {
    borderWidth: 1,
    padding: vw(20),
    marginHorizontal: vw(15),
    marginTop: vh(32),
    marginBottom: vh(7),
    borderRadius: vw(60),
    borderColor: theme.color.white,
  },
  labelTxt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  TickImg: {
    width: vw(22),
    height: vw(22),
    marginRight: vw(12),
  },
  itemTitleTxt: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginRight: '40%',
  },
  addProduct: {
    color: theme.color.LightBlue,
    marginBottom: vh(30),
    marginHorizontal: vw(15),
    marginTop: vh(5),
    fontSize: normalize(14),
    fontFamily: theme.font.bold,
  },
});

export default ManageYourProduct;
