import http from '../http';

export async function getAllStylistCategoryAPI() {
  return http.stylistCategory.get('getStylistCategory');
}
