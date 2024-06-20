import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import {vh, vw, normalize} from '../../utils/dimensions';
import theme from '../../theme/theme';
import AppIcon from '../../components/common/AppIcon';
import LocalImages from '../../utils/LocalImages';

const ClientCommunication = () => {
  const [option, setOption] = useState('Issues');
  const [search, setSearch] = useState('');

  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      name: 'Tarun Sharma',
      text: 'has updated the appointment',
      time: '10 min ago',
    },
    {
      id: 2,
      imagePath: LocalImages.Profile,
      name: 'Terms & Conditions Updated',
      text: 'Lorem ipsum dolor sit amet.',
      time: '22 min ago',
    },
    {
      id: 3,
      imagePath: LocalImages.Profile,
      name: 'Ritu Singh',
      text: 'booked an appointment For Tarun Sharma',
      time: '30 min ago',
    },
    {
      id: 4,
      imagePath: LocalImages.Profile,
      name: 'Tarun Sharma',
      text: 'has cancelled the appointment',
      time: '30 min ago',
    },
  ];
  const issuesDATA = [
    {
      id: 1,
      imagePath: LocalImages.Profile,
      name: 'Tarun Sharma',
      text: 'has updated the Issue',
      time: '10 min ago',
    },
    {
      id: 2,
      imagePath: LocalImages.Profile,
      name: 'Terms & Conditions Updated',
      text: 'Lorem ipsum dolor sit amet.',
      time: '22 min ago',
    },
    {
      id: 3,
      imagePath: LocalImages.Profile,
      name: 'Ritu Singh',
      text: 'raise an issue For Tarun Sharma',
      time: '30 min ago',
    },
    {
      id: 4,
      imagePath: LocalImages.Profile,
      name: 'Tarun Sharma',
      text: 'has cancelled the issue',
      time: '30 min ago',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.color.white}}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              setOption('Issues');
            }}
            style={[
              styles.mainTab,
              {backgroundColor: option == 'Issues' ? '#D2D2D2' : '#D2D2D24D'},
            ]}>
            <Text style={styles.mainTabText}>Issues</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOption('Notifications');
            }}
            style={[
              styles.mainTab,
              {
                backgroundColor:
                  option == 'Notifications' ? '#D2D2D2' : '#D2D2D24D',
              },
            ]}>
            <Text style={styles.mainTabText}>Notifications</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          value={search}
          style={[styles.input, {marginTop: vh(25)}]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search name here"
          placeholder="Search name here"
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
        {option == 'Issues' ? (
          <>
            {issuesDATA.map(item => {
              return (
                <View style={styles.mainview}>
                  <Image
                    source={item.imagePath}
                    style={{
                      borderRadius: vw(100),
                      width: vw(50),
                      height: vw(50),
                    }}
                  />
                  <View style={{marginLeft: vw(18)}}>
                    <Text
                      style={{
                        width: vw(290),
                        color: theme.color.black,
                        fontFamily: theme.font.bold,
                        fontSize: normalize(16),
                      }}>
                      {item.name} <Text style={styles.text}>{item.text}</Text>
                    </Text>
                    <Text style={[styles.text, {fontSize: normalize(12)}]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}
        {option == 'Notifications' ? (
          <>
            {DATA.map(item => {
              return (
                <View style={styles.mainview}>
                  <Image
                    source={item.imagePath}
                    style={{
                      borderRadius: vw(100),
                      width: vw(50),
                      height: vw(50),
                    }}
                  />
                  <View style={{marginLeft: vw(18)}}>
                    <Text
                      style={{
                        width: vw(290),
                        color: theme.color.black,
                        fontFamily: theme.font.bold,
                        fontSize: normalize(16),
                      }}>
                      {item.name} <Text style={styles.text}>{item.text}</Text>
                    </Text>
                    <Text style={[styles.text, {fontSize: normalize(12)}]}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              );
            })}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClientCommunication;

const styles = StyleSheet.create({
  mainTab: {
    backgroundColor: '#D2D2D24D',
    paddingHorizontal: vw(70),
    paddingVertical: vh(17),
    alignItems: 'center',
  },
  mainTabText: {
    color: theme.color.black,
    fontFamily: theme.font.medium,
    fontSize: normalize(16),
  },
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
  mainview: {
    marginTop: vh(20),
    shadowColor: theme.color.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: vw(10),
    flexDirection: 'row',
    backgroundColor: theme.color.white,
    paddingVertical: vh(15),
    marginHorizontal: vw(10),
    borderRadius: vw(10),
  },
  text: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
});
