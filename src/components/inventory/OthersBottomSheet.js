import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../common/Container';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../common/AppIcon';
import theme from '../../theme/theme';
import {vh, vw, normalize} from '../../utils/dimensions';
import LocalImages from '../../utils/LocalImages';

const OthersBottomSheet = ({onPressLeft, onPress}) => {
  const [search, setSearch] = useState('');
  const [option, setOption] = useState('Products');
  const [selected, setselected] = useState(false);
  const [btnDown, setBtnDown] = useState(false);

  const DATA = [
    {
      id: 1,
      name: 'Products',
    },
    {
      id: 2,
      name: 'Tools',
    },
    {
      id: 3,
      name: 'Equipments',
    },
    {
      id: 4,
      name: 'Assets',
    },
  ];
  const productData = [
    {
      id: 1,
      sCode: '123456',
      ProductName: 'L`Oreal Shampoo',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'L`Oreal',
      Unit: '1L',
      imageUrl: require('../../assets/brandproduct.png'),
    },
    {
      id: 2,
      sCode: '234446',
      ProductName: 'Dove Shampoo',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'Dove',
      Unit: '500 ML',
      imageUrl: require('../../assets/brandproduct.png'),
    },
    {
      id: 3,
      sCode: '9878456',
      ProductName: 'Trasemme',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'Trasemme',
      Unit: ' 800 ML',
      imageUrl: require('../../assets/brandproduct.png'),
    },
  ];
  const [count, setCount] = useState(0);

  function increment() {
    //setCount(prevCount => prevCount+=1);
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  }
  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1);
      } else {
        return (prevCount = 0);
      }
    });
  }

  const renderItemStock = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: vw(15),
        }}>
        {selected ? (
          <TouchableOpacity
            onPress={() => {
              setselected(!selected);
            }}>
            <Image source={LocalImages.TickService} style={styles.checkimg} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setselected(!selected);
            }}>
            <Image source={LocalImages.UntickService} style={styles.checkimg} />
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.boxView,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Image
            source={item.imageUrl}
            style={{width: vw(82), height: vh(150)}}
          />
          <View style={{marginLeft: vw(15)}}>
            <Text style={[styles.completed]}>S.Code: {item.sCode}</Text>
            <Text style={[styles.completed]}>
              Product Name: {item.ProductName}
            </Text>
            <Text style={[styles.completed]}>Category: {item.Category}</Text>
            <Text style={[styles.completed]}>
              Subcategory: {item.Subcategory}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.completed]}>Brand: {item.Brand}</Text>
              <Text style={[styles.completed]}>Unit: {item.Unit}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: vh(10),
              }}>
              <View style={[styles.AddTouchView, {flexDirection: 'row'}]}>
                {count == 0 ? null : (
                  <TouchableOpacity onPress={decrement}>
                    <Text style={styles.AddTouchText}>-</Text>
                  </TouchableOpacity>
                )}
                {count == 0 ? (
                  <Text style={styles.AddTouchText}>Add</Text>
                ) : (
                  <Text
                    style={[styles.AddTouchText, {marginHorizontal: vw(15)}]}>
                    {count}
                  </Text>
                )}
                <TouchableOpacity onPress={increment}>
                  <Text style={styles.AddTouchText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: theme.font.medium,
                    color: theme.color.LightBlue,
                    fontSize: normalize(10),
                  }}>
                  Batch wise Entry
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <AppIcon
            name={'right'}
            type={'AntDesign'}
            size={15}
            color={theme.color.dropdownColor}
            onPress={() => {
              refRBSheet.current.open();
            }}
            style={{
              alignSelf: 'flex-start',
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <Container
      title={'Select Items'}
      onPressLeftIcon={onPressLeft}
      bottomButtonTitle={'SAVE'}
      onPressBottomButton={onPress}>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search"
        placeholder="Search"
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
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {DATA.map(item => {
          return (
            <TouchableOpacity
              onPress={() => {
                setOption(item.name);
              }}
              style={[
                styles.dataTouch,
                {
                  backgroundColor:
                    option == item.name
                      ? theme.color.primary
                      : theme.color.white,
                },
              ]}>
              <Text
                style={[
                  styles.dataText,
                  {
                    color:
                      option == item.name
                        ? theme.color.white
                        : theme.color.primary,
                  },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {option == 'Products' ? (
        <>
          <View style={styles.selectedItemView}>
            {selected ? (
              <TouchableOpacity
                onPress={() => {
                  setselected(!selected);
                }}>
                <Image
                  source={LocalImages.TickService}
                  style={styles.checkimg}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setselected(!selected);
                }}>
                <Image
                  source={LocalImages.UntickService}
                  style={styles.checkimg}
                />
              </TouchableOpacity>
            )}
            <Text
              style={{
                fontFamily: theme.font.bold,
                fontSize: normalize(22),
                color: theme.color.primary,
              }}>
              Product(2)
            </Text>
            {btnDown ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={20}
                onPress={() => {
                  setBtnDown(!btnDown);
                }}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={20}
                onPress={() => {
                  setBtnDown(!btnDown);
                }}
              />
            )}
          </View>

          {btnDown ? (
            <FlatList
              data={productData}
              renderItem={renderItemStock}
              keyExtractor={item => item.id}
            />
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default OthersBottomSheet;

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
  dataTouch: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw(5),
    marginHorizontal: vw(12),
    paddingVertical: vh(13),
    paddingHorizontal: vw(25),
    borderColor: theme.color.primary,
    marginTop: vh(40),
  },
  dataText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  checkimg: {
    width: vw(20),
    height: vw(20),
    color: theme.color.bottomWidth,
    marginRight: vw(10),
  },
  selectedItemView: {
    flexDirection: 'row',
    marginTop: vh(33),
    marginHorizontal: vw(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: vh(11),
    borderColor: theme.color.black,
  },
  completed: {
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(14),
  },
  AddTouchView: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: vw(10),
    paddingVertical: vh(8),
  },
  AddTouchText: {
    fontFamily: theme.font.medium,
    color: theme.color.primary,
    fontSize: normalize(10),
  },
  boxView: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    marginTop: vh(30),
    paddingHorizontal: vw(8),
    paddingVertical: vh(10),
    borderColor: theme.color.white,
    shadowColor: theme.color.primary,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
});
