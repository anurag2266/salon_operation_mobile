import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import {useLocationPermission} from './usePermissions';
export default useCurrentLocation = () => {
  const [location, setLocation] = useState(false);
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getLocation = async () => {
    const result = await useLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        position => {
          // console.log('position', position);
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocation(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return position;
};
