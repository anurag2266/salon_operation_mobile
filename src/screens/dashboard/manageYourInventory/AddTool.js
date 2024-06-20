import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import {vh, vw, normalize} from '../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import {useCameraPermission} from '../../../hooks/usePermissions';
import LocalImages from '../../../utils/LocalImages';

const AddTool = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState(false);
  const [toolName, settoolName] = useState('');
  const [toolDescription, settoolDescription] = useState('');
  const [barCode, setbarCode] = useState('');
  const [packSize, setpackSize] = useState('');
  const [colour, setcolour] = useState('');
  const [openingQuantity, setopeningQuantity] = useState('');
  const [purchaseQuantity, setpurchaseQuantity] = useState('');
  const [netQuantity, setnetQuantity] = useState('');
  const [price, setprice] = useState('');
  const [name, setname] = useState('');
  const [orderNo, setorderNo] = useState('');
  const [orderDate, setorderDate] = useState('');
  const [warrantyTill, setwarrantyTill] = useState('');
  const [modelNo, setmodelNo] = useState('');
  const [serialNo, setserialNo] = useState('');
  const [add, setadd] = useState(false);
  const [addTool, setaddTool] = useState(false);

  const TypeData = [
    {
      id: 1,
      label: 'Tools',
    },
    {
      id: 2,
      label: 'Equipment',
    },
    {
      id: 3,
      label: 'Assets',
    },
  ];

  const subCategoryData = [
    {
      id: 1,
      label: 'All',
    },
    {
      id: 2,
      label: 'Cutting Scissors',
    },
    {
      id: 3,
      label: 'Thinning Scissors',
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

  const renderItemSubCategory = ({item}) => {
    return (
      <TouchableOpacity style={styles.subCategoryTouch}>
        <Text style={styles.subCategoryText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={[styles.labelImage, styles.boxWithShadow]}>
          <Image
            source={item.imagePath}
            style={{width: vw(26), height: vh(26)}}
          />
        </View>
        <Text style={styles.labelTxt}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
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

  const handleCameraPicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImagePicker.openCamera({
        width: 400,
        height: 200,
        // cropping: true,
        maxFiles: 4,
      });
    } else {
      openSettings();
    }
  };
  const handleImagePicker = async () => {
    const result = await useCameraPermission();
    if (result) {
      ImageCropPicker.openPicker({
        width: 500,
        height: 500,
        cropping: true,
        mediaType: 'photo',
      })
        .then(res => {
          setFile(res);
        })
        .finally(close);
    } else {
      openSettings();
    }
  };

  return (
    <Container
      title={'Add Tools'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      bottomButtonTitle={'ADD'}
      onPressBottomButton={() => {
        navigation.navigate('ManageToolsAndEquipment');
      }}>
      <TextInput
        value={search}
        style={[styles.input, {marginTop: vh(25)}]}
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
          alignSelf: 'center',
          marginTop: vh(35),
        }}>
        <ImageBackground style={styles.Profile} source={LocalImages.Profile}>
          <TouchableOpacity
            onPress={() => {
              handleCameraPicker, handleImagePicker;
            }}
            style={styles.camera}>
            <Image style={styles.cameraIcon} source={LocalImages.camera} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Text style={styles.typeText}>Select Type</Text>
      <FlatList
        data={TypeData}
        contentContainerStyle={{
          flexDirection: 'row',
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text style={styles.selectCategory}>Select Categories</Text>
      <FlatList
        data={DATA}
        renderItem={renderItemCategory}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
      />
      <Text style={styles.selectCategory}>Select Sub-Categories</Text>
      <View style={styles.border}>
        <FlatList
          data={subCategoryData}
          renderItem={renderItemSubCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </View>
      <Text style={styles.selectCategory}>Select Brands</Text>
      <View style={styles.border}>
        <FlatList
          data={subCategoryData}
          renderItem={renderItemSubCategory}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
        />
      </View>
      {addTool ? (
        <>
          <TextInput
            value={toolName}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Tool Name"
            placeholder="Tool Name"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              settoolName(text);
            }}
          />
          <TextInput
            value={toolDescription}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            multiline={true}
            label="Tool Description"
            placeholder="Tool Description"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              settoolDescription(text);
            }}
          />
          <TextInput
            value={barCode}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Bar Code"
            placeholder="Bar Code"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setbarCode(text);
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={packSize}
              style={[styles.input, {marginTop: vh(25), width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Pack Size"
              placeholder="Pack Size"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setpackSize(text);
              }}
            />
            <TextInput
              value={colour}
              style={[styles.input, {marginTop: vh(25), width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Colour"
              placeholder="Colour"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setcolour(text);
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={openingQuantity}
              style={[styles.input, {marginTop: vh(25), width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Opening Quantity"
              placeholder="Opening Quantity"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setopeningQuantity(text);
              }}
            />
            <TextInput
              value={purchaseQuantity}
              style={[styles.input, {marginTop: vh(25), width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Purchase Quantity"
              placeholder="Purchase Quantity"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setpurchaseQuantity(text);
              }}
            />
          </View>
          <TextInput
            value={netQuantity}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Net Quantity"
            placeholder="Net Quantity"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setnetQuantity(text);
            }}
          />
          <TextInput
            value={price}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Price"
            placeholder="Price"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setprice(text);
            }}
          />
          <Text style={styles.vendorDetailText}>Vendor Details</Text>
          <TextInput
            value={name}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Name"
            placeholder="Name"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setname(text);
            }}
          />
          <TextInput
            value={orderNo}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Purchase Order No. /Bill No."
            placeholder="Purchase Order No. /Bill No."
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setorderNo(text);
            }}
          />
          <TextInput
            value={orderDate}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Purchase Order Date/ Bill Date"
            placeholder="Purchase Order Date/ Bill Date"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setorderDate(text);
            }}
            renderRightIcon={() => (
              <AppIcon
                name={'calendar'}
                type={'AntDesign'}
                size={25}
                color={theme.color.dropdownColor}
              />
            )}
          />
          <TextInput
            value={warrantyTill}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Warranty Till"
            placeholder="Warranty Till"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setwarrantyTill(text);
            }}
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
                Quantity
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
              </>
            ) : null}
          </View>
        </>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setaddTool(!addTool);
        }}>
        <Text style={styles.addMoreToolText}>+ Add More Tool</Text>
      </TouchableOpacity>
      <View style={[styles.toolView, styles.boxWithShadow]}>
        <Text>Trim Scissor</Text>
        <AppIcon
          color={theme.color.red}
          size={15}
          name={'delete'}
          type={'AntDesign'}
          onPress={() => {}}
        />
      </View>
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
  Profile: {
    width: vw(135),
    height: vh(135),
    borderRadius: vw(135),
    marginHorizontal: vw(15),
  },
  camera: {
    top: vh(90),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cameraIcon: {
    width: vw(34),
    height: vh(34),
    borderRadius: vw(34),
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
  },
  typeText: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
    marginHorizontal: vw(27),
    marginVertical: vh(18),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
    marginRight: vw(10),
  },
  labelText: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
  },
  selectCategory: {
    marginTop: vh(30),
    marginLeft: vw(15),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
    fontWeight: '400',
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
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginLeft: vw(17),
    marginTop: vh(12),
    paddingVertical: vh(18),
  },
  subCategoryTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    borderWidth: 1,
    borderRadius: vw(10),
    paddingVertical: vh(8),
    paddingHorizontal: vw(25),
    borderColor: theme.color.primary,
  },
  subCategoryText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  vendorDetailText: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
    marginHorizontal: vw(15),
    marginTop: vh(30),
  },
  quantityView: {
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.borderGrey,
    marginHorizontal: vw(15),
    marginTop: vh(25),
    paddingHorizontal: vw(15),
    paddingVertical: vh(18),
  },
  addTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    paddingHorizontal: vw(17),
    paddingVertical: vh(5),
  },
  addMoreToolText: {
    color: theme.color.LightBlue,
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
    marginVertical: vh(40),
    marginHorizontal: vw(21),
  },
  toolView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginBottom: vh(60),
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(18),
    paddingVertical: vh(25),
  },
});

export default AddTool;
