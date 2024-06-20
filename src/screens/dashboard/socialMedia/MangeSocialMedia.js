import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, } from 'react-native';
import React from 'react';
import theme from '../../../theme/theme';
import Container from '../../../components/common/Container';
import LocalImages from '../../../utils/LocalImages';
import { normalize, vh, vw } from '../../../utils/dimensions';
import AppIcon from '../../../components/common/AppIcon';
import { useState } from 'react';
import { TextInput } from 'react-native-element-textinput';
import CustomButton from '../../../components/common/CustomButton';

const MangeSocialMedia = ({ navigation }) => {
    const [instagram, setInstagram] = useState('')
    const [facebook, setFacebook] = useState('')
    const [twitter, setTwitter] = useState('')
    const [linkedin, setLinkedin] = useState('')

    return (
        <View style={{flex:1,backgroundColor:theme.color.white}}>
            <Container
                header={false}>
                <ImageBackground
                    source={LocalImages.socialmedia}
                    resizeMode="cover"
                    style={styles.profileSalon}>
                    <AppIcon
                        name={'arrowleft'}
                        type={'AntDesign'}
                        size={25}
                        color={theme.color.white}
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={{
                            margin: vw(21)
                        }}
                    />
                    <View style={styles.rowView}>
                        <TouchableOpacity
                            style={{
                                ...styles.share,
                                borderRadius: vw(90),
                                overflow: 'hidden',
                                paddingHorizontal: vw(15),
                            }}>

                        </TouchableOpacity>

                    </View>
                    <Text style={{
                        marginHorizontal: vw(15),
                        marginTop: vh(80),
                        color: theme.color.white,
                        fontFamily: theme.font.medium,
                        fontSize: normalize(16),
                    }}> Add Social Media Links</Text>

                    <Text style={styles.centralIndia}>Manage your social media</Text>
                </ImageBackground>

                <View>
                    <TextInput
                        // value={userDetails.firstName}
                        style={styles.input}

                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        label="Your Instagram link"
                        placeholder="Your Instagram link"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.black}
                        onChangeText={() => {
                            setInstagram()
                        }}
                        renderRightIcon={() => (
                            <TouchableOpacity>
                                <AppIcon
                                    name={'instagram'}
                                    type={'AntDesign'}
                                    size={20}
                                    color={theme.color.black}

                                    style={{ alignSelf: 'flex-end', margin: vw(21) }}
                                />
                            </TouchableOpacity>
                        )

                        }
                    />
                    <TextInput
                        // value={userDetails.firstName}
                        style={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        label="Your Facebook Link"
                        placeholder="Your Facebook Link"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.borderGrey}
                        onChangeText={() => {
                            setFacebook()
                        }}
                        renderRightIcon={() => (
                            <TouchableOpacity>
                                <AppIcon
                                    name={'facebook'}
                                    type={'FontAwesome5'}
                                    size={18}
                                    color={theme.color.black}

                                    style={{ alignSelf: 'flex-end', margin: vw(21) }}
                                />
                            </TouchableOpacity>
                        )

                        }
                    />
                    <TextInput
                        // value={userDetails.firstName}
                        style={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        placeholderStyle={styles.placeholderStyle}
                        label="Your Twitter Link"
                        placeholder="Your Twitter Link"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.borderGrey}
                        onChangeText={() => {
                            setTwitter()
                        }}
                        renderRightIcon={() => (
                            <TouchableOpacity>
                                <AppIcon
                                    name={'twitter'}
                                    type={'AntDesign'}
                                    size={20}
                                    color={theme.color.black}

                                    style={{ alignSelf: 'flex-end', margin: vw(21) }}
                                />
                            </TouchableOpacity>
                        )

                        }
                    />
                    <TextInput
                        // value={userDetails.firstName}
                        style={styles.input}
                        inputStyle={styles.inputStyle}
                        labelStyle={styles.labelStyle}
                        textErrorStyle={styles.textErrorStyle}
                        placeholderStyle={styles.placeholderStyle}
                        label="Your Linkedin Link"
                        placeholder="Your Linkedin Link"
                        placeholderTextColor={theme.color.TextGrey}
                        focusColor={theme.color.borderGrey}
                        onChangeText={() => {
                            setLinkedin()
                        }}
                        renderRightIcon={() => (
                            <TouchableOpacity>
                                <AppIcon
                                    name={'linkedin'}
                                    type={'FontAwesome5'}
                                    size={20}
                                    color={theme.color.black}

                                    style={{ alignSelf: 'flex-end', margin: vw(21) }}
                                />
                            </TouchableOpacity>
                        )

                        }
                    />
                </View>
            </Container>
            <CustomButton
            label={'Submit Your Links'}
            onPress={()=>{
                navigation.navigate('')
            }}
            extraStyle={{marginBottom:vh(30),marginTop:vh(30)}}
            />
        </View>

    )
}

export default MangeSocialMedia

const styles = StyleSheet.create({
    centralIndia: {
        marginHorizontal: vw(15),
        color: theme.color.white,
        alignSelf: "auto",
        fontFamily: theme.font.bold,
        fontSize: normalize(24),
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: vw(19),
        alignItems: 'center',
    },
    profileSalon: {
        width: vw(428),
        height: vh(271),
    },
    mainView: {
        width: '100%',
        borderTopLeftRadius: vw(20),
        borderTopRightRadius: vw(20),
        flex: 1,
        backgroundColor: theme.color.white,
    },
    input: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: theme.color.borderGrey,
        paddingHorizontal: vw(20),
        marginTop: vh(30),
        marginHorizontal: vw(15),
    },
    inputStyle: { fontSize: 16 },
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
        fontSize: 16,
        fontFamily: theme.font.regular,
        color: theme.color.black,
    },
    textErrorStyle: {
        fontSize: 16,
        fontFamily: theme.font.regular,
        color: theme.color.black,
    },
})