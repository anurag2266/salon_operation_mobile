import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React from 'react';
import theme from '../../theme/theme';
import AppIcon from './AppIcon';
import {normalize, vh, vw} from '../../utils/dimensions';
import CustomButton from './CustomButton';
import Loader from '../loader/Loader';
import {useSelector} from 'react-redux';

const Container = ({
  children,
  navigation,
  header = true,
  rightButtonTitle,
  onPressRightButton,
  title,
  description,
  scroll = true,
  leftIconName = 'arrow-left',
  leftIconType = 'MaterialCommunityIcons',
  onPressLeftIcon,
  disableRightButton = false,
  progressBar,
  bottomButtonTitle,
  onPressBottomButton,
  disableBottomButton,
  loading = false,
  leftIconColor,
}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {progressBar ? (
          <View style={{marginHorizontal: vw(40), paddingVertical: vh(15)}}>
            {progressBar}
          </View>
        ) : null}
        {header ? (
          <View style={styles.mainHeader}>
            {leftIconName && leftIconType ? (
              <AppIcon
                onPress={
                  onPressLeftIcon ? onPressLeftIcon : () => navigation.goBack()
                }
                name={leftIconName}
                type={leftIconType}
                color={leftIconColor}
              />
            ) : (
              <View />
            )}

            <View>
              <Text
                style={{
                  ...styles.heading,
                  maxWidth: rightButtonTitle ? vw(320) : 'auto',
                }}>
                {title}
              </Text>
              {description ? (
                <Text
                  style={{
                    ...styles.description,
                    maxWidth: rightButtonTitle ? vw(320) : '99.5%',
                  }}>
                  {description}
                </Text>
              ) : null}
            </View>
            {rightButtonTitle ? (
              <TouchableOpacity
                disabled={disableRightButton}
                onPress={onPressRightButton}>
                <Text
                  style={{
                    fontFamily: theme.font.medium,
                    color: disableRightButton
                      ? theme.color.TextGrey
                      : theme.color.LightBlue,
                    fontSize: normalize(16),
                  }}>
                  {rightButtonTitle}
                </Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        ) : null}
        {scroll ? (
          <KeyboardAvoidingView
            style={styles.keyboardavoidingview}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.scrollview}>{children}</ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <KeyboardAvoidingView
            style={styles.keyboardavoidingview}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
          </KeyboardAvoidingView>
        )}
        {bottomButtonTitle ? (
          <CustomButton
            extraStyle={{postion: 'absolute', bottom: vh(10), marginTop: 0}}
            label={bottomButtonTitle}
            onPress={onPressBottomButton}
            disabled={disableBottomButton}
          />
        ) : null}
      </SafeAreaView>
      <Loader visible={loading} />
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: theme.color.white,
  },
  scrollview: {flex: 1, paddingBottom: 50},
  keyboardavoidingview: {flex: 1},
  mainHeader: {
    flexDirection: 'row',
    marginHorizontal: vw(21),
    paddingVertical: vh(15),
    justifyContent: 'space-between',
    // borderBottomColor: theme.color.grey,
    // borderBottomWidth: 0.5,
  },
  heading: {
    color: theme.color.black,
    fontSize: normalize(23),
    textAlign: 'center',
    fontFamily: theme.font.bold,
  },
  description: {
    color: theme.color.darkGrey,
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: vh(8),
    marginHorizontal: vw(15),
    fontSize: normalize(13),
    fontFamily: theme.font.semiBold,
  },
});
