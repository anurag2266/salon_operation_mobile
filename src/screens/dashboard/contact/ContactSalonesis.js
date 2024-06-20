import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
} from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import {normalize, vh, vw} from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import {useState} from 'react';
import {TextInput} from 'react-native-element-textinput';
import CustomButton from '../../../components/common/CustomButton';
import {types} from '@babel/core';

const ContactSalonesis = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  return (
    <Container
      header={false}
      bottomButtonTitle={'Submit Your Message'}
      onPressBottomButton={() => setModalVisible(true)}>
      <ImageBackground
        source={require('../../../assets/imgbck.png')}
        style={[
          {
            width: vw(428),
            height: vw(271),
          },
        ]}
        resizeMode="cover">
        <AppIcon
          name={'arrowleft'}
          type={'AntDesign'}
          color={'white'}
          style={{marginTop: vh(60), marginHorizontal: vw(20)}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: normalize(16),
            fontFamily: theme.font.medium,
            marginHorizontal: vw(15),
            marginTop: vh(110),
            color: theme.color.white,
          }}>
          Contact Selonesis
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: normalize(24),
              fontFamily: theme.font.bold,
              marginHorizontal: vw(15),
              color: theme.color.white,
            }}>
            Get In Touch With Us
          </Text>
          <AppIcon
            name={'md-chatbubble-ellipses'}
            type={'Ionicons'}
            color={'white'}
            style={{marginLeft: vw(60), marginRight: vw(10)}}
          />
          <AppIcon name={'phone-alt'} type={'FontAwesome5'} color={'white'} />
        </View>
      </ImageBackground>
      <TextInput
        value={name}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your name"
        placeholder="Your name"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setName(text);
        }}
      />
      <TextInput
        value={email}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your Email"
        placeholder="Your Email"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setEmail(text);
        }}
      />
      <TextInput
        value={contact}
        style={styles.input}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your Contact No."
        placeholder="Your Contact No."
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setContact(text);
        }}
      />

      <TextInput
        value={message}
        style={styles.input2}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        placeholderStyle={styles.placeholderStyle}
        label="Your Message"
        placeholder="Your Message"
        placeholderTextColor={theme.color.TextGrey}
        focusColor={theme.color.borderGrey}
        onChangeText={text => {
          setMessage(text);
        }}
      />
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: vh(398),
            borderRadius: vw(20),
            height: vh(238),
            backgroundColor: theme.color.white,
            marginTop: vh(350),
            marginHorizontal: 15,
          }}>
          <Text
            style={{
              fontFamily: theme.font.bold,
              fontSize: normalize(22),
              textAlign: 'center',
            }}>
            Your message has been sent to our team.
          </Text>
          <Text style={{fontFamily: theme.font.medium, marginTop: vh(15)}}>
            We’ll contact you soon!
          </Text>
          <CustomButton
            label={'Okay'}
            extraStyle={{marginTop: vh(30), paddingHorizontal: 70}}
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
    </Container>
  );
};

export default ContactSalonesis;

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(34),
    marginHorizontal: vw(15),
  },
  input2: {
    height: vh(162),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.color.borderGrey,
    paddingHorizontal: vw(20),
    marginTop: vh(34),
    marginHorizontal: vw(15),
  },
  inputStyle: {fontSize: 16, color: theme.color.black},
  labelStyle: {
    fontSize: 14,
    position: 'absolute',
    top: -10,

    paddingHorizontal: 4,
    marginLeft: -4,
    fontFamily: theme.font.bold,
    color: theme.color.inputGrey,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
  textErrorStyle: {
    fontSize: 16,
    fontFamily: theme.font.regular,
    color: theme.color.black,
  },
});
