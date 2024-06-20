import http from '../http';

export async function getStylistSubCategoryAPI() {
  return http.stylistSubCategory.get('getStylistSubCategory');
}
