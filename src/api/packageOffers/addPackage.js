import http from '../http';

export async function addpackageData(data) {
  return http.packageData.post('addPackageData', data);
}
