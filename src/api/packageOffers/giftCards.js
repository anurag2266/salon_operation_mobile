
import http from '../http';

export async function addGiftCard(data) {
  return http.giftCard.post('addGiftcardData', data);
}

export async function getAllGiftCards(){
    return http.giftCard.get('getAllGiftcardData')
}