import http from '../http';

export async function getStylistBySalonIdAPI(salonId) {
  return http.stylistData.get(`getAllStylist?salonId=${salonId}`);
}
export async function updateStylistJobProfile(data) {
  return http.stylistData.put('addStylistServicesMobile', data);
}
