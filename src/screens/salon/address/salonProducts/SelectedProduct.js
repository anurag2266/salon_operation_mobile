import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import ProgressBar from '../../../../components/common/ProgressBar';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';
import LocalImages from '../../../../utils/LocalImages';
import {getProductCategoryAPI} from '../../../../api/products/productCategoryService';
import {getAllMasterBrandAPI} from '../../../../api/brands/brandMasterService';
import {getProductSubCategoryAPI} from '../../../../api/products/productSubCategoryService';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {getSalonProduct} from '../../../../api/products/productMapService';
import {FloatingAction} from 'react-native-floating-action';

const SelectedProduct = ({navigation}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [allData, setAllData] = useState([{name: 'All', Product: []}]);
  const [allBrands, setAllBrands] = useState([]);
  const [search, setsearch] = useState('');
  const [select, setSelect] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productSubCategory, setProductSubCategory] = useState([]);
  const [productData, setProductData] = useState([]);
  const [brand, setBrand] = useState({name: 'All'});
  const [isExpanded, setIsExpanded] = useState([0]);
  const [category, setCategory] = useState({name: 'All', _id: ''});
  const [subCategory, setSubCategory] = useState({});
  const [loading, setLoading] = useState(false);

  const actions = [
    {
      text: 'Request New Product',
      position: 1,
      name: 'RequestNewProduct',
    },
  ];

  const handleGetAllBrands = async () => {
    setLoading(true);
    const {data, status, message} = await getAllMasterBrandAPI();
    if (status) {
      setAllBrands([{name: 'All', products: []}, ...data]);
      setLoading(false);
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };
  const handleGetProductCategory = async () => {
    setLoading(true);
    const {data, status, message} = await getProductCategoryAPI();
    if (status) {
      setAllData([{name: 'All', Product: []}, ...data]);
      setProductCategory([{name: 'All', products: []}, ...data]);
      setLoading(false);
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };
  const handleGetProductSubCategory = async () => {
    const {data, status, message} = await getProductSubCategoryAPI();
    if (status) {
      setProductSubCategory(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleGetSelectedProducts = async () => {
    setLoading(true);
    const {data, status, message} = await getSalonProduct(salonDetails._id);
    console.log('hereisthedata', data);
    if (status) {
      setSelect(data);
      setLoading(false);
      // setProductData(data);
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSelectedProducts();
      handleGetProductCategory();
      handleGetAllBrands();

      handleGetProductSubCategory();
      // handleGetProducts();
    }, []),
  );

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setBrand(item)}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              backgroundColor:
                item.name == brand.name
                  ? theme.color.primary
                  : theme.color.white,
            },
          ]}>
          {item.name == 'All' ? (
            <AppIcon
              color={
                item.name == brand.name
                  ? theme.color.white
                  : theme.color.primary
              }
              type="MaterialIcons"
              name="dashboard"
              size={30}
            />
          ) : (
            <Image
              source={{uri: item.imageUrl}}
              style={{width: vw(26), height: vw(26)}}
            />
          )}
        </View>
        <Text style={styles.labelTxt}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItemCategory = ({item, index}) => {
    return (
      <TouchableOpacity>
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
  const renderItemProduct = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ManageProduct', {productDetail: item})
        }
        style={{marginTop: vh(40)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: vw(21),
            justifyContent: 'space-between',
          }}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={styles.itemTitleTxt}>
              {item.productId.productName}
            </Text>
            <View style={{flexDirection: 'row', marginTop: vh(10)}}>
              <Text style={styles.itemTxt}>Rs.{item.productId.mrp}</Text>
              <View
                style={{
                  borderLeftWidth: 1,
                  marginHorizontal: vw(20),
                  borderColor: theme.color.dropdownColor,
                }}></View>
              <Text style={styles.itemTxt}>{item.productId.quantity}</Text>
            </View>
          </View>
          <Image
            source={{uri: item.images[0]}}
            style={{width: vw(84), height: vh(63)}}
          />
          <AppIcon
            type={'AntDesign'}
            name={'right'}
            size={15}
            color={theme.color.dropdownColor}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        loading={loading}
        title={'Selected Product'}
        leftIconName={'arrow-left'}
        leftIconColor={theme.color.dropdownColor}
        leftIconType={'MaterialCommunityIcons'}
        // scroll={false}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        bottomButtonTitle={'Continue'}
        onPressBottomButton={() => navigation.navigate('SalonSetupSteps')}
        progressBar={<ProgressBar progress={60} />}>
        <TextInput
          value={search}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search for a Product"
          placeholder="Search for a Product"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setsearch(text);
          }}
          renderLeftIcon={() => (
            <AppIcon
              name={'search1'}
              type={'AntDesign'}
              size={20}
              color={theme.color.bottomWidth}
              style={{marginRight: vw(15)}}
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
            onPress={() => {
              setShowModal(true);
            }}
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
        <Text style={styles.selectBrand}>Brands</Text>
        <FlatList
          data={allBrands}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
        <Text style={styles.selectText}>Selected Products</Text>
        {/* <FlatList
        data={all}
        renderItem={renderItemCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginBottom: vh(30)}}
        keyExtractor={item => item.id}
      /> */}

        <FlatList
          data={
            brand.name == 'All'
              ? select
              : select.filter(i => i.productId.brandId == brand._id)
          }
          renderItem={renderItemProduct}
          keyExtractor={(item, index) => {
            item._id;
          }}
        />
      </Container>
      <View
        style={{
          position: 'relative',
          bottom: vh(90),
          right: vw(15),
        }}>
        <FloatingAction
          buttonSize={60}
          tintColor={theme.color.black}
          color={theme.color.primary}
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
        />
      </View>
    </View>
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
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  selectBrand: {
    marginTop: vh(30),
    marginLeft: vw(15),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  labelImage: {
    borderWidth: 1,
    padding: vw(20),
    marginHorizontal: vw(15),
    marginTop: vh(25),
    borderRadius: vw(60),
    borderColor: theme.color.white,
    alignItems: 'center',
  },
  labelTxt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
    marginTop: vh(7),
  },
  selectText: {
    marginTop: vw(44),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    marginHorizontal: vh(15),
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
  },
  itemTxt: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    fontSize: normalize(12),
  },
});

export default SelectedProduct;
