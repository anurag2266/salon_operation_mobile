import {PERMISSIONS, request} from 'react-native-permissions';

export const useCameraPermission = async () => {
  try {
    const granted = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        return false;
      });

    if (granted === 'granted') {
      console.log('You can use Camera');
      return true;
    } else {
      console.log('You cannot use Camera');
      return false;
    }
  } catch (error) {
    alert(error);
  }
};
export const useMediaPermission = async () => {
  try {
    const granted = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    )
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        return false;
      });

    if (granted === 'granted') {
      console.log('You can use Camera');
      return true;
    } else {
      console.log('You cannot use Camera');
      return false;
    }
  } catch (error) {
    alert(error);
  }
};
export const useLocationPermission = async () => {
  try {
    const granted = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        return false;
      });

    if (granted === 'granted') {
      console.log('You can use Location');
      return true;
    } else {
      console.log('You cannot use Location');
      return false;
    }
  } catch (error) {
    alert(error);
  }
};
