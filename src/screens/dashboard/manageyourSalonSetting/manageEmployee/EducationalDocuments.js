import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LocalImages from '../../../../utils/LocalImages';
import Container from '../../../../components/common/Container';
import {vh, vw, normalize} from '../../../../utils/dimensions';
import theme from '../../../../theme/theme';

const EducationalDocuments = ({navigation}) => {
  return (
    <Container
      title={'Educational Documents'}
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
      <Text style={styles.documentType}>Upload Your Document Here</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(21),
          marginTop: vh(20),
        }}>
        <TouchableOpacity style={styles.upload}>
          <Text style={styles.uploadText}>10th Marksheet</Text>
          <Image
            source={LocalImages.uploadFile}
            style={{width: vw(27), height: vh(27)}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.upload}>
          <Text style={styles.uploadText}>12th Marksheet</Text>
          <Image
            source={LocalImages.uploadFile}
            style={{width: vw(27), height: vh(27)}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: vw(21),
          marginTop: vh(20),
        }}>
        <TouchableOpacity style={styles.upload}>
          <Text style={styles.uploadText}>Graduation</Text>
          <Image
            source={LocalImages.uploadFile}
            style={{width: vw(27), height: vh(27)}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.upload}>
          <Text style={styles.uploadText}>Post Graduation</Text>
          <Image
            source={LocalImages.uploadFile}
            style={{width: vw(27), height: vh(27)}}
          />
        </TouchableOpacity>
      </View>
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
    marginVertical: vh(30),
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  upload: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: vw(185),
    paddingVertical: vh(15),
    borderColor: '#CACACA',
  },
  uploadText: {
    color: theme.color.black,
    fontSize: normalize(16),
    marginRight: vw(8),
    fontFamily: theme.font.regular,
  },
});

export default EducationalDocuments;
