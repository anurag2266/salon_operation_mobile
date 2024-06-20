import React, {useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {LogBox, Platform} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StackNavigation from './src/navigation/StackNavigation';
import theme from './src/theme/theme';
import {persistedStore, store} from './src/redux/store';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
          <FlashMessage
            style={{
              height: Platform.OS === 'ios' ? 100 : 60,
              justifyContent: 'center',
              alignItems: 'flex-start',
              zIndex: 9999999,
              position: 'relative',
            }}
            titleStyle={{
              fontFamily: theme.font.regular,
              position: 'absolute',
              bottom: 0,
            }}
            position="Top"
          />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
