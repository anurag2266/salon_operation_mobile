import http from '../http';

export async function addHappyHoursData(data) {
  return http.happyHours.post('addHappyhourData', data);
}

export async function updateHappyHoursData(data) {
  return http.happyHours.put('upadteCouponData', data);
}

export async function getAllHappyHoursData() {
  return http.happyHours.get('getAllHappyhourData');
}

export async function getHappyHoursDataById(id) {
  return http.happyHours.get(`getCouponDataById?id=${id}`);
}





