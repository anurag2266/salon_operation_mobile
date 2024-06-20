import http from '../http';

export async function getAllMasterBrandAPI() {
  return http.brandMaster.get('getbrand');
}
