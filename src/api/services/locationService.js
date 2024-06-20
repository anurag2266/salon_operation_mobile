import http from '../http';

export async function getAllCountries() {
  return http.locationMaster.get('/country/getAllCountry');
}
export async function getAllSates(country) {
  return http.locationMaster.get(`/state/getAllstate?country=${country}`);
}
export async function getAllCities(state) {
  return http.locationMaster.get(`/City/getAllCity?state=${state}`);
}
export async function getAllPincode(city) {
  return http.locationMaster.get(`pincode/getAllpincode?city=${city}`);
}
export async function getAddressByPincode(pincode) {
  return http.locationMaster.get(
    `/pincode/getPincodeDetails?pincode=${pincode}`,
  );
}
