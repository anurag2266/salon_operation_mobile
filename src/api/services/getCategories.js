import http from '../http';

export async function getCategoryWithServicesAPI() {
  return http.categoryService.get('getServiceCategory');
}
