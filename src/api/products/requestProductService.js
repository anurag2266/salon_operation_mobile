import http from '../http';

export async function requestProductAPI(data) {
  return http.requestProduct.post('addRequest', data);
}
