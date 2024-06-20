import http from '../http';

export async function addStylistAPI(data) {
  return http.stylistService.post('addStylistMobile', data);
}
export async function getStylistAPI(salonId, type = '') {
  return http.stylistService.get(
    `getAllStylist?salonId=${salonId}&type=${type}`,
  );
}
