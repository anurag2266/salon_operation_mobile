import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import { normalize, vh, vw } from '../../utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../theme/theme';
import AppIcon from '../common/AppIcon';

const SubscriptionCard = () => {
    return (
        <View style={styles.container}>

            <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
                style={styles.linearGradient}>
                <View style={{ maxWidth: '85%', padding: vw(10) }}>
                    <Text style={styles.title}>Gold Plan</Text>
                    <View
                        style={{
                            height: vh(20),
                            width: vw(90),
                            backgroundColor: theme.color.white,
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: vh(10),
                            borderRadius: vw(4),
                        }}>
                        <Text
                            style={{
                                fontSize: normalize(11),
                                fontFamily: theme.font.regular,
                                color: '#F0405A',
                            }}>
                            6 Members
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontFamily: theme.font.regular,
                            fontSize: normalize(11),
                            fontWeight: '400',
                            color: theme.color.white,
                        }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                    </Text>
                    <Text
                        style={{
                            color: theme.color.white,
                            fontSize: normalize(11),
                            fontFamily: theme.font.regular,
                            fontWeight: '400',
                            marginTop: vh(5),
                        }}>
                        Valid Till : 31 July 2022
                    </Text>
                    <Text
                        style={{
                            color: theme.color.white,
                            fontSize: normalize(11),
                            fontFamily: theme.font.regular,
                            fontWeight: '400',
                            marginTop: vh(5),
                        }}>
                        Phone No : +91-9876543219
                    </Text>
                </View>

                <Text
                    style={{
                        position: 'absolute',
                        top: vh(9),
                        right: vw(12),
                        color: theme.color.white,
                        fontFamily: theme.font.medium,
                        fontSize: normalize(12),
                    }}>
                    Expiry : 31 June
                </Text>
                <AppIcon
                    name={'right'}
                    type={'AntDesign'}
                    color={theme.color.white}
                    size={17}
                    onPress={() => {
                        navigation.navigate('');
                    }}
                    style={{ justifyContent: 'flex-end', marginTop: vh(60) }}
                />
                <Text
                    style={{
                        position: 'absolute',
                        bottom: vh(9),
                        right: vw(12),
                        fontFamily: theme.font.bold,
                        fontSize: normalize(22),
                        color: theme.color.white,
                    }}>
                    $10,000
                </Text>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: vh(186),

        padding: vw(14),
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        position: 'relative',
    },
    title: {
        fontFamily: theme.font.regular,
        fontSize: normalize(35),
        fontWeight: '700',
        color: theme.color.white,
    },
    container: {
        marginTop: vh(25),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
})
export default SubscriptionCard