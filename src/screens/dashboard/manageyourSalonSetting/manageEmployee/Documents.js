import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LocalImages from '../../../../utils/LocalImages';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';

const Documents = ({navigation}) => {
  const DATA = [
    {
      id: 1,
      imagePath: LocalImages.document,
      label: 'Educational',
      navigation: 'EducationalDocuments',
    },
    {
      id: 2,
      imagePath: LocalImages.document,
      label: 'Experience',
      navigation: '',
    },
    {
      id: 3,
      imagePath: LocalImages.document,
      label: 'KYC',
      navigation: '',
    },
    {
      id: 4,
      imagePath: LocalImages.document,
      label: 'Professional',
      navigation: '',
    },
    {
      id: 5,
      imagePath: LocalImages.document,
      label: 'Others',
      navigation: '',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.navigation);
        }}
        style={styles.itemTouch}>
        <View style={styles.imgView}>
          <Image source={item.imagePath} style={styles.itemImg} />
        </View>
        <Text style={styles.itemLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Documents'}
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
      <Text style={styles.documentType}>Select Your Document Type</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.id}
      />
    </Container>
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
  documentType: {
    color: theme.color.black,
    textAlign: 'center',
    marginTop: vh(30),
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  itemTouch: {
    marginHorizontal: vw(20),
    marginTop: vh(51),
  },
  itemImg: {
    width: vw(55),
    height: vh(55),
  },
  imgView: {
    width: vw(100),
    height: vh(100),
    backgroundColor: '#F6F6F6',
    borderRadius: vw(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLabel: {
    textAlign: 'center',
    marginTop: vh(17),
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
    color: theme.color.black,
  },
});

export default Documents;
