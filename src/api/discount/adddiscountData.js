import http from '../http';

export async function addDiscountCardbySalonId(data) {
  return http.discountCardData.post(`addDiscountcardData`,data);
}
