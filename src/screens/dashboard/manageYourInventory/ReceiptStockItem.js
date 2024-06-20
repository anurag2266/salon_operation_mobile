import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import LocalImages from '../../../utils/LocalImages';
import {TextInput} from 'react-native-element-textinput';
import AppIcon from '../../../components/common/AppIcon';
import RBSheet from 'react-native-raw-bottom-sheet';
import ReplacementBottomSheet from '../../../components/inventory/ReplacementBottomSheet';
import Replacement from './Replacement';
import Exchange from './Exchange';
import ExchangeBottomSheet from '../../../components/inventory/ExchangeBottomSheet';
import Repair from './Repair';
import RepairBottomSheet from '../../../components/inventory/RepairBottomSheet';
import Others from './Others';
import OthersBottomSheet from '../../../components/inventory/OthersBottomSheet';
import {FloatingAction} from 'react-native-floating-action';

const ReceiptStockItem = ({navigation, route}) => {
  const [option, setOption] = useState('Vendors');
  const [labelType, setlabelType] = useState('Replacement');
  const refRBSheet = useRef();

  const actions = [
    {
      text: 'Receipt Summary',
      position: 1,
      name: 'ReceiptSummary',
    },
  ];

  const TypeData = [
    {
      id: 1,
      label: 'Replacement',
    },
    {
      id: 2,
      label: 'Exchange',
    },
    {
      id: 3,
      label: 'Repair',
    },
    {
      id: 4,
      label: 'Others',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.labelTouch}
        onPress={() => {
          setlabelType(item.label);
        }}>
        {item.label == labelType ? (
          <Image style={styles.checkimg} source={LocalImages.checked} />
        ) : (
          <Image style={styles.checkimg} source={LocalImages.unchecked} />
        )}
        <Text style={styles.labelText}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Receipt Stock Items'}
      leftIconName={'arrow-left'}
      leftIconType={'MaterialCommunityIcons'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.buttonTouchView}>
        <TouchableOpacity
          onPress={() => {
            setOption('Vendors');
          }}
          style={[
            styles.buttonTouch,
            styles.boxWithShadow,
            {
              backgroundColor:
                option == 'Vendors' ? theme.color.primary : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  option == 'Vendors' ? theme.color.white : theme.color.black,
              },
            ]}>
            Vendors
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Others');
          }}
          style={[
            styles.buttonTouch,
            styles.boxWithShadow,
            {
              backgroundColor:
                option == 'Others' ? theme.color.primary : theme.color.white,
            },
          ]}>
          <Text
            style={[
              styles.buttonText,
              {
                color:
                  option == 'Others' ? theme.color.white : theme.color.black,
              },
            ]}>
            Others
          </Text>
        </TouchableOpacity>
      </View>
      {option == 'Vendors' ? (
        <>
          <FlatList
            data={TypeData}
            numColumns={3}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          {labelType == 'Replacement' ? (
            <>
              <Replacement
                onPressRbSheet={() => {
                  refRBSheet.current.open();
                }}
              />
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  // wrapper: {
                  //   backgroundColor: 'transparent',
                  // },
                  container: {
                    borderTopLeftRadius: vw(20),
                    borderTopRightRadius: vw(20),
                    height: '80%',
                  },
                  draggableIcon: {
                    backgroundColor: theme.color.white,
                  },
                }}>
                <ReplacementBottomSheet
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                  onPressLeft={() => {
                    refRBSheet.current.close();
                  }}
                />
              </RBSheet>
            </>
          ) : null}
          {labelType == 'Exchange' ? (
            <>
              <Exchange
                onPressRbSheet={() => {
                  refRBSheet.current.open();
                }}
              />
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  // wrapper: {
                  //   backgroundColor: 'transparent',
                  // },
                  container: {
                    borderTopLeftRadius: vw(20),
                    borderTopRightRadius: vw(20),
                    height: '80%',
                  },
                  draggableIcon: {
                    backgroundColor: theme.color.white,
                  },
                }}>
                <ExchangeBottomSheet
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                  onPressLeft={() => {
                    refRBSheet.current.close();
                  }}
                />
              </RBSheet>
            </>
          ) : null}
          {labelType == 'Repair' ? (
            <>
              <Repair
                onPressRbSheet={() => {
                  refRBSheet.current.open();
                }}
              />
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  // wrapper: {
                  //   backgroundColor: 'transparent',
                  // },
                  container: {
                    borderTopLeftRadius: vw(20),
                    borderTopRightRadius: vw(20),
                    height: '80%',
                  },
                  draggableIcon: {
                    backgroundColor: theme.color.white,
                  },
                }}>
                <RepairBottomSheet
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                  onPressLeft={() => {
                    refRBSheet.current.close();
                  }}
                />
              </RBSheet>
            </>
          ) : null}
          {labelType == 'Others' ? (
            <>
              <Others
                onPressRbSheet={() => {
                  refRBSheet.current.open();
                }}
              />
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  // wrapper: {
                  //   backgroundColor: 'transparent',
                  // },
                  container: {
                    borderTopLeftRadius: vw(20),
                    borderTopRightRadius: vw(20),
                    height: '80%',
                  },
                  draggableIcon: {
                    backgroundColor: theme.color.white,
                  },
                }}>
                <OthersBottomSheet
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                  onPressLeft={() => {
                    refRBSheet.current.close();
                  }}
                />
              </RBSheet>
            </>
          ) : null}
        </>
      ) : null}
      <View
        style={{
          position: 'relative',
          bottom: vh(80),
          right: vw(15),
        }}>
        <FloatingAction
          buttonSize={60}
          tintColor={theme.color.black}
          color={theme.color.primary}
          actions={actions}
          onPressItem={name => {
            navigation.navigate(name);
          }}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonTouchView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: vw(20),
    marginTop: vh(40),
  },
  buttonTouch: {
    borderWidth: 1,
    borderRadius: vw(10),
    borderColor: theme.color.white,
    backgroundColor: theme.color.white,
    paddingHorizontal: vw(60),
    paddingVertical: vh(18),
  },
  boxWithShadow: {
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: normalize(15),
    fontFamily: theme.font.medium,
  },
  labelTouch: {
    flexDirection: 'row',
    marginHorizontal: vw(15),
    marginTop: vh(40),
  },
  checkimg: {
    width: vw(18),
    height: vw(18),
    color: theme.color.bottomWidth,
    marginRight: vw(10),
  },
  labelText: {
    color: theme.color.black,
    fontSize: normalize(16),
    fontFamily: theme.font.regular,
  },
  filter: {
    marginLeft: vw(7),
    color: theme.color.Black_shadow,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
});

export default ReceiptStockItem;
