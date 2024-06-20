import http from '../http';

export async function addCouponData(data) {
  return http.couponData.post('addCouponData', data);
}

export async function updateCouponData(data) {
  return http.couponData.put('upadteCouponData', data);
}

export async function getAllCouponData() {
  return http.couponData.get('getAllCouponData');
}

export async function getCouponDataById(id) {
  return http.couponData.get(`getCouponDataById?id=${id}`);
}


