import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import LocalImages from '../../../../utils/LocalImages';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import AppIcon from '../../../../components/common/AppIcon';
import {TextInput} from 'react-native-element-textinput';
import {MultiSelect} from 'react-native-element-dropdown';

const ServiceSteps = ({navigation}) => {
  const [selectedId, setSelectedId] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState([]);
  const [onClick, setonClick] = useState(false);
  const [stepNo, setstepNo] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [toolUsed, settoolUsed] = useState('');
  const [equipmentUsed, setequipmentUsed] = useState('');
  const [station, setstation] = useState('');
  const [room, setroom] = useState('');

  const staffData = [
    {
      id: 1,
      label: 'Stylist',
    },
    {
      id: 2,
      label: 'Assistant',
    },
    {
      id: 3,
      label: 'Helper',
    },
  ];

  const itemData = [
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
      label: 'Station',
    },
    {
      id: 4,
      label: 'Room',
    },
  ];

  const DATA = [
    {
      id: 1,
      step: 'Step 1',
      label: 'Application of hair colour',
      duration: '10 mins',
    },
    {
      id: 2,
      step: 'Step 2',
      label: 'Application of hair colour',
      duration: '10 mins',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={{marginBottom: vh(40), marginTop: vh(10)}}>
        <View style={styles.mainStepView}>
          <AppIcon
            name={'circle'}
            type={'Entypo'}
            color={theme.color.switchOn}
            size={30}
          />
          <Text style={styles.itemStep}>{item.step}</Text>
          <Text style={styles.itemDuration}>{item.duration}</Text>
          <TouchableOpacity>
            <AppIcon
              name={'down'}
              type={'AntDesign'}
              color={theme.color.dropdownColor}
              style={{marginLeft: vw(18), marginTop: vh(8)}}
              size={15}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </View>
    );
  };

  const staffrenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setSelectedStaffId(item.label);
        }}>
        {item.label == selectedStaffId ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const itemrenderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.itemlabelTouch}
        onPress={() => {
          setSelectedItemId(item.label);
        }}>
        {item.label == selectedItemId ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Service Steps'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={() => {
        navigation.navigate('SelectedServicesDetails');
      }}>
      <Text style={styles.serviceName}>Service Name</Text>
      <Text style={styles.service}>Hair Colour</Text>
      <View style={styles.bottom}></View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <View style={styles.bottom}></View>
      <TouchableOpacity
        onPress={() => {
          setonClick(!onClick);
        }}>
        <Text style={styles.newSteps}>+ Add new steps to your service</Text>
      </TouchableOpacity>
      {onClick ? (
        <>
          <Text style={styles.stepsInvolvedTxt}>Steps Involved</Text>
          <View style={styles.bottom}></View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={stepNo}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Step No."
              placeholder="Step No."
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setstepNo({text});
              }}
            />
            <TextInput
              value={duration}
              style={[styles.input, {width: '40%'}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Duration"
              placeholder="Duration"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setDuration({text});
              }}
            />
          </View>
          <TextInput
            value={description}
            style={[styles.input, {marginTop: vh(25)}]}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Description"
            placeholder="Description"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setDescription({text});
            }}
          />
          <Text style={styles.InvolvedText}>Staff Involved</Text>
          <View style={styles.bottom}></View>
          <FlatList
            data={staffData}
            contentContainerStyle={{
              flexDirection: 'row',
            }}
            renderItem={staffrenderItem}
            keyExtractor={item => item.id}
            extraData={selectedStaffId}
          />
          <Text style={styles.InvolvedText}>Items Involved</Text>
          <View style={styles.bottom}></View>
          <FlatList
            data={itemData}
            numColumns={2}
            renderItem={itemrenderItem}
            keyExtractor={item => item.id}
            extraData={selectedItemId}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55), marginTop: vh(30)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Tool Used"
            searchPlaceholder="Search"
            value={toolUsed}
            onChange={item => {
              settoolUsed(item);
            }}
          />

          <MultiSelect
            style={[styles.input, {height: vh(55), marginTop: vh(30)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Equipment Used"
            searchPlaceholder="Search"
            value={equipmentUsed}
            onChange={item => {
              setequipmentUsed(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55), marginTop: vh(30)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Station"
            searchPlaceholder="Search"
            value={station}
            onChange={item => {
              setstation(item);
            }}
          />
          <MultiSelect
            style={[styles.input, {height: vh(55), marginTop: vh(30)}]}
            inputStyle={styles.inputStyle}
            selectedTextStyle={{color: theme.color.black}}
            itemTextStyle={{color: theme.color.black}}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            // data={data}
            search
            labelField="label"
            valueField="lablel"
            placeholder="Room"
            searchPlaceholder="Search"
            value={room}
            onChange={item => {
              setroom(item);
            }}
          />
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  serviceName: {
    color: theme.color.dropdownColor,
    fontFamily: theme.font.medium,
    marginTop: vh(15),
    textAlign: 'center',
    fontSize: normalize(14),
  },
  service: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    marginTop: vh(2),
    fontSize: normalize(16),
    textAlign: 'center',
  },
  mainStepView: {
    flexDirection: 'row',
    marginHorizontal: vh(21),
  },
  itemStep: {
    color: theme.color.LightBlue,
    marginLeft: vw(20),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  itemDuration: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    marginLeft: '50%',
    fontSize: normalize(14),
    marginTop: vh(8),
  },
  itemLabel: {
    color: theme.color.inputGrey,
    marginLeft: vw(65),
    position: 'relative',
    marginTop: vh(-12),
    fontSize: normalize(14),
    fontFamily: theme.font.regular,
  },
  bottom: {
    borderBottomWidth: 1,
    borderColor: theme.color.bottomWidth,
    marginHorizontal: vw(22),
    marginVertical: vh(19),
  },
  newSteps: {
    color: theme.color.LightBlue,
    fontFamily: theme.font.medium,
    marginHorizontal: vw(21),
  },
  OR: {
    color: theme.color.Black_shadow,
    marginHorizontal: vw(34),
    marginVertical: vh(9),
    fontFamily: theme.font.semiBold,
  },
  stepsInvolvedTxt: {
    marginHorizontal: vw(22),
    marginTop: vh(15),
    color: theme.color.black,
    fontFamily: theme.font.bold,
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
  InvolvedText: {
    color: theme.color.Black_shadow,
    fontFamily: theme.font.semiBold,
    marginTop: vh(30),
    marginHorizontal: vw(22),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
  },
  labelText: {
    marginHorizontal: vw(10),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
  },
  itemlabelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    marginTop: vh(15),
  },
});

export default ServiceSteps;
