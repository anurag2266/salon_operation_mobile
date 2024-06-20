import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import ProgressBar from '../../../../components/common/ProgressBar';
import {TextInput} from 'react-native-element-textinput';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import LocalImages from '../../../../utils/LocalImages';
import {getSalonServicesBySalonID} from '../../../../api/services/salonMap';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {FloatingAction} from 'react-native-floating-action';
import {useFocusEffect} from '@react-navigation/native';

const ConfirmSelectedServices = ({navigation}) => {
  const actions = [
    {
      text: 'Add/Change Service Category',
      position: 2,
      name: 'ChangeServices',
    },
    {
      text: 'Request New Service',
      position: 2,
      name: 'RequestNewService',
    },
  ];
  const {userDetails, salonDetails} = useSelector(state => state.flightReducer);
  const [search, setSearch] = useState('');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetSalonServiceData = async () => {
    setLoading(true);
    const {status, data, message} = await getSalonServicesBySalonID(
      salonDetails._id,
    );

    if (status) {
      setServices(data);
      setLoading(false);
    } else {
      showMessage({message: message, type: 'danger'});
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetSalonServiceData();
    }, []),
  );

  const renderItemService = ({item}) => {
    return (
      <View
        style={{
          marginVertical: vh(8),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: vw(15),
        }}>
        <TouchableOpacity style={styles.row}>
          <View>
            <Text style={styles.itemTitleTxt}>
              {item?.serviceId?.serviceName}
            </Text>
            <View style={[styles.row]}>
              <Text style={styles.itemTxt}>{item?.serviceId?.duration}</Text>
              <View
                style={{
                  borderLeftWidth: 1,
                  marginHorizontal: vw(20),
                }}></View>
              <Text style={styles.itemTxt}>{item?.serviceId?.price}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AccordingGender', {item})}>
          <AppIcon type={'AntDesign'} name={'right'} style={styles.righticon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Container
        title={'Selected Services'}
        description={'View selected categories and services'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        leftIconColor={theme.color.dropdownColor}
        // scroll={false}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}
        loading={loading}
        bottomButtonTitle={'Confirm'}
        onPressBottomButton={() => navigation.navigate('SalonSetupSteps')}
        progressBar={<ProgressBar progress={60} />}>
        <TextInput
          value={search}
          style={[styles.input]}
          inputStyle={styles.inputStyle}
          labelStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          textErrorStyle={styles.textErrorStyle}
          label="Search for a Service"
          placeholder="Search for a Service"
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
            onPress={() => {
              setShowModal(true);
            }}
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
          data={services}
          renderItem={renderItemService}
          keyExtractor={item => item.id}
          //extraData={select}
        />
      </Container>
      <View
        style={{
          position: 'relative',
          bottom: vh(80),
          right: vw(15),
        }}>
        <FloatingAction
          buttonSize={60}
          tintColor={theme.color.black}
          color={theme.color.primary}
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
        />
      </View>
    </>
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
    shadowColor: theme.color.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 0,
  },
  searchIcon: {
    width: vw(15),
    height: vh(16),
    marginVertical: vh(17),
  },

  row: {
    flexDirection: 'row',
    marginTop: vh(7),
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
  AddServices: {
    position: 'absolute',
    alignSelf: 'flex-end',
    width: vw(60),
    height: vh(60),
    marginHorizontal: vw(15),
  },
});

export default ConfirmSelectedServices;
