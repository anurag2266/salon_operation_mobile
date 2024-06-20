import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {vw, vh, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../../components/common/AppIcon';
import LocalImages from '../../../../utils/LocalImages';
import CustomButton from '../../../../components/common/CustomButton';

import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Container from '../../../../components/common/Container';
import ProgressBar from '../../../../components/common/ProgressBar';
import {useFocusEffect} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {getAllProductMasterAPI} from '../../../../api/products/productMasterService';
import {FloatingAction} from 'react-native-floating-action';
import {getProductCategoryAPI} from '../../../../api/products/productCategoryService';
import {getAllMasterBrandAPI} from '../../../../api/brands/brandMasterService';
import {getProductSubCategoryAPI} from '../../../../api/products/productSubCategoryService';
import {useEffect} from 'react';
import {
  AccordionList,
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';
import {
  getSalonProduct,
  salonSelectProductsAPI,
} from '../../../../api/products/productMapService';
import {useSelector} from 'react-redux';

const AddProduct = ({navigation}) => {
  const refRBSheet = useRef();
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
    const {data, status, message} = await getAllMasterBrandAPI();
    if (status) {
      setAllBrands([{name: 'All', products: []}, ...data]);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };
  const handleGetProductCategory = async () => {
    const {data, status, message} = await getProductCategoryAPI();
    if (status) {
      setAllData([{name: 'All', Product: []}, ...data]);
      setProductCategory([{name: 'All', products: []}, ...data]);
    } else {
      showMessage({message: message, type: 'danger'});
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
  // const handleGetProducts = async () => {
  //   const {data, status, message} = await getAllProductMasterAPI();
  //   if (status) {
  //     // setProductData(data);
  //   } else {
  //     showMessage({message: message, type: 'danger'});
  //   }
  // };
  const handleGetSelectedProducts = async () => {
    const {data, status, message} = await getSalonProduct(salonDetails._id);
    if (status) {
      const d = data;
      const data1 = allData.map(item => item.products);
      const newdata = data1.flat(1);

      const finalData = newdata.filter(elem =>
        d.find(x => elem._id == x.productId?._id),
      );

      await setSelect(finalData);
      setLoading(false);

      console.log('here is final data', d);
      // setProductData(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // console.log(select);
    const finalData = {
      salonId: salonDetails._id,
      products: select.map(item => {
        return {productId: item._id};
      }),
    };

    const {status, data, message} = await salonSelectProductsAPI(finalData);
    if (status) {
      setLoading(false);
      navigation.navigate('SelectedProduct');
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setCategory([]);
      setAllData([]);
      setSelect([]);
      handleGetProductCategory();
      handleGetAllBrands();

      handleGetProductSubCategory();
      // handleGetProducts();
    }, []),
  );

  useEffect(() => {
    handleGetSelectedProducts();
  }, [allData]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => setBrand(item)}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              // width: vw(70),
              // height: vw(70),
              backgroundColor:
                item.name == brand?.name ? theme.color.primary : '#E6F5F5',
              alignItems: 'center',
              justifyContent: 'center',
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
      <TouchableOpacity
        onPress={() => {
          setCategory(item);
        }}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              // width: vw(70),
              // height: vw(70),
              backgroundColor:
                item.name == category?.name ? theme.color.primary : '#E6F5F5',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          {item.name == 'All' ? (
            <AppIcon
              color={
                item.name == category?.name
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
  const renderItemProduct = ({item, index}) => {
    return (
      // <View style={{marginTop: vh(40)}}>
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //       marginHorizontal: vw(21),
      //       justifyContent: 'space-between',
      //     }}>
      //     <TouchableOpacity
      //       onPress={() => {
      //         if (selectedProducts.includes(item)) {
      //           const temp = selectedProducts.filter(
      //             element => element._id != item._id,
      //           );

      //           setSelectedProducts(temp);
      //         } else {
      //           setSelectedProducts([...selectedProducts, item]);
      //         }
      //       }}>
      //       {selectedProducts.includes(item) ? (
      //         <Image style={styles.TickImg} source={LocalImages.TickService} />
      //       ) : (
      //         <Image
      //           style={styles.TickImg}
      //           source={LocalImages.UntickService}
      //         />
      //       )}
      //     </TouchableOpacity>
      //     <View style={{alignItems: 'center', marginRight: '40%'}}>
      //       <Text style={styles.itemTitleTxt}>{item.productName}</Text>
      //       <View style={{flexDirection: 'row', marginTop: vh(10)}}>
      //         <Text style={styles.itemTxt}>Rs.{item.purchasePrice}</Text>
      //         <View
      //           style={{
      //             borderLeftWidth: 1,
      //             marginHorizontal: vw(20),
      //             borderColor: theme.color.dropdownColor,
      //           }}></View>
      //         <Text style={styles.itemTxt}>{item.quantity}</Text>
      //       </View>
      //     </View>
      //     <Image source={{uri: ''}} style={{width: vw(84), height: vh(63)}} />
      //   </View>
      // </View>
      <View>
        <Collapse
          isExpanded={isExpanded.includes(index)}
          expandedIndex={0}
          onToggle={() =>
            isExpanded.includes(index)
              ? setIsExpanded(isExpanded.filter(i => i != index))
              : setIsExpanded([...isExpanded, index])
          }>
          <CollapseHeader>
            <View
              style={{
                marginHorizontal: vw(15),
                marginVertical: vh(10),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  ...styles.itemTitleTxt,
                  textTransform: 'capitalize',

                  fontWeight: '700',
                }}>
                {item.name} ({item.products.length})
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* {select.includes(item.services) ? (
                  <Image
                    style={styles.TickImg}
                    source={LocalImages.TickService}
                  />
                ) : (
                  <Image
                    style={styles.TickImg}
                    source={LocalImages.UntickService}
                  />
                )}
                <Text>Select All</Text> */}
                <AppIcon
                  style={{marginLeft: vw(5)}}
                  color={theme.color.grey}
                  type="Ionicons"
                  name={
                    isExpanded.includes(index) ? 'chevron-up' : 'chevron-down'
                  }
                />
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            {item.products.map(el => (
              <View style={{marginBottom: vh(16)}}>
                <TouchableOpacity
                  style={[styles.row, {justifyContent: 'space-between'}]}
                  onPress={() => {
                    if (select.includes(el)) {
                      const temp = select.filter(
                        element => element._id != el._id,
                      );

                      setSelect(temp);
                    } else {
                      setSelect([...select, el]);
                    }
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {select.includes(el) ? (
                      <Image
                        style={styles.TickImg}
                        source={LocalImages.TickService}
                      />
                    ) : (
                      <Image
                        style={styles.TickImg}
                        source={LocalImages.UntickService}
                      />
                    )}
                    <View>
                      <Text style={styles.itemTitleTxt}>{el.productName}</Text>

                      <View style={[styles.row]}>
                        <Text style={styles.itemTxt}>{el.quantity} | </Text>

                        <Text style={styles.itemTxt}>Rs. {el.mrp}</Text>
                      </View>
                    </View>
                  </View>
                  <Image
                    style={{height: 50, width: 50}}
                    source={{uri: el.images[0]}}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </CollapseBody>
        </Collapse>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Add Product'}
        description={
          'Add at least one product to continue on Salonesis and later you can edit, delete, and add more'
        }
        leftIconColor={theme.color.dropdownColor}
        loading={loading}
        leftIconName="arrow-left"
        leftIconType="MaterialCommunityIcons"
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        bottomButtonTitle="Save"
        onPressBottomButton={handleSubmit}
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
        <Text style={styles.selectBrand}>Select Brands</Text>
        <FlatList
          data={allBrands}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item._id}
        />
        <Text style={styles.selectText}>Select Categories</Text>
        <FlatList
          data={productCategory}
          renderItem={renderItemCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginBottom: vh(30)}}
          keyExtractor={item => item.id}
        />
        <Dropdown
          style={[styles.input, {height: vh(55)}]}
          inputStyle={styles.inputStyle}
          selectedTextStyle={{color: theme.color.black}}
          itemTextStyle={{color: theme.color.black}}
          inputSearchStyle={styles.inputSearchStyle}
          placeholderStyle={styles.placeholderStyle}
          data={productSubCategory}
          search
          labelField="name"
          valueField="_id"
          placeholder="Sub Categories"
          searchPlaceholder="Search"
          value={productCategory}
          onChange={item => {
            setSubCategory(item);
          }}
        />
        {/* <FlatList
          data={
            brand.name == 'All' || !brand.name
              ? productData
              : productData.filter(x => x.brandId._id == brand._id)
          }
          renderItem={renderItemProduct}
          keyExtractor={(item, index) => {
            item._id;
          }}
        /> */}
        <AccordionList
          list={allData.filter(i => i.name != 'All')}
          renderItem={renderItemProduct}
          keyExtractor={item => `${item._id}`}
          // extraData={select}
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
      {/* <CustomButton
        label={'Next'}
        extraStyle={{marginTop: vh(50), marginBottom: vh(30)}}
        onPress={handleSubmit}
      /> */}
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
  selectText: {
    marginHorizontal: vw(15),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    marginBottom: vh(10),
  },
  TickImg: {
    width: vw(22),
    height: vw(22),
    marginRight: vw(12),
    marginVertical: vh(4),
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    marginBottom: vh(7),
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
  AddServices: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: vw(60),
    height: vh(60),
    marginHorizontal: vw(15),
  },
});

export default AddProduct;
