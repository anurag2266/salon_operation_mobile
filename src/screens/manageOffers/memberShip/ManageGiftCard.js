import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import {useState} from 'react';
import GiftCard from '../../../../gift/GiftCard';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ManageGiftCard = ({navigation, route}) => {

  const [membershipPlans, setMembershipPlans] = useState(['', '']);
  return (
    <View style={{flex: 1, backgroundColor: theme.color.white}}>
      <Container
        title={'Manage Gift Card'}
        leftIconName={'arrow-left'}
        leftIconType={'MaterialCommunityIcons'}
        onPressLeftIcon={() => {
          navigation.goBack();
        }}>
        {membershipPlans.length == 0 ? (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            <GiftCard
              dummy
              onPressLog={() => navigation.navigate('ViewLogHistory')}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('AddPcakagePlan')}
              style={{alignItems: 'center', marginTop: vh(119)}}>
              <Text
                style={{color: theme.color.LightBlue, fontSize: normalize(18)}}>
                + Create New Gift Card
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginHorizontal: vw(23), marginTop: vh(40)}}>
            {membershipPlans.map(item => (
              <GiftCard
                onPressViewPlan={() => navigation.navigate('ViewGiftPlan')}
                onPressLog={() => navigation.navigate('ViewGiftLog')}
                onPressSaleHistory={() => navigation.navigate('ViewGiftSaleHistory')}
                onPressAvailHistory={() =>
                  navigation.navigate('ViewGiftAvailedHistory')
                }
              />
            ))}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateGiftCard');
              }}>
              <Text style={styles.createNewText}>{'+ Create New Gift Card'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  membership: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: vh(100),
    width: vw(158),
    height: vh(158),
    borderRadius: vw(158),
  },
  addIcon: {
    alignSelf: 'flex-end',
    marginTop: '80%',
    marginHorizontal: vw(21),
  },
  createNewText: {
    color: theme.color.LightBlue,
    textAlign: 'center',
    fontFamily: theme.font.bold,
    marginVertical: vh(80),
    fontSize: normalize(18),
  },
});

export default ManageGiftCard;
