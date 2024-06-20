import http from '../http';

export async function addCashbackData(data) {
  return http.cashbackData.post('addCashbackData', data);
}

export async function updateCashbackData(data) {
  return http.cashbackData.put('upadteCouponData', data);
}

export async function getAllCashbacksData() {
  return http.cashbackData.get('getAllCashbackData');
}

export async function getCashbackDataById(id) {
  return http.cashbackData.get(`getCouponDataById?id=${id}`);
}


