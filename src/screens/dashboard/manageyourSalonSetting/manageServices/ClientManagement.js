import {View, Text, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme/theme';
import Container from '../../../../components/common/Container';
import AppIcon from '../../../../components/common/AppIcon';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import {TextInput} from 'react-native-element-textinput';

const ClientManagement = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [downClick, setdownClick] = useState(false);
  const [quesdownClick, setquesdownClick] = useState(false);
  const [concentdownClick, setconcentdownClick] = useState(false);
  const [concentForm, setconcentForm] = useState('');

  const toogleSwitch = () => setIsEnabled(previousState => !previousState);

  const data = [
    {
      id: 1,
      mainHeading: 'Pre Service Instructions',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
  ];
  const quesdata = [
    {
      id: 1,
      ques: '1.',
      mainHeading: 'Lorem Ipsum is simply dummy text of the?',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
    },
  ];
  return (
    <Container
      title={'Client Management'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'Save'}
      onPressBottomButton={() => {
        navigation.navigate('SelectedServicesDetails');
      }}>
      <View style={styles.mainView}>
        <Text style={styles.consentText}>Customer consent required?</Text>
        <Switch
          trackColor={{
            false: theme.color.switchOff,
            true: theme.color.switchOn,
          }}
          onValueChange={toogleSwitch}
          value={isEnabled}
        />
      </View>
      {isEnabled ? (
        <>
          <View style={[styles.clientView, styles.boxWithShadow]}>
            <Text style={styles.introductionText}>Introduction To Client</Text>
            {downClick ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setdownClick(!downClick);
                }}
                color={theme.color.dropdownColor}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setdownClick(!downClick);
                }}
                color={theme.color.dropdownColor}
              />
            )}
          </View>
          {downClick ? (
            <>
              {data.map((head, index) => {
                return (
                  <View
                    key={head.id}
                    style={{
                      borderBottomWidth: 1,
                      marginHorizontal: vw(21),
                      paddingBottom: vh(18),
                      borderColor: theme.color.bottomWidth,
                    }}>
                    <Text style={styles.mainHeading}>{head.mainHeading}</Text>
                    <Text style={styles.description}>{head.description}</Text>
                  </View>
                );
              })}
            </>
          ) : null}

          <View style={[styles.boxWithShadow, styles.clientView]}>
            <Text style={styles.introductionText}>Questions To Client</Text>
            {quesdownClick ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setquesdownClick(!quesdownClick);
                }}
                color={theme.color.dropdownColor}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setquesdownClick(!quesdownClick);
                }}
                color={theme.color.dropdownColor}
              />
            )}
          </View>
          {quesdownClick ? (
            <>
              {quesdata.map((head, index) => {
                return (
                  <View
                    key={head.id}
                    style={{
                      borderBottomWidth: 1,
                      marginHorizontal: vw(21),
                      paddingBottom: vh(18),
                      borderColor: theme.color.bottomWidth,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginTop: vh(15),
                          fontSize: normalize(16),
                          fontFamily: theme.font.semiBold,
                          color: theme.color.black,
                        }}>
                        {head.ques}
                      </Text>
                      <Text style={styles.mainHeading}>{head.mainHeading}</Text>
                    </View>
                    <Text style={styles.description}>{head.description}</Text>
                    <TouchableOpacity style={{alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: theme.color.LightBlue,
                          fontSize: normalize(12),
                          fontFamily: theme.font.bold,
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddingQuestions');
                }}>
                <Text style={styles.addMoreQues}>+ Add More Questions</Text>
              </TouchableOpacity>
            </>
          ) : null}

          <View style={[styles.boxWithShadow, styles.clientView]}>
            <Text style={styles.introductionText}>+ Add Consent Form</Text>
            {concentdownClick ? (
              <AppIcon
                name={'up'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setconcentdownClick(!concentdownClick);
                }}
                color={theme.color.dropdownColor}
              />
            ) : (
              <AppIcon
                name={'down'}
                type={'AntDesign'}
                size={15}
                onPress={() => {
                  setconcentdownClick(!concentdownClick);
                }}
                color={theme.color.dropdownColor}
              />
            )}
          </View>
          {concentdownClick ? (
            <>
              <TextInput
                value={concentForm}
                style={styles.input}
                inputStyle={styles.inputStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={styles.placeholderStyle}
                label="Consent Form"
                placeholder="Consent Form"
                multiline={true}
                placeholderTextColor={theme.color.TextGrey}
                focusColor={theme.color.borderGrey}
                onChangeText={text => {
                  concentdownClick == true;
                  setconcentForm(text);
                }}
              />
            </>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginTop: vh(15),
    borderBottomWidth: 1,
    borderColor: theme.color.Black_shadow,
    padding: 10,
  },
  consentText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
    marginTop: vh(4),
  },
  introductionText: {
    color: theme.color.primary,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  mainHeading: {
    color: theme.color.black,
    marginHorizontal: vw(21),
    marginVertical: vh(15),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
  },
  description: {
    color: theme.color.darkGrey,
    marginHorizontal: vw(21),
    fontFamily: theme.font.regular,
    fontSize: normalize(12),
  },
  addMoreQues: {
    color: theme.color.LightBlue,
    marginTop: vh(12),
    marginHorizontal: vw(21),
    fontFamily: theme.font.bold,
    fontSize: normalize(12),
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(30),
    marginHorizontal: vw(35),
  },
  textErrorStyle: {
    fontSize: normalize(13),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  inputStyle: {fontSize: 16},
  labelStyle: {
    fontSize: normalize(14),
    position: 'absolute',
    top: -10,
    backgroundColor: theme.color.white,
    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  clientView: {
    flexDirection: 'row',
    marginTop: vh(23),
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: vw(21),
    paddingVertical: vh(25),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    alignItems: 'center',
  },
  boxWithShadow: {
    shadowColor: '#045087',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 4,
  },
});

export default ClientManagement;
