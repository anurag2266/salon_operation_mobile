import http from '../http';

export async function addspecialDiscountData(data) {
  return http.specialDiscount.post('addSpecialdiscountData', data);
}

export async function updatespecialDiscountData(data) {
  return http.specialDiscount.put('upadteSpecialdiscountData', data);
}

export async function getAllspecialDiscountData() {
  return http.specialDiscount.get('getAllSpecialdiscountData');
}

export async function getspecialDiscountDataById(id) {
  return http.specialDiscount.get(`getSpecialdiscountDataById?id=${id}`);
}





