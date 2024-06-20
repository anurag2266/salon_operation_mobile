import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import ContainerBasic from '../../components/common/BasicContainer';
import LocalImages from '../../utils/LocalImages';
import theme from '../../theme/theme';
import {normalize, vh, vw} from '../../utils/dimensions';
import CustomButton from '../../components/common/CustomButton';
import Container from '../../components/common/Container';

const SalonesisSetUp = ({navigation}) => {
  return (
    <Container header={false} scroll={false}>
      <View style={styles.logoView}>
        <Image source={LocalImages.Logo} style={styles.logo} />
      </View>
      <Text style={styles.allsetText}>You’re all set!</Text>
      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. When an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
      <CustomButton
        label={'Continue'}
        onPress={() => {
          navigation.navigate('');
        }}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: vw(347),
    height: vh(113),
    marginHorizontal: vw(41),
    marginTop: vh(139),
  },
  logoView: {
    height: vh(278),
    width: vw(428),
    backgroundColor: theme.color.Blue,
  },
  allsetText: {
    marginTop: vh(21),
    textAlign: 'center',
    fontSize: normalize(24),
    fontFamily: theme.font.bold,
    color: theme.color.Black,
  },
  description: {
    color: theme.color.Black_shadow,
    textAlign: 'center',
    marginVertical: vh(34),
    marginHorizontal: vw(48),
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
  },
});

export default SalonesisSetUp;
