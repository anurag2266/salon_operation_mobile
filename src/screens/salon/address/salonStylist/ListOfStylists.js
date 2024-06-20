import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../../../components/common/Container';
import LocalImages from '../../../../utils/LocalImages';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../../components/common/AppIcon';
import {getStylistBySalonIdAPI} from '../../../../api/stylist/stylistService';
import {useSelector} from 'react-redux';

const ListOfStylists = ({navigation}) => {
  const {salonDetails} = useSelector(state => state.flightReducer);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [stylistData, setStylistData] = useState([]);

  const handleGetStylist = async () => {
    setLoading(true);
    const {data, message, status} = await getStylistBySalonIdAPI(
      salonDetails._id,
    );
    if (status) {
      setStylistData(data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetStylist();
  }, []);

  return (
    <Container
      title={'Manage Employee'}
      leftIconName={'arrow-left'}
      loading={loading}
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
      <FlatList
        data={stylistData}
        renderItem={({item, index}) => (
          <View
            style={{
              flexDirection: 'row',
              marginTop: vh(15),
              justifyContent: 'space-between',
              marginHorizontal: vw(15),
              borderBottomWidth: 0.5,
              paddingBottom: vh(10),
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ManageEmployeeStylistProfile')
              }
              style={{flexDirection: 'row'}}>
              <Image
                source={{uri: item?.images?.[0]}}
                resizeMode={'contain'}
                style={styles.image}
              />
              <View>
                <Text style={styles.name}>
                  {item?.firstName + ' ' + item.lastName}
                </Text>
                <Text style={styles.designation}>{item?.designation}</Text>
                <Text onPress={() => {}} style={styles.viewProfile}>
                  {item?.profile}
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <AppIcon
                name={'right'}
                type={'AntDesign'}
                size={15}
                style={{marginLeft: vw(70)}}
                onPress={() => {}}
                color={theme.color.dropdownColor}
              />
              <AppIcon
                name={'delete'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  '';
                }}
                style={{marginLeft: vw(70), marginTop: vh(15)}}
                color={theme.color.red}
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('');
        }}>
        <Text style={styles.moreStylist}>+ Add more stylists</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  addStaff: {
    color: theme.color.LightBlue,
    marginHorizontal: vw(25),
    fontSize: normalize(16),
    fontFamily: theme.font.semiBold,
  },
  image: {
    width: vw(64),
    height: vh(64),
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.black,
    backgroundColor: theme.color.black,
  },
  name: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    marginLeft: vw(12),
  },
  designation: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
    marginLeft: vw(12),
    marginVertical: vh(3),
  },
  viewProfile: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(10),
    marginLeft: vw(12),
    marginVertical: vh(3),
  },
  moreStylist: {
    color: theme.color.LightBlue,
    marginTop: vh(8),
    marginHorizontal: vw(15),
  },
});

export default ListOfStylists;
