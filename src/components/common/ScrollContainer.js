import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';

const ScrollContainer = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardavoidingview}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView style={styles.scrollview}>{children}</ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollview: {flex: 1, paddingBottom: 50},
  keyboardavoidingview: {flex: 1},
});
