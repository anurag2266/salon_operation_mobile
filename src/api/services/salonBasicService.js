import http from '../http';

export async function addSalonAddressAPI(data) {
  return http.salonBasicService.post('addSalonAddress', data);
}
export async function getBusinessCategoryAPI() {
  return http.salonBasicService.get('getBusinessCategory');
}
export async function updateSalonBusinessCategoryAPI(data) {
  return http.salonBasicService.put('updateSalonBusinessCategory', data);
}
export async function addSalonDetailsAPI(data) {
  return http.salonBasicService.put('addSalonDetails', data);
}
export async function getSalonStepsStatusAPI(salonId) {
  return http.salonBasicService.get(`getSalonStepsStatus?id=${salonId}`);
}
export async function getSalonBussinesHrsAPI(salonId) {
  return http.salonBasicService.get(`getDayStatus?id=${salonId}`);
}
export async function updateBusinessHrsAPI(data) {
  return http.salonBasicService.put('updateDayStatus', data);
}
export async function addSalonImagesAPI(data) {
  return http.salonBasicService.post('addSalonImages', data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
}
export async function updateBusinesSetupAPI(data) {
  return http.salonBasicService.put('updateBusinessSetup', data);
}
export async function updatePaymentMethodsAPI(data) {
  return http.salonBasicService.put('updatePaymentMethod', data);
}
