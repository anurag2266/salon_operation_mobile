import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomButton from '../../../../components/common/CustomButton';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';
import Container from '../../../../components/common/Container';
import LocalImages from '../../../../utils/LocalImages';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

const StylistCalendar = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Stylist Calendar'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        <View style={styles.row}>
          <Image
            source={LocalImages.Profile}
            style={{width: vw(72), height: vh(72), borderRadius: vw(72)}}
          />
          <View style={{marginTop: vh(15), marginHorizontal: vw(20)}}>
            <Text style={styles.name}>Sunaina Singh</Text>
            <Text style={styles.expert}>Beautician & Hair Stylist Expert</Text>
          </View>
        </View>
        <View style={{marginTop: vh(30)}}>
          <LinearGradient
            colors={['#2E4353', '#456277']}
            style={{
              borderWidth: 1,
              borderRadius: vw(20),
              marginHorizontal: vw(24),
            }}>
            <Calendar markingType={'multi-dot'} />
          </LinearGradient>
        </View>
        <View></View>
      </Container>
      <CustomButton
        label={'SAVE'}
        onPress={() => {
          navigation.navigate('BuisnessHours');
        }}
        extraStyle={{marginBottom: vh(60)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: vh(30),
    marginHorizontal: vw(23),
  },
  name: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
  },
  expert: {
    color: theme.color.dropdownColor,
    fontSize: normalize(12),
    marginTop: vh(5),
    fontFamily: theme.font.regular,
  },
});

export default StylistCalendar;
