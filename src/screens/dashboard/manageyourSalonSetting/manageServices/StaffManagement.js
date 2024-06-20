import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';
import LocalImages from '../../../../utils/LocalImages';
import AppIcon from '../../../../components/common/AppIcon';

const StaffManagement = ({navigation}) => {
  const [searchProduct, setsearchProduct] = useState('');
  const data = [
    {
      id: 1,
      imagePath: LocalImages.Salon,
      name: 'Aaditya Sharma',
      designation: 'Hair Stylist',
      level: 'Expert',
    },
  ];
  return (
    <Container
      title={'Staff Management'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={() => {
        navigation.navigate('SelectedServicesDetails');
      }}>
      <Text style={styles.staffSelectText}>
        Select the staff who can provide the service.
      </Text>
      <Text style={styles.serviceName}>Service Name</Text>
      <Text style={styles.service}>Hair Colour</Text>
      <TextInput
        value={searchProduct}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        textErrorStyle={styles.textErrorStyle}
        label="Search products to add"
        placeholder="Search products to add"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setsearchProduct(text);
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
          marginBottom: vh(15),
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
      {data.map((staff, index) => {
        return (
          <View key={staff.id}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                marginTop: vh(10),
                marginHorizontal: vw(25),
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                paddingBottom: vh(20),
                borderColor: theme.color.borderGrey,
              }}>
              <Image
                source={staff.imagePath}
                resizeMode={'contain'}
                style={styles.image}
              />
              <View style={{marginRight: '30%'}}>
                <Text style={styles.name}>{staff.name}</Text>
                <Text style={styles.designation}>{staff.designation}</Text>
                <Text style={styles.designation}>{staff.level}</Text>
              </View>
              <AppIcon
                name={'right'}
                type={'AntDesign'}
                color={theme.color.dropdownColor}
                onPress={() => {
                  navigation.navigate('StylistProfile');
                }}
                size={15}
              />
            </TouchableOpacity>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('StartAddingStylist');
        }}>
        <Text style={styles.addStaff}>+ Add Staff</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  staffSelectText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  serviceName: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
    textAlign: 'center',
    marginTop: vh(18),
  },
  service: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    textAlign: 'center',
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
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
    marginTop: vh(20),
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
    fontSize: normalize(16),
    marginLeft: vw(12),
  },
});

export default StaffManagement;
