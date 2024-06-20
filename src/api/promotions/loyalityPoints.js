import http from '../http';

export async function addLoyaltypointData(data) {
  return http.loyalityPointData.post('addLoyaltypointData', data);
}

export async function upadteLoyaltypointData(data) {
  return http.loyalityPointData.put('upadteLoyaltypointData', data);
}

export async function getAllLoyaltypointData() {
  return http.loyalityPointData.get('getAllLoyaltypointData');
}

export async function getLoyaltypointDataById(id) {
  return http.loyalityPointData.get(`getLoyaltypointDataById?id=${id}`, data);
}


