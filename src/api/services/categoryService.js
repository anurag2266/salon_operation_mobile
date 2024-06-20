import http from '../http';

export async function getServiceAPI(data) {
  return http.salonService.get('getService?', data);
}
