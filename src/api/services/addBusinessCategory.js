import http from '../http';

export async function addbusinesscatAPI(data) {
  return http.AddBusinessCategory.post('addBusinessCategory', data);
}
