import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import LocalImages from '../../../utils/LocalImages';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import Tags from '../../../components/common/Tags';
import {TextInput} from 'react-native-element-textinput';
import {
  getBusinessCategoryAPI,
  updateSalonBusinessCategoryAPI,
} from '../../../api/services/salonBasicService';
import {addbusinesscatAPI} from '../../../api/services/addBusinessCategory';
import {showMessage} from 'react-native-flash-message';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Container from '../../../components/common/Container';
import ProgressBar from '../../../components/common/ProgressBar';
import AppIcon from '../../../components/common/AppIcon';

const ChooseBuisnessCategory = ({navigation, route}) => {
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [search, setSearch] = useState('');
  const [businessCategory, setBusinessCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleGetBusinessCategory = async () => {
    const {status, message, data} = await getBusinessCategoryAPI();
    if (status) {
      console.warn('data', data);
      setBusinessCategory(data);
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleUpdateSalonBusinessCategory = async () => {
    const businessCategory = selectedCategory.map(i => i._id);
    const {status, message, data} = await updateSalonBusinessCategoryAPI({
      salonId: salonDetails._id,
      businessCategory: businessCategory,
    });
    if (status) {
      showMessage({message: message, type: 'Success'});
      navigation.navigate('AddSalonDetail');
    } else {
      showMessage({message: message, type: 'danger'});
    }
  };

  const handleSubmit = () => {
    selectedCategory;
    navigation.navigate('AddSalonDetail');
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetBusinessCategory();
    }, []),
  );

  return (
    <Container
      title={'Business Category'}
      description="Select your business categories"
      bottomButtonTitle={'Save'}
      leftIconName="arrow-left"
      leftIconColor={theme.color.dropdownColor}
      scroll
      disableBottomButton={selectedCategory.length == 0}
      onPressBottomButton={handleSubmit}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType="MaterialCommunityIcons"
      progressBar={<ProgressBar progress={20} />}>
      <TextInput
        value={search}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
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
            size={15}
            style={{marginRight: vw(25)}}
            color={theme.color.dropdownColor}
          />
        )}
      />
      <View style={styles.tagContainer}>
        {selectedCategory.map(item => (
          <Tags
            title={item.name}
            onPress={() =>
              setSelectedCategory(
                selectedCategory.filter(i => i._id != item._id),
              )
            }
          />
        ))}
      </View>
      {/* {route?.params?.from === 'manageScreen' ? <Text>hi</Text> : null} */}
      {businessCategory
        .filter(item => item.name.includes(search))
        .map(item => {
          return (
            <TouchableOpacity
              disabled={selectedCategory.some(val => val._id === item._id)}
              onPress={() => {
                setSelectedCategory([...selectedCategory, item]);
              }}>
              <View style={styles.touchView}>
                <Text style={styles.valueText}>{item.name}</Text>
                {selectedCategory.some(val => val._id === item._id) ? (
                  <Image style={styles.checkimg} source={LocalImages.checked} />
                ) : (
                  <Image
                    style={styles.checkimg}
                    source={LocalImages.unchecked}
                  />
                )}
              </View>
              <View style={styles.bottomWidth}></View>
            </TouchableOpacity>
          );
        })}
    </Container>
  );
};

const styles = StyleSheet.create({
  touchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(28),
    paddingTop: vh(27),
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginLeft: vw(23),
    paddingVertical: vh(12),
    borderColor: theme.color.bottomWidth,
  },
  valueText: {
    color: theme.color.valueText,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  tagContainer: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    flexWrap: 'wrap',
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    height: vh(55),
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(10),
    marginHorizontal: vw(15),
    marginBottom: vh(20),
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

export default ChooseBuisnessCategory;
