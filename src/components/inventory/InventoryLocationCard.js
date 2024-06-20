import { StyleSheet, Text, View, Image, Switch } from 'react-native'
import AppIcon from '../../components/common/AppIcon';
import React, { useState } from 'react'
import { TextInput } from 'react-native-element-textinput';
import { vh, vw, normalize } from '../../utils/dimensions';
import theme from '../../theme/theme';
import LocalImages from '../../utils/LocalImages';
import moment from 'moment';

export default function InventoryLocationCard(props) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={[styles.boxWithShadow, styles.mainStoreView]}>
            <AppIcon
                name={'right'}
                type={'AntDesign'}
                size={15}
                color={theme.color.black}
                style={{
                    alignSelf: 'flex-end',
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: vh(15),
                }}>
                <Image source={props?.index === 0 ? require('../../assets/store.png') : LocalImages.inventory} />
                <View style={{ marginHorizontal: vw(20) }}>
                    <Text
                        style={{
                            color: theme.color.black,
                            fontSize: normalize(22),
                            fontFamily: theme.font.semiBold,
                        }}>
                        {props?.item?.name}
                    </Text>
                    <Text
                        style={{
                            width: vw(225),
                            color: theme.color.black,
                            fontSize: normalize(12),
                            fontFamily: theme.font.regular,
                        }}>
                        {props?.item?.description}
                    </Text>
                </View>
                <View>
                    <Switch
                        trackColor={{
                            false: theme.color.switchOff,
                            true: theme.color.switchOn,
                        }}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    {isEnabled ? (
                        <Text
                            style={{
                                color: theme.color.black,
                                fontSize: normalize(13),
                                textAlign: 'center',
                                fontFamily: theme.font.regular,
                            }}>
                            Active
                        </Text>
                    ) : (
                        <Text
                            style={{
                                color: theme.color.black,
                                fontSize: normalize(13),
                                textAlign: 'center',
                                fontFamily: theme.font.regular,
                            }}>
                            Inactive
                        </Text>
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(20) }}>
                <Text>Created On : {moment(props?.item?.createdAt).format('DD MMM YYYY')}</Text>
                <Text>Time : {moment(props?.item?.createdAt).format('hh:mm A')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boxWithShadow: {
        shadowColor: '#D2D2D2',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 3.23,
        shadowRadius: 1.62,
        elevation: 6,
    },
    mainStoreView: {
        // borderWidth: 1,
        borderRadius: vw(10),
        marginHorizontal: vw(15),
        paddingHorizontal: vw(10),
        paddingVertical: vh(10),
        // borderColor: theme.color.white,
        backgroundColor: theme.color.white,
        marginTop: vh(40),
    },
})