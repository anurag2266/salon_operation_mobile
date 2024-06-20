import http from '../http';

export async function getSalonMapAPI(salonId) {
  return http.salonService.get(`getAllServicesBySalonId?id=${salonId}`);
}

export async function addSalonServices(data) {
  return http.SalonMapServices.post('salonSetupAddServices', data);
}
export async function getSalonServicesBySalonID(id) {
  return http.SalonMapServices.get(`getAllServicesBySalonId?id=${id}`);
}
export async function updateSalonServiceGeneralSettingAPI(data) {
  return http.SalonMapServices.put('updategeneralsetting', data);
}
export async function updateSalonServiceAdditionalSettingAPI(data) {
  return http.SalonMapServices.put('updatemoresetting', data);
}
export async function isActiveServiceAPI(id) {
  return http.SalonMapServices.delete(`deleteService?id=${id}`);
}
