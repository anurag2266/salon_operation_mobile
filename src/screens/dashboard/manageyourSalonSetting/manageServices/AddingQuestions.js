import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import theme from '../../../../theme/theme';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import LocalImages from '../../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';

const AddingQuestions = ({navigation}) => {
  const [selectedSingleItemId, setSelectedSingleItemId] = useState(false);
  const [selectedMultipleItemId, setSelectedMultipleItemId] = useState(false);
  const [selectedShortItemId, setSelectedShortItemId] = useState(false);
  const [selectedParagraphItemId, setSelectedParagraphItemId] = useState(false);
  const [addQuestion, setaddQuestion] = useState('');
  const [optionSingle, setOptionSingle] = useState('');
  const [optionFirst, setOptionFirst] = useState('');
  const [optionSecond, setOptionSecond] = useState('');
  const [optionThird, setOptionThird] = useState('');
  const [optionForth, setOptionForth] = useState('');
  const [optionShort, setoptionShort] = useState('');
  const [wordLimit, setwordLimit] = useState('');

  return (
    <Container
      title={'Adding Questions'}
      leftIconName={'arrow-left'}
      onPressLeftIcon={() => navigation.goBack()}
      leftIconType={'MaterialCommunityIcons'}
      bottomButtonTitle={'ADD'}
      onPressBottomButton={''}>
      <Text style={styles.quesTypeTxt}>Select Question Type</Text>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: theme.color.bottomWidth,
          marginHorizontal: vw(21),
        }}></View>
      <View style={{flexDirection: 'row', marginVertical: vh(15)}}>
        <TouchableOpacity
          style={styles.choiceTouch}
          onPress={() => {
            setSelectedSingleItemId(!selectedSingleItemId);
          }}>
          {selectedSingleItemId == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.choiceText}>Single Choice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choiceTouch}
          onPress={() => {
            setSelectedMultipleItemId(!selectedMultipleItemId);
          }}>
          {selectedMultipleItemId == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.choiceText}>Multiple Choice</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', marginVertical: vh(15)}}>
        <TouchableOpacity
          style={styles.choiceTouch}
          onPress={() => {
            setSelectedShortItemId(!selectedShortItemId);
          }}>
          {selectedShortItemId == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.choiceText}>Short Answer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.choiceTouch}
          onPress={() => {
            setSelectedParagraphItemId(!selectedParagraphItemId);
          }}>
          {selectedParagraphItemId == true ? (
            <Image style={styles.checkimg} source={LocalImages.checked} />
          ) : (
            <Image style={styles.checkimg} source={LocalImages.unchecked} />
          )}
          <Text style={styles.choiceText}>Paragraph</Text>
        </TouchableOpacity>
      </View>
      {selectedSingleItemId ? (
        <>
          <TextInput
            value={addQuestion}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Add Question"
            placeholder="Add Question"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setaddQuestion(text);
            }}
          />
          <TextInput
            value={optionSingle}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setOptionSingle(text);
            }}
          />
        </>
      ) : null}
      {selectedMultipleItemId ? (
        <>
          <TextInput
            value={addQuestion}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Add Question"
            placeholder="Add Question"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setaddQuestion(text);
            }}
          />
          <TextInput
            value={optionFirst}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setOptionFirst(text);
            }}
          />
          <TextInput
            value={optionSecond}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setOptionSecond(text);
            }}
          />
          <TextInput
            value={optionThird}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setOptionThird(text);
            }}
          />
          <TextInput
            value={optionForth}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setOptionForth(text);
            }}
          />
        </>
      ) : null}
      {selectedShortItemId ? (
        <>
          <TextInput
            value={addQuestion}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Add Question"
            placeholder="Add Question"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setaddQuestion(text);
            }}
          />
          <TextInput
            value={wordLimit}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Word Limit"
            placeholder="Set Word Limit"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setwordLimit(text);
            }}
          />
          <TextInput
            value={optionShort}
            style={styles.input}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            placeholderStyle={styles.placeholderStyle}
            textErrorStyle={styles.textErrorStyle}
            label="Set Option"
            placeholder="Set Option"
            placeholderTextColor={theme.color.TextGrey}
            focusColor={theme.color.borderGrey}
            onChangeText={text => {
              setoptionShort(text);
            }}
          />
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  quesTypeTxt: {
    color: theme.color.black,
    marginHorizontal: vw(21),
    fontFamily: theme.font.semiBold,
    fontSize: normalize(16),
    marginVertical: vh(25),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
  },
  choiceTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
  },
  choiceText: {
    marginHorizontal: vw(10),
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(16),
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
});

export default AddingQuestions;
