import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/common/Container';
import {normalize, vh, vw} from '../../utils/dimensions';
import theme from '../../theme/theme';
import MembershipCard from '../../components/membership/MembershipCard';

const Offers = ({navigation}) => {
  const [membership, setmembership] = useState(false);
  const [packageOffer, setpackageOffer] = useState(false);
  const [giftCard, setgiftCard] = useState(false);
  const [discountCard, setdiscountCard] = useState(false);

  const DATA = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const renderItem = ({item}) => {
    return <MembershipCard dummy />;
  };
  return (
    <Container
      title={'Offers'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[
            styles.btnTouch,
            {
              backgroundColor: membership
                ? theme.color.primary
                : theme.color.white,
            },
          ]}
          onPress={() => {
            setmembership(!membership);
            navigation.navigate('Membership');
          }}>
          <Text
            style={[
              styles.btnText,
              {color: membership ? theme.color.white : theme.color.primary},
            ]}>
            {/* Membership */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnTouch,
            {
              backgroundColor: packageOffer
                ? theme.color.primary
                : theme.color.white,
            },
          ]}
          onPress={() => {
            setpackageOffer(!packageOffer);
            navigation.navigate('Membership');
          }}>
          <Text
            style={[
              styles.btnText,
              {color: packageOffer ? theme.color.white : theme.color.primary},
            ]}>
            Package
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[
            styles.btnTouch,
            {
              backgroundColor: giftCard
                ? theme.color.primary
                : theme.color.white,
            },
          ]}
          onPress={() => {
            setgiftCard(!giftCard);
            navigation.navigate('Membership');
          }}>
          <Text
            style={[
              styles.btnText,
              {color: giftCard ? theme.color.white : theme.color.primary},
            ]}>
            Gift Card
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnTouch,
            {
              backgroundColor: discountCard
                ? theme.color.primary
                : theme.color.white,
            },
          ]}
          onPress={() => {
            setdiscountCard(!discountCard);
            navigation.navigate('Membership');
          }}>
          <Text
            style={[
              styles.btnText,
              {color: discountCard ? theme.color.white : theme.color.primary},
            ]}>
            Discount Card
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: vh(30),
          marginHorizontal: vw(21),
        }}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(21),
    marginTop: vh(20),
  },
  btnTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.primary,
    paddingVertical: vh(15),
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    fontSize: normalize(16),
    fontFamily: theme.font.bold,
  },
});

export default Offers;
