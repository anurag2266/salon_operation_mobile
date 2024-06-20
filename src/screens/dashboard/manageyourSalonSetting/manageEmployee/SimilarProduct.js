import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import CustomButton from '../../../../components/common/CustomButton';

const SimilarProduct = ({navigation}) => {
  const [similarProducts, setsimilarProducts] = useState(true);
  const [similarServices, setsimilarServices] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Add Similar Product'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={styles.buttonview}>
          <TouchableOpacity
            style={[
              styles.btnTouch,
              {
                backgroundColor: similarProducts
                  ? theme.color.primary
                  : theme.color.buttonInActive,
              },
            ]}
            onPress={() => {
              setsimilarProducts(!similarProducts);
            }}>
            <Text
              style={[
                styles.btnTxt,
                {
                  color: similarProducts
                    ? theme.color.white
                    : theme.color.inputGrey,
                },
              ]}>
              Similar Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnTouch,
              {
                backgroundColor: similarServices
                  ? theme.color.primary
                  : theme.color.buttonInActive,
              },
            ]}
            onPress={() => {
              setsimilarServices(!similarServices);
            }}>
            <Text
              style={[
                styles.btnTxt,
                {
                  color: similarServices
                    ? theme.color.white
                    : theme.color.inputGrey,
                },
              ]}>
              Similar Services
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('');
        }}
        extraStyle={{marginBottom: vh(50)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(32),
    marginTop: vh(30),
  },
  btnTouch: {
    borderRadius: vw(10),
    paddingHorizontal: vw(21),
    paddingVertical: vh(15),
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
  },
});

export default SimilarProduct;
