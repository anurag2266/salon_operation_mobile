import http from '../http';

export async function getSalonServicesAPI(data) {
  return http.salonService.get('getService', data);
}
export async function requestSalonService(data) {
  return http.requestService.post('addRequest', data);
}
