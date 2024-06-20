import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Container from '../../../../components/common/Container';
import AppIcon from '../../../../components/common/AppIcon';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';

const ManageProduct = ({navigation, route}) => {
  const {productDetail} = route.params;

  const DATA = [
    {
      id: 1,
      imagePath: require('../../../../assets/icons/ManageProductGeneralSetting.png'),
      text: 'General Setting',
      navigation: 'ProductDetail',
    },
    {
      id: 2,
      imagePath: require('../../../../assets/icons/ManageProductPricing.png'),
      text: 'Additional Settings',
      navigation: 'AdditionalSettingsProduct',
    },
    // {
    //   id: 3,
    //   imagePath: require('../../../../assets/icons/ManageProductSimilar.png'),
    //   text: 'Similar',
    //   navigation: 'SimilarProduct',
    // },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation, {productDetail});
        }}
        style={[styles.itemTouch, styles.boxWithShadow]}>
        <Image source={item.imagePath} style={styles.itemImg} />
        <Text style={styles.itemTxt}>{item.text}</Text>
        <AppIcon
          name={'right'}
          type={'AntDesign'}
          size={15}
          color={theme.color.dropdownColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Manage Product'}
      leftIconName={'arrow-left'}
      scroll={false}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <ImageBackground
        source={{uri: productDetail.productId.images[0]}}
        style={styles.img}
        resizeMode="cover">
        <View style={styles.nameView}>
          <Text style={styles.name}>{productDetail.displayName}</Text>
          <View style={{flexDirection: 'row'}}>
            {/* <AppIcon
              style={{marginHorizontal: 10}}
              type="Entypo"
              name="camera"
              color={theme.color.white}
            /> */}
          </View>
        </View>
      </ImageBackground>
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
  img: {
    height: vh(243),
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
  },
  nameView: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: vh(20),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: theme.color.white,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  itemTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: vh(10),
    marginHorizontal: vw(12),
    paddingHorizontal: vw(20),
    paddingVertical: vh(12),
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
    alignItems: 'center',
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
    height: vw(34),
    borderRadius: vw(34),
  },
  itemTxt: {
    textAlign: 'center',
    marginHorizontal: vw(30),
    paddingVertical: vh(7),
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    marginRight: '30%',
  },
});

export default ManageProduct;
