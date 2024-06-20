import http from '../http';

export async function getDiscountCardbySalonId(salonId) {
  return http.discountCardData.get(`getAllDiscountcardData?salonId=${salonId}`);
}

export async function getAllDiscountCards(){
  return http.discountCardData.get('getAllDiscountcardData')
}
