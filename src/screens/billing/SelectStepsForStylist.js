import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import LocalImages from '../../utils/LocalImages';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import CheckBox from '@react-native-community/checkbox';
import AppIcon from '../../components/common/AppIcon';
import CustomButton from '../../components/common/CustomButton';

const SelectStepsForStylist = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [checked, setChecked] = useState([]);
  const [rightClick, setRightClick] = useState(false);

  const DATA = [
    {
      id: 1,
      step: 'Step 1',
      time: '5 mins',
      heading:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard',
      name: 'Rebecca Beck + Erica',
    },
  ];
  const data = [
    {
      id: 1,
      imagepath: LocalImages.Profile,
      category: 'Hair Colour',
      time: '120 min',
      price: 'Rs 708/-',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Select Steps for Stylist'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {data.map((item, index) => {
          return (
            <View key={item.id} style={[styles.itemView, styles.boxWithShadow]}>
              <Image
                source={item.imagepath}
                style={{width: vw(68), height: vh(68)}}
              />
              <View style={{marginLeft: vw(20)}}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.itemPrice}>{item.time}</Text>
                  <View
                    style={{
                      borderLeftWidth: 1,
                      marginHorizontal: vw(10),
                      borderColor: theme.color.dropdownColor,
                    }}></View>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.checkbox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            tintColor={theme.color.primary}
            style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={styles.selectAll}>Select All</Text>
        </View>
        {DATA.map((item, index) => {
          return (
            <View key={item.id} style={[styles.mainView, styles.boxWithShadow]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CheckBox
                  onPress={() => {
                    setChecked(item.name);
                  }}
                  style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
                  disabled={false}
                  value={item.step == checked}
                  onValueChange={() => setChecked(item.step)}
                />
                <Text style={styles.itemstep}>{item.step} </Text>
                <View>
                  <Text style={styles.itemTime}>{item.time}</Text>
                  {rightClick ? (
                    <>
                      <AppIcon
                        name={'down'}
                        type={'AntDesign'}
                        onPress={() => {
                          setRightClick(!rightClick);
                        }}
                        size={15}
                        style={{
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          marginTop: vh(50),
                        }}
                        color={theme.color.dropdownColor}
                      />
                    </>
                  ) : (
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      onPress={() => {
                        setRightClick(!rightClick);
                      }}
                      size={15}
                      style={{
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        marginTop: vh(25),
                      }}
                      color={theme.color.dropdownColor}
                    />
                  )}
                </View>
              </View>
              {rightClick ? (
                <>
                  <Text style={[styles.itemTime, {width: '90%'}]}>
                    {item.heading}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: vh(17),
                    }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <AppIcon
                      name={'delete'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.red}
                    />
                  </View>
                </>
              ) : null}
            </View>
          );
        })}
      </Container>
      <CustomButton
        extraStyle={{marginTop: vh(60), marginBottom: vh(60)}}
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('BillingInformation');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 4,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: vw(32),
    paddingVertical: vh(16),
    borderWidth: 1,
    borderColor: theme.color.white,
    marginTop: vh(30),
    backgroundColor: theme.color.white,
  },
  itemCategory: {
    color: theme.color.primary,
    fontSize: normalize(18),
    fontFamily: theme.font.semiBold,
  },
  itemPrice: {
    color: theme.color.dropdownColor,
    fontSize: normalize(14),
    fontFamily: theme.font.semiBold,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: vw(18),
    marginTop: vh(35),
  },
  selectAll: {
    marginLeft: vw(5),
    color: theme.color.LightBlue,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  mainView: {
    borderWidth: 1,
    borderColor: theme.color.white,
    paddingHorizontal: vw(20),
    paddingVertical: vh(20),
    marginTop: vh(10),
    marginHorizontal: vw(16),
    borderRadius: vw(10),
    backgroundColor: theme.color.white,
  },
  itemstep: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
    marginRight: '40%',
  },
  itemTime: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  name: {
    color: theme.color.primary,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
});

export default SelectStepsForStylist;
