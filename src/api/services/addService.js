import http from '../http';

export async function addServiceAPI(data) {
  return http.salonService.post('addService', data);
}
export async function getServicesByCategory() {
  return http.categoryService.get('getServiceCategory');
}
