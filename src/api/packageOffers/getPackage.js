import http from '../http';

export async function getAllPackage(data) {
  return http.packageData.get('getAllPackageData', data);
}
