import http from '../http';

export async function addComboOffersData(data) {
  return http.comboOffers.post(`addOfferData`,data);
}

export async function getAllComboOffers() {
    return http.comboOffers.get(`getAllOfferData`);
  }
