import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/common/Container';
import {normalize, vh, vw} from '../../../utils/dimensions';
import theme from '../../../theme/theme';
import AppIcon from '../../../components/common/AppIcon';

const TotalEarning = ({navigation}) => {
  const [option, setOption] = useState('Week');
  const [earningOption, setearningOption] = useState('Service');
  const DATA = [
    {
      id: 1,
      date: '30/11/22',
      client: 'Vinit',
      service: 'Hair Cut',
      amount: '800',
    },
    {
      id: 2,
      date: '30/11/22',
      client: 'Gagan',
      service: 'Hair Cut',
      amount: '800',
    },
  ];

  const earningDATA = [
    {
      id: 1,
      name: 'Service',
    },
    {
      id: 2,
      name: 'Product',
    },
    {
      id: 3,
      name: 'Gift Card',
    },
    {
      id: 4,
      name: 'Memberships',
    },
    {
      id: 5,
      name: 'Package',
    },
    {
      id: 6,
      name: 'Discount Card',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setearningOption(item.name);
        }}
        style={[
          styles.dataTouch,
          {
            backgroundColor:
              earningOption == item.name
                ? theme.color.primary
                : theme.color.white,
          },
        ]}>
        <Text
          style={[
            styles.dataEarningText,
            {
              color:
                earningOption == item.name
                  ? theme.color.white
                  : theme.color.primary,
            },
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container
      title={'Manage Analytics'}
      onPressLeftIcon={() => {
        navigation.goBack();
      }}>
      <View style={styles.weekView}>
        <TouchableOpacity
          onPress={() => {
            setOption('Week');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Week' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {color: option == 'Week' ? theme.color.white : theme.color.black},
            ]}>
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Month');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Month' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {
                color:
                  option == 'Month' ? theme.color.white : theme.color.black,
              },
            ]}>
            Month
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Year');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Year' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {color: option == 'Year' ? theme.color.white : theme.color.black},
            ]}>
            Year
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOption('Date Range');
          }}
          style={[
            styles.weekTouch,
            {
              backgroundColor:
                option == 'Date Range' ? theme.color.primary : '#D9D9D9',
            },
          ]}>
          <Text
            style={[
              styles.weekText,
              {
                color:
                  option == 'Date Range'
                    ? theme.color.white
                    : theme.color.black,
              },
            ]}>
            Date Range
          </Text>
        </TouchableOpacity>
      </View>
      {option == 'Week' ? (
        <>
          <View style={styles.closedBillingView}>
            <Text style={styles.billingAmtText}>Total Earning</Text>
            <Text style={[styles.billingAmtText, {color: theme.color.primary}]}>
              Rs. 80000
            </Text>
          </View>
          <View style={styles.serviceView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {earningDATA.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setearningOption(item.name);
                    }}
                    style={[
                      styles.dataTouch,
                      {
                        backgroundColor:
                          earningOption == item.name
                            ? theme.color.primary
                            : theme.color.white,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.dataEarningText,
                        {
                          color:
                            earningOption == item.name
                              ? theme.color.white
                              : theme.color.primary,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {earningOption == 'Service' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Service</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Product' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Product</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Gift Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Gift Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Memberships' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Memberships</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Package' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Package</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Discount Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Discount Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
        </>
      ) : null}
      {option == 'Month' ? (
        <>
          <View style={styles.closedBillingView}>
            <Text style={styles.billingAmtText}>Total Earning</Text>
            <Text style={[styles.billingAmtText, {color: theme.color.primary}]}>
              Rs. 80000
            </Text>
          </View>
          <View style={styles.serviceView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {earningDATA.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setearningOption(item.name);
                    }}
                    style={[
                      styles.dataTouch,
                      {
                        backgroundColor:
                          earningOption == item.name
                            ? theme.color.primary
                            : theme.color.white,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.dataEarningText,
                        {
                          color:
                            earningOption == item.name
                              ? theme.color.white
                              : theme.color.primary,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {earningOption == 'Service' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Service</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Product' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Product</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Gift Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Gift Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Memberships' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Memberships</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Package' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Package</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Discount Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Discount Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
        </>
      ) : null}
      {option == 'Year' ? (
        <>
          <View style={styles.closedBillingView}>
            <Text style={styles.billingAmtText}>Total Earning</Text>
            <Text style={[styles.billingAmtText, {color: theme.color.primary}]}>
              Rs. 80000
            </Text>
          </View>
          <View style={styles.serviceView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {earningDATA.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setearningOption(item.name);
                    }}
                    style={[
                      styles.dataTouch,
                      {
                        backgroundColor:
                          earningOption == item.name
                            ? theme.color.primary
                            : theme.color.white,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.dataEarningText,
                        {
                          color:
                            earningOption == item.name
                              ? theme.color.white
                              : theme.color.primary,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {earningOption == 'Service' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Service</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Product' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Product</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Gift Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Gift Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Memberships' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Memberships</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Package' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Package</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Discount Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Discount Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
        </>
      ) : null}
      {option == 'Date Range' ? (
        <>
          <View style={styles.closedBillingView}>
            <Text style={styles.billingAmtText}>Total Earning</Text>
            <Text style={[styles.billingAmtText, {color: theme.color.primary}]}>
              Rs. 80000
            </Text>
          </View>
          <View style={styles.serviceView}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {earningDATA.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setearningOption(item.name);
                    }}
                    style={[
                      styles.dataTouch,
                      {
                        backgroundColor:
                          earningOption == item.name
                            ? theme.color.primary
                            : theme.color.white,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.dataEarningText,
                        {
                          color:
                            earningOption == item.name
                              ? theme.color.white
                              : theme.color.primary,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          {earningOption == 'Service' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Service</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Product' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Product</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Gift Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Gift Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Memberships' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Memberships</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Package' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Package</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
          {earningOption == 'Discount Card' ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: vh(20),
                  marginHorizontal: vw(20),
                }}>
                <Text style={styles.dateText}>Date</Text>
                <Text style={styles.dateText}>Client</Text>
                <Text style={styles.dateText}>Discount Card</Text>
                <Text style={[styles.dateText, {marginRight: vw(30)}]}>
                  Amt(Rs.)
                </Text>
              </View>
              {DATA.map(item => {
                return (
                  <View style={styles.dataView}>
                    <Text style={styles.dataText}>{item.date}</Text>
                    <Text style={styles.dataText}>{item.client}</Text>
                    <Text style={styles.dataText}>{item.service}</Text>
                    <Text style={styles.dataText}>{item.amount}</Text>
                    <AppIcon
                      name={'right'}
                      type={'AntDesign'}
                      size={15}
                      color={theme.color.dropdownColor}
                    />
                  </View>
                );
              })}
            </>
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(20),
    paddingHorizontal: vw(6),
    paddingVertical: vh(5),
    backgroundColor: '#D9D9D9',
    borderRadius: vw(5),
    marginTop: vh(55),
  },
  weekText: {
    fontSize: normalize(14),
    fontFamily: theme.font.medium,
  },
  weekTouch: {
    paddingLeft: vw(20),
    paddingRight: vw(7),
    borderRadius: vh(5),
    paddingVertical: vh(4),
    alignItems: 'center',
  },
  closedBillingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(50),
    marginHorizontal: vw(20),
  },
  billingAmtText: {
    color: theme.color.black,
    fontFamily: theme.font.bold,
    fontSize: normalize(18),
  },
  dateText: {
    color: theme.color.black,
    fontFamily: theme.font.semiBold,
    fontSize: normalize(14),
  },
  dataView: {
    shadowColor: '#D2D2D280',
    shadowOffset: {
      width: 0,
      //height: 2,
    },
    shadowOpacity: 1.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: theme.color.white,
    borderColor: theme.color.white,
    marginTop: vh(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(15),
    paddingVertical: vh(14),
    paddingHorizontal: vw(10),
  },
  dataText: {
    color: theme.color.black,
    fontFamily: theme.font.regular,
    fontSize: normalize(14),
  },
  dataTouch: {
    borderWidth: 1,
    marginHorizontal: vw(10),
    borderRadius: vw(10),
    paddingHorizontal: vw(25),
    paddingVertical: vh(8),
    borderColor: theme.color.primary,
  },
  dataEarningText: {
    fontFamily: theme.font.bold,
    fontSize: normalize(16),
  },
  serviceView: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: vh(18),
    marginTop: vh(20),
    borderColor: '#D2D2D2',
    marginHorizontal: vw(20),
  },
});

export default TotalEarning;
