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

const SelectIssueItems = ({onPressApply}) => {


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
    

  return (
  <Container
 
  onPressLeftIcon={onPressApply}
  title={"Select Items"}
  >
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

  
    

</Container>
  )
}

export default SelectIssueItems

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