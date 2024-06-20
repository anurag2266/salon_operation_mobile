import http from '../http';

export async function getSalonProduct(salonId) {
  return http.productMap.get(`getAllProductsBySalonId?id=${salonId}`);
}
export async function salonSelectProductsAPI(data) {
  return http.productMap.post('salonSetupAddProducts', data);
}
export async function salonProductUpdateGeneralSettingAPI(data) {
  return http.productMap.put('updateGeneralSettings', data);
}
export async function updateProductAdditionalSettingAPI(data) {
  return http.productMap.put('updateSimilarServiceAndProduct', data);
}
