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
import LocalImages from '../../../../utils/LocalImages';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../../components/common/CustomButton';

const JobProfile = ({navigation}) => {
  const [selectedId, setSelectedId] = useState('');
  const [select, setSelect] = useState('');
  const [stylistType, setstylistType] = useState('');
  const [expert, setexpert] = useState('');
  const [serviceToStylist, setserviceToStylist] = useState('');

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

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedId(item.label);
          navigation.navigate('');
        }}>
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

  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Stylist Job Profile'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <Text style={styles.profileTxt}>Sunaina's Profile</Text>
        <Text style={styles.stylistOverview}>Hair & Beautician Expert</Text>
        <Text style={styles.selectText}>Select Category</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
        <Text style={styles.selectText}>Select Sub-Categories</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
        <TextInput
          value={stylistType}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Stylist Type"
          placeholder="Stylist Type"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setstylistType(text);
          }}
        />
        <TextInput
          value={expert}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Expert"
          placeholder="Expert"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setexpert(text);
          }}
        />
        <TextInput
          value={serviceToStylist}
          style={styles.input}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Assign Services to Stylist"
          placeholder="Assign Services to Stylist"
          placeholderTextColor={theme.color.TextGrey}
          focusColor={theme.color.borderGrey}
          onChangeText={text => {
            setserviceToStylist(text);
          }}
        />
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {}}
        extraStyle={{marginTop: vh(40), marginBottom: vh(40)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profileTxt: {
    fontSize: normalize(18),
    textAlign: 'center',
    marginTop: vh(15),
    fontFamily: theme.font.semiBold,
    color: theme.color.primary,
  },
  stylistOverview: {
    color: theme.color.black,
    textAlign: 'center',
    marginTop: vh(10),
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
  },
  selectText: {
    marginHorizontal: vw(15),
    marginTop: vh(50),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
    marginBottom: vh(24),
  },
  labelImage: {
    borderWidth: 1,
    padding: vw(20),
    marginHorizontal: vw(15),
    marginBottom: vh(7),
    borderRadius: vw(60),
    borderColor: theme.color.white,
  },
  labelTxt: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    textAlign: 'center',
  },
  bottomWidth: {
    borderBottomWidth: 1,
    marginHorizontal: vw(21),
    marginBottom: vh(23),
    marginTop: vh(43),
    borderColor: theme.color.bottomWidth,
  },
  selectText: {
    marginHorizontal: vw(15),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    marginBottom: vh(24),
    marginTop: vh(50),
  },
  boxWithShadow: {
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    marginBottom: vh(7),
  },
  TickImg: {
    width: vw(22),
    height: vh(22),
    marginRight: vw(12),
    marginVertical: vh(4),
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
});

export default JobProfile;
