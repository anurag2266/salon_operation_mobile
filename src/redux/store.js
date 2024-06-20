import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware} from 'redux';

import {MMKV} from 'react-native-mmkv';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const storage = new MMKV();

export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['flightReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  thunk,
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares),
);
export const persistedStore = persistStore(store);
