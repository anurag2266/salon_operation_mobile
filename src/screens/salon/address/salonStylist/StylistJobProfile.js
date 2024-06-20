import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {normalize, vh, vw} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import CustomButton from '../../../../components/common/CustomButton';
import Container from '../../../../components/common/Container';
import ProgressBar from '../../../../components/common/ProgressBar';
import {getAllStylistCategoryAPI} from '../../../../api/stylist/stylistCategoryService';
import {getStylistSubCategoryAPI} from '../../../../api/stylist/stylistSubCategoryService';
import {getSalonServicesBySalonID} from '../../../../api/services/salonMap';
import {useSelector} from 'react-redux';
import {updateStylistJobProfile} from '../../../../api/stylist/stylistService';
import {showMessage} from 'react-native-flash-message';
import AppIcon from '../../../../components/common/AppIcon';

const designationData = [
  {
    name: 'Colourist',
  },
  {
    name: 'Senior stylist',
  },
  {
    name: 'Assistant',
  },
  {
    name: 'Shampooist',
  },
  {
    name: 'Junior stylist',
  },
  {
    name: 'Graduate stylist',
  },
  {
    name: 'Salon manager',
  },
];

const StylistJobProfile = ({navigation, route}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [allCategory, setAllCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [stylistType, setStylistType] = useState('');
  const [designation, setDesignation] = useState('');
  const [assignService, setAssignService] = useState([]);
  const [select, setSelect] = useState('');

  const handleGetStylistCategory = async () => {
    const {data, status, message} = await getAllStylistCategoryAPI();
    if (status) {
      setAllCategory([...data]);
    } else {
    }
  };
  const handleGetStylistSubCategory = async () => {
    const {data, status, message} = await getStylistSubCategoryAPI();
    if (status) {
      setAllSubCategory([...data]);
    } else {
    }
  };

  const handleGetServices = async () => {
    const {data, status, message} = await getSalonServicesBySalonID(
      salonDetails._id,
    );
    if (status) {
      setAllServices(data);
    } else {
    }
  };

  const handleSubmit = async () => {
    const {data, status, message} = await updateStylistJobProfile({
      stylistId: route.params.stylistId,
      servicesOffered: assignService,
      categoryIds: category.map(i => i._id),
      subCategoryIds: subCategory.map(i => i._id),
      designation: designation,
      employertype: select,
      employerSubtype: stylistType,
    });
    if (status) {
      navigation.navigate('ListOfStylists');
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  useEffect(() => {
    handleGetStylistCategory();
    handleGetStylistSubCategory();
    handleGetServices();
  }, []);

  const renderItemCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (category.includes(item)) {
            setCategory(category.filter(i => i._id !== item._id));
          } else {
            setCategory([...category, item]);
          }
        }}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              backgroundColor: !category.includes(item)
                ? theme.color.white
                : theme.color.primary,
            },
          ]}>
          {item.displayName == 'All' ? (
            <AppIcon
              color={
                category.includes(item)
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
        <Text style={styles.labelTxt}>{item.displayName}</Text>
      </TouchableOpacity>
    );
  };

  const renderItemSubCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (subCategory.includes(item)) {
            setSubCategory(subCategory.filter(i => i._id !== item._id));
          } else {
            setSubCategory([...subCategory, item]);
          }
        }}>
        <View
          style={[
            styles.labelImage,
            styles.boxWithShadow,
            {
              backgroundColor: !subCategory.includes(item)
                ? theme.color.white
                : theme.color.primary,
            },
          ]}>
          {item.displayName == 'All' ? (
            <AppIcon
              color={
                subCategory.includes(item)
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
        <Text style={styles.labelTxt}>{item.displayName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Employee Job Profile'}
      extraHeadingStyle={{marginHorizontal: vw(40)}}
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      leftIconType="MaterialCommunityIcons"
      onPressLeftIcon={() => {
        navigation.goBack();
      }}
      progressBar={<ProgressBar progress={60} />}>
      <Text style={styles.name}>Rebecca’s Profile</Text>
      <Text style={styles.categoryTxt}>Select Categories</Text>
      <FlatList
        data={allCategory}
        renderItem={renderItemCategory}
        horizontal={true}
        keyExtractor={item => item._id}
      />
      <Text style={styles.categoryTxt}>Select Sub-Categories</Text>
      <FlatList
        data={allSubCategory}
        renderItem={renderItemSubCategory}
        horizontal={true}
        keyExtractor={item => item._id}
      />
      <Dropdown
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        itemTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[
          {name: 'Unisex Hair Dresser'},
          {name: 'Male Hair Dresser'},
          {name: 'Lady Hair Dresser'},
          {name: 'Beautician'},
        ]}
        search
        maxHeight={300}
        labelField="name"
        labelStyle={{color: theme.color.black}}
        value={stylistType}
        valueField="name"
        placeholder={'Employee Type'}
        searchPlaceholder="Search..."
        onChange={text => {
          setStylistType(text.name);
        }}
      />
      <Dropdown
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        itemTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={[
          {name: 'Salaried'},
          {name: 'Contractual'},
          {name: 'Visiting'},
          {name: 'Guest'},
        ]}
        maxHeight={300}
        labelField="name"
        labelStyle={{color: theme.color.black}}
        value={select}
        valueField="name"
        placeholder={'Type'}
        onChange={text => {
          setSelect(text.name);
        }}
      />
      <Dropdown
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        itemTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={designationData}
        search
        maxHeight={300}
        labelField="name"
        labelStyle={{color: theme.color.black}}
        value={designation}
        valueField="name"
        placeholder={'Designation'}
        searchPlaceholder="Search..."
        onChange={text => {
          setDesignation(text.name);
        }}
      />
      <MultiSelect
        style={styles.input}
        inputStyle={styles.inputStyle}
        selectedTextStyle={{color: theme.color.black}}
        itemTextStyle={{color: theme.color.black}}
        inputSearchStyle={styles.inputSearchStyle}
        placeholderStyle={styles.placeholderStyle}
        data={allServices}
        selectedStyle={{marginHorizontal: vw(15), borderRadius: vw(5)}}
        search
        maxHeight={300}
        labelField="displayName"
        value={assignService}
        valueField="_id"
        labelStyle={{color: theme.color.black}}
        placeholder={'Assign Service'}
        searchPlaceholder="Search..."
        onChange={item => {
          setAssignService(item);
        }}
      />
      <CustomButton
        label={'Save'}
        onPress={handleSubmit}
        extraStyle={{marginTop: vh(30), marginBottom: vh(20)}}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(18),
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
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    paddingVertical: vh(10),
    marginTop: vh(30),
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
});

export default StylistJobProfile;
