import { View, Text, StyleSheet,TouchableOpacity, FlatList ,Image} from 'react-native'
import React,{useState,useRef} from 'react'
import Container from '../../../components/common/Container'
import theme from '../../../theme/theme'
import LocalImages from '../../../utils/LocalImages'
import RBSheet from 'react-native-raw-bottom-sheet'

import { vh,vw,normalize } from '../../../utils/dimensions'
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
  } from 'accordion-collapse-react-native';
import AppIcon from '../../../components/common/AppIcon'
import { TextInput } from 'react-native-element-textinput'
import CustomButton from '../../../components/common/CustomButton'
import {
    addSalonServices,
    getSalonServicesBySalonID,
  } from '../../../api/services/salonMap';
import {useFocusEffect} from '@react-navigation/native';
import {getCategoryWithServicesAPI} from '../../../api/services/getCategories';

const ApplicableOnService = ({onPressApply, products, setProducts}) => {
  const refRBSheet = useRef();
    const [search, setSearch] = useState('')
    const [isExpanded, setIsExpanded] = useState([0]);
    const [allData, setAllData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([
      {name: 'All', services: []},
    ]);

    console.log("Here is Selected Id",products)
 
    const handleGetCategories = async () => {
        const {data, status, message} = await getCategoryWithServicesAPI();
    
        if (status) {
          setAllData([{name: 'All', services: []}, ...data]);
          setCategoriesData([{name: 'All', services: []}, ...data]);
          handleGetSalonServiceData();
        } else {
          showMessage({message: message, type: 'danger'});
        }
      };
      const handleGetSalonServiceData = async () => {
        const {status, data, message} = await getSalonServicesBySalonID(
          salonDetails._id,
        );
    
        if (status) {
          const d = data;
          const data1 = allData.map(item => item.services);
          const newdata = data1.flat(1);
    
          const finalData = newdata.filter(elem =>
            d.find(({serviceId}) => elem._id === serviceId._id),
          );
          // alert('hi');
          setProducts(finalData);
          console.log('its all final data to show here', finalData);
        } else {
          showMessage({message: message, type: 'danger'});
        }
      };

      const renderItemService = ({item, index}) => {
        return (
          <View>
            <Collapse
              isExpanded={isExpanded.includes(index)}
              expandedIndex={0}
              onToggle={() =>
                isExpanded.includes(index)
                  ? setIsExpanded(isExpanded.filter(i => i != index))
                  : setIsExpanded([...isExpanded, index])
              }>
              <CollapseHeader>
                <View
                  style={{
                    marginHorizontal: vw(15),
                    marginVertical: vh(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      ...styles.itemTitleTxt,
                      textTransform: 'capitalize',
    
                      fontWeight: '700',
                    }}>
                    {item.name} ({item.services.length})
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 
                    <AppIcon
                      style={{marginLeft: vw(5)}}
                      color={theme.color.grey}
                      type="Ionicons"
                      name={
                        isExpanded.includes(index) ? 'chevron-up' : 'chevron-down'
                      }
                    />
                  </View>
                </View>
              </CollapseHeader>
              <CollapseBody>
                {item.services.map(item => (
                  <View style={{marginBottom: vh(16)}}>
                    <TouchableOpacity
                      style={styles.row}
                      onPress={() => {
                     
                        if (products.includes(item._id)) {
                          let temp = products.filter(element => element != item._id);
                          console.log("Hello there", temp)
                          setProducts(temp);
                        } else {
                          setProducts(oldArr => [...oldArr, item._id]);
                        }
                      }}>
                      {products.includes(item._id) ? (
                        <Image
                          style={styles.TickImg}
                          source={LocalImages.TickService}
                        />
                      ) : (
                        <Image
                          style={styles.TickImg}
                          source={LocalImages.UntickService}
                        />
                      )}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '90%',
                        }}>
                        <Text style={styles.itemTitleTxt}>{item.serviceName}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={[styles.row, {marginHorizontal: vw(51)}]}>
                      <Text style={styles.itemTxt}>{item.duration}</Text>
                      <View
                        style={{
                          borderLeftWidth: 1,
                          marginHorizontal: vw(20),
                        }}></View>
                      <Text style={styles.itemTxt}>Rs. {item.price}</Text>
                    </View>
                  </View>
                ))}
              </CollapseBody>
            </Collapse>
          </View>
        );
      };
    

      useFocusEffect(
        React.useCallback(() => {
          handleGetCategories();
          
        }, []),
      );

      const renderItem = ({item}) => {
        return (
          <TouchableOpacity
            style={{padding: 3, marginTop: vh(40), alignItems: 'center'}}
            onPress={() => {
              if (item.name == 'All') {
                setCategoriesData(allData);
              } else {
                setCategoriesData([item]);
              }
            }}>
            <View
              style={[
                styles.labelImage,
                styles.boxWithShadow,
                {
                  // width: vw(70),
                  // height: vw(70),
                  backgroundColor:
                    item.name == categoriesData[0].name
                      ? theme.color.primary
                      : '#E6F5F5',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              {item.name == 'All' ? (
                <AppIcon
                  color={
                    item.name == categoriesData[0].name
                      ? theme.color.white
                      : theme.color.primary
                  }
                  type="MaterialIcons"
                  name="dashboard"
                  size={30}
                />
              ) : (
                <Image
                  source={{uri: item.imageUrl}}
                  style={{width: vw(30), height: vw(30), borderRadius: vw(15)}}
                />
              )}
            </View>
            <Text style={styles.labelTxt}>{item.name}</Text>
          </TouchableOpacity>
        );
      };

  return (
    <Container
            header={false}
            >
            <TextInput
              value={search}
              style={[styles.input, {paddingVertical: vh(18)}]}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              placeholderStyle={styles.placeholderStyle}
              textErrorStyle={styles.textErrorStyle}
              label="Search for a Service"
              placeholder="Search for a Service"
              placeholderTextColor={theme.color.TextGrey}
              focusColor={theme.color.borderGrey}
              onChangeText={text => {
                setSearch(text);
              }}
              renderLeftIcon={() => (
                <AppIcon
                  name={'search1'}
                  type={'AntDesign'}
                  size={20}
                  color={theme.color.bottomWidth}
                  style={{marginRight: vw(15)}}
                />
              )}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginHorizontal: vw(15),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
                style={{
                  flexDirection: 'row',
                  marginHorizontal: vw(7),
                  marginTop: vh(9),
                }}>
                <AppIcon
                  name={'filter'}
                  type={'AntDesign'}
                  size={15}
                  color={theme.color.LightBlue}
                />
                <Text style={styles.filter}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginHorizontal: vw(7),
                  marginTop: vh(9),
                }}>
                <AppIcon
                  name={'swap-vertical'}
                  type={'Ionicons'}
                  size={15}
                  color={theme.color.LightBlue}
                />
                <Text style={styles.filter}>Sort By</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.selectText}> Category</Text>
            <FlatList
              data={allData}
              renderItem={renderItem}
              horizontal={true}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: 'center',
                marginTop: vh(15),
              }}
              style={{maxHeight: vh(140)}}
            />
            <View style={styles.bottomWidth}></View>
            <Text style={[styles.selectText]}>Select Services</Text>
            <AccordionList
          list={categoriesData.filter(i => i.name != 'All')}
          renderItem={renderItemService}
          // keyExtractor={item => `${item._id}`}
          // extraData={select}
        />
            <CustomButton
              label={'APPLY'}
              onPress={onPressApply}
              extraStyle={{marginTop: vh(40), marginBottom: vh(30)}}
            />
          </Container>
  )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.color.borderGrey,
        paddingHorizontal: vw(20),
        marginTop: vh(25),
        marginHorizontal: vw(15),
        height: vh(55),
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
      filter: {
        marginLeft: vw(7),
        color: theme.color.Black_shadow,
        fontFamily: theme.font.regular,
        fontSize: normalize(14),
      },
      selectText: {
        marginHorizontal: vw(15),
        color: theme.color.Black_shadow,
        fontFamily: theme.font.medium,
        fontSize: normalize(16),
        marginBottom: vh(10),
      },
      bottomWidth: {
        borderBottomWidth: 1,
        marginHorizontal: vw(21),
        marginVertical: vh(23),
        borderColor: theme.color.bottomWidth,
      },
      boxWithShadow: {
        shadowColor: theme.color.shadow,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 0,
      },
      searchIcon: {
        width: vw(15),
        height: vh(16),
        marginVertical: vh(17),
      },
      labelImage: {
        borderWidth: 1,
        padding: vw(20),
        marginHorizontal: vw(5),
        marginBottom: vh(7),
        borderRadius: vw(60),
        borderColor: theme.color.white,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.color.white,
      },
      labelTxt: {
        color: theme.color.black,
        fontFamily: theme.font.bold,
        textAlign: 'center',
        marginBottom: 25,
      },
      bottomWidth: {
        borderBottomWidth: 1,
        marginHorizontal: vw(21),
        marginBottom: vh(23),
        borderColor: theme.color.bottomWidth,
      },
      selectText: {
        marginHorizontal: vw(15),
        color: theme.color.Black_shadow,
        fontFamily: theme.font.medium,
        fontSize: normalize(16),
        marginBottom: vh(10),
      },
      TickImg: {
        width: vw(22),
        height: vw(22),
        marginRight: vw(12),
        marginVertical: vh(4),
      },
      row: {
        flexDirection: 'row',
        marginHorizontal: vw(15),
        marginBottom: vh(7),
      },
      itemTitleTxt: {
        color: theme.color.black,
        fontFamily: theme.font.semiBold,
        fontSize: normalize(16),
      },
      itemTxt: {
        color: theme.color.dropdownColor,
        fontFamily: theme.font.medium,
        fontSize: normalize(12),
      },
      AddServices: {
        position: 'absolute',
        alignSelf: 'flex-end',
        width: vw(60),
        height: vh(60),
        marginHorizontal: vw(15),
      },
      input: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.color.borderGrey,
        paddingHorizontal: vw(20),
        marginTop: vh(10),
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
      filter: {
        marginLeft: vw(7),
        color: theme.color.Black_shadow,
        fontFamily: theme.font.regular,
        fontSize: normalize(14),
      },
})

export default ApplicableOnService