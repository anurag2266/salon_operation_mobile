import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';
import CardHistory from './CardHistory';

const MembershipInvoice = ({navigation, route}) => {
  return (
    <Container
      title={'Invoice'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={{marginHorizontal: vw(15)}}>
        <Image source={require('../../../assets/invoice.png')} />
      </View>
      <Text style={styles.invoiceDetail}>Here we Show Invoice Details</Text>
      <TouchableOpacity style={styles.shareBtn}>
        <AppIcon
          name={'share'}
          type={'Entypo'}
          size={17}
          color={theme.color.primary}
          style={{marginRight: vw(15)}}
        />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default MembershipInvoice;

const styles = StyleSheet.create({
  invoiceDetail: {
    color: theme.color.black,
    textAlign: 'center',
    fontSize: normalize(20),
    fontFamily: theme.font.bold,
    marginTop: vh(15),
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: vw(60),
    paddingVertical: vh(14),
    marginTop: '40%',
    borderWidth: 1,
    borderColor: theme.color.primary,
    borderRadius: vw(10),
    marginBottom: '20%',
  },
  shareText: {
    fontFamily: theme.font.bold,
    color: theme.color.primary,
    fontSize: normalize(16),
  },
});
