import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import {normalize, vh, vw} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';
import LocalImages from '../../../utils/LocalImages';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Dropdown} from 'react-native-element-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../../components/common/CustomButton';
import { RotateInUpLeft } from 'react-native-reanimated';

const OpeningStockItems = ({navigation}) => {
  const refRBSheet = useRef();
  const refRBSheetModal = useRef();

  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selected, setselected] = useState(false);
  const [selectedtool, setselectedTool] = useState(false);
  const [add, setadd] = useState(false);
  const [modelNo, setmodelNo] = useState('');
  const [serialNo, setserialNo] = useState('');
  const [itemTouch, setItemTouch] = useState(false);
  const [btnDown, setBtnDown] = useState(false);
  const [btnDownData, setBtnDownData] = useState(false);

  const [type, setType] = useState('false');
  const [addfields, setAddField] = useState(false);
  const [addquantity, setAddQuantity] = useState(false);

  const TypeData = [
    {
      id: 1,
      label: 'Professional',
    },
    {
      id: 2,
      label: 'Retail',
    },
    {
      id: 3,
      label: 'Both',
    },
  ];

  const DATA = [
    {
      id: 1,
      title: 'Product',
    },
    {
      id: 2,
      title: 'Tool',
    },
    {
      id: 3,
      title: 'Equipment',
    },
    {
      id: 4,
      title: 'Assets',
    },
  ];

  const ToolData = [
    {
      id: 1,
      ProductName: 'Aveda Hair Dryer',
      Category: 'Tools',
      Subcategory: 'Tools',
      Brand: 'Aveda',
      Unit: '1',
      imageUrl: require('../../../assets/brandtool.png'),
    },
    {
      id: 2,
      ProductName: 'Aveda Hair Dryer',
      Category: 'Tools',
      Subcategory: 'Tools',
      Brand: 'Aveda',
      Unit: '1',
      imageUrl: require('../../../assets/brandtool.png'),
    },
    {
      id: 3,
      ProductName: 'Aveda Hair Dryer',
      Category: 'Tools',
      Subcategory: 'Tools',
      Brand: 'Aveda',
      Unit: '1',
      imageUrl: require('../../../assets/brandtool.png'),
    },
  ];

  const Data = [
    {
      id: 1,
      sCode: '123456',
      ProductName: 'L`Oreal Shampoo',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'L`Oreal',
      Unit: '1L',
      imageUrl: require('../../../assets/brandproduct.png'),
    },
    {
      id: 2,
      sCode: '234446',
      ProductName: 'Dove Shampoo',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'Dove',
      Unit: '500 ML',
      imageUrl: require('../../../assets/brandproduct.png'),
    },
    {
      id: 3,
      sCode: '9878456',
      ProductName: 'Trasemme',
      Category: 'Hair',
      Subcategory: 'Hair Wash',
      Brand: 'Trasemme',
      Unit: ' 800 ML',
      imageUrl: require('../../../assets/brandproduct.png'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemTouch,
          {
            backgroundColor: itemTouch
              ? theme.color.primary
              : theme.color.white,
            borderWidth: 1,
          },
        ]}
        onPress={() => {
          setItemTouch(!itemTouch);
        }}>
        <Text
          style={[
            styles.itemText,
            {color: itemTouch ? theme.color.white : theme.color.primary},
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

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
            styles.boxWithShadow,
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
            <TouchableOpacity style={styles.AddTouchView}>
              <Text style={styles.AddTouchText}>Add</Text>
            </TouchableOpacity>
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

  const renderItemTool = ({item}) => {
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
            styles.boxWithShadow,
            styles.boxView,
            {flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Image
            source={item.imageUrl}
            style={{width: vw(82), height: vh(150)}}
          />
          <View style={{marginLeft: vw(15)}}>
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
            <TouchableOpacity style={styles.AddTouchView}>
              <Text style={styles.AddTouchText}>Add</Text>
            </TouchableOpacity>
          </View>
          <AppIcon
            name={'right'}
            type={'AntDesign'}
            size={15}
            color={theme.color.dropdownColor}
            onPress={() => {
              refRBSheetModal.current.open();
            }}
            style={{
              alignSelf: 'flex-start',
            }}
          />
        </View>
      </View>
    );
  };

  const renderItemType = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setType(item.label);
        }}>
        {item.label == type ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (


    <Container


      title={
        "Add Opening Stock Items" 
      }
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle={'SAVE'}
      onPressBottomButton={() => {}}>
      <Text style={styles.stockName}>Retail Window</Text>
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
      <View
        style={{
          flexDirection: 'row',
          marginTop: vh(20),
        }}>
        <TextInput
          value={date}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Date"
          placeholder="Date"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setDate(text);
          }}
        />
        <TextInput
          value={time}
          style={[styles.input, {width: '40%'}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Time"
          placeholder="Time"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setTime(text);
          }}
        />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
      />
      <View style={styles.selectedItemView}>
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
          data={Data}
          renderItem={renderItemStock}
          keyExtractor={item => item.id}
        />
      ) : null}

      <View style={styles.selectedItemView}>
        {selectedtool ? (
          <TouchableOpacity
            onPress={() => {
              setselectedTool(!selectedtool);
            }}>
            <Image source={LocalImages.TickService} style={styles.checkimg} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setselectedTool(!selectedtool);
            }}>
            <Image source={LocalImages.UntickService} style={styles.checkimg} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: normalize(22),
            color: theme.color.primary,
          }}>
          Tools
        </Text>
        {btnDownData ? (
          <AppIcon
            name={'up'}
            type={'AntDesign'}
            size={20}
            onPress={() => {
              setBtnDownData(!btnDownData);
            }}
          />
        ) : (
          <AppIcon
            name={'down'}
            type={'AntDesign'}
            size={20}
            onPress={() => {
              setBtnDownData(!btnDownData);
            }}
          />
        )}
      </View>
      {btnDownData ? (
        <FlatList
          data={ToolData}
          renderItem={renderItemTool}
          keyExtractor={item => item.id}
        />
      ) : null}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: vh(750),
            borderTopRightRadius: vw(20),
            borderTopLeftRadius: vw(20),
          },
        }}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              margin: vw(15),
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#C7C7C7',
                padding: 5,
              }}>
              <Image
                source={require('../../../assets/brandproduct.png')}
                style={{width: vw(82), height: vh(150)}}
              />
            </View>
            <View style={{marginHorizontal: vw(11)}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.completed]}>S.Code: 23434345</Text>
              </View>
              <Text style={[styles.completed]}>
                Product Name: L`Oreal Shampoo
              </Text>
              <Text style={[styles.completed]}>Category: Hair</Text>
              <Text style={[styles.completed]}>Subcategory: Hair Wash</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.completed]}>Brand: L'Oreal</Text>
                <Text style={[styles.completed]}>Unit: 1</Text>
                <Text style={[styles.completed]}>Qty: 1</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={TypeData}
            contentContainerStyle={{
              flexDirection: 'row',
              paddingBottom: vh(20),
            }}
            renderItem={renderItemType}
            keyExtractor={item => item.id}
          />

          {addfields ? (
            <View>
              <TextInput
                // value={userDetails.lastName}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Batch No."
                placeholder="Batch No."
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  //value={amount}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="Expiry Date"
                  placeholder="Expiry Date"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setamount(text);
                  // }}
                />
                <TextInput
                  //value={duration}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="TOTAL Quantity"
                  placeholder="Total Quantity"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setduration(text);
                  // }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  //value={amount}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="New Quantity"
                  placeholder="New Quantity"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setamount(text);
                  // }}
                />
                <TextInput
                  //value={duration}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="Used Quantity"
                  placeholder="Used Quantity"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setduration(text);
                  // }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  //value={amount}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="MRP"
                  placeholder="MRP"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setamount(text);
                  // }}
                />
                <TextInput
                  //value={duration}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="Purchase Price"
                  placeholder="Purchase Price"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setduration(text);
                  // }}
                />
              </View>
              <View>
                <TextInput
                  //value={percentage}
                  style={[styles.input, {marginTop: vh(20)}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  textErrorStyle={styles.textErrorStyle}
                  placeholder="(Rate)"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setpercentage(text);
                  // }}
                  renderLeftIcon={() => (
                    <Dropdown
                      style={{width: '50%'}}
                      inputStyle={styles.inputStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      placeholderStyle={styles.placeholderStyle}
                      placeholder="Discount"
                      labelField="label"
                      valueField="value"
                      maxHeight={300}
                      data={[
                        {label: 'Percentage %', value: '1'},
                        {label: 'Flat(Rs.)', value: '2'},
                      ]}
                    />
                  )}
                />
                <TextInput
                  // value={userDetails.lastName}
                  style={[styles.input, {margin: vh(40)}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  label="Sale Price"
                  placeholder="Sale Price"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setUserDetails({...userDetails, lastName: text});
                  // }}
                />
              </View>
            </View>
          ) : null}

          <TouchableOpacity
            style={{paddingLeft: vh(40)}}
            onPress={() => setAddField(!addfields)}>
            <Text style={{fontFamily: theme.font.bold, color: '#007BFD'}}>
              + Add More
            </Text>
          </TouchableOpacity>

          <CustomButton
            extraStyle={{marginTop: vh(40), marginBottom: vh(20)}}
            onPress={() => refRBSheet.current.close()}
            label={'SAVE'}
          />
        </ScrollView>
      </RBSheet>

      <RBSheet
        ref={refRBSheetModal}
        closeOnDragDown={false}
        closeOnPressMask={true}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: vh(750),
            borderTopRightRadius: vw(20),
            borderTopLeftRadius: vw(20),
          },
        }}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              margin: vw(15),
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#C7C7C7',
                padding: 5,
              }}>
              <Image
                source={require('../../../assets/brandtool.png')}
                style={{width: vw(82), height: vh(150)}}
              />
            </View>
            <View style={{marginHorizontal: vw(11), alignSelf: 'center'}}>
              <Text style={[styles.completed]}>
                Product Name: Aveda Hair Dryer
              </Text>
              <Text style={[styles.completed]}>Category: Tools</Text>
              <Text style={[styles.completed]}>Subcategory: Tools</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.completed]}>Brand: Aveda</Text>
                <Text style={[styles.completed]}>Unit: 1</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={TypeData}
            contentContainerStyle={{
              flexDirection: 'row',
              paddingBottom: vh(20),
            }}
            renderItem={renderItemType}
            keyExtractor={item => item.id}
          />
          <TouchableOpacity
            style={{paddingLeft: vh(40)}}
            onPress={() => setAddField(!addfields)}>
            <Text style={{fontFamily: theme.font.bold, color: '#007BFD'}}>
              + Add More
            </Text>
          </TouchableOpacity>

          {addfields ? (
            <View>
              <Text
                style={{
                  fontFamily: theme.font.medium,
                  color: theme.color.black,
                  marginVertical: vw(10),
                  padding: vh(15),
                }}>
                Vendor Details
              </Text>
              <TextInput
                // value={userDetails.lastName}
                style={styles.input}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Name"
                placeholder="Name"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />
              <TextInput
                // value={userDetails.lastName}
                style={[styles.input, {marginTop: vh(20)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Purchase Order No./Bill No."
                placeholder="Purchase Order No./Bill No."
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />
              <TextInput
                // value={userDetails.lastName}
                style={[styles.input, {marginTop: vh(20)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Purchase Order Date/Bill Date"
                placeholder="Purchase Order No./Bill No."
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                renderRightIcon={() => (
                  <AppIcon
                    name={'calendar'}
                    type={'AntDesign'}
                    size={20}
                    color={theme.color.bottomWidth}
                    style={{marginRight: vw(15)}}
                  />
                )}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />
              <TextInput
                // value={userDetails.lastName}
                style={[styles.input, {marginTop: vh(20)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Warranty Till"
                placeholder="Warranty Till"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />
              <TextInput
                // value={userDetails.lastName}
                style={[styles.input, {marginTop: vh(20)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Bar Code"
                placeholder="Bar Code"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  //value={amount}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="HSN Code"
                  placeholder="HSN Code"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setamount(text);
                  // }}
                />
                <TextInput
                  //value={duration}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="GST%"
                  placeholder=""
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setduration(text);
                  // }}
                />
              </View>

              <View style={{flexDirection: 'row'}}>
                <TextInput
                  //value={amount}
                  style={[styles.input2]}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="MRP"
                  placeholder="MRP"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setamount(text);
                  // }}
                />
                <TextInput
                  //value={duration}
                  style={styles.input2}
                  inputStyle={styles.inputStyle2}
                  labelStyle={styles.labelStyle2}
                  placeholderStyle={styles.placeholderStyle2}
                  textErrorStyle={styles.textErrorStyle2}
                  label="Purchase Price"
                  placeholder="Purchase Price"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setduration(text);
                  // }}
                />
              </View>
              <View>
                <TextInput
                  //value={percentage}
                  style={[styles.input, {marginTop: vh(10)}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  textErrorStyle={styles.textErrorStyle}
                  placeholder="(Rate)"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setpercentage(text);
                  // }}
                  renderLeftIcon={() => (
                    <Dropdown
                      style={{width: '50%'}}
                      inputStyle={styles.inputStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      placeholderStyle={styles.placeholderStyle}
                      placeholder="Discount"
                      labelField="label"
                      valueField="value"
                      maxHeight={300}
                      data={[
                        {label: 'Percentage %', value: '1'},
                        {label: 'Flat(Rs.)', value: '2'},
                      ]}
                    />
                  )}
                />
                <TextInput
                  // value={userDetails.lastName}
                  style={[styles.input, {marginTop: vh(14)}]}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  placeholderStyle={styles.placeholderStyle}
                  label="Sale Price"
                  placeholder="Sale Price"
                  placeholderTextColor={theme.color.TextGrey}
                  focusColor={theme.color.borderGrey}
                  // onChangeText={text => {
                  //   setUserDetails({...userDetails, lastName: text});
                  // }}
                />

                <View style={styles.quantityView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: theme.font.regular,
                        fontSize: normalize(16),
                        color: theme.color.black,
                      }}>
                      Purchased Quantity
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setadd(!add);
                      }}
                      style={styles.addTouch}>
                      <Text
                        style={{
                          fontFamily: theme.font.regular,
                          fontSize: normalize(14),
                          color: theme.color.black,
                        }}>
                        ADD
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {add ? (
                    <>
                      <TextInput
                        value={modelNo}
                        style={[styles.input, {marginTop: vh(25)}]}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        textErrorStyle={styles.textErrorStyle}
                        label="Model Number"
                        placeholder="Model Number"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.borderGrey}
                        onChangeText={text => {
                          setmodelNo(text);
                        }}
                      />
                      <TextInput
                        value={serialNo}
                        style={[styles.input, {marginTop: vh(25)}]}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        textErrorStyle={styles.textErrorStyle}
                        label="Serial Number"
                        placeholder="Serial Number"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.borderGrey}
                        onChangeText={text => {
                          setserialNo(text);
                        }}
                      />
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          //value={amount}
                          style={styles.input3}
                          inputStyle={styles.inputStyle2}
                          labelStyle={styles.labelStyle2}
                          placeholderStyle={styles.placeholderStyle2}
                          textErrorStyle={styles.textErrorStyle2}
                          label="Pack Size"
                          placeholder="Pack Size"
                          placeholderTextColor={theme.color.TextGrey}
                          focusColor={theme.color.borderGrey}
                          // onChangeText={text => {
                          //   setamount(text);
                          // }}
                        />
                        <TextInput
                          //value={duration}
                          style={styles.input3}
                          inputStyle={styles.inputStyle2}
                          labelStyle={styles.labelStyle2}
                          placeholderStyle={styles.placeholderStyle2}
                          textErrorStyle={styles.textErrorStyle2}
                          label="Color"
                          placeholder="Color"
                          placeholderTextColor={theme.color.TextGrey}
                          focusColor={theme.color.borderGrey}
                          // onChangeText={text => {
                          //   setduration(text);
                          // }}
                        />
                      </View>
                    </>
                  ) : null}
                </View>
              </View>
              <TextInput
                // value={userDetails.lastName}
                style={[styles.input, {marginTop: vh(20)}]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Opening Quantity"
                placeholder="Opening Quantity"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />

              <TextInput
                // value={userDetails.lastName}
                style={[
                  styles.input,
                  {marginTop: vh(20), marginBottom: vh(25)},
                ]}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Total Quantity"
                placeholder="Total Quantity"
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                // onChangeText={text => {
                //   setUserDetails({...userDetails, lastName: text});
                // }}
              />
              <CustomButton
                extraStyle={{marginTop: vh(20), marginBottom: vh(20)}}
                onPress={() => refRBSheetModal.current.close()}
                label={'SAVE'}
              />
            </View>
          ) : null}
        </ScrollView>
      </RBSheet>
    </Container>
  );
};

const styles = StyleSheet.create({
  stockName: {
    textAlign: 'center',
    color: theme.color.primary,
    fontSize: normalize(18),
    fontFamily: theme.font.bold,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,

    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
  },
  checkimg: {
    width: vw(20),
    height: vw(20),
    color: theme.color.bottomWidth,
    marginRight: vw(10),
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
  labelText: {
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(16),
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  quantityView: {
    marginTop: vh(20),
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.borderGrey,
    marginHorizontal: vw(15),
    marginTop: vh(25),
    paddingHorizontal: vw(15),
    paddingVertical: vh(18),
  },
  itemTouch: {
    borderRadius: vw(5),
    paddingHorizontal: vw(25),
    paddingVertical: vw(11),
    marginHorizontal: vw(15),
    marginTop: vh(40),
  },
  itemText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    color: theme.color.primary,
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
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  boxView: {
    backgroundColor: theme.color.white,
    borderWidth: 1,
    marginTop: vh(30),
    paddingHorizontal: vw(8),
    paddingVertical: vh(10),
    borderColor: theme.color.white,
  },
  completed: {
    fontFamily: theme.font.regular,
    color: theme.color.black,
    fontSize: normalize(14),
  },
  input2: {
    borderRadius: 10,
    width: vw(188),
    borderWidth: 1,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(25),
    marginTop: vh(24),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
  },
  input3: {
    borderRadius: 10,
    width: vw(155),
    borderWidth: 1,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(25),
    marginTop: vh(24),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
  },

  inputStyle2: {fontSize: 13},
  labelStyle2: {
    fontSize: normalize(13),
    position: 'absolute',
    top: -10,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle2: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle2: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  AddTouchView: {
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: vh(10),
    paddingHorizontal: vw(25),
    paddingVertical: vh(8),
  },
  AddTouchText: {
    fontFamily: theme.font.medium,
    color: theme.color.primary,
    fontSize: normalize(10),
  },
});

export default OpeningStockItems;
