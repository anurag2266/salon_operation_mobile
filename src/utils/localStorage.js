import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

// let tokenName = '@token';

export function setToken(token) {
  console.log('settingtoken', token);
  storage.set('token', JSON.stringify(token));
}

export function removeToken() {
  storage.delete('token');
}
export function clearStorage() {
  storage.clearAll();
}

export function getToken() {
  const token = storage.getString('token');
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
}
